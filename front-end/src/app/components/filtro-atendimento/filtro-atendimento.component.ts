import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Profissional } from 'src/app/models/profissional';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-filtro-atendimento',
  templateUrl: './filtro-atendimento.component.html',
  styles: [
  ]
})
export class FiltroAtendimentoComponent implements OnInit {

  constructor(
    private servicoProfissional: ProfissionalService
  ) { }

  @Output() eventoFiltro = new EventEmitter();
  profissional: Profissional = <Profissional>{};
  profissionais: Profissional[] = Array<Profissional>();
  compareById = Utils.compareById;

  filtro(): void {
    sessionStorage.setItem('filtroProfissional', JSON.stringify(this.profissional));
    this.eventoFiltro.emit();
  }

  ngOnInit(): void {
    this.profissional = JSON.parse(sessionStorage.getItem('filtroProfissional') || '{}');
    this.servicoProfissional.get().subscribe({
      next: (resposta: Profissional[]) => {
        this.profissionais = resposta.sort((a, b) => a.nome.localeCompare(b.nome));
      }
    });
  }

}
