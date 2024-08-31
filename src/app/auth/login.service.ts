import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login';
import { Usuario } from './usuario';
import { LoginResponseDto } from './LoginResponseDto'; 
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UsuarioResponseDto } from './usuarioResponseDto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API = "http://192.168.1.107:8080/api/usuario/login";


  constructor(private http: HttpClient) { }

  logar(login: Login): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(this.API, login, {});
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      console.log('Token decodificado:', decodedToken);
      return decodedToken;
    }
    return "";
  }
  

  hasPermission(role: string) {
    const user = this.jwtDecode() as any;
    console.log('Usuário decodificado:', user);
    
    if (user.perfil === role) {
      return true;
    }
    return false;
  }
  
  
  

  getUsuarioLogado() {
    return this.jwtDecode() as Usuario;
  }

  getUsuario(): UsuarioResponseDto | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
  

}