import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {DemandaService} from "../demanda/demanda.service";

@Injectable({
  providedIn: 'root'
})
export class MonitoramentoDemandaService {

  /*private isMonitoring: boolean = false;
  private demandaConcluidaSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private demandaService: DemandaService) {}

  startMonitoring(demandaId: number) {
    if (!this.isMonitoring) {
      this.isMonitoring = true;
      this.monitorSaldo(demandaId);
    }
  }

  private monitorSaldo(demandaId: number) {
    setInterval(() => {
      this.demandaService.getProducts(demandaId).subscribe({
        next: (produtos) => {
          const allProductsCompleted = produtos.every((produto) => produto.saldo === 100);
          if (allProductsCompleted) {
            this.demandaConcluidaSubject.next(true);
            this.concluirDemanda(demandaId);
          }
        },
        error: (err) => {
          console.error("Erro ao monitorar saldo", err);
        }
      });
    }, 1000);
  }

  private concluirDemanda(demandaId: number) {
    this.demandaService.putConcluido(demandaId).subscribe({
      next: () => {
        console.log("Demanda concluída automaticamente.");
      },
      error: (err) => {
        console.error("Erro ao concluir demanda", err);
      }
    });
  }

  get demandaConcluida$() {
    return this.demandaConcluidaSubject.asObservable();
  }*/
}
