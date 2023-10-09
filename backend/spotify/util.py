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
        tokens.save()  # writes to database


def refresh_spotify_token(user):
    refresh_token = get_user_tokens(user).refresh_token
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',  # type of token we are sending
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
        if expiry <= timezone.now():  # If the 'expiry' DateTime object is in the past
            refresh_spotify_token(user)
        return True
    return False


def get_header(user):
    access_token = get_user_tokens(user).access_token
    return {'Authorization': 'Bearer ' + access_token, }


# Takes in album ID and requests the spotify API for data about the album
def get_spotify_album(user, album_id, img_size='m'):
    size_letter_to_ind = {
        's': 2,
        'm': 1,
        'l': 0,
    }
    img_size_ind = size_letter_to_ind[img_size]

    url = f'https://api.spotify.com/v1/albums/{album_id}'

    headers = get_header(user)
    response_obj = get(url, headers=headers)
    if response_obj.status_code:  # If OK response
        response = response_obj.json()

        ret = {
            'name': response['name'],  # Name of album
            'artist': response['artists'][0]['name'],  # Name of first artist listed
            'img': response['images'][img_size_ind]['url'],  # Medium img - 300x300
        }
        return ret
    return None


# Same func as above but accepts multiple IDs
def get_spotify_albums(user, album_ids, img_size='m'):
    if is_spotify_authenticated(user):
        size_letter_to_ind = {
            's': 2,
            'm': 1,
            'l': 0,
        }
        img_size_ind = size_letter_to_ind[img_size]

        headers = get_header(user)

        ret = []

        for album_id in album_ids:
            if album_id:
                url = f'https://api.spotify.com/v1/albums/{album_id}'
                response_obj = get(url, headers=headers)

                if response_obj.status_code == 200:  # If OK response
                    response = response_obj.json()

                    if 'name' in response and 'artists' in response and 'images' in response:
                        ret.append({
                            'name': response['name'],  # Name of album
                            'artist': response['artists'][0]['name'],  # Name of first artist listed
                            'img': response['images'][img_size_ind]['url'],  # Medium img - 300x300
                        })
                    else:
                        raise Exception(f'Keys not found in response: {response}')
                else:
                    raise Exception(f'Received status {response_obj.status_code} when requesting album. Reason '
                                    f'provided is "{response_obj.text}"')

            else:
                ret.append(None)

        return ret

    # PROB NEED TO CHANGE THIS LATER
    raise Exception('Unable to pull album data since user is not authenticated with Spotify')
