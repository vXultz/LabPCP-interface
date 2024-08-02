import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAvaliacaoComponent } from './registro-avaliacao.component';

describe('RegistroAvaliacaoComponent', () => {
  let component: RegistroAvaliacaoComponent;
  let fixture: ComponentFixture<RegistroAvaliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAvaliacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
