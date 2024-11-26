# accounts/views.py
from rest_framework import generics
from .models import CustomUser
from .serializers import UserSerializer, CustomTokenObtainPairSerializer, UserViewSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response

class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserView(APIView):

    def get(self, request):
        user = CustomUser.objects.all()
        serializer = UserViewSerializer(user)
        return Response(serializer.data)