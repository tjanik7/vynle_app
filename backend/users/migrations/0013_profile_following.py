# Generated by Django 3.2.21 on 2023-10-31 23:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_remove_profile_followers'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='following',
            field=models.ManyToManyField(related_name='followers', to='users.Profile'),
        ),
    ]
