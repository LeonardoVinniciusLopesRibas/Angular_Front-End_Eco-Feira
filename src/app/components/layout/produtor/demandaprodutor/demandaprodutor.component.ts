import {Component, inject} from '@angular/core';
import {DemandaDtoResponse} from "../../../../model/demanda/dto/demanda-dto-response";
import {DemandaService} from "../../../../services/demanda/demanda.service";
import {CommonModule} from "@angular/common";
import Swal from "sweetalert2";
import {NotificationSwal} from "../../../../util/NotificationSwal";
import {
  DemandaassociaprodutorademandaService
} from "../../../../services/demandaassociaprodutorademanda/demandaassociaprodutorademanda.service";
import {Router, RouterLink} from "@angular/router";
import {
  Demandaprodutosassociadosunique
} from "../../../../model/demandaprodutosassociados/dto/demandaprodutosassociadosunique";

@Component({
  selector: 'app-demandaprodutor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './demandaprodutor.component.html',
  styleUrl: './demandaprodutor.component.scss'
})
export class DemandaprodutorComponent {

  ibge!: number;
  idEmpresa!: number;
  demandaDtoResponse: DemandaDtoResponse[] = [];
  produtosDemanda: Demandaprodutosassociadosunique[] = [];
  mostrarModalEspiar: boolean = false;
  demandaService = inject(DemandaService);
  router = inject(Router)
  demandaAssociaProdutorADemanda = inject(DemandaassociaprodutorademandaService);

  constructor() {
    const usuarioStorage: string | null = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);
      this.ibge = usuarioData.empresaAssociation.endereco.cidade.ibge;
      this.idEmpresa = usuarioData.empresaAssociation.idEmpresa;
    }
    this.listarDemandas();
  }

  listarDemandas(){
    this.demandaService.getByIbge(this.ibge, this.idEmpresa).subscribe({
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

  aceitarDemanda(idDemanda: number){
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você deseja mesmo aceitar essa demanda?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim!",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandaAssociaProdutorADemanda.post(this.idEmpresa, idDemanda).subscribe({
          next: value => {
            NotificationSwal.swalFire("Demanda aceita com sucesso.", "success");
            this.router.navigate(['/admin/produtor/myDemandas']);
          }
          ,error: err => {
            console.error("Ocorreu um erro: ", err)
          }
        })
      }
    });
  }

  abrirModalEspiar(idDemanda: number) {
    this.demandaService.getProducts(idDemanda).subscribe({
      next: produtos => {
        this.produtosDemanda = produtos;
        this.mostrarModalEspiar = true;
      },
      error: err => {
        console.error('Erro ao buscar produtos da demanda: ', err);
      }
    });
  }

  fecharModalEspiar() {
    this.mostrarModalEspiar = false;
    this.produtosDemanda = [];
  }

}
