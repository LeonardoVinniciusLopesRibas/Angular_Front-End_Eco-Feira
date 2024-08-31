import { Pais } from "../pais/pais";

export class Estado {

    idEstado!: number;
    nome!: string;
    sigla!: string;
    pais!: Pais;

    ativo!: boolean;
    dataHoraCriacao!: string;
    dataHoraAlteracao!: string;

}
