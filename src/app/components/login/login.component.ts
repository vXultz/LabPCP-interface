import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit() {
    const user = this.authService.authenticate(this.email, this.senha);
    if (user) {
      if (user.role === 'Admin' || user.role === 'Docente') {
        this.router.navigate(['/home-admin']);
      } else if (user.role === 'Aluno') {
        this.router.navigate(['/home-aluno']);
      }
    } else {
      alert('Usuário e/ou senha incorretos');
    }
  }

  criarConta() {
    alert('Funcionalidade de criar conta em construção');
  }

  esqueceuSenha() {
    alert('Funcionalidade de recuperação de senha em construção');
  }
}