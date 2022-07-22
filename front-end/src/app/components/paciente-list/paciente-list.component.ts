import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { AlertaService } from 'src/app/services/alerta.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { IComponentList } from '../i-component-list';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styles: [
  ]
})
export class PacienteListComponent implements OnInit, IComponentList<Paciente> {

  constructor(
    private servico: PacienteService,
    private servicoAlerta: AlertaService
  ) { }

  registros: Paciente[] = Array<Paciente>();

  ngOnInit(): void {
    this.get();
  }

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Paciente[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    if (confirm('Deseja realmente excluir o paciente?')) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
          this.servicoAlerta.enviarAlertaSucesso();
        }
      });
    }
  }

}
