import { Endereco } from "../endereco/endereco";

export class Empresaassociation {

    id!: number;
    nomeFantasia!: string;
    razaoSocial!: string;
    cnpj!: string;
    numeroTelefone!: string;
    email!: string;
    atividadePrincipal!: string;
    descricao!: string;
    endereco!: Endereco;
    ativo!: boolean;
    dataHoraCriacao!: string;
    dataHoraAlteracao!: string;
    

}
