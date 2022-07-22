import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Atendimento } from '../models/atendimento';
import { ICrudService } from './i-crud-service';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService implements ICrudService<Atendimento> {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiUrl + '/atendimento/';

  get(termoBusca?: string): Observable<Atendimento[]> {
    let url = this.apiUrl;
    if (termoBusca) {
      url += 'busca/' + termoBusca;
    }
    return this.http.get<Atendimento[]>(url);
  }

  getById(id: number): Observable<Atendimento> {
    let url = this.apiUrl + id;
    return this.http.get<Atendimento>(url);
  }

  insert(objeto: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(this.apiUrl, objeto);
  }

  update(objeto: Atendimento): Observable<Atendimento> {
    return this.http.put<Atendimento>(this.apiUrl, objeto);
  }

  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }

  updateStatus(id: number): Observable<Atendimento> {
    let url = this.apiUrl + 'status/' + id;
    return this.http.put<Atendimento>(url, null);
  }

  getByProfissional(id: number): Observable<Atendimento[]> {
    let url = this.apiUrl + 'profissional/' + id;
    return this.http.get<Atendimento[]>(url);
  }

  getHorarios(id: number, data: string): Observable<string[]> {
    let url = this.apiUrl + 'horarios/profissional/' + id + '/data/' + data;
    return this.http.get<string[]>(url);
  }

}
