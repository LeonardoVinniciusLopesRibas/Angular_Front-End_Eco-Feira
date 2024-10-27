import {Component, inject} from '@angular/core';
import {DemandaDtoResponse} from "../../../../model/demanda/dto/demanda-dto-response";
import {StatusDemanda} from "../../../../enum/status-demanda";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {DemandaService} from "../../../../services/demanda/demanda.service";

@Component({
  selector: 'app-gerirdemanda',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './gerirdemanda.component.html',
  styleUrl: './gerirdemanda.component.scss'
})
export class GerirdemandaComponent {
  showTooltip: { [key: number]: boolean } = {};
  demandas: DemandaDtoResponse[] = [];
  demandaService = inject(DemandaService);
  prefeituraId!: number;

  constructor() {
    const usuarioStorage: string | null = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.prefeituraId = usuarioData.prefeituraAssociation.idPrefeitura;
    }
    this.listarDemandas();
  }

  listarDemandas(){
    this.demandaService.getAberta(this.prefeituraId).subscribe({
      next: lista => {
        this.demandas = lista;
      },
      error: err =>{

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
