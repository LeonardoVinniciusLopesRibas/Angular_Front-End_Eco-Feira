import { inject, Injectable } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../api/api';
import { Contatorequest } from '../../model/contato/dto/contatorequest';
import { Observable } from 'rxjs';
import { Contatoresponselist } from '../../model/contato/dto/contatoresponselist';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/contato`;
  
  post(contatoRequest: Contatorequest, idPrefeitura: number): Observable<any>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.API}/post/${idPrefeitura}`, contatoRequest, { headers, observe: 'response', responseType: 'text' });
  }

  get(cnpj: string): Observable<Contatoresponselist[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Contatoresponselist[]>(`${this.API}/get?&cnpj=${cnpj}`, { headers });
  }

  delete(id: number): Observable<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.delete(`${this.API}/delete/${id}`, { headers, observe: 'response', responseType: 'text' });
  }
  
}
