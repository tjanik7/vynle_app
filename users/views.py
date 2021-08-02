from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import AccountSerializer, PostSerializer
from .models import Account, Post


class GetUser(APIView):  # gets a user by username
    serializer_class = AccountSerializer
    lookup_url_kwarg = 'username'

    def get(self, request, format=None):
        username = request.GET.get(self.lookup_url_kwarg)
        if username is not None:
            user = Account.objects.filter(username=username)
            if len(user) > 0:
                data = AccountSerializer(user[0]).data  # take the first occurrence since there should only be one (username is unique)
                return Response(data, status=status.HTTP_200_OK)
            return Response(
                {'User not found': 'Invalid username'},
                status=status.HTTP_404_NOT_FOUND
            )
        return Response(
            {'Bad Request': 'Username not found in request'},
            status=status.HTTP_400_BAD_REQUEST
        )


class CreatePostView(APIView):
    serializer_class = PostSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            body = serializer.data.get('body')
            post = Post(name=name, body=body)
            post.save()
            return Response(PostSerializer(post).data, status=status.HTTP_201_CREATED)
        return Response(
            {'Bad Request': 'Invalid data'},
            status=status.HTTP_400_BAD_REQUEST
        )
