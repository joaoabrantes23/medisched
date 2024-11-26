import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent {
  medicoForm: FormGroup;
  especialidades: any[] = [];
  medicos: any[] = [];
  isEditing = false;
  medicoDetalhes: any

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.medicoForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      crm: ['', Validators.required],
      especialidade: ['', Validators.required],
      horarios_disponiveis: this.fb.array([]),
    });

    this.loadEspecialidades();
    this.carregarMedicos();
  }

  loadEspecialidades() {
    this.apiService.getEspecialidades().subscribe((data) => {
      this.especialidades = data;
    });
  }

  carregarMedicos() {
    this.apiService.getMedicos().subscribe((medicos) => {
      this.medicos = medicos;
    });
  }

  addHorario() {
    this.horarios_disponiveis.push(this.fb.control('', Validators.required));
  }

  removeHorario(index: number) {
    this.horarios_disponiveis.removeAt(index);
  }

  editMedico(id: number) {
    this.apiService.getMedicoById(id).subscribe((data) => {
      this.medicoForm.patchValue({
        id: data.id,
        nome: data.nome,
        crm: data.crm,
        especialidade: data.especialidade.id,
      });

      const horarios = data.horarios_disponiveis || [];
      const horariosFormArray = this.horarios_disponiveis;
      horariosFormArray.clear();
      horarios.forEach((horario: string) => {
        horariosFormArray.push(this.fb.control(horario, Validators.required));
      });

      this.isEditing = true;
    });
  }

  saveMedico() {
    if (this.medicoForm.valid) {
      const medicoData = this.medicoForm.value;

      if (this.isEditing) {
        this.apiService.updateMedico(medicoData).subscribe(() => {
          alert('Médico atualizado com sucesso!');
          this.medicoForm.reset();
          this.isEditing = false;
          this.carregarMedicos();
        });
      } else {
        this.apiService.createMedico(medicoData).subscribe(() => {
          alert('Médico salvo com sucesso!');
          this.medicoForm.reset();
          this.carregarMedicos();
        });
      }
    } else {
      alert('Por favor, preencha todos os campos obrigatórios!');
    }
  }

  deleteMedico(id: number) {
    if (confirm('Tem certeza que deseja excluir este médico?')) {
      this.apiService.deleteMedico(id).subscribe(() => {
        alert('Médico excluído com sucesso!');
        this.carregarMedicos();
      });
    }
  }

  get horarios_disponiveis(): FormArray {
    return this.medicoForm.get('horarios_disponiveis') as FormArray;
  }


  // Novo método para buscar os detalhes do médico
  viewMedicoDetails(id: number) {
    this.apiService.getMedicoById(id).subscribe(
      (data) => {
        this.medicoDetalhes = data;  // Atualiza o objeto com os detalhes do médico
      },
      (error) => {
        alert('Erro ao carregar detalhes do médico.');
      }
    );
  }

  fecharDetalhes() {
    this.medicoDetalhes = null;
  }
}


