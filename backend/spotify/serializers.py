from rest_framework import serializers
from .models import SpotifyToken, FavAlbums
from spotify.utils.release_request import get_spotify_album


class FavAlbumsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavAlbums
        fields = '__all__'

    def to_representation(self, instance):
        spotify_release_id_list = instance.get_id_list()

        return get_spotify_album(instance.profile.account, spotify_release_id_list)


class SpotifyTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotifyToken
        fields = ['access_token', ]
