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
import {NotificationSwal} from "../../../../util/NotificationSwal";

@Component({
  selector: 'app-ajustes',
  standalone: true,
  imports: [MdbRippleModule, FormsModule, RouterLink, CommonModule, MdbFormsModule, NgxMaskDirective],
  templateUrl: './ajustes.component.html',
  styleUrl: './ajustes.component.scss'
})
export class AjustesComponent {

  paisService = inject(PaisService);
  estadoService = inject(EstadoService);
  cidadeService = inject(CidadeService);
  empresaService = inject(EmpresaService);
  enderecoService = inject(EnderecoService);

  listPais: Paisresponse[] = [];
  listEstado: Estadoresponse[] = [];
  listCidade: Cidaderesponse[] = [];

  queryPais: string = '';
  queryEstado: string = '';
  queryCidade: string = '';

  loginService = inject(LoginService);


  router = inject(Router);
  empresa: Empresaassociation = new Empresaassociation();
  enderecoRequest: Enderecorequest = new Enderecorequest();
  empresaRequest: Empresarequest = new Empresarequest();

  empresaId!: number;
  enderecoId!: number;

  constructor() {
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuarioData = JSON.parse(usuarioStorage);

      this.empresa.endereco = this.empresa.endereco || {};
      this.empresa.endereco.cidade = this.empresa.endereco.cidade || {};
      this.empresa.endereco.cidade.estado = this.empresa.endereco.cidade.estado || {};
      this.empresa.endereco.cidade.estado.pais = this.empresa.endereco.cidade.estado.pais || {};

      this.empresa.endereco.cidade.estado.pais.idPais = usuarioData.empresaAssociation.endereco.cidade.estado.pais.idPais;
      this.empresa.endereco.cidade.estado.idEstado = usuarioData.empresaAssociation.endereco.cidade.estado.idEstado;
      this.empresa.endereco.cidade.idCidade = usuarioData.empresaAssociation.endereco.cidade.idCidade;

      this.empresa.nomeFantasia = this.empresa.nomeFantasia || '';
      this.empresa.nomeFantasia = usuarioData.empresaAssociation.nomeFantasia;

      this.empresa.razaoSocial = this.empresa.razaoSocial || '';
      this.empresa.razaoSocial = usuarioData.empresaAssociation.razaoSocial;

      this.empresa.cnpj = this.empresa.cnpj || '';
      this.empresa.cnpj = usuarioData.empresaAssociation.cnpj;

      this.empresa.numeroTelefone = this.empresa.numeroTelefone || '';
      this.empresa.numeroTelefone = usuarioData.empresaAssociation.numeroTelefone;

      this.empresa.email = this.empresa.email || '';
      this.empresa.email = usuarioData.empresaAssociation.email;

      this.empresa.atividadePrincipal = this.empresa.atividadePrincipal || '';
      this.empresa.atividadePrincipal = usuarioData.empresaAssociation.atividadePrincipal;

      this.empresa.descricao = this.empresa.descricao || '';
      this.empresa.descricao = usuarioData.empresaAssociation.descricao;

      this.empresa.endereco.cep = this.empresa.endereco.cep || '';
      this.empresa.endereco.cep = usuarioData.empresaAssociation.endereco.cep;

      this.empresa.endereco.logradouro = this.empresa.endereco.logradouro || '';
      this.empresa.endereco.logradouro = usuarioData.empresaAssociation.endereco.logradouro;

      this.empresa.endereco.numero = this.empresa.endereco.numero || '';
      this.empresa.endereco.numero = usuarioData.empresaAssociation.endereco.numero;

      this.empresa.endereco.bairro = this.empresa.endereco.bairro || '';
      this.empresa.endereco.bairro = usuarioData.empresaAssociation.endereco.bairro;

      this.empresaId = usuarioData.empresaAssociation.idEmpresa;
      this.enderecoId = usuarioData.empresaAssociation.endereco.idEndereco;


    }
    this.listarPaises();
    this.listarEstados();
    this.listarCidades();
  }

  listarPaises() {
    this.paisService.get(this.queryPais).subscribe({
      next: lista => {
        this.listPais = lista;
      },
      error: erro => {
        if (erro.status === 404) {
          this.listPais = [];
          console.error("Ocorreu um erro:", erro);
        }
      }
    })
  }

  listarEstados() {
    this.estadoService.get(this.queryEstado, this.empresa.endereco.cidade.estado.pais.idPais).subscribe({
      next: lista => {
        this.listEstado = lista;
      },
      error: erro => {
        if (erro.status === 404) {
          this.listEstado = [];
          console.error("Ocorreu um erro: ", erro)
        }
      }

    })
  }

  listarCidades() {
    this.cidadeService.get(this.queryCidade, this.empresa.endereco.cidade.estado.idEstado).subscribe({
      next: lista => {
        this.listCidade = lista;
      },
      error: erro => {
        if (erro.status === 404) {
          this.listCidade = [];
          console.error("Ocorreu um erro: ", erro)
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

        this.empresaRequest.nomeFantasia = this.empresa.nomeFantasia;
        this.empresaRequest.razaoSocial = this.empresa.razaoSocial;
        this.empresaRequest.numeroTelefone = this.empresa.numeroTelefone;
        this.empresaRequest.email = this.empresa.email;
        this.empresaRequest.atividadePrincipal = this.empresa.atividadePrincipal;
        this.empresaRequest.descricao = this.empresa.descricao;

        this.enderecoRequest.cep = this.empresa.endereco.cep;
        this.enderecoRequest.logradouro = this.empresa.endereco.logradouro;
        this.enderecoRequest.numero = this.empresa.endereco.numero;
        this.enderecoRequest.bairro = this.empresa.endereco.bairro;
        this.enderecoRequest.cidadeId = this.empresa.endereco.cidade.idCidade;

        this.empresaService.put(this.empresaRequest, this.empresaId).subscribe({
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
        NotificationSwal.swalFire("Deslogado.", "success");
      }
    });
  }
}
