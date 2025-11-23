import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RouteApiService {
  base = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  uploadOrders(file: File) {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.http.post(`${this.base}/orders/upload`, fd);
  }

  planRoutes(body: any) {
    return this.http.post(`${this.base}/routes/plan`, body);
  }

  getOrders() {
    return this.http.get(`${this.base}/orders`);
  }

  getLanes() {
    return this.http.get(`${this.base}/lanes`);
  }
}
