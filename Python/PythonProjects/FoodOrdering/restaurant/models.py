from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class FoodItem(models.Model):
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=8,decimal_places=2)
    image = models.ImageField(upload_to='food_images/')

    def __str__(self):
        return self.name


class Cart(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)

    def total_price(self):
        return sum(item.total_price() for item in self.cartitem_set.all())


class CartItem(models.Model):
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE)
    food_item = models.ForeignKey(FoodItem,on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def total_price(self):
        return self.food_item.price * self.quantity


class Order(models.Model):
    STATUS_CHOICES = (('Pending', 'Pending'),('Preparing', 'Preparing'),('Delivered', 'Delivered'),)

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    address = models.TextField()
    phone = models.CharField(max_length=15)
    total_amount = models.DecimalField(max_digits=10,decimal_places=2)
    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    food_item = models.ForeignKey(FoodItem,on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=8,decimal_places=2)