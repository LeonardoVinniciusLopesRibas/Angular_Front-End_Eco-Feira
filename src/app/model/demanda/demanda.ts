import { StatusDemanda } from "../../enum/status-demanda";
import { Prefeituraassociation } from "../prefeitura/prefeituraassociation";

export class Demanda {

    id!: number;
    prefeitura!: Prefeituraassociation;
    ativo!: boolean;
    dataCriacao!: string;
    valorTotalPrefeitura!: number;
    prazoMaximo!: string;
    statusDemanda!: StatusDemanda;

}
