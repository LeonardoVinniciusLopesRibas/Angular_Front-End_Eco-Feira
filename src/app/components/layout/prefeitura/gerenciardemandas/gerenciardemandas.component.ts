import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DemandaDtoRequest} from "../../../../model/demanda/dto/demanda-dto-request";
import {ProdutoprefeituraService} from "../../../../services/produtoprefeitura/produtoprefeitura.service";
import {Produtoprefeituraresponselist} from "../../../../model/produtoprefeitura/dto/produtoprefeituraresponselist";
import {NgSelectModule} from "@ng-select/ng-select";
import {Produtoprefeituraresponseunique} from "../../../../model/produtoprefeitura/dto/produtoprefeituraresponseunique";
import {CommonModule, CurrencyPipe, NgClass} from "@angular/common";
import {Toast} from "primeng/toast";
import Swal from "sweetalert2";
import {DemandaService} from "../../../../services/demanda/demanda.service";
import {RouterLink, ActivatedRoute, Router} from "@angular/router";
import {
  Demandaprodutosassociadosrequest
} from "../../../../model/demandaprodutosassociados/dto/demandaprodutosassociadosrequest";
import {NotificationSwal} from "../../../../util/NotificationSwal";

@Component({
  selector: 'app-gerenciardemandas',
  standalone: true,
  imports: [
    FormsModule,
    NgSelectModule,
    CurrencyPipe,
    NgClass,
    CommonModule,
    RouterLink
  ],
  templateUrl: './gerenciardemandas.component.html',
  styleUrl: './gerenciardemandas.component.scss'
})
export class GerenciardemandasComponent {

  gerenciarDemanda: DemandaDtoRequest = new DemandaDtoRequest();
  demandaService: DemandaService = inject(DemandaService);
  produtoService = inject(ProdutoprefeituraService);
  produtoDtoResponse: Produtoprefeituraresponselist[] = [];
  produtoResponse: Produtoprefeituraresponseunique = new Produtoprefeituraresponseunique();
  demandaProdutosRequest: Demandaprodutosassociadosrequest = new Demandaprodutosassociadosrequest();
  cnpj!: string;
  selectNameId!: number;
  produtosSelecionados: any[] = [];
  quantidadeProduto: number = 1;
  mostrarModal: boolean = false;
  router = inject(Router);
  prefeituraId!: number;
  demandaId!: number;

  constructor() {
    const usuarioStorage: string | null = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.cnpj = usuarioData.prefeituraAssociation.cnpj;
      this.prefeituraId = usuarioData.prefeituraAssociation.idPrefeitura;
    }
    this.getProdutos();
  }

  onDateChange(event: any) {
    this.gerenciarDemanda.prazoMaximo = event ? new Date(event).toISOString().split('T')[0] : '';
  }

  onProdutoChange(selectNameId: string) {

  }

  getProdutos() {
    this.produtoService.get('', this.cnpj).subscribe({
      next: lista => {
        console.log('Produtos recebidos:', lista);
        this.produtoDtoResponse = lista;
      },
      error: err => {
        console.error('Erro ao buscar produtos:', err);
        if (err.status === 404) {
          this.produtoDtoResponse = [];
        }
      }
    });
  }

  abrirModalQuantidade() {
    if (!this.selectNameId) {
      NotificationSwal.swalFire("Primeiro selecione o produto.", "info");
    } else {
      this.mostrarModal = true;
    }
  }


  fecharModal() {
    this.mostrarModal = false;
    this.quantidadeProduto = 1;
  }

  adicionarProduto() {
    if (!this.selectNameId) return;

    this.produtoService.findById(this.selectNameId).subscribe({
      next: produto => {
        const produtoComQuantidade = {...produto, quantidade: this.quantidadeProduto};

        const index = this.produtosSelecionados.findIndex(p => p.id === produto.id);
        if (index !== -1) {
          this.produtosSelecionados[index].quantidade += this.quantidadeProduto;
        } else {
          this.produtosSelecionados.push(produtoComQuantidade);
        }

        this.selectNameId = 0;

        this.fecharModal();
      },
      error: err => console.error('Erro ao adicionar produto:', err)
    });
  }


  removerProduto(id: number) {
    this.produtosSelecionados = this.produtosSelecionados.filter(p => p.id !== id);
  }

  calcularValorTotal(): number {
    return this.produtosSelecionados.reduce((total, produto) =>
      total + (produto.valorCompra * produto.quantidade), 0);
  }

  async salvarDemanda() {
    try {
      this.gerenciarDemanda.valorTotalPrefeitura = this.calcularValorTotal();

      if ((this.gerenciarDemanda.descricao || '').trim().length === 0) {
        await Swal.fire({
          icon: 'error',
          title: 'Descrição não foi informada',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
        return;
      } else if (isNaN(this.gerenciarDemanda.valorTotalPrefeitura) || this.gerenciarDemanda.valorTotalPrefeitura <= 0) {
        await Swal.fire({
          icon: 'error',
          title: 'Informe ao menos um produto',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
        return;
      } else if (!this.gerenciarDemanda.prazoMaximo) {
        await Swal.fire({
          icon: 'error',
          title: 'Prazo máximo não foi informado',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
        return;
      }

      this.gerenciarDemanda.idPrefeitura = this.prefeituraId;

      const demandaId2 = await this.demandaService.post(this.gerenciarDemanda).toPromise();
      console.log('Demanda ID recebido:', demandaId2);
      this.demandaId = demandaId2 ?? 0;
      const result = await Swal.fire({
        title: 'Demanda cadastrada com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      if (result.isConfirmed) {
        this.router.navigate(['/admin/prefeitura/demanda']);
      }

      this.gerenciarDemanda = new DemandaDtoRequest();

    } catch (error) {
      console.error('Erro ao salvar demanda:', error);
    }

    console.log("Produtos selecionados: ", this.produtosSelecionados)
    for (const produto of this.produtosSelecionados) {
      this.demandaProdutosRequest.demanda = this.demandaId;
      this.demandaProdutosRequest.produto = produto.id;
      this.demandaProdutosRequest.quantidade = produto.quantidade;
      this.demandaProdutosRequest.prefeitura = this.prefeituraId;
      this.demandaProdutosRequest.valorPrefeitura = produto.valorCompra;

      console.log(this.demandaProdutosRequest);

      this.demandaService.postProdutosAssociados(this.demandaProdutosRequest).subscribe({
        next: (result) => {
          console.log('Produto associado com sucesso:', result);
        },
        error: err => {
          console.log("Ocorreu um erro ao associar o produto:", err);
        }
      });
    }
  }
}
