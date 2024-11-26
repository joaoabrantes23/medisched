from django.db import models
from django.utils.timezone import now

class Especialidade(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Medico(models.Model):
    nome = models.CharField(max_length=100)
    crm = models.CharField(max_length=20, unique=True)
    especialidade = models.ForeignKey(Especialidade, on_delete=models.CASCADE, related_name='medicos')
    horarios_disponiveis = models.JSONField()  # Lista de horários disponíveis por dia

    def __str__(self):
        return f"{self.nome} - {self.especialidade}"


class Paciente(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14, unique=True)
    data_nascimento = models.DateField()
    contato = models.CharField(max_length=15)
    endereco = models.TextField(blank=True, null=True)
    historico_medico = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nome


class Sala(models.Model):
    nome = models.CharField(max_length=50)
    capacidade = models.IntegerField()

    def __str__(self):
        return self.nome


class Consulta(models.Model):
    STATUS_CHOICES = [
        ('Agendada', 'Agendada'),
        ('Realizada', 'Realizada'),
        ('Cancelada', 'Cancelada'),
    ]
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='consultas')
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE, related_name='consultas')
    sala = models.ForeignKey(Sala, on_delete=models.SET_NULL, null=True, related_name='consultas')
    data_hora = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Agendada')
    motivo_cancelamento = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Consulta: {self.paciente} com {self.medico} em {self.data_hora}"
