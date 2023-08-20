from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.core.exceptions import ObjectDoesNotExist

from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment

from spotify.util import get_spotify_albums, get_spotify_album

class CommentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        parent_post_id = request.query_params['post_id']

        all_comments = Comment.objects.filter(parent_post=parent_post_id)
        comments_ser = CommentSerializer(all_comments, many=True).data

        return Response(
            comments_ser,
            status=200
        )

    def post(self, request):
        required_params = ['body', 'post_id']
        missing_params = [param for param in required_params if param not in request.data]

        if missing_params:
            return Response(
                f'Error: missing required parameters {missing_params}',
                status=400,
            )

        parent_post = Post.objects.get(pk=request.data['post_id'])

        new_comment = Comment.objects.create(
            user=request.user,
            body=request.data['body'],
            parent_post=parent_post,
        )
        new_comment.save()

        return Response(
            CommentSerializer(new_comment).data,
            status=200
        )


class GetPost(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        post_id = request.query_params['post_id']

        try:
            post = Post.objects.get(pk=post_id)
        except ObjectDoesNotExist:
            return Response('Unable to find the requested resource', status=404)

        post_serialized = PostSerializer(post).data
        if post_serialized['album']:
            post_serialized['album_data'] = get_spotify_album(request.user, post_serialized['album'])

        return Response(post_serialized)


# Custom version of get posts where it requests album data
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
