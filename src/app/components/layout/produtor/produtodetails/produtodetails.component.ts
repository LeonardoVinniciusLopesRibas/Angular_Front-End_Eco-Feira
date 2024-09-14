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

@Component({
  selector: 'app-produtodetails',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule, CommonModule, MdbRippleModule, FormsModule],
  templateUrl: './produtodetails.component.html',
  styleUrl: './produtodetails.component.scss'
})
export class ProdutodetailsComponent {

  listProdutos: Produtoprodutorresponse[] = [];
  page: number = 1;
  produtoProdutorService = inject(ProdutoprodutorService);
  itemsPerPage: number = 10;
  testCategorias: any[] = [];
  pageSizeOptions: number[] = [10, 20, 50, 200];
  produtoResponse: Produtoprodutorresponse = new Produtoprodutorresponse();
  query: string = "";
  cnpj!: string;
  isDropdownOpen: boolean[] = [];
  mostrarDesativados: boolean = false;

  constructor() {
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.cnpj = usuarioData.empresaAssociation.cnpj;

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
    this.produtoProdutorService.get(this.query, this.cnpj).subscribe({
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
    this.produtoProdutorService.getDesativados(this.query, this.cnpj).subscribe({
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
        this.produtoProdutorService.desativar(idProduto).subscribe({
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
        this.produtoProdutorService.reativar(idProduto).subscribe({
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


  /*deleteItem(id: number) {
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
        this.produtoProdutorService.status().subscribe({
          next: (res) => {
            Swal.fire('Deletado!', 'O item foi deletado com sucesso.', 'success');
            this.listarProduto();
          },
          error: (erro) => {
            const errorMessage = erro.error || erro.message || 'Erro desconhecido';
  
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: errorMessage,
              showConfirmButton: true,
              confirmButtonText: "Fechar",  
              timer: 3000
            });
          },
        });
      }
    });
  }*/
  
