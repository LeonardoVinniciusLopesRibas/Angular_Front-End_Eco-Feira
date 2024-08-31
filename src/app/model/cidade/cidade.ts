import { Estado } from "../estado/estado";

export class Cidade {

    idCidade!: number;
    nome!: string;
    ibge!: string;
    estado!: Estado;
    
    ativo!: boolean;
    dataHoraCriacao!: string;
    dataHoraAlteracao!: string;

}
