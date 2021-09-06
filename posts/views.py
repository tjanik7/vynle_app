from django.shortcuts import render
from rest_framework import viewsets, permissions

from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [
        permissions.AllowAny,  # to be changed later
    ]
    serializer_class = PostSerializer
