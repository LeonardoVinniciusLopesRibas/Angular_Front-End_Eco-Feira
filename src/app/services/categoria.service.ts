import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../api/api';
import { Categoriaresponse } from '../model/categoria/dto/categoriaresponse';
import { Observable } from 'rxjs';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/grupoprodutos`;
  

  constructor() { }

  get(query: string): Observable<Categoriaresponse[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Categoriaresponse[]>(`${this.API}/get?query=${query}`, { headers });
  }
  delete(id: number): Observable<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.delete(`${this.API}/delete/${id}`, { headers, observe: 'response', responseType: 'text' });
  }
  
  
}
