import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface Order {
  orderId: string;
  source: string;
  destination: string;
  productType: string;
  weight: number;
}

export interface Stop {
  location: string;
  arrivalTime?: string | null;
  departureTime?: string | null;
}

export interface Shipment {
  shipmentId: string;
  pickup: string;
  delivery: string;
  assignedOrders: Order[];
  distance: number;
  cost: number;
  eta: number;
  laneId: string;
  laneCost: number;
  laneEmission: number;
  stops?: Stop[];
}

// Returned from backend
export interface RoutePlanResult {
  shipments: Shipment[];
  orphanOrders?: string[];
}

@Injectable({ providedIn: 'root' })
export class ShipmentService {
  private base = 'http://localhost:8080';

  private planSubject = new Subject<void>();
  public planHappened$ = this.planSubject.asObservable();

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.base}/orders`);
  }

  getPastShipments(): Observable<Shipment[]> {
  return this.http.get<Shipment[]>(`${this.base}/routes/history`);
}


  planShipments(body: any): Observable<RoutePlanResult> {
    return new Observable<RoutePlanResult>(observer => {
      this.http.post<RoutePlanResult>(`${this.base}/routes/plan`, body).subscribe({
        next: (res) => {
          this.planSubject.next();
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
