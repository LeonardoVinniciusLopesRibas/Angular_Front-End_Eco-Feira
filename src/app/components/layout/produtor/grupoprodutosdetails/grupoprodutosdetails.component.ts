import { Component, inject } from '@angular/core';
import { Categoriaresponse } from '../../../../model/categoria/dto/categoriaresponse';
import { CategoriaService } from '../../../../services/categoria.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupoprodutosdetails',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule, CommonModule, MdbRippleModule],
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

  constructor() {
    this.listarCategorias();
  }

  listarCategorias(){
    this.categoriaService.get(this.query).subscribe({
      next: lista => {
        this.listCategorias = lista;
      },
      error: erro => {//quando retornar erro
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro! O erro é: ' + (erro.response?.data?.message || erro.message || 'Erro desconhecido'),
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      },
    });
  }

  dropSetting(){
    
  }

  onItemsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = +selectElement.value;
    this.page = 1;
  }

}
