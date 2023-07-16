from rest_framework import routers
from .views import PostViewSet, GetPosts
from django.urls import path

router = routers.DefaultRouter()
router.register('posts', PostViewSet, 'posts')

urlpatterns = router.urls

urlpatterns += [
    # May want to rename this later, but need to make sure it won't conflict with above default endpoints
    path('get-posts', GetPosts.as_view()),
]
