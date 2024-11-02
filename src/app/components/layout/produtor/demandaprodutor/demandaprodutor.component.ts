import {Component, inject} from '@angular/core';
import {DemandaDtoResponse} from "../../../../model/demanda/dto/demanda-dto-response";
import {DemandaService} from "../../../../services/demanda/demanda.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-demandaprodutor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demandaprodutor.component.html',
  styleUrl: './demandaprodutor.component.scss'
})
export class DemandaprodutorComponent {

  showTooltip: { [key: number]: boolean } = {};
  ibge!: number;
  demandaDtoResponse: DemandaDtoResponse[] = [];
  demandaService = inject(DemandaService);

  constructor() {
    const usuarioStorage: string | null = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.ibge = usuarioData.empresaAssociation.endereco.cidade.ibge;
    }
    this.listarDemandas();
  }

  listarDemandas(){
    this.demandaService.getByIbge(this.ibge).subscribe({
      next: value => {
        this.demandaDtoResponse = value;
        console.log(this.demandaDtoResponse);
      }
      ,error: err => {
        console.log(err);
        if (err.status === 404) {
          this.demandaDtoResponse = [];
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
