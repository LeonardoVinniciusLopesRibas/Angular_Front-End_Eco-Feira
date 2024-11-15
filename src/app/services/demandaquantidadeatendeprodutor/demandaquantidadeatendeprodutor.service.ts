import {inject, Injectable} from '@angular/core';
import {LoginService} from "../../auth/login.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_BASE_URL} from "../../api/api";
import {Observable} from "rxjs";
import {
  Demandaquantidadeatendidaresponselist
} from "../../model/demandaquantidadeatendidaprodutor/dto/demandaquantidadeatendidaresponselist";

@Injectable({
  providedIn: 'root'
})
export class DemandaquantidadeatendeprodutorService {

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/demanda/quantidade/associa/produtor`;

  atende(idEmpresa: number, idDemanda: number, idDemandaProdutosAssociados: number, quantidade: number): Observable<string> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<string>(`${this.API}/atendendo/${idEmpresa}/${idDemanda}/${idDemandaProdutosAssociados}/${quantidade}`, null, {
      headers,
      responseType: 'text' as 'json'
    });
  }

  getAtendimento(idDemanda: number, idDemandaProdutosAssociados: number): Observable<Demandaquantidadeatendidaresponselist[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Demandaquantidadeatendidaresponselist[]>(`${this.API}/getatendimento/${idDemanda}/${idDemandaProdutosAssociados}`, {headers});
  }

  deletarAtendimento(idQuantidadeAtendida: number, idDemanda: number, quantidadeAtendida: number): Observable<string> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<string>(`${this.API}/deleteQuantidadeAtendida/idquantidadeatendida/${idQuantidadeAtendida}/iddemanda/${idDemanda}/quantidade/${quantidadeAtendida}`, {
      headers,
      responseType: 'text' as 'json'
    });


  }

}
