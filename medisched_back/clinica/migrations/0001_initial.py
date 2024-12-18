# Generated by Django 5.1.3 on 2024-11-25 18:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Especialidade',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Paciente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('cpf', models.CharField(max_length=14, unique=True)),
                ('data_nascimento', models.DateField()),
                ('contato', models.CharField(max_length=15)),
                ('endereco', models.TextField(blank=True, null=True)),
                ('historico_medico', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Sala',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('capacidade', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Medico',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('crm', models.CharField(max_length=20, unique=True)),
                ('horarios_disponiveis', models.JSONField()),
                ('especialidade', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medicos', to='clinica.especialidade')),
            ],
        ),
        migrations.CreateModel(
            name='Consulta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_hora', models.DateTimeField()),
                ('status', models.CharField(choices=[('Agendada', 'Agendada'), ('Realizada', 'Realizada'), ('Cancelada', 'Cancelada')], default='Agendada', max_length=20)),
                ('motivo_cancelamento', models.TextField(blank=True, null=True)),
                ('medico', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='consultas', to='clinica.medico')),
                ('paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='consultas', to='clinica.paciente')),
                ('sala', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='consultas', to='clinica.sala')),
            ],
        ),
    ]
