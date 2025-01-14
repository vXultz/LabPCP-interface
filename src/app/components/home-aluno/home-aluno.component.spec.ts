import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAlunoComponent } from './home-aluno.component';

describe('HomeAlunoComponent', () => {
  let component: HomeAlunoComponent;
  let fixture: ComponentFixture<HomeAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAlunoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
