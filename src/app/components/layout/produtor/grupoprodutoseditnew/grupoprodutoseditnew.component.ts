import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { Categoriarequest } from '../../../../model/categoria/dto/categoriarequest';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Categoriaresponseunique } from '../../../../model/categoria/dto/categoriaresponseunique';
import { Categoria } from '../../../../model/categoria/categoria';

@Component({
  selector: 'app-grupoprodutoseditnew',
  standalone: true,
  imports: [MdbRippleModule, FormsModule, RouterLink],
  templateUrl: './grupoprodutoseditnew.component.html',
  styleUrl: './grupoprodutoseditnew.component.scss'
})
export class GrupoprodutoseditnewComponent {

  categoriaService = inject(CategoriaService);
  usuario!: number;
  empresaId!: number;
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  categoriaRequest: Categoriarequest = new Categoriarequest();
  categoriaResponseUnique: Categoriaresponseunique = new Categoriaresponseunique();
  categoria: Categoria = new Categoria();

  constructor() {
    let id = this.activatedRoute.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
    const usuarioStorage = localStorage.getItem('usuario');

    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.usuario = usuarioData.id;
      this.empresaId = usuarioData.empresaAssociation.idEmpresa;
    }
  }

  findById(id: number) {

    this.categoriaService.findbyid(id).subscribe({
      next: retorno => {
        this.categoriaResponseUnique = retorno;
        this.categoriaRequest.descricaoGrupo = this.categoriaResponseUnique.descricaoGrupoProduto;
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

    if (this.categoriaResponseUnique.idGrupoProduto > 0) {
      this.categoriaRequest.usuarioId = this.usuario;
      this.categoriaRequest.empresaId = this.empresaId;

      this.categoriaService.put(this.categoriaRequest, this.categoriaResponseUnique.idGrupoProduto).subscribe({
        next: mensagem => {
          Swal.fire({
            title: 'Categoria atualizada com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate(['admin/produtor/grupoprodutos'])
        },
        error: erro => {
          console.error(erro);
          
        }
      });
    }

    else {
      this.categoriaRequest.usuarioId = this.usuario;
      this.categoriaRequest.empresaId = this.empresaId;

      this.categoriaService.post(this.categoriaRequest).subscribe({
        next: (res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: 'Categoria criada com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/admin/produtor/grupoprodutos']);
        },
        error: (erro) => {
          console.error('Erro ao criar categoria:', erro);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: 'Erro ao criar categoria!',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  }
}