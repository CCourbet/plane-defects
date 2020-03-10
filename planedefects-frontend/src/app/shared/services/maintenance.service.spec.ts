import { TestBed } from '@angular/core/testing';

import { MaintenanceService } from './maintenance.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { MaintenanceState } from '../models/maintenance-state.interface';

describe('MaintenanceService', () => {
  let maintenanceService: MaintenanceService;
  let httpMock: HttpTestingController;

  const testMaintenance: MaintenanceState = { is_maintenance: false }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    maintenanceService = TestBed.inject(MaintenanceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(maintenanceService).toBeTruthy();
  });

  it('should load maintenance state on request', async (done) => {
    maintenanceService.getMaintenanceState().subscribe((res: MaintenanceState) => {
      expect(res).toEqual(testMaintenance);
      done();
    })
    let maintenanceRequest: TestRequest = httpMock.expectOne('http://localhost:8000/maintenance/');
    expect(maintenanceRequest.request.method).toBe("GET");
    maintenanceRequest.flush(testMaintenance);
  });

  it('should update maintenance state on request', async (done) => {
    maintenanceService.setMaintenanceState(testMaintenance).subscribe((res: MaintenanceState) => {
      expect(res).toEqual(testMaintenance);
      done();
    })
    let maintenanceRequest: TestRequest = httpMock.expectOne('http://localhost:8000/maintenance/');
    expect(maintenanceRequest.request.method).toBe("POST");
    maintenanceRequest.flush(testMaintenance);
  });

})
