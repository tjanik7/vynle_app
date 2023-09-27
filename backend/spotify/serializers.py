from rest_framework import serializers
from .models import SpotifyToken, FavAlbums


class FavAlbumsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavAlbums
        fields = '__all__'


class SpotifyTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotifyToken
        fields = ['access_token', ]
