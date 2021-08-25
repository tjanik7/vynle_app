from django.conf.urls import url
from .views import index

urlpatterns = [
    # path('', index),  # renders index template whenever the empty route is visited
    # path('create', index),
    # path('logins', index),
    url(r'^.*$', index),
]
