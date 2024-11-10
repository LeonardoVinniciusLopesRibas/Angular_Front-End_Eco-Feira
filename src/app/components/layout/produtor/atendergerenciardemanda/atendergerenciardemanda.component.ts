import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DemandaService} from "../../../../services/demanda/demanda.service";
import {
  DemandaassociaprodutorademandaService
} from "../../../../services/demandaassociaprodutorademanda/demandaassociaprodutorademanda.service";
import {Demandaresponseunique} from "../../../../model/demanda/dto/demandaresponseunique";
import {CommonModule} from "@angular/common";
import {
  Demandaprodutosassociadosunique
} from "../../../../model/demandaprodutosassociados/dto/demandaprodutosassociadosunique";
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import {PaginatorModule} from "primeng/paginator";
import {ngDebug} from "@angular/cli/src/utilities/environment-options";
import {
  DemandaquantidadeatendeprodutorService
} from "../../../../services/demandaquantidadeatendeprodutor/demandaquantidadeatendeprodutor.service";
import {NotificationSwal} from "../../../../util/NotificationSwal";

@Component({
  selector: 'app-atendergerenciardemanda',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, PaginatorModule],
  templateUrl: './atendergerenciardemanda.component.html',
  styleUrl: './atendergerenciardemanda.component.scss'
})
export class AtendergerenciardemandaComponent {

  activatedRoute = inject(ActivatedRoute);
  id!: number;
  demandaService = inject(DemandaService);
  demandaQuantidadeAssociaProdutor = inject(DemandaquantidadeatendeprodutorService);
  demandaResponseUnique: Demandaresponseunique = new Demandaresponseunique();
  demandaProdutos: Demandaprodutosassociadosunique[] = [];
  quantidade!: number;
  idProdutor!: number;
  quantidadeMap: { [key: number]: number } = {};

  constructor() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.id = id;
    if (id > 0) {
      this.findDemanda(this.id);
      this.getProducts(this.id)
    }
    const usuarioStorage: string | null = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.idProdutor = usuarioData.empresaAssociation.idEmpresa;
    }
  }

  findDemanda(id: number){
    this.demandaService.getId(this.id).subscribe({
      next: value => {
        this.demandaResponseUnique = value;
      },error: err => {
        console.error(err);
      }
    })
  }

  getProducts(id: number){
    this.demandaService.getProducts(this.id).subscribe({
      next: value => {
        this.demandaProdutos = value;
      },
      error: err => {
        console.error(err);
      }
    })
  }

  atender() {
    this.demandaProdutos.forEach(produto => {
      const quantidade = this.quantidadeMap[produto.idDemandaProduto];

      const quantidadeRestante = produto.quantidade - this.getQuantidadeAtendida(produto);

      if (quantidade > quantidadeRestante) {
        NotificationSwal.swalFire("A quantidade não pode ser maior que o restante", "error");
        return;
      }

      if (quantidade > 0) {
        this.demandaQuantidadeAssociaProdutor.atende(
          this.idProdutor,
          this.id,
          produto.idDemandaProduto,
          quantidade
        ).subscribe({
          next: response => {
            NotificationSwal.swalFire(`Produto atendido com sucesso!`, 'success');
            this.findDemanda(this.id);
            this.getProducts(this.id);
          },
          error: err => {
            console.error(`Erro ao atender produto ${produto.idDemandaProduto}:`, err);
          }
        });
      }
    });
  }

  getQuantidadeAtendida(produto: Demandaprodutosassociadosunique): number {
    const percentualAtendido = produto.saldo / 100;
    const quantidadeTotal = produto.quantidade;
    return Math.round(quantidadeTotal * percentualAtendido);
  }
}


/*
* this.demandaProdutos.forEach(produto => {
      const quantidade = produto.quantidade; // quantidade informada no input
      if (quantidade > 0) {
        this.demandaQuantidadeAssociaProdutor.atende(
          this.idProdutor,
          this.id,
          produto.idDemandaProduto,
          quantidade
        ).subscribe({
          next: () => NotificationSwal.swalFire("Sucesso", "success"),
          error: err => console.error(`Erro ao atender produto ${produto.idDemandaProduto}:`, err)
        });
      }
    });*/
