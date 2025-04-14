from . import views
from django.urls import path

urlpatterns = [ 
    path('', views.home, name='home'),
    path('product/', views.product_list, name='product_list'),
    # authetication
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    # wishlist
    path('wishlist/', views.wishlist_view, name='wishlist'),
    path('wishlist/add/<int:product_id>/', views.add_to_wishlist, name='add_to_wishlist'),
    path('wishlist/remove/<int:product_id>/', views.remove_from_wishlist, name='remove_from_wishlist'),
    # cart
    path('cart/', views.cart_view, name='cart'),
    path('cart/add/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/remove/<int:product_id>/', views.remove_from_cart, name='remove_from_cart'),
    # path('cart/update/<int:product_id>/<int:quantity>/', views.update_cart_quantity, name='update_cart'),
    path('cart/update/<int:product_id>/', views.update_cart_quantity, name='update_cart'),
    # email
    path('place-order/', views.place_order_view, name='place_order'),
    path('my-orders/', views.ordered_page_view, name='ordered_page'),

]
