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
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  onEdit(): void {
    // Não faz nada
  }

  onDelete(): void {
    this.turmaForm.reset();
    alert('Formulário resetado com sucesso!');
  }

  gerarIdUnico(): number {
    const ultimoId = localStorage.getItem('ultimaTurmaId');
    const novoId = ultimoId ? parseInt(ultimoId, 10) + 1 : 1;
    localStorage.setItem('ultimaTurmaId', novoId.toString());
    return novoId;
  }
}