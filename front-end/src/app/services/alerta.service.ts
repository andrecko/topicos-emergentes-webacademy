import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alerta } from '../models/alerta';
import { ETipoAlerta } from '../models/e-tipo-alerta';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() {
    this.controleAlerta = new Subject<Alerta>();
  }

  private controleAlerta: Subject<Alerta>;

  enviarAlerta(alerta: Alerta): void {
    this.controleAlerta.next(alerta);
  }

  enviarAlertaSucesso(): void {
    this.controleAlerta.next({
      tipo: ETipoAlerta.SUCESSO,
      mensagem: 'Operação realizada com sucesso!'
    })
  }

  receberAlerta(): Observable<Alerta> {
    return this.controleAlerta.asObservable();
  }
}
