from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic import TemplateView

urlpatterns = [
    # path('', include('frontend.urls')),  # frontend urls to be dispatched with react router
    path('api/', include('posts.urls')),
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('spotify/', include('spotify.urls')),
    # Tells server to look in /static/img/favicon.ico for icon
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('img/favicon.ico'))),
    path('', TemplateView.as_view(template_name='index.html')),
    path("__debug__/", include("debug_toolbar.urls")),
]
