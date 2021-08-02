from django.urls import path
from .views import GetUser, CreatePostView

# defines the API endpoints
# these views are not directly rendered; react will get/post to these endpoints
urlpatterns = [
    path('get-user', GetUser.as_view()),
    path('create-post', CreatePostView.as_view()),
]
