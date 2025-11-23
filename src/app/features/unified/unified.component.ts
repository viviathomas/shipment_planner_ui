import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { OrderService } from '../../services/order.service';
import { ShipmentService, Shipment, Order } from '../../services/shipment.service';
import { OptimizationSettingsService } from '../../services/optimization-settings.service';

@Component({
  selector: 'app-unified',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './unified.component.html',
  styleUrls: ['./unified.component.css']
})
export class UnifiedComponent implements OnInit {

  orders: Order[] = [];
  shipments: Shipment[] = [];
  selectedOrderIds = new Set<string>();

  loading = false;

  constructor(
    private shipmentSvc: ShipmentService,
    public orderService: OrderService,
    private optSvc: OptimizationSettingsService
  ) {}

  ngOnInit() {
    this.orderService.orders$.subscribe(data => {
      this.orders = data;
    });

    if (this.orderService.getOrdersSnapshot().length === 0) {
      this.orderService.loadOrdersFromBackend();
    }
  }

  uploadOrders(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    this.orderService.uploadOrders(file);
  }

  toggleOrderSelection(id: string) {
    if (this.selectedOrderIds.has(id)) {
      this.selectedOrderIds.delete(id);
    } else {
      this.selectedOrderIds.add(id);
    }
  }

  toggleSelectAll(event: any) {
    if (event.target.checked) {
      this.orders.forEach(o => this.selectedOrderIds.add(o.orderId));
    } else {
      this.selectedOrderIds.clear();
    }
  }

  isSelected(id: string) {
    return this.selectedOrderIds.has(id);
  }

  // ⭐⭐⭐ THIS WAS OUTSIDE THE CLASS BEFORE — NOW FIXED
  planSelectedOrders() {
    if (this.selectedOrderIds.size === 0) {
      alert("Select at least one order.");
      return;
    }

    const opt = this.optSvc.get();

    const body = {
      alpha: opt.alpha,
      beta: opt.beta,
      gamma: opt.gamma,
      orders: Array.from(this.selectedOrderIds)   // correct key
    };

    this.shipmentSvc.planShipments(body).subscribe({
      next: (result: any) => {
        this.shipments = result.shipments || [];   // extract shipments
        this.selectedOrderIds.clear();
      },
      error: (err) => {
        console.error(err);
        alert("Planning failed");
      }
    });
  }
}
