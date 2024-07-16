import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MudanzasService {

  private apiUrl = 'http://localhost:3000/Mudanzas'; // URL de tu API para mudanzas

  constructor(private http: HttpClient) { }

  getMudanzas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarMudanza(mudanza: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, mudanza);
  }

  actualizarMudanza(id: string, mudanza: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, mudanza);
  }

  eliminarMudanza(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
