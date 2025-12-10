import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../services/order.service';

interface Order {
  orderId: string;
  source: string;
  destination: string;
  productType: string;
  weight: number;
  assignedLaneId?: string;
}

interface SuggestedLane {
  laneId: string;
  source: string;
  destination: string;
  productType?: string;
  baseCost: number;
  distance: number;
  matchScore: number;
  matchReason: string;
}

interface OrphanOrder {
  order: Order;
  suggestedLanes: SuggestedLane[];
}

@Component({
  selector: 'app-orphan-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orphan-orders.component.html',
  styleUrls: ['./orphan-orders.component.css']
})
export class OrphanOrdersComponent implements OnInit {
  
  orphanOrders: OrphanOrder[] = [];
  loading = true;
  error: string | null = null;

  private baseUrl = 'http://localhost:8080';

  constructor(
    private orderService: OrderService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadOrphanOrders();
  }

  loadOrphanOrders() {
    this.loading = true;
    this.error = null;

    this.http.get<OrphanOrder[]>(`${this.baseUrl}/orders/orphan`).subscribe({
      next: (data) => {
        this.orphanOrders = data || [];
        console.log('Loaded orphan orders:', this.orphanOrders.length);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orphan orders:', error);
        this.error = 'Failed to load orphan orders. Please try again.';
        this.loading = false;
      }
    });
  }

  assignLane(orphanOrder: OrphanOrder, lane: SuggestedLane) {
    const orderId = orphanOrder.order.orderId;
    
    const confirmed = confirm(
      `Assign lane ${lane.laneId} to order ${orderId}?\n\n` +
      `Origin: ${lane.source}\n` +
      `Destination: ${lane.destination}\n` +
      `Cost: ${lane.baseCost}\n` +
      `Match: ${lane.matchReason}`
    );

    if (confirmed) {
      this.http.post(`${this.baseUrl}/orders/${orderId}/assign-lane`, {
        laneId: lane.laneId
      }).subscribe({
        next: (res: any) => {
          alert('Lane assigned successfully!');
          // Remove the order from orphan list
          this.orphanOrders = this.orphanOrders.filter(o => 
            o.order.orderId !== orderId
          );
          // Reload orders in OrderService
          this.orderService.loadOrdersFromBackend();
        },
        error: (error) => {
          console.error('Error assigning lane:', error);
          alert('Failed to assign lane. Please try again.');
        }
      });
    }
  }

  getMatchClass(score: number): string {
    if (score >= 80) return 'match-excellent';
    if (score >= 60) return 'match-good';
    return 'match-partial';
  }

  refresh() {
    this.loadOrphanOrders();
  }
}