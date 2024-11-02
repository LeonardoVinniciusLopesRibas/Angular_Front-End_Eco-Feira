import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { PaisService } from '../../../../services/pais/pais.service';
import { EstadoService } from '../../../../services/estado/estado.service';
import { CidadeService } from '../../../../services/cidade/cidade.service';
import { Paisresponse } from '../../../../model/pais/dto/paisresponse';
import { Estadoresponse } from '../../../../model/estado/dto/estadoresponse';
import { Cidaderesponse } from '../../../../model/cidade/dto/cidaderesponse';
import Swal from 'sweetalert2';
import { Empresaassociation } from '../../../../model/empresa/empresaassociation';
import { NgxMaskDirective } from 'ngx-mask';
import { LoginService } from '../../../../auth/login.service';
import { Enderecorequest } from '../../../../model/endereco/dto/enderecorequest';
import { Empresarequest } from '../../../../model/empresa/dto/empresarequest';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import { EnderecoService } from '../../../../services/endereco/endereco.service';
import { PrefeituraService } from '../../../../services/prefeitura/prefeitura.service';
import { Prefeituraassociation } from '../../../../model/prefeitura/prefeituraassociation';
import { Prefeiturarequest } from '../../../../model/prefeitura/dto/prefeiturarequest';
import { ContatoService } from '../../../../services/contato/contato.service';
import { Contatorequest } from '../../../../model/contato/dto/contatorequest';
import { Contatoresponselist } from '../../../../model/contato/dto/contatoresponselist';
import {NotificationSwal} from "../../../../util/NotificationSwal";
import {NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'app-ajustesprefeitura',
  standalone: true,
    imports: [MdbRippleModule, FormsModule, RouterLink, CommonModule, MdbFormsModule, NgxMaskDirective, NgSelectComponent],
  templateUrl: './ajustesprefeitura.component.html',
  styleUrl: './ajustesprefeitura.component.scss'
})
export class AjustesprefeituraComponent {

  paisService = inject(PaisService);
  estadoService = inject(EstadoService);
  cidadeService = inject(CidadeService);
  prefeituraService = inject(PrefeituraService);
  enderecoService = inject(EnderecoService);
  contatoService = inject(ContatoService);

  listPais: Paisresponse[] = [];
  listEstado: Estadoresponse[] = [];
  listCidade: Cidaderesponse[] = [];
  contatos: Contatoresponselist[] = [];

  mostrarModal: boolean = false;
  queryPais: string = '';
  queryEstado: string = '';
  queryCidade: string = '';

  loginService = inject(LoginService);


  router = inject(Router);
  novoContato: Contatorequest = new Contatorequest();
  prefeitura: Prefeituraassociation = new Prefeituraassociation();
  enderecoRequest: Enderecorequest = new Enderecorequest();
  prefeituraRequest: Prefeiturarequest = new Prefeiturarequest();

  empresaId!: number;
  enderecoId!: number;
  prefeituraId!: number;

  constructor() {
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);

      this.prefeitura.endereco = this.prefeitura.endereco || {};
      this.prefeitura.endereco.cidade = this.prefeitura.endereco.cidade || {};
      this.prefeitura.endereco.cidade.estado = this.prefeitura.endereco.cidade.estado || {};
      this.prefeitura.endereco.cidade.estado.pais = this.prefeitura.endereco.cidade.estado.pais || {};

      this.prefeitura.endereco.cidade.estado.pais.idPais = usuarioData.prefeituraAssociation.endereco.cidade.estado.pais.idPais;
      this.prefeitura.endereco.cidade.estado.idEstado = usuarioData.prefeituraAssociation.endereco.cidade.estado.idEstado;
      this.prefeitura.endereco.cidade.idCidade = usuarioData.prefeituraAssociation.endereco.cidade.idCidade;

      this.prefeitura.nomeFantasia = this.prefeitura.nomeFantasia || '';
      this.prefeitura.nomeFantasia = usuarioData.prefeituraAssociation.nomeFantasia;

      this.prefeitura.razaoSocial = this.prefeitura.razaoSocial || '';
      this.prefeitura.razaoSocial = usuarioData.prefeituraAssociation.razaoSocial;

      this.prefeitura.cnpj = this.prefeitura.cnpj || '';
      this.prefeitura.cnpj = usuarioData.prefeituraAssociation.cnpj;

      this.prefeitura.endereco.cep = this.prefeitura.endereco.cep || '';
      this.prefeitura.endereco.cep = usuarioData.prefeituraAssociation.endereco.cep;

      this.prefeitura.endereco.logradouro = this.prefeitura.endereco.logradouro || '';
      this.prefeitura.endereco.logradouro = usuarioData.prefeituraAssociation.endereco.logradouro;

