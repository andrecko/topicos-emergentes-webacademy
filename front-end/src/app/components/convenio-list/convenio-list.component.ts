import { Component, OnInit } from '@angular/core';
import { Convenio } from 'src/app/models/convenio';
import { AlertaService } from 'src/app/services/alerta.service';
import { ConvenioService } from 'src/app/services/convenio.service';
import { IComponentList } from '../i-component-list';

@Component({
  selector: 'app-convenio-list',
  templateUrl: './convenio-list.component.html',
  styles: [
  ]
})
export class ConvenioListComponent implements OnInit, IComponentList<Convenio> {

  constructor(
    private servico: ConvenioService,
    private servicoAlerta: AlertaService
  ) { }

  registros: Convenio[] = Array<Convenio>();

  ngOnInit(): void {
    this.get();
  }

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Convenio[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    if (confirm('Deseja realmente excluir o convênio?')) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
          this.servicoAlerta.enviarAlertaSucesso();
        }
      });
    }
  }

}
