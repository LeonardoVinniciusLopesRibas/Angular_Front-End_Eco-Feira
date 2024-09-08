import { inject, Injectable } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../api/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/usuario`;

  constructor() { }
  
  post(id: number, idEmpresa: number): Observable<any>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    
    return this.http.post(`${this.API}/post/${id}`, idEmpresa, { headers, observe: 'response', responseType: 'text' });
  }

}
