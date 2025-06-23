from django.urls import path
from .views import (
    UserCreateView,
    LoginView,
    LogoutView,
    UserDetailView,
    GetCSRFToken,
)

urlpatterns = [
    path('csrf/', GetCSRFToken.as_view(), name='csrf'),
    path('register/', UserCreateView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', UserDetailView.as_view(), name='profile'),
] 