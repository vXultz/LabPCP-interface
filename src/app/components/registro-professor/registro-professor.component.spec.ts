import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProfessorComponent } from './registro-professor.component';

describe('RegistroProfessorComponent', () => {
  let component: RegistroProfessorComponent;
  let fixture: ComponentFixture<RegistroProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
