import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertaService } from '../services/alerta.service';
import { ETipoAlerta } from '../models/e-tipo-alerta';
import { Alerta } from '../models/alerta';
import { LoginService } from '../services/login.service';

@Injectable()
export class ErroInterceptor implements HttpInterceptor {

  private readonly ERRO_HTTP: { [key: number]: string } = {
    401: 'Acesso não autorizado: falha na autenticação.',
    403: 'Suas credenciais não permitem acesso a este recurso.',
    404: 'Recurso não encontrado.',
    500: 'Erro interno do servidor.'
  }

  constructor(
    private servicoAlerta: AlertaService,
    private servicoLogin: LoginService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(erro => this.processaErro(erro)));
  }

  processaErro(erro: HttpErrorResponse): Observable<any> {

    let mensagemErro = this.ERRO_HTTP[erro.status] || erro.error?.message || erro.statusText;

    if (erro.status === 401) {
      if (this.servicoLogin.isAutenticado()) {
        this.servicoLogin.logout();
      }
    }

    let alerta: Alerta = {
      tipo: ETipoAlerta.ERRO,
      mensagem: mensagemErro
    }
    this.servicoAlerta.enviarAlerta(alerta);

    return throwError(() => erro);

  }

}
