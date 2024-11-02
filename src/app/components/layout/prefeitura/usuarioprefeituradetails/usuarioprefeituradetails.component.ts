import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NovoacessoService } from '../../../../services/novoacesso/novoacesso.service';
import { Novoacesso } from '../../../../model/novoacesso/novoacesso';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import {NotificationSwal} from "../../../../util/NotificationSwal";

@Component({
  selector: 'app-usuarioprefeituradetails',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule, CommonModule, MdbRippleModule, FormsModule],
  templateUrl: './usuarioprefeituradetails.component.html',
  styleUrl: './usuarioprefeituradetails.component.scss'
})
export class UsuarioprefeituradetailsComponent {
  listUsuarios: Novoacesso[] = [];
  page: number = 1;
  novoacessoService = inject(NovoacessoService);
  usuarioService = inject(UsuarioService);
  itemsPerPage: number = 10;
  testCategorias: any[] = [];
  pageSizeOptions: number[] = [10, 20, 50, 200];
  isDropdownOpen: boolean[] = [];
  cnpj: string = '';
  idPrefeitura: number = 0;

  constructor() {
    const usuarioStorage = localStorage.getItem('usuario');

    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.cnpj = usuarioData.prefeituraAssociation.cnpj;
      this.idPrefeitura = usuarioData.prefeituraAssociation.idPrefeitura;
    }
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.novoacessoService.get(this.cnpj).subscribe({
      next: lista => {
        this.listUsuarios = lista;
      },
      error: erro => {
        if (erro.status === 404) {
          this.listUsuarios = [];
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
            icon: "info",
            title: "Nenhum usuário pendente."
          });
        }
      },
    });
  }

  onItemsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = +selectElement.value;
    this.page = 1;
  }

  recusar(id: number){
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você deseja remover a solicitação?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim!",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        this.novoacessoService.delete(id).subscribe({
          next: retorno =>{

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
              icon: "info",
              title: "Usuário recusado!"
            });
            this.listarUsuarios();
          },
          error: erro => {

          }
        })
      }
    });
  }

  aceitar(id: number){
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você deseja efetivar esse usuário?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim!",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.postPrefeitura(id, this.idPrefeitura).subscribe({
          next: retorno =>{
            const retornos = retorno.next;
            NotificationSwal.swalFire("Usuário aceito.", "success");
            this.listarUsuarios();
          },
          error: erro => {

          }
        })
        this.novoacessoService.delete(id).subscribe({
          next: retorno =>{
            this.listarUsuarios();
          },
          error: erro =>{
            console.error("Ocorreu um erro: ", erro)
          }
        })

      }
    });
  }

  }




