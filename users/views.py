from django.contrib.auth import logout
from rest_framework import status, permissions, generics, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import RegisterSerializer, AccountSerializer, LoginSerializer
from .models import Account, AccountManager


# API for user to create an account
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        account = serializer.save()
        return Response({
            'account': AccountSerializer(account, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(account)[1]  # associates new token with specified account
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        account = serializer.validated_data
        return Response({
            'account': AccountSerializer(account, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(account)[1]  # associates new token with specified account
        })


# API to retrieve a user via their auth token
class AccountAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = AccountSerializer

    def get_object(self):
        return self.request.user


# class GetPosts(APIView):  # get all posts
#     permission_classes = [
#         permissions.AllowAny,  # for current dev purposes
#     ]
#     serializer_class = PostSerializer
#
#     def get(self, request, format=None):
#         posts = Post.objects.all()
#         if len(posts) > 0:
#             data = PostSerializer(posts,
#                                   many=True).data  # setting many to true allows for passing a list as a parameter rather than a single object
#             return Response(data, status=status.HTTP_200_OK)
#         return Response(  # no posts in db
#             {'No posts': 'There are no posts to show at this time.'},
#             status=status.HTTP_404_NOT_FOUND
#         )
#
#
# class CreatePostView(APIView):
#     serializer_class = CreatePostSerializer
#
#     def post(self, request, format=None):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             name = serializer.data.get('name')
#             body = serializer.data.get('body')
#             post = Post(name=name, body=body)
#             post.save()
#             return Response(CreatePostSerializer(post).data, status=status.HTTP_201_CREATED)
#         return Response(
#             {'Bad Request': 'Invalid data'},
#             status=status.HTTP_400_BAD_REQUEST
#         )
