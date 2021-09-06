from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),  # frontend urls to be dispatched with react router
    path('api/', include('posts.urls')),
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
]
