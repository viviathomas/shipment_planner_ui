
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

import { UnifiedComponent } from './features/unified/unified.component';
import { OptimizationComponent } from './features/optimization/optimization.component';
import { ShipmentsComponent } from './features/shipments/shipments.component';
import { LanesComponent } from './features/lanes/lanes.component';
import { OrphanOrdersComponent } from './features/orphan-orders/orphan-orders.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'unified', pathMatch: 'full' },
      { path: 'unified', component: UnifiedComponent },
      { path: 'optimization', component: OptimizationComponent },
      { path: 'shipments', component: ShipmentsComponent },
      { path: 'lanes', component: LanesComponent },   // ✔ COMMA FIXED
      { path: 'orphan-orders', component: OrphanOrdersComponent }, // ✔ NEW PAGE
    ]
  }
];
