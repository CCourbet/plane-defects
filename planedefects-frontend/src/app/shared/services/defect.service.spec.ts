import { TestBed } from '@angular/core/testing';

import { DefectService } from './defect.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Defect } from '../models/defect.interface';
import { DefectTypes } from '../models/defect-types.enum';

describe('DefectService', () => {
  let defectService: DefectService;
  let httpMock: HttpTestingController;

  const testDefect: Defect = {
    xcoordinate: 523,
    ycoordinate: 123,
    zcoordinate: 452,
    defecttype: DefectTypes.P,
    comment: "comment"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    defectService = TestBed.inject(DefectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(defectService).toBeTruthy();
  });

  it('should add defect on request', async (done) => {
    defectService.postDefect(testDefect).subscribe((res: Defect) => {
      expect(res).toEqual(testDefect);
      done();
    })
    let maintenanceRequest: TestRequest = httpMock.expectOne('http://localhost:8000/defect/');
    expect(maintenanceRequest.request.method).toBe("POST");
    maintenanceRequest.flush(testDefect);
  });

});
