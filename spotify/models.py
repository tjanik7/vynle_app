# Spotify
from django.db import models
from django.db.models.signals import post_save

from users.models import Profile


class FavAlbums(models.Model):
    class Meta:
        verbose_name_plural = 'Fav albums'

    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, null=True)
    # Holds ID of each of user's 6 favorite albums they can select via their profile
    a0 = models.CharField(max_length=22)
    a1 = models.CharField(max_length=22)
    a2 = models.CharField(max_length=22)
    a3 = models.CharField(max_length=22)
    a4 = models.CharField(max_length=22)
    a5 = models.CharField(max_length=22)

    def __str__(self):
        return str(self.profile)


# POSSIBLY LOOK INTO DJANGO-ANNOYING AutoOneToOneFIELD
# TODO: MOVE THIS TO A DIFFERENT FILE https://www.youtube.com/watch?v=Kc1Q_ayAeQk&t=605s - TUTORIAL USED
def create_or_update_favalbum(sender, instance, created, **kwargs):
    if created:
        FavAlbums.objects.create(profile=instance)
    else:
        instance.favalbums.save()


post_save.connect(create_or_update_favalbum, sender=Profile)


class SpotifyToken(models.Model):
    user = models.ForeignKey('users.Account', related_name='spotify_token', on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=200)
    expires_at = models.DateTimeField()
    token_type = models.CharField(max_length=50)
