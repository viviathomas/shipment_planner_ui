import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getPreliminaryRoutes(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/planning/preliminary`, payload);
  }
}
