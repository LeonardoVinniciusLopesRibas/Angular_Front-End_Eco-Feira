import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../../auth/login.service';
import { UsuarioResponseDto } from '../../../../auth/usuarioResponseDto';
import {MatIconModule} from "@angular/material/icon";
import {NotificationSwal} from "../../../../util/NotificationSwal";

@Component({
  selector: 'app-sidebarprefeitura',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './sidebarprefeitura.component.html',
  styleUrl: './sidebarprefeitura.component.scss'
})
export class SidebarprefeituraComponent {
  isCollapsed = false;
  activeSubmenu: string | null = null; // Armazena qual submenu está ativo
  usuarioLogado: UsuarioResponseDto | null = null;

  router = inject(Router);
  loginService = inject(LoginService);

  constructor() {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      this.usuarioLogado = JSON.parse(usuarioString);
    }
  }

  toggleSubmenu(menu: string) {
    this.activeSubmenu = this.activeSubmenu === menu ? null : menu;
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
        NotificationSwal.swalFire(`O usuário: ${this.usuarioLogado?.usuario} saiu.`, "success");

      }
    });
  }
}
