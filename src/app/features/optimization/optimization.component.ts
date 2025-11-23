import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OptimizationSettingsService, OptSettings } from '../../services/optimization-settings.service';

@Component({
  selector: 'app-optimization',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './optimization.component.html',
  styleUrls: ['./optimization.component.css']
})
export class OptimizationComponent implements OnInit {
  alpha = 0.2;
  beta = 0.7;
  gamma = 0.3;

  constructor(private optSvc: OptimizationSettingsService) {}

  ngOnInit(): void {
    const s = this.optSvc.get();
    this.alpha = s.alpha; this.beta = s.beta; this.gamma = s.gamma;
  }

  save() {
    this.optSvc.set({ alpha: this.alpha, beta: this.beta, gamma: this.gamma });
    // optional feedback could be added here (snackbar/toast)
  }
}
