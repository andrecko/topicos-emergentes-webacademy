import { Component } from '@angular/core';
import { Usuario } from './models/usuario';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private servico: LoginService) {}

  title = 'SGCM';

  logout(): void {
    this.servico.logout();
  }

  getUsuarioAutenticado(): Usuario {
    return this.servico.getUsuario();
  }

  isAutenticado(): boolean {
    return this.servico.isAutenticado();
  }
}
