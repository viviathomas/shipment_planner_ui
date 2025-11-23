import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/orders';

  private ordersSubject = new BehaviorSubject<any[]>([]);
  orders$ = this.ordersSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Load orders initially (if backend has any)
  loadOrdersFromBackend() {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: data => this.ordersSubject.next(data || []),
      error: err => console.error('Order fetch failed', err)
    });
  }

  // Set from UI upload
  setOrders(data: any[]) {
    this.ordersSubject.next(data || []);
  }

  getOrdersSnapshot() {
    return this.ordersSubject.getValue();
  }

  // ⭐ NEW — Fixes UnifiedComponent compiler error
  uploadOrders(file: File) {
    const fd = new FormData();
    fd.append('file', file, file.name);

    this.http.post<any[]>(`${this.baseUrl}/upload`, fd).subscribe({
      next: resp => {
        this.setOrders(resp || []);
      },
      error: err => {
        console.error('Upload failed', err);
        alert('Order upload failed');
      }
    });
  }
}
