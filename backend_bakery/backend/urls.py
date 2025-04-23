from . import views
from django.urls import path

urlpatterns = [ 
    path('', views.home, name='home'),
    # path('product/', views.product_list, name='product_list'),
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
    path('wishlist/', views.wishlist_view, name='wishlist'),
    path('wishlist/add/<int:product_id>/', views.add_to_wishlist, name='add_to_wishlist'),
    path('wishlist/remove/<int:product_id>/', views.remove_from_wishlist, name='remove_from_wishlist'),
    # cart
    path('api/cart/', views.cart_items),
    path('api/cart/add/', views.add_to_cart),
    path('api/cart/remove/<int:item_id>/', views.remove_from_cart),
    # path('cart/update/<int:product_id>/<int:quantity>/', views.update_cart_quantity, name='update_cart'),
    # path('cart/update/<int:product_id>/', views.update_cart_quantity, name='update_cart'),
    # email
    path('place-order/', views.place_order_view, name='place_order'),
    path('my-orders/', views.ordered_page_view, name='ordered_page'),

]
