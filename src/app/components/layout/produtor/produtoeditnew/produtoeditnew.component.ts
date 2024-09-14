import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { Categoriarequest } from '../../../../model/categoria/dto/categoriarequest';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Categoriaresponseunique } from '../../../../model/categoria/dto/categoriaresponseunique';
import { Categoria } from '../../../../model/categoria/categoria';
import { ProdutoprodutorService } from '../../../../services/produtoprodutor/produtoprodutor.service';
import { Produtoprodutor } from '../../../../model/produtoprodutor/produtoprodutor';
import { Produtoprodutorresponseunique } from '../../../../model/produtoprodutor/dto/produtoprodutorresponseunique';
import { Produtoprodutorrequest } from '../../../../model/produtoprodutor/dto/produtoprodutorrequest';
import { Categoriaresponse } from '../../../../model/categoria/dto/categoriaresponse';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-produtoeditnew',
  standalone: true,
  imports: [MdbRippleModule, FormsModule, RouterLink, CommonModule, MdbFormsModule],
  templateUrl: './produtoeditnew.component.html',
  styleUrl: './produtoeditnew.component.scss'
})
//RouterLink, NgxPaginationModule, CommonModule, MdbRippleModule, FormsModule
export class ProdutoeditnewComponent {
  produtoProdutorService = inject(ProdutoprodutorService);
  categoriaService = inject(CategoriaService);
  cnpj!: string;
  empresaId!: number;
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  query: string = '';
  produtoProdutorRequest: Produtoprodutorrequest = new Produtoprodutorrequest();
  produtoProdutorResponseUnique: Produtoprodutorresponseunique = new Produtoprodutorresponseunique();
  produtoProdutor: Produtoprodutor = new Produtoprodutor();
  listCategorias: Categoriaresponse[] = [];

  constructor() {
    let id = this.activatedRoute.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
    const usuarioStorage = localStorage.getItem('usuario');

    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.empresaId = usuarioData.empresaAssociation.idEmpresa;
      this.cnpj = usuarioData.empresaAssociation.cnpj;
    }
    this.findCategorias();
  }

  findCategorias() {
    this.categoriaService.get(this.query, this.cnpj).subscribe({
      next: lista => {
        this.listCategorias = lista;
      },
      error: erro => {
        if (erro.status === 404) {
          this.listCategorias = [];
          const errorMessage = erro.error || erro.message || 'Erro desconhecido';
          Swal.fire({
            position: "top-end",
            icon: 'error',
            title: errorMessage,
            showConfirmButton: true,
            confirmButtonText: "Fechar",
            timer: 3000
          });
        }
      },
    });
  }

  findById(id: number) {
    this.produtoProdutorService.findById(id).subscribe({
      next: retorno => {
        this.produtoProdutorResponseUnique = retorno;
        console.log(retorno);
        this.produtoProdutorRequest.nome = this.produtoProdutorResponseUnique.nome;
        this.produtoProdutorRequest.valorCusto = this.produtoProdutorResponseUnique.valorCusto;
        this.produtoProdutorRequest.valorVenda = this.produtoProdutorResponseUnique.valorVenda;
        this.produtoProdutorRequest.apareceEmDemandas = this.produtoProdutorResponseUnique.apareceEmDemandas;
        this.produtoProdutorRequest.grupoProdutos = this.produtoProdutorResponseUnique.grupoProdutosResponseUnique.idGrupoProduto;
        this.produtoProdutorRequest.idEmpresa = this.produtoProdutorResponseUnique.idProduto;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
  }

  postput() {
    if (this.produtoProdutorResponseUnique.idProduto > 0) {
      this.produtoProdutorRequest.idEmpresa = this.empresaId;
      this.produtoProdutorService.put(this.produtoProdutorRequest, this.produtoProdutorRequest.idEmpresa).subscribe({
        next: mensagem => {
          Swal.fire({
            title: 'Produto atualizada com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate(['admin/produtor/produto']);
        },
        error: erro => {
          const errorMessage = erro.error || 'Erro desconhecido';
          Swal.fire({
            title: 'Ocorreu um erro!',
            text: "",
            icon: 'success',
            position: "top-end",
            confirmButtonText: 'Ok',
          });
        }
      });
    } else {
      this.produtoProdutorRequest.idEmpresa = this.empresaId;
      this.produtoProdutorService.post(this.produtoProdutorRequest).subscribe({
        next: (res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: 'Produto criada com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/admin/produtor/produto']);
        },
        error: (erro) => {
          const errorMessage = erro.error || 'Erro desconhecido';
          Swal.fire({
            title: 'Ocorreu um erro!',
            text: "",
            icon: 'success',
            position: "top-end",
            confirmButtonText: 'Ok',
          });

        }
      });
    }
  }


}