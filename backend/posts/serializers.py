from rest_framework import serializers

from users.models import Account
from .models import Post, Comment


# Serializer specifically for returning the user object within each post
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'username']


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
        # depth = 1  # means that the serializer will return a user object for each post rather than the user's foreign key


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
