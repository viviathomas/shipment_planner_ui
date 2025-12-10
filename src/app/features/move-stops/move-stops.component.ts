import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouteApiService } from '../../services/route-api.service';

@Component({
  selector: 'app-move-stops',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './move-stops.component.html',
  styleUrls: ['./move-stops.component.css']
})
export class MoveStopsComponent implements OnInit {

  /** 🔥 MULTIPLE SHIPMENTS */
  @Input() shipments: any[] = [];

  @Output() closed = new EventEmitter<any>();

  /** flattened stop list */
  stops: string[] = [];

  loading = false;

  constructor(private api: RouteApiService) {}

  ngOnInit(): void {
    // merge all stops from selected shipments
    this.stops = this.shipments
      .flatMap(s => s.stops.map((x: any) => x.location ?? x));
  }

  moveUp(i: number): void {
    if (i === 0) return;
    [this.stops[i - 1], this.stops[i]] =
      [this.stops[i], this.stops[i - 1]];
  }

  moveDown(i: number): void {
    if (i === this.stops.length - 1) return;
    [this.stops[i + 1], this.stops[i]] =
      [this.stops[i], this.stops[i + 1]];
  }

  apply(): void {
    this.loading = true;

    const payload = {
      stops: this.stops
    };

    this.api.moveStops(payload).subscribe({
      next: newShipment => {
        this.loading = false;
        this.closed.emit(newShipment);
      },
      error: () => {
        this.loading = false;

        // demo-safe fallback
        this.closed.emit({
          shipmentId: 'MANUAL-' + Date.now(),
          pickup: this.stops[0],
          delivery: this.stops[this.stops.length - 1],
          stops: this.stops
        });
      }
    });
  }

  cancel(): void {
    this.closed.emit(null);
  }
}
