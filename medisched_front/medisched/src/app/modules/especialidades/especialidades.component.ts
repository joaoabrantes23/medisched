import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css'],
})
export class EspecialidadesComponent implements OnInit {
  especialidades: any[] = [];
  novaEspecialidade = new FormControl('');
  especialidadeSelecionada: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.listarEspecialidades();
  }

  listarEspecialidades(): void {
    this.apiService.getEspecialidades().subscribe((data) => {
      this.especialidades = data;
    });
  }

  salvarEspecialidade(): void {
    const nome = this.novaEspecialidade.value;

    if (!nome) return;

    if (this.especialidadeSelecionada) {
      // Atualizar especialidade
      this.apiService
        .updateEspecialidade(this.especialidadeSelecionada.id, { nome })
        .subscribe(() => {
          this.cancelarEdicao();
          this.listarEspecialidades();
        });
    } else {
      // Criar nova especialidade
      this.apiService.createEspecialidade({ nome }).subscribe(() => {
        this.novaEspecialidade.reset();
        this.listarEspecialidades();
      });
    }
  }

  editarEspecialidade(especialidade: any): void {
    this.especialidadeSelecionada = especialidade;
    this.novaEspecialidade.setValue(especialidade.nome);
  }

  deletarEspecialidade(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta especialidade?')) {
      this.apiService.deleteEspecialidade(id).subscribe(() => {
        this.listarEspecialidades();
      });
    }
  }

  cancelarEdicao(): void {
    this.especialidadeSelecionada = null;
    this.novaEspecialidade.reset();
  }
}
