import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  getAvaliacoes(): Observable<any[]> {
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]');
    return of(avaliacoes);
  }
}