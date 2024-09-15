import { inject, Injectable } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../api/api';
import { Observable } from 'rxjs';
import { Paisresponse } from '../../model/pais/dto/paisresponse';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/pais`;

  get(query: string): Observable<Paisresponse[]>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Paisresponse[]>(`${this.API}/get?query=${query}`, { headers });
  }



}
