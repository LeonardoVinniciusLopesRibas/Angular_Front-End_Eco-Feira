import { inject, Injectable } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../api/api';
import { Prefeiturarequest } from '../../model/prefeitura/dto/prefeiturarequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrefeituraService {

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/prefeitura`;

  put(prefeituraRequest: Prefeiturarequest, idPrefeitura: number): Observable<any>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.API}/put/${idPrefeitura}`, prefeituraRequest, {headers, observe: 'response', responseType: 'text'});
  }
}
