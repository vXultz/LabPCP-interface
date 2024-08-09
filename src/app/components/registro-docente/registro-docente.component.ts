import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ViacepService } from '../../services/viacep.service';
import { MatFormField, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-registro-docente',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, MatSelectModule, MatFormField],
  providers: [ViacepService],
  templateUrl: './registro-docente.component.html',
  styleUrls: ['./registro-docente.component.css']
})
export class RegistroDocenteComponent implements OnInit {
  docenteForm: FormGroup = new FormGroup({});
  isEditMode = false;
  materiasOpcao = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Inglês'];

  constructor(private fb: FormBuilder, private viacepService: ViacepService) { }

  ngOnInit(): void {
    this.docenteForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      telefone: ['', [Validators.required]],
      genero: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      cpf: ['', [Validators.required, this.cpfValidator.bind(this)]],
      rg: ['', [Validators.required, Validators.maxLength(20)]],
      naturalidade: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      endereco: this.fb.group({
        cep: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        complemento: [''],
      }),
      materias: [[], Validators.required]
    });

    const savedData = localStorage.getItem('docenteData');
    if (savedData) {
      this.docenteForm.setValue(JSON.parse(savedData));
    }
  }

  materiaSelecionada(event: any) {
    const options = event.target.options;
    const materiaSelecionada: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        materiaSelecionada.push(options[i].value);
      }
    }
    this.docenteForm.get('materias')?.setValue(materiaSelecionada);
  }

  onSubmit(): void {
    if (this.docenteForm.valid) {
      const formData = this.docenteForm.value;
      localStorage.setItem('docenteData', JSON.stringify(formData));
      alert('Dados salvos com sucesso!');
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  onEdit(): void {
    // Não faz nada
  }

  onDelete(): void {
    this.docenteForm.reset();
    alert('Formulário resetado com sucesso!');
  }

  apenasNumero(event: KeyboardEvent): void {
    const key = event.key;
    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  }

  buscarCep(): void {
    const cep = this.docenteForm.get('endereco.cep')?.value;
    this.viacepService.buscarCep(cep).subscribe(dados => {
      this.docenteForm.patchValue({
        endereco: {
          cidade: dados.localidade,
          estado: dados.uf,
          logradouro: dados.logradouro,
          bairro: dados.bairro
        }
      });
    });
  }

  cpfValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) {
      return { invalidCPF: true };
    }
    const cpf = value.replace(/\D/g, '');
    if (cpf.length !== 11 || !this.isValidCPF(cpf)) {
      return { invalidCPF: true };
    }
    return null;
  }

  isValidCPF(cpf: string): boolean {
    let sum = 0;
    let remainder;
    if (cpf === '00000000000') return false;
    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

}