"""
URL configuration for speak_football project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from users.views import UserCreateView, UserDetailView, LoginView, LogoutView
from events.views import EventListView, EventDetailView, EventParticipateView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # User endpoints
    path('api/users/register/', UserCreateView.as_view(), name='user-register'),
    path('api/users/me/', UserDetailView.as_view(), name='user-detail'),
    path('api/users/login/', LoginView.as_view(), name='user-login'),
    path('api/users/logout/', LogoutView.as_view(), name='user-logout'),
    
    # Event endpoints
    path('api/events/', EventListView.as_view(), name='event-list'),
    path('api/events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),
    path('api/events/<int:pk>/participate/', EventParticipateView.as_view(), name='event-participate'),
]
