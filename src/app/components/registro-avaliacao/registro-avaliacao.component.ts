import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

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
      nota: ['', [Validators.required, this.validarNota]]
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
      const errors = this.getFormValidationErrors();
      alert(`Por favor, corrija os seguintes erros:\n${errors.join('\n')}`);
    }
  }

  getFormValidationErrors(): string[] {
    const errors: string[] = [];
    const controls = this.avaliacaoForm.controls;

    Object.keys(controls).forEach(key => {
      const controlErrors = controls[key].errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(errorKey => {
          errors.push(this.getErrorMessage(key, errorKey, controlErrors[errorKey]));
        });
      }
    });

    return errors;
  }

  getErrorMessage(controlName: string, errorName: string, errorValue: any): string {
    const errorMessages: { [key: string]: string } = {
      required: 'Este campo é obrigatório.',
      minlength: `O valor deve ter no mínimo ${errorValue.requiredLength} caracteres.`,
      maxlength: `O valor deve ter no máximo ${errorValue.requiredLength} caracteres.`,
      notaInvalida: 'A nota deve estar entre 0 e 10.'
    };

    return `${controlName}: ${errorMessages[errorName] || 'Erro desconhecido'}`;
  }

  validarNota(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value < 0 || value > 10) {
      return { notaInvalida: true };
    }
    return null;
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
    // Não faz nada
  }
}
