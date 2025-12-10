import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RouteApiService {

  private base = 'http://localhost:8080';
  private apiBase = 'http://localhost:8080/api'; // 🔥 ADD THIS

  constructor(private http: HttpClient) {}

  uploadOrders(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.base}/orders/upload`, formData);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/orders`);
  }

  planRoutes(body: any): Observable<any> {
    return this.http.post<any>(`${this.base}/routes/plan`, body);
  }

  // 🔥 ONLY this API uses /api
  moveStops(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiBase}/shipments/move-stops`,
      payload
    );
  }

  getLanes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/lanes`);
  }
 getPerformanceAnalysis(shipmentId: string): Observable<any> {
    return this.http.get<any>(
      `${this.base}/api/shipments/${shipmentId}/performance`
    );
  }
}