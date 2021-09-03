from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Account, Post


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'username',)


# For account creation
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'password', 'first', 'last')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user_account = Account.objects.create_user(
            validated_data['email'],
            validated_data['username'],
            validated_data['first'],
            validated_data['last'],
            validated_data['password'],
        )
        return user_account


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        account = authenticate(**data)
        if account and account.is_active:
            return account
        raise serializers.ValidationError('Incorrect credentials')


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'name', 'body')


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'name', 'body')


# class AccountSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Account
#         fields = '__all__'


# class AccountSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(
#         required=True,
#         validators=[UniqueValidator(queryset=Account.objects.all())]
#     )
#     username = serializers.CharField(
#         validators=[UniqueValidator(queryset=Account.objects.all())]
#     )
#     password = serializers.CharField(min_length=8)
#
#     def create(self, validated_data):
#         account = AccountManager.create_user(self, )
