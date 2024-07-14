import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncomiendasService {

  private apiUrl = 'http://localhost:3000/Encomiendas'; // URL de tu API para encomiendas

  constructor(private http: HttpClient) { }

  getEncomiendas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarEncomienda(encomienda: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, encomienda);
  }

  actualizarEncomienda(id: string, encomienda: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, encomienda);
  }

  eliminarEncomienda(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
