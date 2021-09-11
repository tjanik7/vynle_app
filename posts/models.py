from django.db import models
from users.models import Account

class Post(models.Model):
    user = models.ForeignKey(Account, related_name='posts', on_delete=models.CASCADE, null=True)
    body = models.TextField(max_length=150)
