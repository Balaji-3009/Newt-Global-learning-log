from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
import requests
from textblob import TextBlob

from dotenv import load_dotenv
import os
import smtplib
from email.message import EmailMessage


load_dotenv()

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500))
    description = db.Column(db.Text)
    sentiment = db.Column(db.String(50))


with app.app_context():
    db.create_all()


def send_email(headlines):

    msg = EmailMessage()

    msg['Subject'] = "Daily News Digest"
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = EMAIL_ADDRESS

    content = "\n\n".join(headlines)

    msg.set_content(content)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)


@app.route("/", methods=["GET", "POST"])
def index():

    city = "Chennai"

    if request.method == "POST":
        city = request.form.get("city")


    news_url = (
        f"https://newsapi.org/v2/top-headlines?"
        f"country=us&apiKey={NEWS_API_KEY}"
    )

    news_response = requests.get(news_url).json()

    articles = news_response.get("articles", [])

    processed_articles = []

    headlines = []

    for article in articles[:10]:

        title = article.get("title", "")
        description = article.get("description", "")

        headlines.append(title)

        blob = TextBlob(title)

        polarity = blob.sentiment.polarity

        if polarity > 0:
            sentiment = "Positive"
        elif polarity < 0:
            sentiment = "Negative"
        else:
            sentiment = "Neutral"

        processed_articles.append({
            "title": title,
            "description": description,
            "sentiment": sentiment
        })


    weather_url = (
        f"https://api.openweathermap.org/data/2.5/weather?"
        f"q={city}&appid={WEATHER_API_KEY}&units=metric"
    )

    try:

        weather_response = requests.get(weather_url).json()

        if weather_response.get("cod") != 200:

            weather = {
                "city": city,
                "error": weather_response.get(
                    "message",
                    "Invalid city"
                )
            }

        else:

            weather = {
                "city": city,
                "temperature": weather_response["main"]["temp"],
                "humidity": weather_response["main"]["humidity"],
                "description": weather_response["weather"][0]["description"]
            }

    except Exception as e:

        weather = {
            "city": city,
            "error": str(e)
        }

    return render_template(
        "index.html",
        articles=processed_articles,
        weather=weather
    )

@app.route("/save", methods=["POST"])
def save():

    title = request.form.get("title")
    description = request.form.get("description")
    sentiment = request.form.get("sentiment")

    favorite = Favorite(
        title=title,
        description=description,
        sentiment=sentiment
    )

    db.session.add(favorite)
    db.session.commit()

    return redirect("/")


@app.route("/favorites")
def favorites():

    data = Favorite.query.all()

    return render_template(
        "favorites.html",
        favorites=data
    )


@app.route("/send-email")
def send_digest():

    news_url = (
        f"https://newsapi.org/v2/top-headlines?"
        f"country=us&apiKey={NEWS_API_KEY}"
    )

    news_response = requests.get(news_url).json()

    articles = news_response.get("articles", [])

    headlines = []

    for article in articles[:5]:
        headlines.append(article.get("title"))

    send_email(headlines)

    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)