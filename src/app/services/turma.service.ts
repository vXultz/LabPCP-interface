import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  private turmas = []

  getTurmas(): Observable<any[]> {
    const storedTurmas = JSON.parse(localStorage.getItem('turmas') || '[]');
    const allTurmas = [...this.turmas, ...storedTurmas];
    return of(allTurmas);
  }

  getQuantidadeTurmas(): number {
    const storedTurmas = JSON.parse(localStorage.getItem('turmas') || '[]');
    return storedTurmas.length;
  }
}
