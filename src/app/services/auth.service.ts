import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { email: 'admin@example.com', senha: 'admin123', role: 'Admin' },
    { email: 'docente@example.com', senha: 'docente123', role: 'Docente' },
    { email: 'aluno@example.com', senha: 'aluno123', role: 'Aluno' }
  ];

  constructor() { }

  authenticate(email: string, senha: string) {
    const user = this.users.find(user => user.email === email && user.senha === senha);
    if (user) {
      localStorage.setItem('usuarioLogado', JSON.stringify(user));
    }
    return user;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('usuarioLogado');
  }

  getUsuarioLogado() {
    return JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
  }
}
