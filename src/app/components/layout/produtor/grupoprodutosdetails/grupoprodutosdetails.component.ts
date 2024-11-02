import { Component, inject } from '@angular/core';
import { Categoriaresponse } from '../../../../model/categoria/dto/categoriaresponse';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import {NotificationSwal} from "../../../../util/NotificationSwal";

@Component({
  selector: 'app-grupoprodutosdetails',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule, CommonModule, MdbRippleModule, FormsModule],
  templateUrl: './grupoprodutosdetails.component.html',
  styleUrl: './grupoprodutosdetails.component.scss'
})
export class GrupoprodutosdetailsComponent {

  listCategorias: Categoriaresponse[] = [];
  page: number = 1;
  categoriaService = inject(CategoriaService);
  itemsPerPage: number = 10;
  testCategorias: any[] = [];
  pageSizeOptions: number[] = [10, 20, 50, 200];
  categoriaResponse: Categoriaresponse = new Categoriaresponse();
  query: string = "";
  isDropdownOpen: boolean[] = [];
  cnpj!: string;

  constructor() {
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.cnpj = usuarioData.empresaAssociation.cnpj;

    }
    this.listarCategorias();
  }

  recebeQuery(query: string) {
    this.query = query;
    this.listarCategorias();
  }

  listarCategorias() {
    this.categoriaService.get(this.query, this.cnpj).subscribe({
      next: lista => {
        this.listCategorias = lista;
      },
      error: erro => {
        if (erro.status === 404) {
          this.listCategorias = [];
          console.error("Não foram encontrado categorias: ", erro)
        }
      },
    });
  }

  onItemsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = +selectElement.value;
    this.page = 1;
  }

  toggleDropdown(index: number) {
    if (this.isDropdownOpen.length !== this.listCategorias.length) {
      this.isDropdownOpen = new Array(this.listCategorias.length).fill(false);
    }

    this.isDropdownOpen = this.isDropdownOpen.map((open, i) => i === index ? !open : false);
  }


  deleteItem(id: number) {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você deseja mesmo deletar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim!",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.delete(id).subscribe({
          next: (res) => {
            NotificationSwal.swalFire("Grupo deletado com sucesso.", "success");
            this.listarCategorias();
          },
          error: (erro) => {
            console.error("Ocorreu um erro: ", erro)
          },
        });
      }
    });
  }




}
