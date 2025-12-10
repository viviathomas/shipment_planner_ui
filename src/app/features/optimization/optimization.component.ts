import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OptimizationSettingsService, OptSettings } from '../../services/optimization-settings.service';

@Component({
  selector: 'app-optimization',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './optimization.component.html',
  styleUrls: ['./optimization.component.css']
})
export class OptimizationComponent implements OnInit {

  distanceWeight = 0.33;
  costWeight = 0.33;
  emissionWeight = 0.33;

  savedMessage = '';

  constructor(private optService: OptimizationSettingsService) {}

  ngOnInit(): void {
    this.optService.getSettings().subscribe(settings => {
      this.distanceWeight = settings.distanceWeight;
      this.costWeight = settings.costWeight;
      this.emissionWeight = settings.emissionWeight;
    });
  }

  save() {
    const settings: OptSettings = {
      distanceWeight: this.distanceWeight,
      costWeight: this.costWeight,
      emissionWeight: this.emissionWeight
    };

    this.optService.saveSettings(settings).subscribe(() => {
      this.savedMessage = 'Settings saved successfully!';
      setTimeout(() => this.savedMessage = '', 2000);
    });
  }

  reset() {
    const settings: OptSettings = {
      distanceWeight: 0.33,
      costWeight: 0.33,
      emissionWeight: 0.33
    };

    this.optService.saveSettings(settings).subscribe(() => {
      this.distanceWeight = 0.33;
      this.costWeight = 0.33;
      this.emissionWeight = 0.33;

      this.savedMessage = 'Reset to defaults';
      setTimeout(() => this.savedMessage = '', 2000);
    });
  }
}
