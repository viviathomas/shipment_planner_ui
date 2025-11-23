import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouteApiService } from '../services/route-api.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  collapsed = false;
  lanes: any[] = [];

  constructor(private api: RouteApiService) {}

  ngOnInit() {
    this.api.getLanes().subscribe({
      next: (res: any) => this.lanes = res,
      error: () => this.lanes = []
    });
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
