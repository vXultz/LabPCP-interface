import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlunoService } from '../../services/aluno.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ToolbarComponent],
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  isAdmin: boolean = false;
  alunos: any[] = [];
  searchQuery: string = '';
  quantidadeAlunos: number = 0;
  quantidadeDocentes: number = 0;
  quantidadeTurmas: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alunoService: AlunoService
  ) { }

  ngOnInit() {
    const user = this.authService.getUsuarioLogado();
    this.isAdmin = user.role === 'Admin';
    this.loadAlunos();
    this.loadEstatisticas();
  }

  loadAlunos() {
    this.alunoService.getAlunos().subscribe((data) => {
      this.alunos = data;
    });
  }

  searchAlunos() {
    this.alunoService.searchAlunos(this.searchQuery).subscribe((data) => {
      this.alunos = data;
    });
  }

  verMais(aluno: any) {
    this.router.navigate(['/cadastro-aluno', aluno.id]);
  }

  lancarNota(aluno: any) {
    this.router.navigate(['/cadastro-avaliacao', aluno.id]);
  }

  loadEstatisticas() {
    this.quantidadeAlunos = this.alunoService.getQuantidadeAlunos();
    this.quantidadeDocentes = this.alunoService.getQuantidadeDocentes();
    this.quantidadeTurmas = this.alunoService.getQuantidadeTurmas();
  }
}