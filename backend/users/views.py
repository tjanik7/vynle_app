from knox.models import AuthToken
from rest_framework import permissions, generics
from rest_framework.response import Response

from .serializers import RegisterSerializer, AccountSerializer, LoginSerializer, ProfileSerializer


# Splits dict of user registration data into Account data and Profile data
def split_user_data(data):
    account_data = {
        'email': data['email'],
        'username': data['username'],
        'password': data['password'],
    }
    profile_data = {
        'first': data['first'],
        'last': data['last'],
        # 'birthday': data['birthday'],  # Not implemented yet - needs to be added to frontend form
    }
    return account_data, profile_data


# Creates user Account & Profile
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        try:
            account_data, profile_data = split_user_data(request.data)

            serializer = self.get_serializer(data=account_data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid:
                account = serializer.save()
            else:
                raise Exception(serializer.errors)

            # profile_ser = ProfileSerializer(account=account, **profile_data)
            profile_data['account'] = account.id
            profile_ser = ProfileSerializer(data=profile_data)
            if profile_ser.is_valid(raise_exception=True):
                profile_ser.save()
            else:
                raise Exception(profile_ser.errors)
        except Exception as e:
            print(e)

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


# Retrieve a user via their auth token
class AccountAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = AccountSerializer

    def get_object(self):
        return self.request.user
