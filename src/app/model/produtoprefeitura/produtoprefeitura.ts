import { Prefeituraassociation } from "../prefeitura/prefeituraassociation";
import {Unidademedida} from "../../enum/unidademedida";

export class Produtoprefeitura {

    idProduto!: number;
    nome!: string;
    valorCompra!: number;
    prefeitura!: Prefeituraassociation;
    ativo!: boolean;
    dataHoraCriacao!: string;
    dataHoraAlteracao!: string;
    unidadeMedida!: string;

}
