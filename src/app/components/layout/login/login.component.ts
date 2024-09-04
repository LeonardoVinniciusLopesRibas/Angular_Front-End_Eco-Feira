import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../auth/login';
import { LoginResponseDto } from '../../../auth/LoginResponseDto';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SidebarprodutorComponent } from '../produtor/sidebarprodutor/sidebarprodutor.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  router = inject(Router);
  http = inject(HttpClient);
  loginService: LoginService = new LoginService(this.http);
  login: Login = new Login();
  loginResponse: LoginResponseDto | undefined;
  subscription: Subscription | undefined; 
  sideBar: SidebarprodutorComponent = new SidebarprodutorComponent();

  logar() {
    if (this.login.usuario.trim().length === 0) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Usuario não foi informado"
      });
      return;
    } else if (this.login.senha.trim().length === 0) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Senha não foi informada"
      });
      return;
    }
    
    this.subscription = this.loginService.logar(this.login).subscribe({
      next: (response: LoginResponseDto) => {
        console.log('Resposta do servidor:', response);
        this.loginResponse = response; 
    
        if (this.loginResponse && this.loginResponse.usuario) {
          localStorage.setItem('usuario', JSON.stringify(this.loginResponse.usuario));
    
          if (this.loginResponse.usuario.suporte) {
            this.loginService.addToken(this.loginResponse.token);
            this.router.navigate(['/admin/suporte']);
          } else if (this.loginResponse.usuario.produtor) {
            this.loginService.addToken(this.loginResponse.token);
            this.router.navigate(['/admin/produtor']);
          } else if (this.loginResponse.usuario.prefeitura) {
            this.loginService.addToken(this.loginResponse.token);
            this.router.navigate(['/admin/prefeitura']);
          }
    
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: this.loginResponse.usuario.usuario + " acessou com sucesso"
          });
        }
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Erro de validação"
        });
      }
    });
    
    
  }
  
  
  

}
