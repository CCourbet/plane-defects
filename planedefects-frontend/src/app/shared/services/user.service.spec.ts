import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from '../models/user.interface';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;

  const testUser: User = { id: 1, is_staff: false }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should load user by id on request', async (done) => {
    userService.getUser(1).subscribe((res: User) => {
      expect(res).toEqual(testUser);
      done();
    })
    let userRequest: TestRequest = httpMock.expectOne('http://localhost:8000/user/1');
    expect(userRequest.request.method).toBe("GET");
    userRequest.flush(testUser);
  });

});
