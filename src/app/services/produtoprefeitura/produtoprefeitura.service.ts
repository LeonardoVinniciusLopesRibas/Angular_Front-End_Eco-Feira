import { inject, Injectable } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../api/api';
import { Observable } from 'rxjs';
import { Produtoprefeituraresponselist } from '../../model/produtoprefeitura/dto/produtoprefeituraresponselist';
import { Produtoprefeituraresponseunique } from '../../model/produtoprefeitura/dto/produtoprefeituraresponseunique';
import { Produtoprefeiturarequest } from '../../model/produtoprefeitura/dto/produtoprefeiturarequest';

@Injectable({
  providedIn: 'root'
})
export class ProdutoprefeituraService {

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/produtoprefeitura`;
  ativo!: boolean;

  get(query: string, cnpj: string): Observable<Produtoprefeituraresponselist[]>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Produtoprefeituraresponselist[]>(`${this.API}/get?query=${query}&cnpj=${cnpj}`, { headers });
  }

  getDesativados(query: string, cnpj: string): Observable<Produtoprefeituraresponselist[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Produtoprefeituraresponselist[]>(`${this.API}/getDesativados?query=${query}&cnpj=${cnpj}`, { headers });
  }

  desativar(id: number): Observable<any>{
    this.ativo = false;
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.API}/put/ativo/${id}?ativo=${this.ativo}`,{}, {headers, observe: 'response', responseType: 'text'});
  }

  reativar(id: number): Observable<any>{
    this.ativo = true;
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.API}/put/ativo/${id}?ativo=${this.ativo}`,{}, {headers, observe: 'response', responseType: 'text'});
  }

  findById(id: number): Observable<Produtoprefeituraresponseunique> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Produtoprefeituraresponseunique>(`${this.API}/get/${id}`, { headers });
  }

  post(produtoprefeitura: Produtoprefeiturarequest, idPrefeitura: number): Observable<any>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.API}/post/${idPrefeitura}`, produtoprefeitura, { headers, observe: 'response', responseType: 'text' });
  }

  put(produtoprefeitura: Produtoprefeiturarequest, id: number): Observable<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.API}/put/${id}`, produtoprefeitura, { headers,  observe: 'response', responseType: 'text' });
  }

}
