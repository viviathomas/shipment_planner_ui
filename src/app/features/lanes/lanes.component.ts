import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteApiService } from '../../services/route-api.service';

@Component({
  selector: 'app-lanes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lanes.component.html',
  styleUrls: ['./lanes.component.css']
})
export class LanesComponent implements OnInit {

  lanes: any[] = [];
  loading = true;

  constructor(private api: RouteApiService) {}

  ngOnInit() {
    this.api.getLanes().subscribe({
      next: (res: any) => {
        this.lanes = res.data || res;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching lanes:', error);
        this.loading = false;
      }
    });
  }
}