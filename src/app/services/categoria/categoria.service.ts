import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../api/api';
import { Categoriaresponse } from '../../model/categoria/dto/categoriaresponse';
import { Observable } from 'rxjs';
import { LoginService } from '../../auth/login.service';
import { Categoriarequest } from '../../model/categoria/dto/categoriarequest';
import { UsuarioResponseDto } from '../../auth/usuarioResponseDto';
import { Categoriaresponseunique } from '../../model/categoria/dto/categoriaresponseunique';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  
  
  loginService = inject(LoginService);
  http = inject(HttpClient);
  API = `${API_BASE_URL}api/grupoprodutos`;
  usuarioLogado: UsuarioResponseDto | null = null;
  

  

  get(query: string, cnpj: string): Observable<Categoriaresponse[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Categoriaresponse[]>(`${this.API}/get?query=${query}&cnpj=${cnpj}`, { headers });
  }
  delete(id: number): Observable<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.delete(`${this.API}/delete/${id}`, { headers, observe: 'response', responseType: 'text' });
  }
  
  post(categoria: Categoriarequest): Observable<any>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    
    return this.http.post(`${this.API}/novo`, categoria, { headers, observe: 'response', responseType: 'text' });
  }
 
  findbyid(id: number) : Observable<Categoriaresponseunique>{
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Categoriaresponseunique>(this.API+"/get/"+id, { headers });
  }

  put(categoriaRequest: Categoriarequest, idGrupoProduto: number): Observable<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.API}/put/${idGrupoProduto}`, categoriaRequest, { headers,  observe: 'response', responseType: 'text' });
  }


}
