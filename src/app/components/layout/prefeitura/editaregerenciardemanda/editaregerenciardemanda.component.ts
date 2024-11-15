import {Component, ElementRef, HostListener, inject, OnInit} from '@angular/core';
import {Demandaresponseunique} from '../../../../model/demanda/dto/demandaresponseunique';
import {StatusDemanda} from '../../../../enum/status-demanda';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {
  Demandaprodutosassociadosunique
} from '../../../../model/demandaprodutosassociados/dto/demandaprodutosassociadosunique';
import {FormsModule} from "@angular/forms";
import Swal from "sweetalert2";
import {DemandaService} from "../../../../services/demanda/demanda.service";
import {Demandarequestput} from "../../../../model/demanda/dto/demandarequestput";
import {NotificationSwal} from "../../../../util/NotificationSwal";
import {
  DemandaquantidadeatendeprodutorService
} from "../../../../services/demandaquantidadeatendeprodutor/demandaquantidadeatendeprodutor.service";
import {
  Demandaquantidadeatendidaresponselist
} from "../../../../model/demandaquantidadeatendidaprodutor/dto/demandaquantidadeatendidaresponselist";

@Component({
  selector: 'app-editaregerenciardemanda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editaregerenciardemanda.component.html',
  styleUrl: './editaregerenciardemanda.component.scss',
})
export class EditaregerenciardemandaComponent implements OnInit {
  demandaResponseUnique: Demandaresponseunique = new Demandaresponseunique();
  activatedRoute = inject(ActivatedRoute);
  demandaprodutoassociadosunique: Demandaprodutosassociadosunique[] = [];
  isDropdownOpen: boolean[] = [];
  mostrarModal: boolean = false;
  mostrarModal2: boolean = false;
  novaData: string = '';
  descricao!: string;
  demandaService = inject(DemandaService);
  id!: number;
  demandarequestput: Demandarequestput = new Demandarequestput();
  isMonitoring: boolean = false;
  demandaQuantidadeAtendeProdutor = inject(DemandaquantidadeatendeprodutorService);
  quantidadeAtendida: Demandaquantidadeatendidaresponselist[] = [];


  constructor(private eRef: ElementRef) {

    let id = this.activatedRoute.snapshot.params['id'];
    this.id = id;
    if (id > 0) {
      this.findById(id);
      this.findProducts(id);
    }

  }

  ngOnInit() {
    this.startMonitoring();
  }


  startMonitoring() {
    if (!this.isMonitoring) {
      this.isMonitoring = true;
      setInterval(() => {
        this.monitorSaldo();
      }, 1000);
    }
  }

  monitorSaldo() {
    let allProductsCompleted = this.demandaprodutoassociadosunique.every((produto) => produto.saldo === 100);

    if (allProductsCompleted) {
      this.concluirDemandaAutomaticamente();
    }else{
      this.abrirDemandaAutomaticamente();
    }
  }

  isCancelarDisabled(): boolean {
    return this.demandaprodutoassociadosunique.some(produto => produto.saldo > 0);
  }

  findById(id: number) {
    this.demandaService.getId(id).subscribe({
      next: value => {
        this.demandaResponseUnique = value;
      },
      error: err => {
        console.error('Error fetching demand:', err);
      }
    });
  }

  findProducts(idDemanda: number) {
    this.demandaService.getProducts(idDemanda).subscribe({
      next: value => {
        this.demandaprodutoassociadosunique = value;
      },
      error: err => {
        console.error('Error', err);
      }
    });
  }


