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
from .serializers import ProductSerializer, CategorySerializer, BannerSerializer, SignupSerializer, LoginSerializer, CartItemSerializer, AddToCartSerializer, WishlistSerializer, AddToWishlistSerializer, OrderSerializer
from django.views.decorators.csrf import csrf_exempt
# email
from django.core.mail import send_mail
from django.conf import settings

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


@login_required
def remove_from_wishlist(request, product_id):
    Product = get_object_or_404(Product, product_id=product_id)
    wishlist_item = Wishlist.objects.filter(user=request.user, product=Product).first()

    if wishlist_item:
        wishlist_item.delete()
        messages.success(request, "Product removed from your wishlist.")

    return redirect('wishlist')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def wishlist_view(request):
    wishlist_items = Wishlist.objects.filter(user=request.user)
    serializer = WishlistSerializer(wishlist_items, many=True)
    return Response(serializer.data)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_wishlist(request):
    serializer = AddToWishlistSerializer(data=request.data)
    if serializer.is_valid():
        product_id = serializer.validated_data['product_id']

        try:
            product = Product.objects.get(product_id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)

        item, created = Wishlist.objects.get_or_create(user=request.user, product=product)
        item.save()
        return Response({"message": "Item added to cart"})
    
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_wishlist(request, item_id):
    try:
        item = Wishlist.objects.get(id=item_id, user=request.user)
        item.delete()
        return Response({"message": "Item removed from wishlist"})
    except Wishlist.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)

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
            product = Product.objects.get(product_id=product_id)
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
    
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_cart_quantity(request):
    item_id = request.data.get('item_id')
    quantity = request.data.get('quantity')

    if not item_id or not quantity:
        return Response({'error': 'Item ID and quantity are required.'}, status=400)

    try:
        cart_item = CartItem.objects.get(id=item_id, user=request.user)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found.'}, status=404)

    cart_item.quantity = quantity
    cart_item.save()
    return Response({'message': 'Cart item updated successfully.'})

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order_api(request):
    user = request.user
    cart_items = CartItem.objects.filter(user=user)

    if not cart_items.exists():
        return Response({'detail': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

    total_price = 0
    order_details = "Order Details:\n"

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

        order_details += f"{item.product.name} - {item.quantity} x ₹{item.product.price:.2f} = ₹{item_total:.2f}\n"

    order.total_price = total_price
    order.save()

    order_details += f"\nTotal Price: ₹{total_price:.2f}\n"
    order_details += f"Ordered by: {user.username} ({user.email})\nMobile: {getattr(user, 'mobile_number', 'Not Provided')}"

    send_mail(
        subject='New Order from Bakery Website',
        message=order_details,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.ADMIN_EMAIL],
        fail_silently=False,
    )

    cart_items.delete()

    return Response({'detail': 'Order placed successfully'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_orders_api(request):
    orders = Order.objects.filter(user=request.user).order_by('-ordered_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)