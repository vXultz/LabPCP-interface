import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEstudanteComponent } from './home-estudante.component';

describe('HomeEstudanteComponent', () => {
  let component: HomeEstudanteComponent;
  let fixture: ComponentFixture<HomeEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEstudanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
