import {Component, inject} from '@angular/core';
import {DemandaDtoResponse} from "../../../../model/demanda/dto/demanda-dto-response";
import {StatusDemanda} from "../../../../enum/status-demanda";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {DemandaService} from "../../../../services/demanda/demanda.service";
import Swal from "sweetalert2";
import {NotificationSwal} from "../../../../util/NotificationSwal";

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
      error: erro => {
        if (erro.status === 404) {
          this.demandas = [];
          NotificationSwal.swalFire("Não há demandas em aberto.", "info");
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
