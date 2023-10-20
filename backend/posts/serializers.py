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
            user = self.context.get('user')
            if user is None:
                raise Exception('"User" was not set in the post serializer')

            return get_spotify_album(user, post.spotify_release_uri)
        return 'No release for this post'

    def serialize_one(self, obj):
        pass

    def serialize_many(self, queryset):
        pass

    # Overriding method that is called implicitly when converting data to serialized form
    def to_representation(self, instance):
        if self.many:
            return self.serialize_many(instance)
        return self.serialize_one(instance)


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
