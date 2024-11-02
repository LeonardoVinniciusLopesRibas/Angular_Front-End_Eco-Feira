import {inject, Injectable} from '@angular/core';
import {LoginService} from '../../auth/login.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_BASE_URL} from '../../api/api';
import {Observable} from 'rxjs';
import {DemandaDtoResponse} from '../../model/demanda/dto/demanda-dto-response';
import {DemandaDtoRequest} from '../../model/demanda/dto/demanda-dto-request';
import {
  Demandaprodutosassociadosrequest
} from "../../model/demandaprodutosassociados/dto/demandaprodutosassociadosrequest";
import {Demandaresponseunique} from "../../model/demanda/dto/demandaresponseunique";
import {
  Demandaprodutosassociadosunique
} from "../../model/demandaprodutosassociados/dto/demandaprodutosassociadosunique";
import {Demandarequestput} from "../../model/demanda/dto/demandarequestput";

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

  getId(id: number): Observable<Demandaresponseunique> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Demandaresponseunique>(`${API_BASE_URL}api/demanda/get/${id}`, {headers});
  }

  getProducts(idDemanda: number): Observable<Demandaprodutosassociadosunique[]>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Demandaprodutosassociadosunique[]>(`${API_BASE_URL}api/demandaprodutoassociados/get/${idDemanda}`, {headers});
  }

  put(demandaRequestPut: Demandarequestput, id: number): Observable<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.API}/put/${id}`, demandaRequestPut, {
      headers,
      observe: 'response',
      responseType: 'text',
    });
  }

  putCancelada(id: number): Observable<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.API}/put/cancelado/${id}`, null, { headers,observe: 'response',
      responseType: 'text', });
  }

  getByIbge(ibge: number): Observable<DemandaDtoResponse[]>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<DemandaDtoResponse[]>(`${API_BASE_URL}api/demanda/getDemandasByIbge/${ibge}`, {headers});
  }

}
