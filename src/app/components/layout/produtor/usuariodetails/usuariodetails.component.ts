import { Component, inject } from '@angular/core';
import { Categoriaresponse } from '../../../../model/categoria/dto/categoriaresponse';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NovoacessoService } from '../../../../services/novoacesso/novoacesso.service';
import { Novoacesso } from '../../../../model/novoacesso/novoacesso';
import { UsuarioService } from '../../../../services/usuario/usuario.service';

@Component({
  selector: 'app-usuariodetails',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule, CommonModule, MdbRippleModule, FormsModule],
  templateUrl: './usuariodetails.component.html',
  styleUrl: './usuariodetails.component.scss'
})
export class UsuariodetailsComponent {
  listUsuarios: Novoacesso[] = [];
  page: number = 1;
  novoacessoService = inject(NovoacessoService);
  usuarioService = inject(UsuarioService);
  itemsPerPage: number = 10;
  testCategorias: any[] = [];
  pageSizeOptions: number[] = [10, 20, 50, 200];
  categoriaResponse: Categoriaresponse = new Categoriaresponse();
  isDropdownOpen: boolean[] = [];
  cnpj: string = '';
  idEmpresa: number = 0;

  constructor() {
    const usuarioStorage = localStorage.getItem('usuario');

    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.cnpj = usuarioData.empresaAssociation.cnpj;
      this.idEmpresa = usuarioData.empresaAssociation.idEmpresa;
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
          Swal.fire({
            position: "top-end",
            icon: 'success',
            title: 'Não foi encontrado usuários',
            showConfirmButton: true,
            confirmButtonText: "Fechar",  
            timer: 3000
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
            const retornos = retorno.next;
            Swal.fire({
              position: "top-end",
              icon: 'success',
              title: retornos,
              showConfirmButton: true,
              confirmButtonText: "Fechar",  
              timer: 3000
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
        this.usuarioService.post(id, this.idEmpresa).subscribe({
          next: retorno =>{
            const retornos = retorno.next;
            Swal.fire({
              position: "top-end",
              icon: 'success',
              title: 'Usuário aceito com sucesso',
              showConfirmButton: true,
              confirmButtonText: "Fechar",  
              timer: 3000
            });
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

          }
        })
        
      }
    });
  }

  }




