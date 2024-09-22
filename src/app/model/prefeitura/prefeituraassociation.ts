import { Empresarequest } from "../empresa/dto/empresarequest";
import { Endereco } from "../endereco/endereco";

export class Prefeituraassociation {
    id!: number;
    nomeFantasia!: string;
    razaoSocial!: string;
    cnpj!: string;
    endereco!: Endereco;

}
