import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ProdutoprefeituraService } from '../../../../services/produtoprefeitura/produtoprefeitura.service';
import { Produtoprefeiturarequest } from '../../../../model/produtoprefeitura/dto/produtoprefeiturarequest';
import { Produtoprefeituraresponseunique } from '../../../../model/produtoprefeitura/dto/produtoprefeituraresponseunique';
import { Produtoprefeitura } from '../../../../model/produtoprefeitura/produtoprefeitura';
import {NgxMaskDirective} from "ngx-mask";

@Component({
  selector: 'app-produtoprefeituraeditnew',
  standalone: true,
  imports: [MdbRippleModule, FormsModule, RouterLink, CommonModule, MdbFormsModule, NgxMaskDirective],
  templateUrl: './produtoprefeituraeditnew.component.html',
  styleUrl: './produtoprefeituraeditnew.component.scss'
})
export class ProdutoprefeituraeditnewComponent {
  produtoPrefeituraService = inject(ProdutoprefeituraService);
  cnpj!: string;
  prefeituraId!: number;
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  query: string = '';
  produtoprefeiturarequest: Produtoprefeiturarequest = new Produtoprefeiturarequest();
  produtoResponseUnique: Produtoprefeituraresponseunique = new Produtoprefeituraresponseunique();
  produtoPrefeitura: Produtoprefeitura = new Produtoprefeitura();

  id!: number;
  constructor() {
    let id = this.activatedRoute.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
    const usuarioStorage = localStorage.getItem('usuario');

    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.prefeituraId = usuarioData.prefeituraAssociation.idPrefeitura;
      this.cnpj = usuarioData.prefeituraAssociation.cnpj;
    }
  }


  findById(id: number) {
    this.produtoPrefeituraService.findById(id).subscribe({
      next: retorno => {
        this.produtoResponseUnique = retorno;
        console.log(retorno);
        this.produtoprefeiturarequest.nome = this.produtoResponseUnique.nome;
        this.produtoprefeiturarequest.valorCompra = this.produtoResponseUnique.valorCompra;
      },
      error: erro => {
        console.error("Ocorreu um erro ao buscar o produto: ",erro)
      }
    });
  }

  postput() {
    this.produtoprefeiturarequest.nome = this.produtoResponseUnique.nome;
    this.produtoprefeiturarequest.valorCompra = this.produtoResponseUnique.valorCompra;
    if((this.produtoprefeiturarequest.nome || '').trim().length === 0){
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Nome não foi informado"
      });
      return;
    } else if (isNaN(this.produtoprefeiturarequest.valorCompra) || this.produtoprefeiturarequest.valorCompra <= 0) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Valor de custo deve ser um número positivo"
      });
      return;
    }


    if (this.produtoResponseUnique.id > 0) {
       this.id = this.produtoResponseUnique.id;
      //this.produtoprefeiturarequest.idEmpresa = this.prefeituraId;
      this.produtoPrefeituraService.put(this.produtoprefeiturarequest, this.produtoResponseUnique.id).subscribe({
        next: mensagem => {
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
            icon: "success",
            title: "Produto atualizado com sucesso."
          });
          this.router.navigate(['admin/prefeitura/produto']);
        },
        error: erro => {
          console.error("Ocorreu um erro: ", erro);
        }
      });
    } else {
      //this.produtoProdutorRequest.idEmpresa = this.empresaId;
      this.produtoPrefeituraService.post(this.produtoprefeiturarequest, this.prefeituraId).subscribe({
        next: (res) => {
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
            icon: "success",
            title: "Produto cadastrado com sucesso."
          });
          this.router.navigate(['/admin/prefeitura/produto']);
        },
        error: (erro) => {
          console.error("Ocorreu um erro: ", erro)

        }
      });
    }
  }


}
