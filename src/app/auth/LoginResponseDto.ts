import { UsuarioResponseDto } from "./usuarioResponseDto";

export class LoginResponseDto {
  token!: string;
  usuario!: UsuarioResponseDto;

}
