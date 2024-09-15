import { inject, Injectable } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../api/api';
import { Observable } from 'rxjs';
import { Cidaderesponse } from '../../model/cidade/dto/cidaderesponse';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/cidade`;

  get(query: string, idEstado: number): Observable<Cidaderesponse[]>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Cidaderesponse[]>(`${this.API}/get?query=${query}&idEstado=${idEstado}`, { headers });
  }
  
}
