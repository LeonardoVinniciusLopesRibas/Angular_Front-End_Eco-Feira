import { inject, Injectable } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../api/api';
import { Observable, throwError } from 'rxjs';
import { Produtoprodutorresponse } from '../../model/produtoprodutor/dto/produtoprodutorresponse';
import { Produtoprodutor } from '../../model/produtoprodutor/produtoprodutor';
import { Produtoprodutorresponseunique } from '../../model/produtoprodutor/dto/produtoprodutorresponseunique';
import { Produtoprodutorrequest } from '../../model/produtoprodutor/dto/produtoprodutorrequest';

@Injectable({
  providedIn: 'root'
})
export class ProdutoprodutorService {

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/produtoprodutor`;
  ativo!: boolean;

  get(query: string, cnpj: string): Observable<Produtoprodutorresponse[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Produtoprodutorresponse[]>(`${this.API}/get?query=${query}&cnpj=${cnpj}`, { headers });
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

  getDesativados(query: string, cnpj: string): Observable<Produtoprodutorresponse[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Produtoprodutorresponse[]>(`${this.API}/getDesativados?query=${query}&cnpj=${cnpj}`, { headers });
  }

  findById(id: number): Observable<Produtoprodutorresponseunique> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Produtoprodutorresponseunique>(`${this.API}/get/${id}`, { headers });
  }

  post(produtoprodutor: Produtoprodutorrequest): Observable<any>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.API}/post`, produtoprodutor, { headers, observe: 'response', responseType: 'text' });
  }

  put(produtoprodutor: Produtoprodutorrequest, idGrupoProduto: number): Observable<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.API}/put/${idGrupoProduto}`, produtoprodutor, { headers,  observe: 'response', responseType: 'text' });
  }


}
