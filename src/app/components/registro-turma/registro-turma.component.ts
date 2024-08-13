import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-turma',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [],
  templateUrl: './registro-turma.component.html',
  styleUrls: ['./registro-turma.component.css']
})
export class RegistroTurmaComponent implements OnInit {
  turmaForm: FormGroup;
  isEditMode = false;
  isDocente = false;
  docentesOpcao: string[] = [];

  constructor(private fb: FormBuilder) {
    this.turmaForm = this.fb.group({
      nomeTurma: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      dataInicio: [new Date().toISOString().substring(0, 10), Validators.required],
      dataTermino: [new Date().toISOString().substring(0, 10), Validators.required],
      horarioTurma: [new Date().toISOString().substring(11, 16), Validators.required],
      docente: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const docentes = JSON.parse(localStorage.getItem('docentes') || '[]');
    this.docentesOpcao = docentes.map((docente: any) => docente.nome);
  }

  onSubmit(): void {
    if (this.turmaForm.valid) {
      const formData = this.turmaForm.value;
      formData.id = this.gerarIdUnico();

      const dataInicio = new Date(formData.dataInicio);
      formData.dataInicio = dataInicio.toLocaleDateString('pt-BR');

      const dataTermino = new Date(formData.dataTermino);
      formData.dataTermino = dataTermino.toLocaleDateString('pt-BR');

      const turmas = JSON.parse(localStorage.getItem('turmas') || '[]');
      turmas.push(formData);
      localStorage.setItem('turmas', JSON.stringify(turmas));

      console.log('Array de turmas:', turmas);

      alert('Dados salvos com sucesso!');
    } else {
      const errors = this.getFormValidationErrors();
      alert(`Por favor, corrija os seguintes erros:\n${errors.join('\n')}`);
    }
  }

  getFormValidationErrors(): string[] {
    const errors: string[] = [];
    const controls = this.turmaForm.controls;

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

  getErrorMessage(controlName: string, errorKey: string, errorValue: any): string {
    const messages: { [key: string]: string } = {
      required: `${controlName} é obrigatório.`,
      minlength: `${controlName} deve ter no mínimo ${errorValue.requiredLength} caracteres.`,
      maxlength: `${controlName} deve ter no máximo ${errorValue.requiredLength} caracteres.`
    };

    return messages[errorKey] || `${controlName} está inválido.`;
  }

  onEdit(): void {
    // Não faz nada
  }

  onDelete(): void {
    // Não faz nada
  }

  gerarIdUnico(): number {
    const ultimoId = localStorage.getItem('ultimaTurmaId');
    const novoId = ultimoId ? parseInt(ultimoId, 10) + 1 : 1;
    localStorage.setItem('ultimaTurmaId', novoId.toString());
    return novoId;
  }
}