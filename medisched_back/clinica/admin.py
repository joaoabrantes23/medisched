from django.contrib import admin
from .models import Especialidade, Medico, Paciente, Sala, Consulta

admin.site.register(Especialidade)
admin.site.register(Medico)
admin.site.register(Paciente)
admin.site.register(Sala)
admin.site.register(Consulta)
