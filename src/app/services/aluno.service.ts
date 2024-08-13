import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private alunos = [];

  getAlunos(): Observable<any[]> {
    const storedAlunos = JSON.parse(localStorage.getItem('alunos') || '[]');
    const allAlunos = [...this.alunos, ...storedAlunos];
    return of(allAlunos);
  }

  getAlunoById(id: number): Observable<any> {
    const storedAlunos = JSON.parse(localStorage.getItem('alunos') || '[]');
    const allAlunos = [...this.alunos, ...storedAlunos];
    return of(allAlunos.find(aluno => aluno.id === id));
  }

  buscarAlunos(query: string): Observable<any[]> {
    const storedAlunos = JSON.parse(localStorage.getItem('alunos') || '[]');
    const allAlunos = [...this.alunos, ...storedAlunos];
    return of(allAlunos.filter(aluno =>
      aluno.nomeCompleto.includes(query) ||
      aluno.telefone.includes(query)
    ));
  }

  getQuantidadeAlunos(): number {
    const storedAlunos = JSON.parse(localStorage.getItem('alunos') || '[]');
    return storedAlunos.length;
  }

  getTurmaById(id: number): Observable<any> {
    const storedTurmas = JSON.parse(localStorage.getItem('turmas') || '[]');
    return of(storedTurmas.find((turma: any) => turma.id === id));
  }

  getAvaliacoesByAlunoId(alunoId: number): Observable<any[]> {
    const todasAvaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]');
    return of(todasAvaliacoes.filter((avaliacao: any) => avaliacao.alunoId === alunoId));
  }
}