import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ViacepService } from '../../services/viacep.service';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { TurmaService } from '../../services/turma.service';
import { AvaliacaoService } from '../../services/avaliacao.service';

@Component({
  selector: 'app-registro-aluno',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, MatSelectModule, MatFormField],
  providers: [ViacepService],
  templateUrl: './registro-aluno.component.html',
  styleUrl: './registro-aluno.component.css'
})
export class RegistroAlunoComponent implements OnInit {
  alunoForm: FormGroup = new FormGroup({});
  isEditMode = false;
  turmasOpcao: string[] = [];
  aluno: any;

  constructor(
    private fb: FormBuilder,
    private viacepService: ViacepService,
    private route: ActivatedRoute,
    private turmaService: TurmaService,
    private avaliacaoService: AvaliacaoService
  ) { }

  ngOnInit(): void {
    this.alunoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      telefone: ['', [Validators.required]],
      genero: ['', Validators.required],
      turma: [[], Validators.required],
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
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
      this.aluno = alunos.find((aluno: any) => aluno.id === parseInt(id, 10));
      if (this.aluno) {
        this.alunoForm.patchValue(this.aluno);
      }
    }

    const turmasSalvas = JSON.parse(localStorage.getItem('turmas') || '[]');
    const turmasNomes = turmasSalvas.map((turma: any) => turma.nomeTurma);
    this.turmasOpcao = [...this.turmasOpcao, ...turmasNomes];
  }

  onSubmit(): void {
    if (this.alunoForm.valid) {
      const formData = this.alunoForm.value;
      formData.id = this.gerarIdUnico();

      const dataNascimento = new Date(formData.dataNascimento);
      formData.dataNascimento = dataNascimento.toLocaleDateString('pt-BR');

      const turmas = JSON.parse(localStorage.getItem('turmas') || '[]');
      console.log('Turmas carregadas:', turmas);
      const turmaSelecionada = turmas.find((turma: any) => turma.nomeTurma === formData.turma);
      console.log('Turma selecionada:', turmaSelecionada);

      if (turmaSelecionada) {
        formData.turmaId = turmaSelecionada.id;
        console.log('Turma ID:', formData.turmaId);
      } else {
        formData.turmaId = null;
        console.log('Nenhuma turma encontrada com o nome:', formData.turma);
      }

      const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
      alunos.push(formData);
      localStorage.setItem('alunos', JSON.stringify(alunos));

      alert('Dados salvos com sucesso!');
    } else {
      const errors = this.getFormValidationErrors();
      alert(`Por favor, corrija os seguintes erros:\n${errors.join('\n')}`);
    }
  }

  getFormValidationErrors(): string[] {
    const errors: string[] = [];
    const controls = this.alunoForm.controls;

    Object.keys(controls).forEach(key => {
      const controlErrors = controls[key].errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(errorKey => {
          errors.push(this.getErrorMessage(key, errorKey, controlErrors[errorKey]));
        });
      }
    });

    const enderecoControls = (controls['endereco'] as FormGroup).controls;
    Object.keys(enderecoControls).forEach(key => {
      const controlErrors = enderecoControls[key].errors;
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
      maxlength: `${controlName} deve ter no máximo ${errorValue.requiredLength} caracteres.`,
      email: `Email inválido.`,
      invalidCPF: `CPF inválido.`
    };

    return messages[errorKey] || `${controlName} está inválido.`;
  }

  gerarIdUnico(): number {
    const ultimoId = localStorage.getItem('ultimoAlunoId');
    const novoId = ultimoId ? parseInt(ultimoId, 10) + 1 : 1;
    localStorage.setItem('ultimoAlunoId', novoId.toString());
    return novoId;
  }

  onEdit(): void {
    if (this.alunoForm.valid) {
      const formData = this.alunoForm.value;
      formData.id = this.aluno.id;

      const dataNascimento = new Date(formData.dataNascimento);
      formData.dataNascimento = dataNascimento.toLocaleDateString('pt-BR');

      const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
      const index = alunos.findIndex((d: { id: any; }) => d.id === this.aluno.id);

      if (index !== -1) {
        alunos[index] = formData;
        localStorage.setItem('alunos', JSON.stringify(alunos));
        alert('Dados atualizados com sucesso!');
      } else {
        alert('Alunos não encontrado.');
      }
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  onDelete(): void {
    this.turmaService.getTurmas().subscribe((turmas) => {
      const turmasVinculadas = turmas.filter(turma => turma.alunoId === this.aluno.id);
      this.avaliacaoService.getAvaliacoes().subscribe((avaliacoes) => {
        const avaliacoesVinculadas = avaliacoes.filter(avaliacao => avaliacao.alunoId === this.aluno.id);

        if (turmasVinculadas.length > 0 || avaliacoesVinculadas.length > 0) {
          let mensagem = 'Não é possível excluir o aluno. Ele possui:';
          if (turmasVinculadas.length > 0) {
            mensagem += `\n- ${turmasVinculadas.length} turma(s) vinculada(s)`;
          }
          if (avaliacoesVinculadas.length > 0) {
            mensagem += `\n- ${avaliacoesVinculadas.length} avaliação(ões) vinculada(s)`;
          }
          alert(mensagem);
        } else {
          const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
          const index = alunos.findIndex((d: { id: any; }) => d.id === this.aluno.id);
          if (index !== -1) {
            alunos.splice(index, 1);
            localStorage.setItem('alunos', JSON.stringify(alunos));
            this.alunoForm.reset();
            alert('Aluno excluído com sucesso!');
          }
        }
      });
    });
  }

  apenasNumero(event: KeyboardEvent): void {
    const key = event.key;
    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  }

  buscarCep(): void {
    const cep = this.alunoForm.get('endereco.cep')?.value;
    this.viacepService.buscarCep(cep).subscribe(dados => {
      this.alunoForm.patchValue({
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
