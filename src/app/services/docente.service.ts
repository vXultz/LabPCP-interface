import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private docentes = [
    { id: 1, nomeCompleto: 'João Silva', telefone: '99 999999999' },
    { id: 2, nomeCompleto: 'Maria Oliveira', telefone: '99 999999999' },
  ];

  getDocentes(): Observable<any[]> {
    const storedDocentes = JSON.parse(localStorage.getItem('docentes') || '[]');
    const allDocentes = [...this.docentes, ...storedDocentes];
    return of(allDocentes);
  }

  searchDocentes(query: string): Observable<any[]> {
    const storedDocentes = JSON.parse(localStorage.getItem('docentes') || '[]');
    const allDocentes = [...this.docentes, ...storedDocentes];
    return of(allDocentes.filter(docente =>
      docente.nomeCompleto.includes(query) ||
      docente.telefone.includes(query)
    ));
  }
}