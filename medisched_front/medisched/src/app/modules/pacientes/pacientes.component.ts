import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit {
  pacientes: any[] = [];
  pacienteSelecionado: any = null;

  pacienteForm = new FormGroup({
    id: new FormControl(null), // Para identificar o paciente ao editar
    nome: new FormControl(''),
    cpf: new FormControl(''),
    data_nascimento: new FormControl(''),
    contato: new FormControl(''),
    endereco: new FormControl(''),
    historico_medico: new FormControl('')
  });

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.listarPacientes();
  }

  listarPacientes(): void {
    this.apiService.getPacientes().subscribe((data) => {
      this.pacientes = data;
    });
  }

  criarPaciente(): void {
    const pacienteData = this.pacienteForm.value;

    if (pacienteData.nome && pacienteData.cpf) {
      if (pacienteData.id) {
        // Atualiza o paciente existente
        this.apiService.updatePaciente(pacienteData.id, pacienteData).subscribe(() => {
          this.resetForm();
          this.listarPacientes();
        });
      } else {
        // Cria um novo paciente
        this.apiService.createPaciente(pacienteData).subscribe(() => {
          this.resetForm();
          this.listarPacientes();
        });
      }
    }
  }

  editarPaciente(paciente: any): void {
    this.pacienteForm.setValue({
      id: paciente.id,
      nome: paciente.nome,
      cpf: paciente.cpf,
      data_nascimento: paciente.data_nascimento,
      contato: paciente.contato,
      endereco: paciente.endereco,
      historico_medico: paciente.historico_medico
    });
  }

  deletarPaciente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este paciente?')) {
      this.apiService.deletePaciente(id).subscribe(() => {
        this.listarPacientes();
      });
    }
  }

  resetForm(): void {
    this.pacienteForm.reset();
  }

  mostrarDetalhes(paciente: any): void {
    this.pacienteSelecionado = paciente;
  }

  fecharDetalhes(): void {
    this.pacienteSelecionado = null;
  }

}
