from django.shortcuts import render, redirect, get_object_or_404
from .models import *
from .forms import RegisterForm
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required


def home(request):

    foods = FoodItem.objects.all()
    return render(request,'restaurant/home.html',{'foods': foods})


def register_view(request):

    if request.method == 'POST':
        form = RegisterForm(request.POST)

        if form.is_valid():
            user = form.save()
            Cart.objects.create(user=user)
            login(request, user)
            return redirect('/')

    else:
        form = RegisterForm()

    return render(request,'restaurant/register.html',{'form': form})


@login_required
def add_to_cart(request, food_id):

    food = get_object_or_404(FoodItem,id=food_id)
    cart = Cart.objects.get(user=request.user)
    cart_item, created = CartItem.objects.get_or_create(cart=cart,food_item=food)

    if not created:
        cart_item.quantity += 1
        cart_item.save()

    return redirect('/cart/')


@login_required
def cart_view(request):

    cart = Cart.objects.get(user=request.user)
    items = cart.cartitem_set.all()

    return render(request,'restaurant/cart.html',{'cart': cart,'items': items})


@login_required
def remove_from_cart(request, item_id):

    item = get_object_or_404(CartItem,id=item_id)
    item.delete()

    return redirect('/cart/')


@login_required
def checkout(request):

    cart = Cart.objects.get(user=request.user)
    items = cart.cartitem_set.all()
    if request.method == 'POST':
        address = request.POST.get('address')
        phone = request.POST.get('phone')
        order = Order.objects.create(
            user=request.user,
            address=address,
            phone=phone,
            total_amount=cart.total_price()
        )

        for item in items:

            OrderItem.objects.create(
                order=order,
                food_item=item.food_item,
                quantity=item.quantity,
                price=item.food_item.price
            )

        items.delete()

        return redirect('/orders/')

    return render(request,'restaurant/checkout.html',{'cart': cart,'items': items})


@login_required
def orders(request):

    orders = Order.objects.filter(user=request.user).order_by('-created_at')

    return render(request,'restaurant/orders.html',{'orders': orders})

@login_required
def increase_quantity(request, item_id):

    item = get_object_or_404(CartItem,id=item_id)
    item.quantity += 1
    item.save()

    return redirect('/cart/')


@login_required
def decrease_quantity(request, item_id):

    item = get_object_or_404(CartItem,id=item_id)

    if item.quantity > 1:
        item.quantity -= 1
        item.save()

    else:
        item.delete()

    return redirect('/cart/')