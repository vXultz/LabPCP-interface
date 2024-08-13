import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private docentes = [];

  getDocentes(): Observable<any[]> {
    const storedDocentes = JSON.parse(localStorage.getItem('docentes') || '[]');
    const allDocentes = [...this.docentes, ...storedDocentes];
    return of(allDocentes);
  }

  searchDocentes(query: string): Observable<any[]> {
    const storedDocentes = JSON.parse(localStorage.getItem('docentes') || '[]');
    const allDocentes = [...this.docentes, ...storedDocentes];
    return of(allDocentes.filter(docente =>
      docente.nome.includes(query) ||
      docente.telefone.includes(query)
    ));
  }

  getQuantidadeDocentes(): number {
    const storedDocentes = JSON.parse(localStorage.getItem('docentes') || '[]');
    return storedDocentes.length;
  }
}