"""
URL configuration for Medisched project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from Usuario.views import UserView
from clinica.views import MedicoApiView, ConsultasApiView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('clinica.urls')),
    path('usuario/', include('Usuario.urls')),
    path('medico/<int:id>/', MedicoApiView.as_view(), name='medico-detail'),

    path('consulta-detalhes/', ConsultasApiView.as_view(), name='consultas-list'),
    
    path('consulta-detalhes/<int:id>/', ConsultasApiView.as_view(), name='consulta-detail'),
    
    path('users/', UserView.as_view(), name='users'),

    # Endpoint para renovar o token JWT
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
