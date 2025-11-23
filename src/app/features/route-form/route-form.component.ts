import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.css']
})
export class RouteFormComponent {

  @Output() formSubmitted = new EventEmitter<any>();

  form = {
    source: '',
    destination: '',
    productType: ''
  };

  weights = {
    alpha: 0.5,
    beta: 0.3,
    gamma: 0.2
  };

  submitForm() {
    const data = {
      ...this.form,
      weights: this.weights
    };

    this.formSubmitted.emit(data);
  }
}
