import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlunoService } from '../../services/aluno.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { DocenteService } from '../../services/docente.service';
import { TurmaService } from '../../services/turma.service';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ToolbarComponent],
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  isAdmin: boolean = false;
  isDocente: boolean = false;
  alunos: any[] = [];
  searchQuery: string = '';
  quantidadeAlunos: number = 0;
  quantidadeDocentes: number = 0;
  quantidadeTurmas: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alunoService: AlunoService,
    private docenteService: DocenteService,
    private turmaService: TurmaService
  ) { }

  ngOnInit() {
    const user = this.authService.getUsuarioLogado();
    this.isAdmin = user.role === 'Admin';
    this.isDocente = user.role === 'Docente';
    this.loadAlunos();
    this.carregarEstatisticas();
  }

  loadAlunos() {
    this.alunoService.getAlunos().subscribe((data) => {
      this.alunos = data;
    });
  }

  buscarAlunos() {
    if (this.searchQuery.trim() === '') {
      this.loadAlunos();
    } else {
      this.alunoService.buscarAlunos(this.searchQuery).subscribe((data) => {
        this.alunos = data;
      });
    }
  }

  calcularIdade(dataNascimento: string): number {
    const [dia, mes, ano] = dataNascimento.split('/').map(Number);
    const dataNasc = new Date(ano, mes - 1, dia);
    const diffMs = Date.now() - dataNasc.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }

  verMais() {
    this.router.navigate(['/registro-aluno']);
  }

  lancarNota() {
    this.router.navigate(['/registro-avaliacao']);
  }

  carregarEstatisticas() {
    this.quantidadeAlunos = this.alunoService.getQuantidadeAlunos();
    this.quantidadeDocentes = this.docenteService.getQuantidadeDocentes();
    this.quantidadeTurmas = this.turmaService.getQuantidadeTurmas();
  }


}