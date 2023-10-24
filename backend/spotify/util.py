from datetime import timedelta

from django.utils import timezone
from requests import post, get
from spotify.credentials import CLIENT_ID, CLIENT_SECRET
from spotify.models import SpotifyToken


def get_user_tokens(user):
    user_tokens = SpotifyToken.objects.filter(user=user)
    if user_tokens.exists():
        return user_tokens[0]
    return None


# Note that SpotifyToken model stores user object rather than session_id (as shown in tutorial)
# This is because Vynle auth flow uses tokens rather than sessions
def update_or_create_user_tokens(user, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(user)

    # Take the current time and add the amount of time it takes for the token to expire (usually 3600sec)
    expires_at = timezone.now() + timedelta(seconds=expires_in)

    if tokens:  # update existing tokens
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_at = expires_at
        tokens.token_type = token_type
        tokens.save(update_fields=[
            'access_token',
            'refresh_token',
            'expires_at',
            'token_type'
        ])

    else:  # Create new Spotify token
        tokens = SpotifyToken(user=user,
                              access_token=access_token,
                              refresh_token=refresh_token,
                              token_type=token_type,
                              expires_at=expires_at,
                              )
        tokens.save()  # Writes to database


def refresh_spotify_token(user):
    refresh_token = get_user_tokens(user).refresh_token
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',  # The type of token being sent
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')

    update_or_create_user_tokens(
        user,
        access_token,
        token_type,
        expires_in,
        refresh_token,
    )


def is_spotify_authenticated(user):
    tokens = get_user_tokens(user)
    if tokens:
        expiry = tokens.expires_at
        if expiry <= timezone.now():  # If token is expired
            refresh_spotify_token(user)
        return True
    return False


def get_header(user):
    access_token = get_user_tokens(user).access_token
    return {
        'Authorization': 'Bearer ' + access_token,
    }


def _request_spotify_release_art(user, release_uri):
    """
    Requests release data from Spotify
    @param user: 'user' object sent with request from the frontend
    @param release_uri: Either str representing one release URI or list specifying multiple
    @return: If one URI specified: dict; If multiple: list of dicts
    """

    base_url = 'https://api.spotify.com/v1/albums'
    headers = get_header(user)

    if isinstance(release_uri, str):
        url = base_url + f'/{release_uri}'
        many = False

    elif isinstance(release_uri, list):
        if not release_uri:
            # Return empty list if no IDs supplied
            return []

        url = base_url + '?ids=' + ','.join(release_uri)
        many = True

    else:
        raise TypeError('"release_uri" should be type list or str')

    # Send the request
    response_obj = get(url, headers=headers)

    if response_obj.status_code == 200:
        if many:
            return response_obj.json()['albums']

        return response_obj.json()

    raise Exception(
        f'Got {response_obj.status_code} response when retrieving album from Spotify. Reason: {response_obj.text}'
    )


def _transform_release_art_response(response_json, img_size):
    if response_json is None:
        return None

    assert isinstance(response_json, dict), f'Expected type dict but got {type(response_json).__name}'

    size_letter_to_ind = {
        's': 2,
        'm': 1,
        'l': 0,
    }

    img_size_ind = size_letter_to_ind[img_size]

    if 'name' in response_json and 'artists' in response_json and 'images' in response_json:
        return {
            'name': response_json['name'],  # Name of album
            'artist': response_json['artists'][0]['name'],  # Name of first artist listed
            'img': response_json['images'][img_size_ind]['url'],  # Medium img - 300x300
        }

    raise Exception(f'Keys not found in response: {response_json}')


def get_spotify_album(user, release_uri, img_size='m'):
    """
    Calls helper funcs which make the request then transforms the response data
    @param user: 'user' object from request
    @param release_uri: str or list
    @param img_size: one of {s,m,l}
    @return: dict or list
    """
    if is_spotify_authenticated(user):
        response = _request_spotify_release_art(user, release_uri)
        if isinstance(response, dict):
            return _transform_release_art_response(response, img_size)

        elif isinstance(response, list):
            return [_transform_release_art_response(response_item, img_size) for response_item in response]

        raise TypeError(
            f'Return value from _transform_release_art_response expected to be str or list. Got type {type(response)}.'
        )

    raise Exception('Unable to pull album data since user is not authenticated with Spotify')
