# Spotify
from django.db import models
from django.db.models.signals import post_save

from users.models import Profile


class FavAlbums(models.Model):
    class Meta:
        verbose_name_plural = 'favorite albums'

    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, null=True, related_name='favorite_albums')
    # Holds ID of each of user's 6 favorite albums they can select via their profile
    a0 = models.CharField(max_length=22, blank=True)
    a1 = models.CharField(max_length=22, blank=True)
    a2 = models.CharField(max_length=22, blank=True)
    a3 = models.CharField(max_length=22, blank=True)
    a4 = models.CharField(max_length=22, blank=True)
    a5 = models.CharField(max_length=22, blank=True)

    def __str__(self):
        return str(self.profile)


class SpotifyToken(models.Model):
    user = models.ForeignKey('users.Account', related_name='spotify_token', on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=200)
    expires_at = models.DateTimeField()
    token_type = models.CharField(max_length=50)
