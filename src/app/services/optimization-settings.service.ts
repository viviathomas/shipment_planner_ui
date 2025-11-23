import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface OptSettings { alpha: number; beta: number; gamma: number; }

@Injectable({ providedIn: 'root' })
export class OptimizationSettingsService {
  private readonly KEY = 'opt_settings_v1';

  private subject = new BehaviorSubject<OptSettings>(this.load());
  public changes$ = this.subject.asObservable();

  private load(): OptSettings {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return { alpha: 0.2, beta: 0.7, gamma: 0.3 };
      return JSON.parse(raw) as OptSettings;
    } catch {
      return { alpha: 0.2, beta: 0.7, gamma: 0.3 };
    }
  }

  get(): OptSettings { return this.subject.value; }

  set(s: OptSettings) {
    localStorage.setItem(this.KEY, JSON.stringify(s));
    this.subject.next(s);
  }
}
