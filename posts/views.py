from rest_framework import viewsets, permissions

from .serializers import PostSerializer
from .models import Post


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.all()

    def perform_create(self, serializer):  # allows for user to be assigned to post when it is created
        serializer.save(user=self.request.user)
