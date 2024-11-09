import {Demanda} from "../demanda/demanda";
import {Produtoprefeitura} from "../produtoprefeitura/produtoprefeitura";
import {Prefeituraassociation} from "../prefeitura/prefeituraassociation";

export class Demandaprodutosassociados {

  idDemandaProduto!: number;
  demandas!: Demanda;
  produtoPrefeitura!: Produtoprefeitura;
  prefeitura!: Prefeituraassociation;
  quantidade!: number;
  valorPrefeitura!: number;
  saldo!: number;

}
