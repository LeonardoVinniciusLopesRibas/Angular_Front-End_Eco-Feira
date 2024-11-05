import {inject, Injectable} from '@angular/core';
import {LoginService} from "../../auth/login.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_BASE_URL} from "../../api/api";
import {DemandaDtoRequest} from "../../model/demanda/dto/demanda-dto-request";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DemandaassociaprodutorademandaService {

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/demanda/associa/produtor`;

  post(idProdutor: number, idDemanda: number): Observable<string> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<string>(`${this.API}/${idProdutor}/${idDemanda}`, null, {
      headers,
      responseType: 'text' as 'json'
    });
  }

}
