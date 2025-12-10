import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OptSettings {
  distanceWeight: number;
  costWeight: number;
  emissionWeight: number;
}

@Injectable({
  providedIn: 'root'
})
export class OptimizationSettingsService {

  private api = 'http://localhost:8080/optimization-settings';

  constructor(private http: HttpClient) {}

  getSettings(): Observable<OptSettings> {
    return this.http.get<OptSettings>(this.api);
  }

  saveSettings(settings: OptSettings): Observable<OptSettings> {
    return this.http.post<OptSettings>(this.api, settings);
  }
}
