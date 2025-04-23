from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth import get_user_model

# Create your models here.
class Category(models.Model):
    name=models.CharField(max_length=100)
    image=models.ImageField(upload_to='category/',null=True)
    def __str__(self):
        return self.name
    
class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    name=models.CharField(max_length=100)
    price=models.FloatField()
    category=models.ForeignKey(Category,on_delete=models.CASCADE)
    description=models.TextField()
    image=models.ImageField(upload_to='products/')
    isbestseller=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name


class banner(models.Model):
    image=models.ImageField(upload_to='banners/')
    title=models.CharField(max_length=100, null=True)
    title_color=models.CharField(max_length=30, null=True, blank=True)
    description=models.TextField(null=True, blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Banner {self.id}'

#    login and registration

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, mobile_number=None):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, mobile_number=mobile_number)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user
 
class customUser(AbstractUser):
    email=models.EmailField(unique=True)
    username=models.CharField(max_length=100,unique=True)
    mobile_number = models.CharField(max_length=15, blank=True, null=True)
    objects = CustomUserManager()

    def __str__(self):
        return self.username
    

#wishlist
User = get_user_model()

class Wishlist(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    added_at=models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')

    def __str__(self):
        return f'{self.user.username} - {self.product.name}'

User = get_user_model()
    
class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('user', 'product')

    def __str__(self):
        return f"{self.quantity} of {self.product.name}"


User = get_user_model()

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    ordered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Order {self.id} by {self.user.username}'
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product_name = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.product_name} x {self.quantity}'
