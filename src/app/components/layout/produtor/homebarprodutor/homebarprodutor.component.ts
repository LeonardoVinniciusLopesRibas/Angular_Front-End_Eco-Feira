import { Component, inject } from '@angular/core';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { UsuarioResponseDto } from '../../../../auth/usuarioResponseDto';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from '../../../../auth/login.service';

@Component({
  selector: 'app-homebarprodutor',
  standalone: true,
  imports: [MdbDropdownModule],
  templateUrl: './homebarprodutor.component.html',
  styleUrl: './homebarprodutor.component.scss'
})
export class HomebarprodutorComponent {

  usuarioLogado: UsuarioResponseDto | null = null;
  iniciais: string = '';
  nomeempresa: string = '';

  router = inject(Router);
  loginService = inject(LoginService);

  constructor() {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      this.usuarioLogado = JSON.parse(usuarioString);
      this.iniciais = this.usuarioLogado?.usuario ? this.usuarioLogado.usuario.substring(0, 2).toUpperCase() : '';
      this.nomeempresa = this.usuarioLogado?.empresaAssociation.nomeFantasia ? this.usuarioLogado.empresaAssociation.nomeFantasia : '';
    }
  }


  toggleNotification() {
    const number = document.getElementById('number');
    const notificationDropdown = document.getElementById('notification-dropdown');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (profileDropdown && profileDropdown.classList.contains('visible')) {
      profileDropdown.classList.remove('visible');
      setTimeout(() => {
        profileDropdown.classList.add('hidden');
      }, 300);
    }

    if (number && notificationDropdown) {
      if (number.classList.contains('visible')) {
        number.classList.remove('visible');
        notificationDropdown.classList.remove('visible');

        setTimeout(() => {
          number.classList.add('hidden');
          notificationDropdown.classList.add('hidden');
        }, 300);
      } else {
        number.classList.remove('hidden');
        notificationDropdown.classList.remove('hidden');

        setTimeout(() => {
          number.classList.add('visible');
          notificationDropdown.classList.add('visible');
        }, 10);
      }
    }
  }

  toggleImage() {
    const profileDropdown = document.getElementById('profile-dropdown');
    const notificationDropdown = document.getElementById('notification-dropdown');

    if (notificationDropdown && notificationDropdown.classList.contains('visible')) {
      notificationDropdown.classList.remove('visible');
      setTimeout(() => {
        notificationDropdown.classList.add('hidden');
      }, 300);
    }

    if (profileDropdown) {
      if (profileDropdown.classList.contains('visible')) {
        profileDropdown.classList.remove('visible');

        setTimeout(() => {
          profileDropdown.classList.add('hidden');
        }, 300);
      } else {
        profileDropdown.classList.remove('hidden');

        setTimeout(() => {
          profileDropdown.classList.add('visible');
        }, 10);
      }
    }
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
