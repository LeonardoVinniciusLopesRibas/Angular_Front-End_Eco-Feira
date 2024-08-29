import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../auth/login';
import { LoginResponseDto } from '../../../auth/LoginResponseDto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  router: Router = new Router();
  loginService: LoginService = new LoginService();
  login: Login = new Login();
  loginResponse: LoginResponseDto | undefined;
  subscription: Subscription | undefined; 

  logar() {
    if (this.login.usuario.trim().length === 0) {
      Swal.fire({
        title: "Erro de validação!",
        text: "Usuário não foi informado!",
        icon: "error"
      });
      return;
    } else if (this.login.senha.trim().length === 0) {
      Swal.fire({
        title: "Erro de validação!",
        text: "Senha não foi informada!",
        icon: "error"
      });
      return;
    }
    
    this.subscription = this.loginService.logar(this.login).subscribe({
      next: (response: LoginResponseDto) => {
        this.loginResponse = response; 

        if(this.loginResponse.usuario.suporte){
          this.loginService.addToken(this.loginResponse.token);
          this.router.navigate(['/admin/suporte']);
        }
        if(this.loginResponse.usuario.produtor){
          this.loginService.addToken(this.loginResponse.token);
          this.router.navigate(['/admin/produtor']);
        }
        if(this.loginResponse.usuario.prefeitura){
          this.loginService.addToken(this.loginResponse.token);
          this.router.navigate(['/admin/prefeitura']);
        }

      },
      error: (error) => {
        Swal.fire({
          title: "Erro de validação!",
          text: "Usuário ou senha incorreto!",
          icon: "error"
        });
      }
    });
    
    alert("Botão clicado");
  }
  
  
  

}
