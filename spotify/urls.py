from django.urls import path
from .views import AuthURL, spotify_callback, IsSpotifyAuthenticated, GetSpotifyToken

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-spotify-authenticated', IsSpotifyAuthenticated.as_view()),
    path('get-spotify-token', GetSpotifyToken.as_view()),
]
