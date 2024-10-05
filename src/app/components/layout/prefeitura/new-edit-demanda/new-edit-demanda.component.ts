import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { NgxPaginationModule } from 'ngx-pagination';
import { Produtoprefeituraresponselist } from '../../../../model/produtoprefeitura/dto/produtoprefeituraresponselist';
import { ProdutoprodutorService } from '../../../../services/produtoprodutor/produtoprodutor.service';
import { Produtoprodutorresponse } from '../../../../model/produtoprodutor/dto/produtoprodutorresponse';
import { ProdutoprefeituraService } from '../../../../services/produtoprefeitura/produtoprefeitura.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-new-edit-demanda',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule, CommonModule, MdbRippleModule, FormsModule, NgSelectModule],
  templateUrl: './new-edit-demanda.component.html',
  styleUrls: ['./new-edit-demanda.component.scss']
})
export class NewEditDemandaComponent {
  cnpj!: string;
  query: string = '';
  selectedProduto!: string | null;
  produtoPrefeituraResponseList: Produtoprefeituraresponselist[] = [];
  produtoService = inject(ProdutoprefeituraService);
  
  placeholder: string = 'Pesquisar produto';

  constructor() {
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.cnpj = usuarioData.prefeituraAssociation.cnpj;
    }
    this.findProdutos();
  }

  findProdutos() {
    this.produtoService.get(this.query, this.cnpj).subscribe({
      next: lista => {
        this.produtoPrefeituraResponseList = lista;
      },
      error: erro => {
        console.error("Erro ao buscar produtos", erro);
      }
    });
  }

  onProdutoSelect() {
    this.placeholder = this.selectedProduto ? '' : 'Pesquisar produto';
    
    // Exibir um alerta com o ID do produto selecionado
    if (this.selectedProduto) {
      alert(`Produto selecionado ID: ${this.selectedProduto}`);
    }
  }
  
}
