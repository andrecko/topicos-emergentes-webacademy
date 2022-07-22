import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from 'src/app/models/atendimento';
import { Convenio } from 'src/app/models/convenio';
import { Paciente } from 'src/app/models/paciente';
import { Profissional } from 'src/app/models/profissional';
import { AlertaService } from 'src/app/services/alerta.service';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { ConvenioService } from 'src/app/services/convenio.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { Utils } from 'src/app/utils/utils';
import { IComponentForm } from '../i-component-form';

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styles: [
  ]
})
export class AgendaFormComponent implements OnInit, IComponentForm<Atendimento> {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicoAlerta: AlertaService,
    private servico: AtendimentoService,
    private servicoProfissional: ProfissionalService,
    private servicoConvenio: ConvenioService,
    private servicoPaciente: PacienteService) { }

  registro: Atendimento = <Atendimento>{};
  profissionais: Profissional[] = Array<Profissional>();
  convenios: Convenio[] = Array<Convenio>();
  pacientes: Paciente[] = Array<Paciente>();
  horarios: string[] = Array<string>();
  compareById = Utils.compareById;

  submit(form: NgForm): void {

    let data = new Date(this.registro.data);
    data = new Date(data.getTime() + data.getTimezoneOffset() * 60 * 1000);
    let registroModificado = Object.assign({}, this.registro);
    registroModificado.data = data.toISOString();

    if (this.registro.id) {
      this.servico.update(registroModificado).subscribe({
        complete: () => {
          this.router.navigate(['/agenda']);
          this.servicoAlerta.enviarAlertaSucesso();
        }
      })
    } else {
      this.servico.insert(registroModificado).subscribe({
        complete: () => {
          form.resetForm();
          this.servicoAlerta.enviarAlertaSucesso();
        }
      })
    }
  }

  ngOnInit(): void {

    this.servicoProfissional.get().subscribe({
      next: (resposta: Profissional[]) => {
        this.profissionais = resposta.sort((a, b) => a.nome.localeCompare(b.nome));
      }
    })

    this.servicoConvenio.get().subscribe({
      next: (resposta: Convenio[]) => {
        this.convenios = resposta.sort((a, b) => a.nome.localeCompare(b.nome));
      }
    })

    this.servicoPaciente.get().subscribe({
      next: (resposta: Paciente[]) => {
        this.pacientes = resposta.sort((a, b) => a.nome.localeCompare(b.nome));
      }
    })

    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.getById(+id).subscribe({
        next: (resposta: Atendimento) => {
          this.registro = resposta;
        },
        complete: () => {
          this.verificaHorario();
        }
      });
    }

  }

  verificaHorario(): void {
    let id = this.registro.profissional.id;
    let data = this.registro.data;
    if (id && data) {
      this.servico.getHorarios(id, data).subscribe({
        next: (resposta: string[]) => {
          this.horarios = resposta;
        },
        complete: () => {
          const selectHora = document.querySelector<HTMLSelectElement>("form select[name='hora']");
          if (selectHora) {
            Array.from(selectHora.options).forEach(opcao => {
              if (this.horarios.includes(opcao.value)) {
                opcao.disabled = true;
              }
            });
          }
        }
      });
    }
  }

}
