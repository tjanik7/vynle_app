from django.contrib.auth import logout
from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import CreatePostSerializer, PostSerializer, RegisterSerializer, AccountSerializer, LoginSerializer
from .models import Account, Post, AccountManager


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


class GetPosts(APIView):  # get all posts
    serializer_class = PostSerializer

    def get(self, request, format=None):
        posts = Post.objects.all()
        if len(posts) > 0:
            data = PostSerializer(posts,
                                  many=True).data  # setting many to true allows for passing a list as a parameter rather than a single object
            return Response(data, status=status.HTTP_200_OK)
        return Response(  # no posts in db
            {'No posts': 'There are no posts to show at this time.'},
            status=status.HTTP_404_NOT_FOUND
        )


class CreatePostView(APIView):
    serializer_class = CreatePostSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            body = serializer.data.get('body')
            post = Post(name=name, body=body)
            post.save()
            return Response(CreatePostSerializer(post).data, status=status.HTTP_201_CREATED)
        return Response(
            {'Bad Request': 'Invalid data'},
            status=status.HTTP_400_BAD_REQUEST
        )

# class LogoutUser(APIView):
#     def post(self, request, format=None):
#         logout(request)
#         return Response(status=status.HTTP_200_OK)


# class CreateUser(APIView):
#     serializer_class = AccountSerializer
#
#     def post(self, request, format=None):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             email = serializer.data.get('email')
#             username = serializer.data.get('username')
#             firstname = serializer.data.get('firstname')
#             lastname = serializer.data.get('lastname')
#             password = serializer.data.get('password')
#
#             Account.objects.create_user(email, username, firstname, lastname, password)
#             return Response(
#                 {'Account created': 'account created successfully'},
#                 status=status.HTTP_201_CREATED
#             )


# class GetUser(APIView):  # gets a user by username
#     serializer_class = AccountSerializer
#     lookup_url_kwarg = 'username'
#
#     def get(self, request, format=None):
#         username = request.GET.get(self.lookup_url_kwarg)
#         if username is not None:
#             user = Account.objects.filter(username=username)
#             if len(user) > 0:
#                 data = AccountSerializer(user[0]).data  # take the first occurrence since there should only be one (username is unique)
#                 return Response(data, status=status.HTTP_200_OK)
#             return Response(
#                 {'User not found': 'Invalid username'},
#                 status=status.HTTP_404_NOT_FOUND
#             )
#         return Response(
#             {'Bad Request': 'Username not found in request'},
#             status=status.HTTP_400_BAD_REQUEST
#         )


# class GetAuthStatus(APIView):  # returns true if user is authenticated
#     def get(self, request, format=None):
#         if request.user.is_authenticated:
#             return Response(
#                 {'authenticated': 'true'},
#                 status=status.HTTP_200_OK
#             )
#         return Response(
#                 {'authenticated': 'false'},
#                 status=status.HTTP_200_OK
#             )
