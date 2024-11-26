import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000'; // URL do backend Django

  constructor(private http: HttpClient) {}

  // Recuperar o token do localStorage
  private getAuthHeaders() {
    const currentUser = localStorage.getItem('currentUser');
    const token = currentUser ? JSON.parse(currentUser).access : null;
    return token ? { Authorization: `Bearer ${token}` } : { Authorization: '' };
  }

  // Especialidades
  getEspecialidades(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/especialidades/`, { headers });
  }

  createEspecialidade(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/especialidades/`, data, { headers });
  }

  updateEspecialidade(id: number, data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/especialidades/${id}/`, data, { headers });
  }

  deleteEspecialidade(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/especialidades/${id}/`, { headers });
  }

  // Médicos
  getMedicos(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/medicos/`, { headers });
  }

  getMedicoById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/medico/${id}/`, { headers });
  }

  createMedico(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/medicos/`, data, { headers });
  }

  updateMedico(medico: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/medicos/${medico.id}/`, medico, { headers });
  }

  deleteMedico(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/medicos/${id}/`, { headers });
  }

  // Pacientes
  getPacientes(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/pacientes/`, { headers });
  }

  createPaciente(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/pacientes/`, data, { headers });
  }

  updatePaciente(id: number, data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/pacientes/${id}/`, data, { headers });
  }

  deletePaciente(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/pacientes/${id}/`, { headers });
  }

  // Consultas
  getConsultas(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/consulta-detalhes/`, { headers });
  }

  // Recuperar uma consulta específica por ID
  getConsultaById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/consulta-detalhes/${id}/`, { headers });
  }

  createConsulta(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/consultas/`, data, { headers });
  }

  updateConsulta(id: number, data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/consultas/${id}/`, data, { headers });
  }

  deleteConsulta(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/consultas/${id}/`, { headers });
  }
}
