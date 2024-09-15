import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../api/api';
import { LoginService } from '../../auth/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Enderecorequest } from '../../model/endereco/dto/enderecorequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/endereco`;

  put(enderecoRequest: Enderecorequest, idEndereco: number): Observable<any>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.API}/put/${idEndereco}`, enderecoRequest, {headers, observe: 'response', responseType: 'text'});
  }
}
