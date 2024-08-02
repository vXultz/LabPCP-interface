import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEstudanteComponent } from './registro-estudante.component';

describe('RegistroEstudanteComponent', () => {
  let component: RegistroEstudanteComponent;
  let fixture: ComponentFixture<RegistroEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEstudanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
