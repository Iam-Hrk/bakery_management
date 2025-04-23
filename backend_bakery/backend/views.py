from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Category, Wishlist, CartItem, Order, OrderItem, banner
from django.contrib.auth import authenticate, login, logout, get_user_model 
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, permissions
from .serializers import ProductSerializer, CategorySerializer, BannerSerializer, SignupSerializer, LoginSerializer, CartItemSerializer, AddToCartSerializer
# email
from django.core.mail import send_mail
from django.conf import settings
# from django.http import HttpResponse

# Create your views here.
def home(request):
    banners = banner.objects.all()
    return render(request, 'home.html',{'banners':banners})

@api_view(['GET'])
def product_list_api(request):
    category_id = request.GET.get('category')
    sort_by = request.GET.get('sort')

    products = Product.objects.all()

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

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def category_list_api(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def bestseller_products_api(request):
    products = Product.objects.filter(isbestseller=True)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def banner_api(request):
    banners = banner.objects.all()
    serializer = BannerSerializer(banners, many=True)
    return Response(serializer.data)
# login and registration


User = get_user_model()

# Utility function to create tokens
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
def signup_api(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        tokens = get_tokens_for_user(user)
        return Response({
            'message': 'Account created successfully',
            'tokens': tokens
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_api(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        user = authenticate(request, username=username, password=password)

        print(f"Debug: User = {user}")

        if user is not None:
            # login(request, user) #it is not needed in token based authentication
            tokens = get_tokens_for_user(user)
            return Response({
                'message': 'Login successful',
                'tokens': tokens
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout_api(request):
    logout(request)
    return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_user_profile(request):
    user = request.user
    return Response({
        'username': user.username,
        'email': user.email,  # Include other user details if needed
        'mobile_number': user.mobile_number,
    })
# wish list

@login_required
def add_to_wishlist(request, product_id):
    # Use product_id instead of id in the query
    product_obj = get_object_or_404(Product, product_id=product_id)
    wishlist_item, created = Wishlist.objects.get_or_create(user=request.user, product=product_obj)

    if created:
        messages.success(request, "Product added to your wishlist!")
    else:
        messages.info(request, "Product is already in your wishlist.")

    return redirect('wishlist')

@login_required
def remove_from_wishlist(request, product_id):
    Product = get_object_or_404(Product, product_id=product_id)
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

# @login_required
# def cart_view(request):
#     cart_items = Cart.objects.filter(user=request.user)  # Fetch from database

#     cart = {}
#     total_price = 0  # Initialize total price

#     for item in cart_items:
#         product = item.product
#         cart[item.product_id] = {
#             'name': product.name,
#             'price': product.price,
#             'quantity': item.quantity,
#             'total_price': product.price * item.quantity,
#         }
#         total_price += product.price * item.quantity  # Accumulate total price

#     return render(request, 'cart.html', {'cart': cart, 'total_price': total_price})

# @login_required
# def add_to_cart(request, product_id):
#     """ Add a product to the cart """
#     Product = get_object_or_404(Product, product_id=product_id)
    
#     # Check if product is already in the cart
#     cart_item, created = Cart.objects.get_or_create(user=request.user, product=Product)
    
#     if not created:
#         # If product is already in the cart, increase the quantity
#         cart_item.quantity += 1
#         cart_item.save()
#         messages.success(request, "Quantity increased in the cart!")
#     else:
#         messages.success(request, "Item added to cart!")

#     return redirect('cart')

# @login_required
# def remove_from_cart(request, product_id):
#     """ Remove a product from the cart """
#     Product = get_object_or_404(Product, product_id=product_id)
#     cart_item = Cart.objects.filter(user=request.user, product=Product)
    
#     if cart_item.exists():
#         cart_item.delete()
#         messages.success(request, "Item removed from cart!")
#     else:
#         messages.error(request, "Item not found in cart!")

#     return redirect('cart')

# @login_required
# def update_cart_quantity(request, product_id):
#     """ Update the quantity of a product in the cart """
#     Product = get_object_or_404(Product, product_id=product_id)

#     if request.method == "POST":
#         quantity = request.POST.get('quantity', 1)  # Get quantity from POST data
#         cart_item = Cart.objects.filter(user=request.user, product=Product)

#         if cart_item.exists():
#             cart_item.update(quantity=quantity)
#             messages.success(request, "Cart updated!")
#         else:
#             messages.error(request, "Item not found in cart!")

#     return redirect('cart')
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cart_items(request):
    items = CartItem.objects.filter(user=request.user)
    serializer = CartItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    serializer = AddToCartSerializer(data=request.data)
    if serializer.is_valid():
        product_id = serializer.validated_data['product_id']
        quantity = serializer.validated_data['quantity']

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)

        item, created = CartItem.objects.get_or_create(user=request.user, product=product)
        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity
        item.save()
        return Response({"message": "Item added to cart"})
    
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, item_id):
    try:
        item = CartItem.objects.get(id=item_id, user=request.user)
        item.delete()
        return Response({"message": "Item removed from cart"})
    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)
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
    cart_items = CartItem.objects.filter(user=user)

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