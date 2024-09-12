import { inject, Injectable } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../../api/api';
import { Observable } from 'rxjs';
import { Produtoprodutorresponse } from '../../model/produtoprodutor/dto/produtoprodutorresponse';

@Injectable({
  providedIn: 'root'
})
export class ProdutoprodutorService {

  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/produtoprodutor`;

  get(query: string, cnpj: string): Observable<Produtoprodutorresponse[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Produtoprodutorresponse[]>(`${this.API}/get?query=${query}&cnpj=${cnpj}`, { headers });
  }

  
}
