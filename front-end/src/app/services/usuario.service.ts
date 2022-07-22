import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { ICrudService } from './i-crud-service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements ICrudService<Usuario> {

  apiUrl: string = environment.apiUrl + '/config/usuario/';

  constructor(private http: HttpClient) {}
  
  get(termoBusca?: string): Observable<Usuario[]> {
    if (termoBusca) {
      return this.http.get<Usuario[]>(this.apiUrl+'busca/'+termoBusca);
    } else {
      return this.http.get<Usuario[]>(this.apiUrl);
    }
  }

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl+id);
  }

  insert(objeto: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, objeto);
  }

  update(objeto: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.apiUrl, objeto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+id);
  }

}
