import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../../services/aluno.service';

@Component({
  selector: 'app-notas-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notas-aluno.component.html',
  styleUrl: './notas-aluno.component.css'
})
export class NotasAlunoComponent implements OnInit {
  aluno: any;
  turma: any;
  avaliacoes: any[] = [];

  constructor(private alunoService: AlunoService) { }

  ngOnInit(): void {
    const alunoId = 1; // Mude o Id para ver informações de outro aluno

    this.alunoService.getAlunoById(alunoId).subscribe(aluno => {
      this.aluno = aluno;

      if (this.aluno) {
        this.alunoService.getTurmaById(this.aluno.turmaId).subscribe(turma => {
          this.turma = turma;
        });
      }
    });

    this.alunoService.getAvaliacoesByAlunoId(alunoId).subscribe(avaliacoes => {
      this.avaliacoes = avaliacoes;
    });
  }
}
