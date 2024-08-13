import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-avaliacao',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './registro-avaliacao.component.html',
  styleUrl: './registro-avaliacao.component.css'
})
export class RegistroAvaliacaoComponent implements OnInit {
  avaliacaoForm: FormGroup;
  docentesOpcao: string[] = [];
  alunosOpcao: string[] = [];
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder) {
    this.avaliacaoForm = this.fb.group({
      docente: ['', Validators.required],
      aluno: ['', Validators.required],
      nomeMateria: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      nomeAvaliacao: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      dataAvaliacao: ['', Validators.required],
      nota: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const docentes = JSON.parse(localStorage.getItem('docentes') || '[]');
    this.docentesOpcao = docentes.map((docente: any) => docente.nome);

    const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
    this.alunosOpcao = alunos.map((aluno: any) => aluno.nome);
  }

  onSubmit(): void {
    if (this.avaliacaoForm.valid) {
      const formData = this.avaliacaoForm.value;
      formData.id = this.gerarIdUnico();

      const dataAvaliacao = new Date(formData.dataAvaliacao);
      formData.dataAvaliacao = dataAvaliacao.toLocaleDateString('pt-BR');

      const docentes = JSON.parse(localStorage.getItem('docentes') || '[]');
      const docenteSelecionado = docentes.find((docente: any) => docente.nome === formData.docente);
      formData.docenteId = docenteSelecionado ? docenteSelecionado.id : null;

      const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
      const alunoSelecionado = alunos.find((aluno: any) => aluno.nome === formData.aluno);
      formData.alunoId = alunoSelecionado ? alunoSelecionado.id : null;

      const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]');
      avaliacoes.push(formData);
      localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));

      alert('Avaliação salva com sucesso!');
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  gerarIdUnico(): number {
    const ultimoId = localStorage.getItem('ultimaAvaliacaoId');
    const novoId = ultimoId ? parseInt(ultimoId, 10) + 1 : 1;
    localStorage.setItem('ultimaAvaliacaoId', novoId.toString());
    return novoId;
  }

  apenasNumero(event: KeyboardEvent): void {
    const key = event.key;
    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  }

  onEdit(): void {
    // Não faz nada
  }

  onDelete(): void {
    this.avaliacaoForm.reset();
    alert('Formulário resetado com sucesso!');
  }
}
