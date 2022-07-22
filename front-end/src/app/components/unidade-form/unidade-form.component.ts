import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Unidade } from 'src/app/models/unidade';
import { AlertaService } from 'src/app/services/alerta.service';
import { UnidadeService } from 'src/app/services/unidade.service';
import { IComponentForm } from '../i-component-form';

@Component({
  selector: 'app-unidade-form',
  templateUrl: './unidade-form.component.html',
  styles: [
  ]
})
export class UnidadeFormComponent implements OnInit, IComponentForm<Unidade> {

  constructor(
      private servico: UnidadeService,
      private servicoAlerta: AlertaService,
      private router: Router,
      private route: ActivatedRoute) { }

  registro: Unidade = <Unidade>{};
  
  submit(form: NgForm): void {
    if (this.registro.id) {
      this.servico.update(this.registro).subscribe({
        complete: () => {
          this.router.navigate(['/config/unidades']);
          this.servicoAlerta.enviarAlertaSucesso();
        }
      });
    } else {
      this.servico.insert(this.registro).subscribe({
        complete: () => {
          form.resetForm();
          this.servicoAlerta.enviarAlertaSucesso();
        }
      });
    }
  }

  ngOnInit(): void {

    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.getById(+id).subscribe({
        next: (resposta: Unidade) => {
          this.registro = resposta;
        }
      });
    }

  }  

}
