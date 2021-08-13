from django.urls import path
from .views import GetUser, CreatePostView, GetPosts

# defines the API endpoints
# these views are not directly rendered; react will get/post to these endpoints
urlpatterns = [
    path('get-user', GetUser.as_view()),
    path('create-post', CreatePostView.as_view()),
    path('get-posts', GetPosts.as_view()),
]
