import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Alerta } from 'src/app/models/alerta';
import { ETipoAlerta } from 'src/app/models/e-tipo-alerta';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: [
  ]
})
export class AlertaComponent implements OnInit {

  constructor(
    private servico: AlertaService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.servico.receberAlerta().subscribe(alerta => {
      this.exibeAlerta(alerta);
    });

    this.router.events.subscribe((evento) => {
      if (evento instanceof NavigationStart) {
        this.fechaAlerta();
      }
    })

  }

  exibeAlerta(alerta: Alerta) {
    const elementoAlerta = document.querySelector<HTMLElement>('div.alerta');
    const elementoAlertaMensagem = document.querySelector<HTMLElement>('div.alerta span#mensagem');
    if (elementoAlerta && elementoAlertaMensagem) {
      elementoAlertaMensagem.innerText = alerta.mensagem;
      elementoAlerta.classList.add(alerta.tipo);
    }
  }

  fechaAlerta(): void {
    const elementoAlerta = document.querySelector<HTMLElement>('div.alerta');
    if (elementoAlerta) {
      elementoAlerta.classList.remove(ETipoAlerta.ERRO, ETipoAlerta.SUCESSO);
    }
  }

}
