import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { BarraComandosComponent } from '../barra-comandos/barra-comandos.component';
import { FiltroAtendimentoComponent } from '../filtro-atendimento/filtro-atendimento.component';

import { AtendimentoListComponent } from './atendimento-list.component';

describe('AtendimentoListComponent', () => {
  let component: AtendimentoListComponent;
  let fixture: ComponentFixture<AtendimentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [ AtendimentoService ],
      declarations: [ AtendimentoListComponent, FiltroAtendimentoComponent, BarraComandosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
