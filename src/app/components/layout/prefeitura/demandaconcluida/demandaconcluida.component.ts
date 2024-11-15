import {Component, inject} from '@angular/core';
import {DemandaService} from "../../../../services/demanda/demanda.service";
import {DemandaDtoResponse} from "../../../../model/demanda/dto/demanda-dto-response";
import {CommonModule, CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-demandaconcluida',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf,
    NgIf,
    CommonModule,
    RouterLink
  ],
  templateUrl: './demandaconcluida.component.html',
  styleUrl: './demandaconcluida.component.scss'
})
export class DemandaconcluidaComponent {

  showTooltip: { [key: number]: boolean } = {};
  idPrefeitura!: number;
  demandaService = inject(DemandaService);
  filteredDemandas: DemandaDtoResponse[] = [];
  listDemandas: DemandaDtoResponse[] = [];

  constructor() {
    const usuarioStorage: string | null = localStorage.getItem('usuario');
    if(usuarioStorage){
      const usuarioData = JSON.parse(usuarioStorage);
      this.idPrefeitura = usuarioData.prefeituraAssociation.idPrefeitura;
    }
    this.listarDemanda();
  }

  listarDemanda(){
    this.demandaService.getFechada(this.idPrefeitura).subscribe({
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

}
