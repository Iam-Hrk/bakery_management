from rest_framework import serializers
from .models import Product, Category, banner, CartItem, Wishlist, Order, OrderItem
from django.contrib.auth import get_user_model

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name','image'] 

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)  # nested representation

    class Meta:
        model = Product
        fields = ['product_id', 'name', 'price', 'category', 'category_name', 'description', 'image', 'isbestseller', 'created_at', 'updated_at']

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = banner
        fields = ['id', 'image', 'title', 'title_color', 'description', 'created_at', 'updated_at']



User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'mobile_number']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    price = serializers.ReadOnlyField(source='product.price')
    image = serializers.ImageField(source='product.image')

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_name', 'price', 'image', 'quantity']

class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class WishlistSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    price = serializers.ReadOnlyField(source='product.price')
    image = serializers.ImageField(source='product.image')

    class Meta:
        model = Wishlist
        fields = ['id', 'product', 'product_name', 'price', 'image']

class AddToWishlistSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product_name', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'total_price', 'ordered_at', 'items']
        read_only_fields = ['user', 'ordered_at', 'items']