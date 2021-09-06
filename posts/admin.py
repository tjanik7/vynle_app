from django.contrib import admin
from .models import Post


class PostAdmin(admin.ModelAdmin):
    list_display = ('name', 'body')


admin.site.register(Post, PostAdmin)
