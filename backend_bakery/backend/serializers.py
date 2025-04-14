from rest_framework import serializers
from .models import product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name'] 

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()  # nested representation

    class Meta:
        model = product
        fields = ['product_id', 'name', 'price', 'category', 'description', 'image', 'created_at', 'updated_at']
