from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import AccountSerializer
from .models import Account


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
