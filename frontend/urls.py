from django.urls import path
from .views import index

urlpatterns = [
    path('', index),  # renders index template whenever the empty route is visited
    path('create', index),
]
