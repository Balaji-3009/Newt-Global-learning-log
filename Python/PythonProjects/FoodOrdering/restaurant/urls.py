from django.urls import path
from . import views
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [

    path('', views.home, name='home'),

    path('register/',
         views.register_view,
         name='register'),

    path('login/',
         LoginView.as_view(
             template_name='restaurant/login.html'
         ),
         name='login'),

    path('logout/',
         LogoutView.as_view(),
         name='logout'),

    path('add-to-cart/<int:food_id>/',
         views.add_to_cart,
         name='add_to_cart'),

    path('cart/',
         views.cart_view,
         name='cart'),

    path('remove/<int:item_id>/',
         views.remove_from_cart,
         name='remove'),

    path('checkout/',
         views.checkout,
         name='checkout'),

    path('orders/',
         views.orders,
         name='orders'),
    
    path('increase/<int:item_id>/',
     views.increase_quantity,
     name='increase'),

    path('decrease/<int:item_id>/',
        views.decrease_quantity,
        name='decrease'),
]
