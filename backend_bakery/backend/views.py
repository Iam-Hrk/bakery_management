from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import product, Category, Wishlist, Cart, Order, OrderItem, banner
from django.contrib.auth import authenticate, login, logout, get_user_model 
from django.contrib.auth.decorators import login_required
from .utils import get_cart_from_session
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer, CategorySerializer
# email
from django.core.mail import send_mail
from django.conf import settings
# from django.http import HttpResponse

# Create your views here.
def home(request):
    banners = banner.objects.all()
    return render(request, 'home.html',{'banners':banners})

def product_list(request):
    category_id = request.GET.get('category', None)
    sort_by = request.GET.get('sort', None) 

    products = product.objects.all()

    if category_id:
        products = products.filter(category_id=category_id)

    if sort_by == "price_asc":
        products = products.order_by("price")
    elif sort_by == "price_desc":
        products = products.order_by("-price")
    elif sort_by == "name_asc":
        products = products.order_by("name")
    elif sort_by == "name_desc":
        products = products.order_by("-name")

    categories = Category.objects.all()

    return render(request, 'product_list.html', {
        'products': products,
        'categories': categories,
        'selected_category': category_id,
        'selected_sort': sort_by
    })

# login and registration


User = get_user_model()  # Get the custom user model

def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        mobile_number = request.POST.get('mobile_number')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email is already taken')
            return redirect('signup')

        user = User.objects.create_user(username=username, email=email, password=password, mobile_number=mobile_number)
        user.save()
        messages.success(request, 'Account created successfully')
        return redirect('login')
    
    return render(request, 'signup.html')


def login_view(request):
    if request.method == 'POST':
        print(f"Debug: POST data = {request.POST}")  # Print all POST data

        username = request.POST.get('username')
        password = request.POST.get('password')

        print(f"Debug: Username = {username}, Password = {password}")  # Debugging

        user = authenticate(request, username=username, password=password)

        if user is not None:
            print(f"User {user} authenticated successfully!")  # Debugging
            login(request, user)
            return redirect('home')
        else:
            print("Authentication failed!")  # Debugging
            messages.error(request, 'Invalid credentials')
            return redirect('login')

    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    messages.success(request,'Logged out successfully')
    return redirect('login')

# wish list

@login_required
def add_to_wishlist(request, product_id):
    # Use product_id instead of id in the query
    product_obj = get_object_or_404(product, product_id=product_id)
    wishlist_item, created = Wishlist.objects.get_or_create(user=request.user, product=product_obj)

    if created:
        messages.success(request, "Product added to your wishlist!")
    else:
        messages.info(request, "Product is already in your wishlist.")

    return redirect('wishlist')

@login_required
def remove_from_wishlist(request, product_id):
    Product = get_object_or_404(product, product_id=product_id)
    wishlist_item = Wishlist.objects.filter(user=request.user, product=Product).first()

    if wishlist_item:
        wishlist_item.delete()
        messages.success(request, "Product removed from your wishlist.")

    return redirect('wishlist')

@login_required
def wishlist_view(request):
    wishlist_items = Wishlist.objects.filter(user=request.user)
    return render(request, 'wishlist.html', {'wishlist_items': wishlist_items})


# cart

@login_required
def cart_view(request):
    cart_items = Cart.objects.filter(user=request.user)  # Fetch from database

    cart = {}
    total_price = 0  # Initialize total price

    for item in cart_items:
        product = item.product
        cart[item.product_id] = {
            'name': product.name,
            'price': product.price,
            'quantity': item.quantity,
            'total_price': product.price * item.quantity,
        }
        total_price += product.price * item.quantity  # Accumulate total price

    return render(request, 'cart.html', {'cart': cart, 'total_price': total_price})

@login_required
def add_to_cart(request, product_id):
    """ Add a product to the cart """
    Product = get_object_or_404(product, product_id=product_id)
    
    # Check if product is already in the cart
    cart_item, created = Cart.objects.get_or_create(user=request.user, product=Product)
    
    if not created:
        # If product is already in the cart, increase the quantity
        cart_item.quantity += 1
        cart_item.save()
        messages.success(request, "Quantity increased in the cart!")
    else:
        messages.success(request, "Item added to cart!")

    return redirect('cart')

@login_required
def remove_from_cart(request, product_id):
    """ Remove a product from the cart """
    Product = get_object_or_404(product, product_id=product_id)
    cart_item = Cart.objects.filter(user=request.user, product=Product)
    
    if cart_item.exists():
        cart_item.delete()
        messages.success(request, "Item removed from cart!")
    else:
        messages.error(request, "Item not found in cart!")

    return redirect('cart')

@login_required
def update_cart_quantity(request, product_id):
    """ Update the quantity of a product in the cart """
    Product = get_object_or_404(product, product_id=product_id)

    if request.method == "POST":
        quantity = request.POST.get('quantity', 1)  # Get quantity from POST data
        cart_item = Cart.objects.filter(user=request.user, product=Product)

        if cart_item.exists():
            cart_item.update(quantity=quantity)
            messages.success(request, "Cart updated!")
        else:
            messages.error(request, "Item not found in cart!")

    return redirect('cart')

# email
# def test_email(request):
#     subject = 'Test Email from Django'
#     message = 'Hi! This is a test email to check if email sending works.'
#     from_email = settings.DEFAULT_FROM_EMAIL
#     recipient_list = [settings.ADMIN_EMAIL]  # Or use any email you want to receive test email

#     try:
#         send_mail(subject, message, from_email, recipient_list, fail_silently=False)
#         return HttpResponse("✅ Email sent successfully!")
#     except Exception as e:
#         return HttpResponse(f"❌ Failed to send email: {str(e)}")
@login_required
def place_order_view(request):
    user = request.user
    cart_items = Cart.objects.filter(user=user)

    if not cart_items.exists():
        messages.warning(request, "Your cart is empty.")
        return redirect('cart')

    total_price = 0
    order_details = "Order Details:\n"  # ✅ Initialize here

    # Create order
    order = Order.objects.create(user=user, total_price=0)

    for item in cart_items:
        item_total = item.product.price * item.quantity
        total_price += item_total

        OrderItem.objects.create(
            order=order,
            product_name=item.product.name,
            quantity=item.quantity,
            price=item.product.price
        )

        order_details += f"{item.product.name} - {item.quantity} x ${item.product.price:.2f} = ${item_total:.2f}\n"

    order.total_price = total_price
    order.save()

    order_details += f"\nTotal Price: ${total_price:.2f}\n"
    order_details += f"Ordered by: {user.username} ({user.email})\nMobile: {user.mobile_number or 'Not Provided'}"


    send_mail(
        subject='New Order from Bakery Website',
        message=order_details,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.ADMIN_EMAIL],
        fail_silently=False,
    )

    cart_items.delete()

    messages.success(request, "Order placed successfully! You'll receive confirmation soon.")
    return redirect('ordered_page')


@login_required
def ordered_page_view(request):
    orders = Order.objects.filter(user=request.user).order_by('-ordered_at')
    return render(request, 'ordered_page.html', {'orders': orders})