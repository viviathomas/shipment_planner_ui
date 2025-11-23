import { Component } from '@angular/core';
import { RouteFormComponent } from '../route-form/route-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouteFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  onFormSubmit(data: any) {
    console.log("Dashboard received:", data);
  }

}
