import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAlunoComponent } from './registro-aluno.component';

describe('RegistroAlunoComponent', () => {
  let component: RegistroAlunoComponent;
  let fixture: ComponentFixture<RegistroAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAlunoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegistroAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
