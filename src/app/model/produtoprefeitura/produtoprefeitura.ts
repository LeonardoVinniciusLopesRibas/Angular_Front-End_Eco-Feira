import { Prefeituraassociation } from "../prefeitura/prefeituraassociation";

export class Produtoprefeitura {

    idProduto!: number;
    nome!: string;
    valorCompra!: number;
    prefeitura!: Prefeituraassociation;
    ativo!: boolean;
    dataHoraCriacao!: string;
    dataHoraAlteracao!: string;

}
