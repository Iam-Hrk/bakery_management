def get_cart_from_session(request):
    """
    Retrieve the cart from the session. If it doesn't exist, create an empty cart.
    """
    cart = request.session.get('cart', {})  # Get cart from session or return empty dict
    return cart
