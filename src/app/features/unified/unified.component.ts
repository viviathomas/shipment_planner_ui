import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteApiService } from '../../services/route-api.service';
import { OptimizationSettingsService } from '../../services/optimization-settings.service';
import { MoveStopsComponent } from '../move-stops/move-stops.component';

@Component({
  selector: 'app-unified',
  standalone: true,
  imports: [CommonModule, MoveStopsComponent],
  templateUrl: './unified.component.html',
  styleUrls: ['./unified.component.css']
})
export class UnifiedComponent implements OnInit {

  orders: any[] = [];
  shipments: any[] = [];
  performancePopup: any = null;


  selectedOrderIds = new Set<string>();

  /** 🔥 REQUIRED BY HTML */
  selectedShipmentIds = new Set<string>();
  moveStopsShipments: any[] | null = null;

  loading = false;

  constructor(
    private routeApi: RouteApiService,
    private optService: OptimizationSettingsService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  /* ---------------- ORDERS ---------------- */

  loadOrders(): void {
    this.routeApi.getOrders().subscribe({
      next: data => this.orders = data,
      error: () => alert('Failed to load orders')
    });
  }

  uploadOrders(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.routeApi.uploadOrders(input.files[0]).subscribe({
      next: () => this.loadOrders(),
      error: () => alert('Upload failed')
    });
  }

  toggleOrderSelection(id: string): void {
    this.selectedOrderIds.has(id)
      ? this.selectedOrderIds.delete(id)
      : this.selectedOrderIds.add(id);
  }

  isSelected(id: string): boolean {
    return this.selectedOrderIds.has(id);
  }

  /* ---------------- PLANNING ---------------- */

  planSelectedOrders(): void {
    if (this.selectedOrderIds.size === 0) return;

    this.loading = true;

    this.optService.getSettings().subscribe({
      next: settings => {
        const body = {
          orders: Array.from(this.selectedOrderIds),
          alpha: settings.distanceWeight,
          beta: settings.costWeight,
          gamma: settings.emissionWeight
        };

        this.routeApi.planRoutes(body).subscribe({
          next: res => {
            this.shipments = res.shipments || [];
            this.selectedShipmentIds.clear();
            this.loading = false;
          },
          error: () => {
            this.loading = false;
            alert('Planning failed');
          }
        });
      }
    });
  }

  /* ---------------- SHIPMENTS ---------------- */

  toggleShipmentSelection(id: string): void {
    this.selectedShipmentIds.has(id)
      ? this.selectedShipmentIds.delete(id)
      : this.selectedShipmentIds.add(id);
  }

  openMoveStops(): void {
    this.moveStopsShipments = this.shipments.filter(s =>
      this.selectedShipmentIds.has(s.shipmentId)
    );
  }

  onMoveStopsClosed(newShipment: any): void {
    this.moveStopsShipments = null;
    this.selectedShipmentIds.clear();

    if (!newShipment) return;

    // add newly created shipment
    this.shipments = [...this.shipments, newShipment];
  }
  /* ---------------- PERFORMANCE (AGENT) ---------------- */

openPerformance(shipment: any): void {
  this.routeApi
    .getPerformanceAnalysis(shipment.shipmentId)
    .subscribe({
      next: (res: any) => {
        this.performancePopup = {
          ...res,
          primaryShipment: shipment
        };
      },
      error: () => {
        alert('Failed to load performance analysis');
      }
    });
}

closePerformance(): void {
  this.performancePopup = null;
}

}
