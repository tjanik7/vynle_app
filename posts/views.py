from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import PostSerializer
from .models import Post

from spotify.util import get_spotify_albums

# DIY method for getting all posts (doing this to learn how
# to write custom endpoints)
class GetPosts(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        all_posts = Post.objects.all()

        # Fetch data from album URL within post (if one exists)
        album_urls = [p.album for p in all_posts]
        album_data_list = get_spotify_albums(request.user, album_urls)

        posts_ser = PostSerializer(all_posts, many=True).data

        for post, album_data in zip(posts_ser, album_data_list):
            post['album_data'] = album_data


        return Response(posts_ser, status.HTTP_200_OK)


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.all()

    def perform_create(self, serializer):  # allows for user to be assigned to post when it is created
        serializer.save(user=self.request.user)
