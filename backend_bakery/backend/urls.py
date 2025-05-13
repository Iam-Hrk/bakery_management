from . import views
from django.urls import path

urlpatterns = [ 
    path('', views.home, name='home'),
    path('api/products/', views.product_list_api, name='product-list-api'),
    path('api/categories/', views.category_list_api, name='category-list-api'),
    path('api/products/bestsellers/', views.bestseller_products_api, name='bestseller-products-api'),
    path('api/banner/', views.banner_api, name='banner-api'),
    # authetication
    path('api/signup/', views.signup_api, name='api-signup'),
    path('api/login/', views.login_api, name='api-login'),
    path('api/logout/', views.logout_api, name='api-logout'),
    path('api/profile/', views.get_user_profile, name='user-profile'),
    # wishlist
    path('api/wishlist/', views.wishlist_view, name='wishlist'),
    path('api/wishlist/add/', views.add_to_wishlist, name='add_to_wishlist'),
    path('api/wishlist/remove/<int:item_id>/', views.remove_from_wishlist, name='remove_from_wishlist'),
    # cart
    path('api/cart/', views.cart_items),
    path('api/cart/add/', views.add_to_cart),
    path('api/cart/remove/<int:item_id>/', views.remove_from_cart),
    path('api/cart/update/', views.update_cart_quantity),
    # oders
    path('api/place-order/', views.place_order_api, name='api_place_order'),
    path('api/my-orders/', views.user_orders_api, name='my-orders-api'),

]
