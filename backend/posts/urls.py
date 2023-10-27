# URLs for posts

from django.urls import path
from rest_framework import routers

from .views import PostViewSet, CommentView

router = routers.DefaultRouter()
router.register(viewset=PostViewSet, basename='posts', prefix='')

urlpatterns = router.urls

urlpatterns += [
    path('comment', CommentView.as_view())
]
