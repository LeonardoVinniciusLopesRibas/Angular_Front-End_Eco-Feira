import { inject, Injectable } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../api/api';
import { Observable } from 'rxjs';
import { DemandaDtoResponse } from '../../model/demanda/dto/demanda-dto-response';
import { DemandaDtoRequest } from '../../model/demanda/dto/demanda-dto-request';

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

    return this.http.get<DemandaDtoResponse[]>(`${this.API}/get?idPrefeitura=${idPrefeitura}`, { headers });
  }

  post(demandaDtoRequest: DemandaDtoRequest): Observable<any>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.API}/new`, demandaDtoRequest, { headers, observe: 'response', responseType: 'text' });
  }

}
