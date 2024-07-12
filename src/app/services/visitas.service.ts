import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  private apiUrl = 'http://localhost:3000/Visitas'; // URL de tu API

  constructor(private http: HttpClient) { }

  agregarVisita(visita: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, visita);
  }
}
