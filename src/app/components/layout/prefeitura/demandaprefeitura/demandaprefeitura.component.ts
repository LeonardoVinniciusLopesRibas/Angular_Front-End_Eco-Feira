import { Component, inject } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";
import {CommonModule} from "@angular/common";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {FormsModule} from "@angular/forms";
import {DemandaDtoResponse} from "../../../../model/demanda/dto/demanda-dto-response";
import {DemandaService} from "../../../../services/demanda/demanda.service";

@Component({
  selector: 'app-demandaprefeitura',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule, CommonModule, MdbRippleModule, FormsModule],
  templateUrl: './demandaprefeitura.component.html',
  styleUrl: './demandaprefeitura.component.scss'
})
export class DemandaprefeituraComponent {

  listDemandas: DemandaDtoResponse[] = [];
  filteredDemandas: DemandaDtoResponse[] = [];
  page: number = 1;
  demandaService = inject(DemandaService);
  itemsPerPage: number = 10;
  idPrefeitura!: number;
  pageSizeOptions: number[] = [10, 20, 50, 200];

  constructor() {
    const usuarioStorage: string | null = localStorage.getItem('usuario');
    if(usuarioStorage){
      const usuarioData = JSON.parse(usuarioStorage);
      this.idPrefeitura = usuarioData.prefeituraAssociation.idPrefeitura;
    }
    this.listarDemanda();
  }

  listarDemanda(){
    this.demandaService.get(this.idPrefeitura).subscribe({
      next: lista => {
        this.listDemandas = lista;
        this.filteredDemandas = lista;
      },
      error: err => {
        if (err.status === 404){
          this.listDemandas = [];
        }
      }
    })
  }

  onItemsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = +selectElement.value;
    this.page = 1;
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'ABERTA':
        return 'status-aberta';
      case 'CONCLUIDA':
        return 'status-concluida';
      case 'CANCELADA':
        return 'status-cancelada';
      default:
        return '';
    }
  }

  filterByStatus(status: string) {
    console.log(`Filtro selecionado: ${status}`);
    if (status === 'TODOS') {
      this.filteredDemandas = this.listDemandas;
    } else {
      this.filteredDemandas = this.listDemandas.filter(
        demanda => demanda.statusDemanda === status
      );
    }
    this.page = 1;
  }

}
