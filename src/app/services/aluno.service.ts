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
    return of(this.alunos);
  }

  searchAlunos(query: string): Observable<any[]> {
    return of(this.alunos.filter(aluno =>
      aluno.nomeCompleto.includes(query) ||
      aluno.contato.includes(query)
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