import { Empresaassociation } from "../model/empresa/empresaassociation";
import { Prefeituraassociation } from "../model/prefeitura/prefeituraassociation";

export class Usuario {
    id!: number;
    username!: string;
    password!: string;
    role!: string;
    suporte!: boolean;
    produtor!: boolean;
    prefeitura!: boolean;

    empresaAssociation!: Empresaassociation;
    prefeituraAssociation!: Prefeituraassociation;
  }