from django.db import models

from users.models import Account


class SpotifyToken(models.Model):  # NEWEST MIGRATIONS HAVE BEEN APPLIED
    user = models.ForeignKey(Account, related_name='spotify_token', on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=200)
    expires_at = models.DateTimeField()
    token_type = models.CharField(max_length=50)
