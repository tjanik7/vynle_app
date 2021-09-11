from rest_framework import viewsets, permissions

from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = PostSerializer

    def get_queryset(self):
        return self.request.user.posts.all()


    def perform_create(self, serializer):  # allows for user to be assigned to post when it is created
        serializer.save(user=self.request.user)
