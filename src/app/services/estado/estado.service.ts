import { inject, Injectable } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../api/api';
import { Observable } from 'rxjs';
import { Estadoresponse } from '../../model/estado/dto/estadoresponse';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/estado`;

  get(query: string, idPais: number): Observable<Estadoresponse[]>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Estadoresponse[]>(`${this.API}/get?query=${query}&idPais=${idPais}`, { headers });
  }
  
}
