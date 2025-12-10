import { Component, OnInit } from '@angular/core';
import {
  CommonModule,
  NgClass,
  NgFor,
  NgIf,
  DecimalPipe
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { RouteApiService } from '../../services/route-api.service';

export interface Lane {
  laneId: string;
  source: string;
  destination: string;
  baseCost: number;
  distance: number;
  emission: number;
  productType: string;
  capacity: number;
}

@Component({
  selector: 'app-lanes',
  standalone: true,
  templateUrl: './lanes.component.html',
  styleUrls: ['./lanes.component.css'],
  imports: [CommonModule, FormsModule, NgIf, NgFor, NgClass, DecimalPipe]
})
export class LanesComponent implements OnInit {

  constructor(private api: RouteApiService) {}

  lanes: Lane[] = [];
  filtered: Lane[] = [];
  displayed: Lane[] = [];

  searchTerm = '';
  filters = { origin: '', destination: '', productType: '' };
  sortOption = 'costAsc';

  uniqueOrigins: string[] = [];
  uniqueDestinations: string[] = [];
  uniqueProductTypes: string[] = [];

  page = 1;
  pageSize = 6;

  showMapModal = false;
  selectedLane: Lane | null = null;

  ngOnInit() {
    this.api.getLanes().subscribe((res: Lane[]) => {
      this.lanes = res;

      this.uniqueOrigins = [...new Set(res.map(l => l.source))];
      this.uniqueDestinations = [...new Set(res.map(l => l.destination))];
      this.uniqueProductTypes = [...new Set(res.map(l => l.productType))];

      this.applyFilters();
    });
  }

  get totalPages() {
    return Math.ceil(this.filtered.length / this.pageSize);
  }

  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onSearchChange() { this.applyFilters(); }

  onFilterChange() {
    this.page = 1;
    this.applyFilters();
  }

  onSortChange() { this.applyFilters(); }

  resetFilters() {
    this.searchTerm = '';
    this.filters = { origin: '', destination: '', productType: '' };
    this.sortOption = 'costAsc';
    this.page = 1;
    this.applyFilters();
  }

  applyFilters() {
    let data = [...this.lanes];
    const s = this.searchTerm.toLowerCase().trim();

    if (s) {
      data = data.filter(l =>
        l.laneId.toLowerCase().includes(s) ||
        l.source.toLowerCase().includes(s) ||
        l.destination.toLowerCase().includes(s) ||
        l.productType.toLowerCase().includes(s)
      );
    }

    if (this.filters.origin)
      data = data.filter(l => l.source === this.filters.origin);

    if (this.filters.destination)
      data = data.filter(l => l.destination === this.filters.destination);

    if (this.filters.productType)
      data = data.filter(l => l.productType === this.filters.productType);

    data.sort((a, b) => {
      switch (this.sortOption) {
        case 'costAsc': return a.baseCost - b.baseCost;
        case 'costDesc': return b.baseCost - a.baseCost;
        case 'distanceAsc': return a.distance - b.distance;
        case 'distanceDesc': return b.distance - a.distance;
        case 'emissionAsc': return a.emission - b.emission;
        case 'emissionDesc': return b.emission - a.emission;
        case 'capacityAsc': return a.capacity - b.capacity;
        case 'capacityDesc': return b.capacity - a.capacity;
      }
      return 0;
    });

    this.filtered = data;
    this.updateDisplayed();
  }

  updateDisplayed() {
    const start = (this.page - 1) * this.pageSize;
    this.displayed = this.filtered.slice(start, start + this.pageSize);
  }

  changePage(p: number) {
    this.page = p;
    this.updateDisplayed();
  }

  getUtilization(l: Lane) {
    if (l.capacity > 1500) return 'High';
    if (l.capacity > 800) return 'Medium';
    return 'Low';
  }

  openMap(lane: Lane) {
    this.selectedLane = lane;
    this.showMapModal = true;
    setTimeout(() => this.renderMap(), 100);
  }

  closeMap() {
    this.showMapModal = false;
  }

  renderMap() {
    if (!this.selectedLane) return;

    setTimeout(() => {

      const coords: any = {
        "Bangalore": [12.9716, 77.5946],
        "Chennai": [13.0827, 80.2707],
        "Hyderabad": [17.3850, 78.4867],
        "Delhi": [28.7041, 77.1025],
        "Mumbai": [19.0760, 72.8777],
        "Pune": [18.5204, 73.8567]
      };

      if (!this.selectedLane) return;

const origin = coords[this.selectedLane.source] ?? [20.5, 78.9];
const dest   = coords[this.selectedLane.destination] ?? [20.7, 79.2];


      const map = L.map('laneMap', {
        center: origin,
        zoom: 6
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map);

      // ---- FIXED ROUTING BLOCK ----
      L.Routing.control({
  waypoints: [
    L.latLng(origin[0], origin[1]),
    L.latLng(dest[0], dest[1])
  ],
  lineOptions: {
    styles: [{ color: '#007bff', weight: 5 }],
    extendToWaypoints: true,
    missingRouteTolerance: 0
  },
  addWaypoints: false
}).addTo(map);

map.fitBounds([origin, dest], { padding: [30, 30] });


      map.fitBounds([origin, dest], { padding: [30, 30] });

    }, 200);
  }

}

