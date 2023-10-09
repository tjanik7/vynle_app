from rest_framework import serializers

from spotify.util import get_spotify_album
from users.models import Account
from .models import Post, Comment


# Serializer specifically for returning the user object within each post
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'username']


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    release = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def get_release(self, post):
        if post.spotify_release_uri:
            return get_spotify_album(post.user, post.spotify_release_uri)
        return 'no release for this post'


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
