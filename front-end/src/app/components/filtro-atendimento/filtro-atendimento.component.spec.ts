import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProfissionalService } from 'src/app/services/profissional.service';

import { FiltroAtendimentoComponent } from './filtro-atendimento.component';

describe('FiltroAtendimentoComponent', () => {
  let component: FiltroAtendimentoComponent;
  let fixture: ComponentFixture<FiltroAtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [ ProfissionalService ],
      declarations: [ FiltroAtendimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
