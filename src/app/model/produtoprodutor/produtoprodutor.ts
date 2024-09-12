import { Categoria } from "../categoria/categoria";
import { Empresaassociation } from "../empresa/empresaassociation";

export class Produtoprodutor {
    id!: number;
    nome!: string;
    valorCusto!: number;
    valorVenda!: number;
    categoria!: Categoria;
    empresa!: Empresaassociation;
    apareceEmDemandas!: boolean;
    ativo!: boolean;
    dataHoraCriacao!: string;
}
