import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login';
import { Usuario } from './usuario';
import { LoginResponseDto } from './LoginResponseDto'; 
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UsuarioResponseDto } from './usuarioResponseDto';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { API_BASE_URL } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API = `${API_BASE_URL}api/usuario/login`;
  private inactivityTimeout: any;
  router = inject(Router);


  constructor(private http: HttpClient) {
    this.resetInactivityTimeout();
    this.setupInactivityListener();
  }

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
      return decodedToken;
    }
    return "";
  }
  

  hasPermission(role: string) {
    const user = this.jwtDecode() as any;
    
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
  
  private resetInactivityTimeout() {
    if (this.router.url !== '/login') {
    this.clearInactivityTimeout();

    this.inactivityTimeout = setTimeout(() => {
      this.removerToken();
      this.router.navigate(['/login']);
      
    },  3600000);
    }
  }

  private clearInactivityTimeout() {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }
  }

  private setupInactivityListener() {
    document.addEventListener('mousemove', () => this.resetInactivityTimeout());
    document.addEventListener('keypress', () => this.resetInactivityTimeout());
    document.addEventListener('click', () => this.resetInactivityTimeout());
  }

}