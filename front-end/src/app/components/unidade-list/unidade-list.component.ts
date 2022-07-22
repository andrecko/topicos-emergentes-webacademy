import { Component, OnInit } from '@angular/core';
import { Unidade } from 'src/app/models/unidade';
import { AlertaService } from 'src/app/services/alerta.service';
import { UnidadeService } from 'src/app/services/unidade.service';
import { IComponentList } from '../i-component-list';

@Component({
  selector: 'app-unidade-list',
  templateUrl: './unidade-list.component.html',
  styles: [
  ]
})
export class UnidadeListComponent implements OnInit, IComponentList<Unidade> {

  constructor(
    private servico: UnidadeService,
    private servicoAlerta: AlertaService
  ) { }

  registros: Unidade[] = Array<Unidade>();

  ngOnInit(): void {
    this.get();
  }

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Unidade[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    if (confirm('Deseja realmente excluir a unidade?')) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
          this.servicoAlerta.enviarAlertaSucesso();
        }
      });
    }
  }

}
