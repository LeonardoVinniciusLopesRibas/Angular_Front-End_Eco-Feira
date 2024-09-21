import { Component, inject } from '@angular/core';
import { Categoriaresponse } from '../../../../model/categoria/dto/categoriaresponse';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Produtoprodutorresponse } from '../../../../model/produtoprodutor/dto/produtoprodutorresponse';
import { ProdutoprodutorService } from '../../../../services/produtoprodutor/produtoprodutor.service';
import { Produtoprefeituraresponselist } from '../../../../model/produtoprefeitura/dto/produtoprefeituraresponselist';
import { ProdutoprefeituraService } from '../../../../services/produtoprefeitura/produtoprefeitura.service';

@Component({
  selector: 'app-produtoprefeituradetails',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule, CommonModule, MdbRippleModule, FormsModule],
  templateUrl: './produtoprefeituradetails.component.html',
  styleUrl: './produtoprefeituradetails.component.scss'
})
export class ProdutoprefeituradetailsComponent {

  listProdutos: Produtoprefeituraresponselist[] = [];
  page: number = 1;
  produtoPrefeituraService = inject(ProdutoprefeituraService);
  itemsPerPage: number = 10;
  testCategorias: any[] = [];
  pageSizeOptions: number[] = [10, 20, 50, 200];
  produtoResponse: Produtoprefeituraresponselist = new Produtoprefeituraresponselist();
  query: string = "";
  cnpj!: string;
  isDropdownOpen: boolean[] = [];
  mostrarDesativados: boolean = false;

  constructor() {
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.cnpj = usuarioData.prefeituraAssociation.cnpj;

    }
    this.listarProduto();
  }

  recebeQuery(query: string) {
    this.query = query;
    if (this.mostrarDesativados) {
      this.getDesativados(); 
    } else {
      this.listarProduto();
    }
  }

  listarProduto() {
    this.produtoPrefeituraService.get(this.query, this.cnpj).subscribe({
      next: lista => {
        this.listProdutos = lista;
      },
      error: erro => {
        if (erro.status === 404) {
          this.listProdutos = [];
        }
      },
    });
  }

  alternarDesativados() {
    this.page = 1;
    if (this.mostrarDesativados) {
      this.getDesativados(); 
    } else {
      this.listarProduto();
    }
  }

  getDesativados() {
    this.produtoPrefeituraService.getDesativados(this.query, this.cnpj).subscribe({
      next: lista => {
        this.listProdutos = lista;
      },
      error: erro => {
        if (erro.status === 404) {
          this.listProdutos = [];
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
    if (this.isDropdownOpen.length !== this.listProdutos.length) {
      this.isDropdownOpen = new Array(this.listProdutos.length).fill(false);
    }

    this.isDropdownOpen = this.isDropdownOpen.map((open, i) => i === index ? !open : false);
  }

  desativarItem(idProduto: number) {
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
        this.produtoPrefeituraService.desativar(idProduto).subscribe({
          next: (res) => {
            const mensagem = res.message || "Produto desativado com sucesso!";
            Swal.fire({
              title: "Sucesso",
              text: mensagem,
              icon: "success",
              confirmButtonText: "OK",
            });
            this.listarProduto();
          },
          error: (erro) => {
            const errorMessage = erro.error?.message || erro.message || 'Erro desconhecido';
            Swal.fire({
              title: "Erro",
              text: errorMessage,
              icon: "error",
              confirmButtonText: "OK",
            });
            console.error(erro);
          },
        });
      }
    });
  }

  reativarItem(idProduto: number) {
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
        this.produtoPrefeituraService.reativar(idProduto).subscribe({
          next: (res) => {
            const mensagem = res.message || "Produto reativado com sucesso!";
            Swal.fire({
              title: "Sucesso",
              text: mensagem,
              icon: "success",
              confirmButtonText: "OK",
            });
            this.getDesativados();
          },
          error: (erro) => {
            const errorMessage = erro.error?.message || erro.message || 'Erro desconhecido';
            Swal.fire({
              title: "Erro",
              text: errorMessage,
              icon: "error",
              confirmButtonText: "OK",
            });
            console.error(erro);
          },
        });
      }
    });
  }


}
