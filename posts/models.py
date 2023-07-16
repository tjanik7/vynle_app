from django.db import models
from users.models import Account


class Post(models.Model):
    user = models.ForeignKey(Account, related_name='posts', on_delete=models.CASCADE, null=True)
    body = models.TextField(max_length=150)

    # Will need to be deprecated - this is currently just a text field
    song = models.CharField(max_length=80)

    # New implementation - will hold Spotify URL
    album = models.TextField(max_length=32, blank=True)
