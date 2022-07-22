import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { BarraComandosComponent } from '../barra-comandos/barra-comandos.component';
import { FiltroAtendimentoComponent } from '../filtro-atendimento/filtro-atendimento.component';

import { AgendaListComponent } from './agenda-list.component';

describe('AgendaListComponent', () => {
  let component: AgendaListComponent;
  let fixture: ComponentFixture<AgendaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [ AtendimentoService ],
      declarations: [ AgendaListComponent, FiltroAtendimentoComponent, BarraComandosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
