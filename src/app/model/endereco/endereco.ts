import { Cidade } from "../cidade/cidade";

export class Endereco {

    idEndereco!: number;
    logradouro!: string;
    numero!: string;
    complemento!: string;
    bairro!: string;

    cidade!: Cidade;

    ativo!: boolean;
    dataHoraCriacao!: string;
    dataHoraAlteracao!: string;
    cep!: string;

}
