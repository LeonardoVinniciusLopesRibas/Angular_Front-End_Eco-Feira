import {inject, Injectable} from '@angular/core';
import {LoginService} from "../../auth/login.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_BASE_URL} from "../../api/api";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DemandaquantidadeatendeprodutorService {

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/demanda/quantidade/associa/produtor`;

  atende(idEmpresa: number, idDemanda: number, idDemandaProdutosAssociados: number, quantidade: number):Observable<string>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<string>(`${this.API}/atendendo/${idEmpresa}/${idDemanda}/${idDemandaProdutosAssociados}/${quantidade}`, null, {
      headers,
      responseType: 'text' as 'json'
    });
  }

}
