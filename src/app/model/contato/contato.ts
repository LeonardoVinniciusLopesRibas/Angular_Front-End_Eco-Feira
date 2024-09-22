import { Prefeituraassociation } from "../prefeitura/prefeituraassociation";

export class Contato {

    idPrefeitura!: number;
    prefeitura!: Prefeituraassociation;
    descricaoContato!: string;
    numeroTelefone!: string;
    email!: string;
    ativo!: string;
    dataHoraCriacao!: string;
    dataHoraAlteracao!: string;

}
