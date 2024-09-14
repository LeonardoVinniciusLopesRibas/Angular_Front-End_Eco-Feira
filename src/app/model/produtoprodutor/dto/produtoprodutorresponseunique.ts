import { Categoriaresponseunique } from "../../categoria/dto/categoriaresponseunique";

export class Produtoprodutorresponseunique {
    idProduto!: number;
    nome!: string;
    valorCusto!: number;
    valorVenda!: number;
    grupoProdutosResponseUnique!: Categoriaresponseunique;
    apareceEmDemandas!: boolean;
}
