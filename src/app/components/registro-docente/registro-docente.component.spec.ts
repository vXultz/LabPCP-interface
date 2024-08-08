import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDocenteComponent } from './registro-docente.component';

describe('RegistroDocenteComponent', () => {
  let component: RegistroDocenteComponent;
  let fixture: ComponentFixture<RegistroDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDocenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
