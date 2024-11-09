import {Component, inject} from '@angular/core';
import {DemandaService} from "../../../../services/demanda/demanda.service";
import {DemandaDtoResponse} from "../../../../model/demanda/dto/demanda-dto-response";
import {StatusDemanda} from "../../../../enum/status-demanda";
import {CommonModule} from "@angular/common";
import {NotificationSwal} from "../../../../util/NotificationSwal";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-minhasdemandas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './minhasdemandas.component.html',
  styleUrl: './minhasdemandas.component.scss'
})
export class MinhasdemandasComponent {

  showTooltip: { [key: number]: boolean } = {};
  demandaService = inject(DemandaService);
  demandaDtoResponse: DemandaDtoResponse[] = [];
  idEmpresa!: number;


  constructor() {
    const usuarioStorage: string | null = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.idEmpresa = usuarioData.empresaAssociation.idEmpresa;
    }
    this.getMyDemandas();
  }

  getMyDemandas(){
    this.demandaService.getDemandasToProductor(this.idEmpresa).subscribe({
      next: lista => {
        this.demandaDtoResponse = lista;
      }
      ,error: err => {
        console.log(err);
        if (err.status === 404) {
          this.demandaDtoResponse = [];
          NotificationSwal.swalFire("Não foi encontrado demandas", "info")
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