  toggleDropdown(index: number, event: Event) {
    event.stopPropagation();
    this.isDropdownOpen[index] = !this.isDropdownOpen[index];
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen.fill(false);
    }
  }

  opcaoSelecionada(opcao: string) {
    console.log(`Opção selecionada: ${opcao}`);

    switch (opcao) {
      case 'EstenderPrazo':
        this.abrirModal();
        break;
      case 'Cancelar':
        this.cancelarDemanda();
        break;
      case 'Concluir':
        this.concluirDemanda();
        break;
      default:
        console.warn('Opção não reconhecida');
        break;
    }
  }

  abrirModal() {
    this.novaData = this.demandaResponseUnique.prazoMaximo;
    this.descricao = this.demandaResponseUnique.descricao;
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }


  abrirModal2(idDemandaProduto: number): void {
    // Buscar os dados de atendimento e abrir o modal
    this.demandaQuantidadeAtendeProdutor.getAtendimento(this.demandaResponseUnique.id, idDemandaProduto).subscribe({
      next: value => {
        this.quantidadeAtendida = value; // Atualiza a lista com os dados retornados
        this.mostrarModal2 = true; // Exibe o modal
      },
      error: (err) => {
        console.error('Erro ao carregar atendimentos:', err);
      }
    });
  }
  fecharModal2(): void {
    this.mostrarModal2 = false; // Fecha o modal
  }

  excluirAtendimento(id: number, quantidade: number): void {
    // Chamar o serviço para excluir o atendimento
    this.demandaQuantidadeAtendeProdutor.deletarAtendimento(id, this.demandaResponseUnique.id, quantidade).subscribe({
      next: () => {
        // Remove o item excluído da lista local
        this.quantidadeAtendida = this.quantidadeAtendida.filter(item => item.id !== id);
      },
      error: (err) => {
        console.error('Erro ao excluir atendimento:', err);
      }
    });
  }

  editarSalvar() {
    const dataAtual = new Date();
    const novaDataSelecionada = new Date(this.novaData);

    if (novaDataSelecionada <= dataAtual) {
      NotificationSwal.swalFire("A nova data precisa ser maior que a atual.", "info");
      return;
    }

    this.demandaResponseUnique.prazoMaximo = this.novaData;
    this.demandaResponseUnique.descricao = this.descricao;
    this.demandarequestput.prazoMaximo = this.demandaResponseUnique.prazoMaximo;
    this.demandarequestput.descricao = this.demandaResponseUnique.descricao;

    console.log(this.demandaResponseUnique.prazoMaximo);
    console.log(this.demandarequestput.prazoMaximo);

    this.demandaService.put(this.demandarequestput, this.id).subscribe({
      next: () => {
        NotificationSwal.swalFire("Demanda atualizada com sucesso.", "success");

        this.fecharModal();
        this.findById(this.id);
        this.findProducts(this.id);
      },
      error: (err) => {
        console.error("Ocorreu um erro ao atualizar a demanda", err);

      },
    });
  }


  cancelarDemanda() {
    Swal.fire({
      title: "Certeza?",
      text: "Você deseja realmente cancelar essa demanda?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Não, me enganei!",
      confirmButtonText: "Sim, cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandaService.putCancelada(this.id).subscribe({
          next: value => {
            NotificationSwal.swalFire("Demanda cancelada com sucesso.", "success");
          }
          , error: err => {
            console.log('O erro é: ', err);
          }
        })
      }
    });
  }

  concluirDemanda() {
    Swal.fire({
      title: "Certeza?",
      text: "Você deseja realmente concluir essa demanda?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Não, me enganei!",
      confirmButtonText: "Sim, concluir!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandaService.putConcluido(this.id).subscribe({
          next: () => {
            NotificationSwal.swalFire("Demanda concluída com sucesso.", "success");
          },
          error: err => {
            console.error('Erro ao concluir demanda', err);
          }
        });
      }
    });
  }

  concluirDemandaAutomaticamente() {
    this.demandaService.putConcluido(this.id).subscribe({
      next: () => {
        this.findById(this.id);
        this.findProducts(this.id);
      },
      error: err => {
        console.error('Erro ao concluir demanda', err);
      }
    });
  }

  abrirDemandaAutomaticamente() {
    this.demandaService.putAberto(this.id).subscribe({
      next: () => {
        this.findById(this.id);
        this.findProducts(this.id);
      },
      error: err => {
        console.error('Erro ao abrir demanda', err);
      }
    });
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
