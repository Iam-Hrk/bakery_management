from django.contrib import admin
from .models import Category, product, OrderItem, banner
from django.contrib.auth import get_user_model

# Register your models here.

admin.site.register(Category)
admin.site.register(product)
admin.site.register(OrderItem)
admin.site.register(banner)


User = get_user_model()
admin.site.register(User)