import {StatusDemanda} from "../../../enum/status-demanda";

export class Demandaresponseunique {
  id!: number;
  dataCriacao!: string;
  valorTotalPrefeitura!: number;
  prazoMaximo!: string;
  statusDemanda!: StatusDemanda;
  descricao!: string;
}