      this.prefeitura.endereco.numero = this.prefeitura.endereco.numero || '';
      this.prefeitura.endereco.numero = usuarioData.prefeituraAssociation.endereco.numero;

      this.prefeitura.endereco.bairro = this.prefeitura.endereco.bairro || '';
      this.prefeitura.endereco.bairro = usuarioData.prefeituraAssociation.endereco.bairro;

      this.empresaId = usuarioData.prefeituraAssociation.idEmpresa;
      this.enderecoId = usuarioData.prefeituraAssociation.endereco.idEndereco;
      this.prefeituraId = usuarioData.prefeituraAssociation.idPrefeitura;
      this.carregarContatos();

    }
    this.listarPaises();
    this.listarEstados();
    this.listarCidades();
  }

  onPaisChange(selectNameId: string) {

  }

  carregarContatos() {
    this.contatoService.get(this.prefeituraId.toString()).subscribe({
      next: (lista: Contatoresponselist[]) => {
        this.contatos = lista;
      },
      error: (erro) => {
        console.error("Erro ao encontrar contatos", erro);

      }
    });
  }

  abrirModal() {
    this.novoContato = new Contatorequest();
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  listarPaises() {
    this.paisService.get(this.queryPais).subscribe({
      next: lista => {
        this.listPais = lista;
      },
      error: erro => {
        if (erro.status === 404) {
          this.listPais = [];
          console.error("Erro ao encontrar países", erro);
        }
      }
    })
    //this.prefeitura.endereco.cidade.estado.idEstado = -1;
  }

  listarEstados() {
    this.estadoService.get(this.queryEstado, this.prefeitura.endereco.cidade.estado.pais.idPais).subscribe({
      next: lista => {
        this.listEstado = lista;
      },
      error: erro => {
        if (erro.status === 404) {
          this.listEstado = [];
          console.error("Erro ao encontrar estados", erro);
        }
      }

    })
  }

  listarCidades() {
    this.cidadeService.get(this.queryCidade, this.prefeitura.endereco.cidade.estado.idEstado).subscribe({
      next: lista => {
        this.listCidade = lista;
      },
      error: erro => {
        if (erro.status === 404) {
          this.listCidade = [];
          console.error("Erro ao encontrar cidades", erro);
        }
      }

    })
  }

  atualizarInformacoes() {
    Swal.fire({
      title: "Ao atualizar as informações, você precisará reiniciar?",
      text: "Você tem certeza?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim!",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {

        this.prefeituraRequest.nomeFantasia = this.prefeitura.nomeFantasia;
        this.prefeituraRequest.razaoSocial = this.prefeitura.razaoSocial;
        this.prefeituraRequest.cnpj = this.prefeitura.cnpj;

        this.enderecoRequest.cep = this.prefeitura.endereco.cep;
        this.enderecoRequest.logradouro = this.prefeitura.endereco.logradouro;
        this.enderecoRequest.numero = this.prefeitura.endereco.numero;
        this.enderecoRequest.bairro = this.prefeitura.endereco.bairro;
        this.enderecoRequest.cidadeId = this.prefeitura.endereco.cidade.idCidade;

        this.prefeituraService.put(this.prefeituraRequest, this.prefeituraId).subscribe({
          next: retorno =>{
            //alert('atualizadooo')
          },
          error: erro => {
            console.error(erro);
          }
        })

        this.enderecoService.put(this.enderecoRequest, this.enderecoId).subscribe({
          next: retorno =>{
            //alert('atualizadooo!!!')
          },
          error: erro => {
            console.error(erro);
          }
        })


        this.router.navigate(['/login']);
        this.loginService.removerToken();
        localStorage.removeItem('usuario');
        NotificationSwal.swalFire("Atualizado com sucesso.!", "success");
      }
    });
  }

  adicionarContato() {
    this.novoContato.prefeituraId = this.prefeituraId;
    this.contatoService.post(this.novoContato, this.prefeituraId).subscribe({
      next: () => {
        NotificationSwal.swalFire("Contato adicionado com sucesso.", "success");
        this.carregarContatos();
        this.fecharModal();
      },
      error: (erro) => {
        console.error("Erro ao adicionar novo contato: ",erro);

      }
    });
  }

  deletarContato(idPrefeitura: number) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'O contato será deletado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contatoService.delete(idPrefeitura).subscribe({
          next: () => {
            NotificationSwal.swalFire("Contato removido com sucesso.", "success");
            this.carregarContatos();
          },
          error: (erro) => {
            console.error("Erro ao excluir contato: ",erro);

          }
        });
      }
    });
  }

  limparEstado(){
    this.prefeitura.endereco.cidade.estado.idEstado = -1;
  }

  limparCidade(){
    this.prefeitura.endereco.cidade.idCidade = -1;
  }

}
