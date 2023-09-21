from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Account, Profile


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'username')


# For account creation
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user_account = Account.objects.create_user(
            validated_data['email'],
            validated_data['username'],
            validated_data['password'],
        )
        return user_account


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    def create(self, validated_data):
        profile = Profile.objects.create(
            account=validated_data['account'],
            # birthday=  # Implement this later
            first=validated_data['first'],
            last=validated_data['last']
        )
        return profile


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        account = authenticate(**data)
        if account and account.is_active:
            return account
        raise serializers.ValidationError('Incorrect credentials')
