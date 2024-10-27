import { inject, Injectable } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../api/api';
import { Observable } from 'rxjs';
import { DemandaDtoResponse } from '../../model/demanda/dto/demanda-dto-response';
import { DemandaDtoRequest } from '../../model/demanda/dto/demanda-dto-request';
import {
  Demandaprodutosassociadosrequest
} from "../../model/demandaprodutosassociados/dto/demandaprodutosassociadosrequest";

@Injectable({
  providedIn: 'root'
})
export class DemandaService {

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/demanda`;

  get(idPrefeitura: number): Observable<DemandaDtoResponse[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<DemandaDtoResponse[]>(`${this.API}/get?idPrefeitura=${idPrefeitura}`, {headers});
  }

  getAberta(idPrefeitura: number): Observable<DemandaDtoResponse[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<DemandaDtoResponse[]>(`${this.API}/getAberta?idPrefeitura=${idPrefeitura}`, {headers});
  }

  post(demandaDtoRequest: DemandaDtoRequest): Observable<number> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<number>(`${this.API}/new`, demandaDtoRequest, {headers});
  }

  postProdutosAssociados(produtoAssociado: Demandaprodutosassociadosrequest): Observable<void> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<void>(`${API_BASE_URL}api/demandaprodutoassociados/novoProdutoPrefeitura`, produtoAssociado, {headers});
  }

}
