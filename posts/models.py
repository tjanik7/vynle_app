from django.db import models

class Post(models.Model):
    name = models.CharField(max_length=30)
    body = models.TextField(max_length=150)
