import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaintenanceState } from '../models/maintenance-state.interface';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private apiRoot = 'http://localhost:8000/maintenance/';

  constructor(private http: HttpClient) { }

  /**
   * Get maintenance state
   */
  public getMaintenanceState() {
    return this.http.get(this.apiRoot);
  }

  /**
   * Update maintenance state
   */
  public setMaintenanceState(state: MaintenanceState) {
    return this.http.post(this.apiRoot, state);
  }

}
