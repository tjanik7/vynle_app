from django.core.exceptions import ObjectDoesNotExist
from knox.models import AuthToken
from rest_framework import permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Account
from .serializers import RegisterSerializer, AccountSerializer, LoginSerializer


class GetOtherProfile(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        username = request.query_params['username']

        try:
            otherUserAccount = Account.objects.get(username=username)
        except ObjectDoesNotExist:
            return Response(
                f'No user with username {username}',
                status=status.HTTP_404_NOT_FOUND
            )

        otherUserAccountSer = AccountSerializer(otherUserAccount).data
        return Response(
            otherUserAccountSer,
            status=status.HTTP_200_OK
        )


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
