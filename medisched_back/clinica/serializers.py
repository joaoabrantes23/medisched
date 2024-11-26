from rest_framework import serializers
from .models import Especialidade, Medico, Paciente, Sala, Consulta

class EspecialidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidade
        fields = '__all__'


class MedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medico
        fields = '__all__'

class MedicoDetalhesSerializer(serializers.ModelSerializer):
    especialidade = EspecialidadeSerializer()  # Inclui os detalhes da especialidade (nome)
    
    class Meta:
        model = Medico
        fields = ['id', 'nome', 'crm', 'especialidade', 'horarios_disponiveis']  # Inclui a especialidade



class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'


class SalaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sala
        fields = '__all__'


class ConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = '__all__'


class ConsultaDetalhesSerializer(serializers.ModelSerializer):
    paciente = serializers.StringRelatedField()  # Exibe o nome do paciente
    medico = serializers.StringRelatedField()  # Exibe o nome do médico

    class Meta:
        model = Consulta
        fields = ['id', 'paciente', 'medico', 'data_hora']  # Inclui o ID, paciente, médico e data_hora
