# Users
from django.urls import path, include
from .views import RegisterAPI, LoginAPI, AccountAPI, GetOtherProfile
from knox import views as knox_views

# defines the API endpoints for user-based requests
# these views are not directly rendered in the browser; React will get / post to these endpoints
urlpatterns = [  # localhost:8000/users/...
    path('auth', include('knox.urls')),
    path('auth/register', RegisterAPI.as_view()),
    path('auth/login', LoginAPI.as_view()),
    path('auth/account', AccountAPI.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('auth/get-other-user', GetOtherProfile.as_view())  # Prob belongs elsewhere
]
