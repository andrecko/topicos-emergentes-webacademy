import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate {

  constructor(private servico: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot,): boolean {
    const autenticado = this.servico.verificaLogin();
    if (autenticado) {
      const papelUsuario = this.servico.getPapel();
      const papelExigido = route.data['papel'];
      if (papelExigido && papelUsuario != papelExigido) {
        return false;
      }
      return true;
    }
    return false;
  }
  
}
