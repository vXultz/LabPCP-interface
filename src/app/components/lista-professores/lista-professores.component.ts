import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DocenteService } from '../../services/docente.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-lista-professores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-professores.component.html',
  styleUrls: ['./lista-professores.component.css']
})
export class ListaProfessoresComponent implements OnInit {
  searchQuery: string = '';
  docentes: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private docenteService: DocenteService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const user = this.authService.getUsuarioLogado();
    this.isAdmin = user.role === 'Admin';
    if (this.isAdmin) {
      this.carregarDocentes();
    } else {
      this.router.navigate(['/login']);
    }
  }

  carregarDocentes() {
    this.docenteService.getDocentes().subscribe((data) => {
      this.docentes = data;
    });
  }

  buscarDocentes() {
    if (this.searchQuery.trim() === '') {
      this.carregarDocentes();
    } else {
      this.docentes = this.docentes.filter(docente =>
        docente.nomeCompleto.toLowerCase().startsWith(this.searchQuery.toLowerCase()) ||
        docente.id.toString().startsWith(this.searchQuery)
      );
    }
  }
}
