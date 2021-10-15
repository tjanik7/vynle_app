from django.shortcuts import redirect
from requests import Request, post
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import Account
from .models import SpotifyToken
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from .util import update_or_create_user_tokens, is_spotify_authenticated
from .serializers import SpotifyTokenSerializer


# Returns the url that will be used to authenticate this application (this endpoint does not make the request)
class AuthURL(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, format=None):
        # scopes of spotify data we would like to access from user - found in spotify docs
        scopes = 'user-top-read'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
            'state': request.user.id
        }).prepare().url

        return Response(
            {'url': url},
            status=status.HTTP_200_OK
        )


class GetSpotifyToken(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = SpotifyTokenSerializer

    def get(self, request, format=None):
        user = request.user
        spotify_token = SpotifyToken.objects.filter(user=user)
        if spotify_token:
            data = SpotifyTokenSerializer(spotify_token[0]).data
            return Response(
                {'token': data},
                status=status.HTTP_200_OK
            )
        return Response(
            {'msg': 'No Spotify token associated with this user'},
            status=status.HTTP_404_NOT_FOUND
        )


# Callback function which accepts the information returned from the first request to the url generated in 'AuthURL'
def spotify_callback(request, format=None):
    user_id = request.GET.get('state')
    code = request.GET.get('code')
    error = request.GET.get('error')  # not yet implemented

    user = Account.objects.get(id=user_id)

    response = post('https://accounts.spotify.com/api/token', data={  # note that the request is sent on this line
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    print(f'adding access token {access_token} to db for user {user}')

    update_or_create_user_tokens(user, access_token, token_type, expires_in, refresh_token)
    return redirect('frontend:')


class IsSpotifyAuthenticated(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(request.user)
        return Response(
            {'status': is_authenticated},
            status=status.HTTP_200_OK
        )
