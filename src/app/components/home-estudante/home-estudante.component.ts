import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-estudante',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-estudante.component.html',
  styleUrls: ['./home-estudante.component.css']
})
export class HomeEstudanteComponent {
  avaliacoes = [
    { nome: 'Prova de Matemática', materia: 'Matemática', data: '2023-10-01' },
    { nome: 'Trabalho de História', materia: 'História', data: '2023-09-25' },
    { nome: 'Teste de Física', materia: 'Física', data: '2023-09-20' }
  ];

  materias = ['Matemática', 'História', 'Física'];

  cursosExtras = ['Curso de Programação', 'Curso de Inglês', 'Curso de Artes'];

  constructor(private router: Router) { }

  verNotas(avaliacao: any) {
    this.router.navigate(['/notas-aluno'], { queryParams: { avaliacao: avaliacao.nome } });
  }
}