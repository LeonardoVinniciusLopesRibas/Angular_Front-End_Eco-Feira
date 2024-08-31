import { Empresaassociation } from "../model/empresa/empresaassociation";
import { Prefeituraassociation } from "../model/prefeitura/prefeituraassociation";

export class UsuarioResponseDto {
    id!: number;
    usuario!: string;
    perfil!: string;
    suporte!: boolean;
    produtor!: boolean;
    prefeitura!: boolean;

    empresaAssociation!: Empresaassociation;
    prefeituraAssociation!: Prefeituraassociation;
  }