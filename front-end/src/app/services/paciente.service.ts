import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../models/paciente';
import { ICrudService } from './i-crud-service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService implements ICrudService<Paciente> {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiUrl + '/paciente/';

  get(termoBusca?: string): Observable<Paciente[]> {
    let url = this.apiUrl;
    if (termoBusca) {
      url += 'busca/' + termoBusca;
    }
    return this.http.get<Paciente[]>(url);
  }

  getById(id: number): Observable<Paciente> {
    let url = this.apiUrl + id;
    return this.http.get<Paciente>(url);
  }

  insert(objeto: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, objeto);
  }

  update(objeto: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(this.apiUrl, objeto);
  }

  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }

}
