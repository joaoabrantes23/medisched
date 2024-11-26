# accounts/serializers.py
from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'cargo', 'password']

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['username'],
            cargo=validated_data.get('cargo')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserViewSerializer(serializers.ModelSerializer):
     class Meta:
        model = CustomUser
        fields = ['username', 'email', 'cargo']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
            email = attrs.get("email")
            password = attrs.get("password")

            try:
                # Verifica se o usuário existe pelo email
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                raise AuthenticationFailed("Usuário não encontrado.")

            # Verifica a senha
            if not user.check_password(password):
                raise AuthenticationFailed("Credenciais inválidas.")

            # Pega os tokens padrão (access, refresh)
            data = super().validate(attrs)

            data['username'] = user.username
            data['cargo'] = user.cargo

            return data