from django.shortcuts import redirect

from users.models import Account
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status, permissions, generics
from rest_framework.response import Response
from .util import update_or_create_user_tokens, is_spotify_authenticated


# Returns the url that will be used to authenticate this application (this endpoint does not make the request)
class AuthURL(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, format=None):
        # spotify data we would like to access from user - found in spotify docs
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

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
