import { Component, OnInit } from '@angular/core';
import { Profissional } from 'src/app/models/profissional';
import { AlertaService } from 'src/app/services/alerta.service';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { IComponentList } from '../i-component-list';

@Component({
  selector: 'app-profissional-list',
  templateUrl: './profissional-list.component.html',
  styles: [
  ]
})
export class ProfissionalListComponent implements OnInit, IComponentList<Profissional> {

  constructor(
    private servico: ProfissionalService,
    private servicoAlerta: AlertaService
  ) { }

  registros: Profissional[] = Array<Profissional>();

  ngOnInit(): void {
    this.get();
  }

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Profissional[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    if (confirm('Deseja realmente excluir o profissional?')) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
          this.servicoAlerta.enviarAlertaSucesso();
        }
      });
    }
  }

}
