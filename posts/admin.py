from django.contrib import admin
from .models import Post


class PostAdmin(admin.ModelAdmin):
    list_display = ('user', 'body', 'song')


admin.site.register(Post, PostAdmin)
