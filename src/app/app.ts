// src/app/app.ts
 import { Component } from '@angular/core';
 import { RouterOutlet, Routes } from '@angular/router';

 import { LayoutComponent } from './layout/layout.component';
 import { UnifiedComponent } from './features/unified/unified.component';
 import { OptimizationComponent } from './features/optimization/optimization.component';
 import { ShipmentsComponent } from './features/shipments/shipments.component';

 export const routes: Routes = [
   {
     path: '',
     component: LayoutComponent,
     children: [
       { path: '', redirectTo: 'unified', pathMatch: 'full' },
       { path: 'unified', component: UnifiedComponent },
       { path: 'optimization', component: OptimizationComponent },
       { path: 'shipments', component: ShipmentsComponent }
     ]
   }
 ];

 @Component({
   selector: 'app-root',
   standalone: true,
   imports: [RouterOutlet],
   templateUrl: './app.html'
 })
 export class App {}
