import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() sidebarToggled = new EventEmitter<boolean>();
  isCollapsed = false;
  isAdmin = false;
  isDocente = false;
  isAluno = false;

  constructor(private router: Router, private authService: AuthService) {
    const user = this.authService.getUsuarioLogado();
    this.isAdmin = user.role === 'Admin';
    this.isDocente = user.role === 'Docente';
    this.isAluno = user.role === 'Aluno';
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed);
  }

  irParaHome() {
    const user = this.authService.getUsuarioLogado();
    if (user.role === 'Admin' || user.role === 'Docente') {
      this.router.navigate(['/home-admin']);
    } else if (user.role === 'Aluno') {
      this.router.navigate(['/home-estudante']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}