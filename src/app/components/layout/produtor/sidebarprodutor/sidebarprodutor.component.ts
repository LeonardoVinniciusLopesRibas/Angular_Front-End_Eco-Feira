import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoginService } from '../../../../auth/login.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { UsuarioResponseDto } from '../../../../auth/usuarioResponseDto';

@Component({
  selector: 'app-sidebarprodutor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebarprodutor.component.html',
  styleUrl: './sidebarprodutor.component.scss'
})
export class SidebarprodutorComponent {

  isCollapsed = false;
  showCadastroSubmenu = false;
  usuarioLogado: UsuarioResponseDto | null = null;
  
  router = inject(Router);
  loginService = inject(LoginService);

  constructor() {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      this.usuarioLogado = JSON.parse(usuarioString);
    }
  }
 
  toggleCadastro() {
    this.showCadastroSubmenu = !this.showCadastroSubmenu;
  }

  deslogar(): void {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você deseja mesmo deslogar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim!",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
        this.loginService.removerToken();
        localStorage.removeItem('usuario');
        Swal.fire({
          title: "Deslogado!",
          text: "O usuário "+this.usuarioLogado?.usuario+" foi deslogado com sucesso!",
          icon: "success"
        });
      }
    });
  }
}
