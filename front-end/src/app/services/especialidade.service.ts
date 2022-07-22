import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Especialidade } from '../models/especialidade';
import { ICrudService } from './i-crud-service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService implements ICrudService<Especialidade> {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiUrl + '/config/especialidade/';

  get(termoBusca?: string): Observable<Especialidade[]> {
    if (termoBusca) {
      return this.http.get<Especialidade[]>(this.apiUrl+'busca/'+termoBusca);
    } else {
      return this.http.get<Especialidade[]>(this.apiUrl);
    }
  }

  getById(id: number): Observable<Especialidade> {
    return this.http.get<Especialidade>(this.apiUrl+id);
  }

  insert(objeto: Especialidade): Observable<Especialidade> {
    return this.http.post<Especialidade>(this.apiUrl, objeto);
  }

  update(objeto: Especialidade): Observable<Especialidade> {
    return this.http.put<Especialidade>(this.apiUrl, objeto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+id);
  }

}
