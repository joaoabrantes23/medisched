import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
})
export class ConsultasComponent implements OnInit {
  consultas: any[] = [];
  consultaDetalhe: any = null;  // Variável para armazenar o detalhe de uma consulta
  pacientes: any[] = [];
  medicos: any[] = [];
  pacienteControl = new FormControl('');
  medicoControl = new FormControl('');
  dataHorarioControl = new FormControl('');
  editarConsultaControl = new FormControl('');  // Para editar consulta

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.listarConsultas();
    this.carregarPacientes();
    this.carregarMedicos();
  }

  listarConsultas(): void {
    this.apiService.getConsultas().subscribe((data) => {
      this.consultas = data;
    });
  }

  carregarPacientes(): void {
    this.apiService.getPacientes().subscribe((data) => {
      this.pacientes = data;
    });
  }

  carregarMedicos(): void {
    this.apiService.getMedicos().subscribe((data) => {
      this.medicos = data;
    });
  }

  criarConsulta(): void {
    const paciente = this.pacienteControl.value;
    const medico = this.medicoControl.value;
    const data_horario = this.dataHorarioControl.value;

    if (paciente && medico && data_horario) {
      const consultaData = {
        paciente: paciente,
        medico: medico,
        data_hora: data_horario,
      };

      this.apiService.createConsulta(consultaData).subscribe(
        (response) => {
          this.pacienteControl.reset();
          this.medicoControl.reset();
          this.dataHorarioControl.reset();
          this.listarConsultas();
        },
        (error) => {
          console.error('Erro ao criar consulta:', error);
          alert('Erro ao criar consulta');
        }
      );
    } else {
      alert('Preencha todos os campos antes de criar uma consulta!');
    }
  }

  // Função para buscar uma consulta específica por ID
  exibirDetalhes(id: number): void {
    this.apiService.getConsultaById(id).subscribe((data) => {
      this.consultaDetalhe = data;
    });
  }

  // Função para editar uma consulta
  editarConsulta(id: number): void {
    const consultaData = {
      paciente: this.pacienteControl.value,
      medico: this.medicoControl.value,
      data_hora: this.dataHorarioControl.value,
    };

    this.apiService.updateConsulta(id, consultaData).subscribe(
      (response) => {
        this.listarConsultas();
        alert('Consulta atualizada com sucesso!');
      },
      (error) => {
        console.error('Erro ao editar consulta:', error);
        alert('Erro ao editar consulta');
      }
    );
  }

  // Função para excluir uma consulta
  excluirConsulta(id: number): void {
    if (confirm('Tem certeza que deseja excluir essa consulta?')) {
      this.apiService.deleteConsulta(id).subscribe(
        (response) => {
          this.listarConsultas();
          alert('Consulta excluída com sucesso!');
        },
        (error) => {
          console.error('Erro ao excluir consulta:', error);
          alert('Erro ao excluir consulta');
        }
      );
    }
  }
}
