from django.urls import path
from .views import (
    EventListView,
    EventDetailView,
    EventParticipateView,
)

urlpatterns = [
    path('', EventListView.as_view(), name='event-list'),
    path('<int:pk>/', EventDetailView.as_view(), name='event-detail'),
    path('<int:pk>/participate/', EventParticipateView.as_view(), name='event-participate'),
] 