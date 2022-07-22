import { Component, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/models/atendimento';
import { AlertaService } from 'src/app/services/alerta.service';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { IComponentList } from '../i-component-list';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styles: [
  ]
})
export class AgendaListComponent implements OnInit, IComponentList<Atendimento> {

  constructor(
    private servico: AtendimentoService,
    private servicoAlerta: AlertaService
  ) { }

  registros: Atendimento[] = Array<Atendimento>();
  status: string[] = ['AGENDADO', 'CONFIRMADO'];

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Atendimento[]) => {
        this.registros = resposta.filter(item => {
          let dataItem = new Date(item.data);
          dataItem = new Date(dataItem.getTime() + dataItem.getTimezoneOffset() * 60 * 1000);
          let dataAtual = new Date(new Date().setHours(0,0,0,0));
          return this.status.includes(item.status) && dataItem >= dataAtual;
        });
      }
    });
  }

  getByProfissional(id: number): void {
    this.servico.getByProfissional(id).subscribe({
      next: (resposta: Atendimento[]) => {
        this.registros = resposta.filter(item => {
          let dataItem = new Date(item.data);
          dataItem = new Date(dataItem.getTime() + dataItem.getTimezoneOffset() * 60 * 1000);
          let dataAtual = new Date(new Date().setHours(0,0,0,0));
          return this.status.includes(item.status) && dataItem >= dataAtual;
        });
      }
    });
  }

  filtro(): void {
    let profissional = JSON.parse(sessionStorage.getItem('filtroProfissional') || '{}');
    if (profissional && Object.keys(profissional).length > 0) {
      this.getByProfissional(profissional.id);
    } else {
      this.get();
    }
  }

  delete(id: number): void {
    if (confirm('Deseja realmente cancelar o agendamento?')) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.filtro();
          this.servicoAlerta.enviarAlertaSucesso();
        }
      })
    }
  }

  updateStatus(id: number): void {
    if (confirm('Confirma alteração no status do agendamento?')) {
      this.servico.updateStatus(id).subscribe({
        complete: () => {
          this.filtro();
          this.servicoAlerta.enviarAlertaSucesso();
        }
      })
    }
  }

  ngOnInit(): void {
    this.filtro();
  }

}
