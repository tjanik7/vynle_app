from django.urls import path
from .views import GetUser

urlpatterns = [
    path('get-user', GetUser.as_view()),
]
