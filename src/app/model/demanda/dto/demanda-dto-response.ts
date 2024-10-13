import { StatusDemanda } from "../../../enum/status-demanda";

export class DemandaDtoResponse {

    idDemanda!: number;
    descricao!: string;
    valorTotalPrefeitura!: number;
    prazoMaximo!: string;
    statusDemanda!: StatusDemanda;

}
