from rest_framework import serializers

from users.models import Account
from .models import Post


# Serializer specifically for returning the user object within each post
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['username', 'first', 'last']


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
        # depth = 1  # means that the serializer will return a user object for each post rather than the user's foreign key
