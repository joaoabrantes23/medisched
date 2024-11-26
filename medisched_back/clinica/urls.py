from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EspecialidadeViewSet,
    MedicoViewSet,
    PacienteViewSet,
    SalaViewSet,
    ConsultaViewSet,
)

router = DefaultRouter()
router.register(r'especialidades', EspecialidadeViewSet, basename='especialidade')
router.register(r'medicos', MedicoViewSet, basename='medico')
router.register(r'pacientes', PacienteViewSet, basename='paciente')
router.register(r'salas', SalaViewSet, basename='sala')
router.register(r'consultas', ConsultaViewSet, basename='consulta')

urlpatterns = [
    path('', include(router.urls)),
]
