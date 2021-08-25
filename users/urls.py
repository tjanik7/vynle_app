from django.urls import path, include
from .views import CreatePostView, GetPosts, RegisterAPI
from knox import views as knox_views

# defines the API endpoints for user-based requests
# these views are not directly rendered in the browser; react will get / post to these endpoints
urlpatterns = [  # localhost:8000/users/...
    path('create-post', CreatePostView.as_view()),
    path('get-posts', GetPosts.as_view()),
    path('auth', include('knox.urls')),
    path('auth/register', RegisterAPI.as_view()),
]
