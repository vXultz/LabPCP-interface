import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private alunos = [
    { id: 1, nomeCompleto: 'Vitor', idade: 28, contato: 'vitor@example.com' },
    { id: 2, nomeCompleto: 'Pedro', idade: 32, contato: 'pedro@example.com' },
  ];

  getAlunos(): Observable<any[]> {
    const storedAlunos = JSON.parse(localStorage.getItem('alunos') || '[]');
    const allAlunos = [...this.alunos, ...storedAlunos];
    return of(allAlunos);
  }

  searchAlunos(query: string): Observable<any[]> {
    const storedAlunos = JSON.parse(localStorage.getItem('alunos') || '[]');
    const allAlunos = [...this.alunos, ...storedAlunos];
    return of(allAlunos.filter(aluno =>
      aluno.nomeCompleto.includes(query) ||
      aluno.telefone.includes(query)
    ));
  }

  getQuantidadeAlunos(): number {
    return this.alunos.length;
  }

  getQuantidadeDocentes(): number {
    // fazer o método
    return 10;
  }

  getQuantidadeTurmas(): number {
    // fazer o método
    return 5;
  }
}