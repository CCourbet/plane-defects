import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

class MockIsLoggedAuthService extends AuthenticationService {
  isLoggedIn() {
    return true;
  }
}

class MockIsNotLoggedAuthService extends AuthenticationService {
  isLoggedIn() {
    return false;
  }
}

describe('AuthGuardService logged in', () => {
  let authGuardService: AuthGuardService;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: AuthenticationService, useClass: MockIsLoggedAuthService }
      ]
    });
    authGuardService = TestBed.inject(AuthGuardService);
    authenticationService = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  it('should activate if user is loggedIn', () => {
    spyOn(authenticationService, 'refreshToken');
    let res = authGuardService.canActivate();
    expect(authenticationService.refreshToken).toHaveBeenCalled();
    expect(res).toBe(true);
  });
});

describe('AuthGuardService not logged in', () => {
  let authGuardService: AuthGuardService;
  let authenticationService: AuthenticationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: AuthenticationService, useClass: MockIsNotLoggedAuthService },
        {
          provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); }
        }
      ]
    });
    authGuardService = TestBed.inject(AuthGuardService);
    authenticationService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  it('should logout if user is not loggedIn', () => {
    spyOn(authenticationService, 'logout');
    let res = authGuardService.canActivate();
    expect(authenticationService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(["login"]);
    expect(res).toBe(false);
  });

});
