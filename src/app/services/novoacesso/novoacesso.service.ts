import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../api/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../auth/login.service';
import { Novoacesso } from '../../model/novoacesso/novoacesso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovoacessoService {

  constructor() { }

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/aceite`;

  post(novoacesso: Novoacesso): Observable<any>{    
    return this.http.post(`${this.API}/novoacesso`, novoacesso, { observe: 'response', responseType: 'text' });
  }

  get(cnpj: string): Observable<Novoacesso[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Novoacesso[]>(`${this.API}/get?cnpj=${cnpj}`, { headers });
  }

  delete(id: number): Observable<any>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<any>(`${this.API}/delete/${id}`, {headers});
  }

}
