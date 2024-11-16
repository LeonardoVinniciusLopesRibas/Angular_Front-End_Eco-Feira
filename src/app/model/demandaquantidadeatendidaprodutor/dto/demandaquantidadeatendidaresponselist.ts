import {Empresaassociation} from "../../empresa/empresaassociation";
import {Unidademedida} from "../../../enum/unidademedida";

export class Demandaquantidadeatendidaresponselist {

  id!: number;
  produtor!: string;
  cnpj!: string;
  quantidade!: number;
  unidadeMedida!: Unidademedida;

}
