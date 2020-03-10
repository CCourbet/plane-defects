import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, Subscription } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  @Output() isLoggedEmitter: EventEmitter<boolean> = new EventEmitter();

  // Api for authentication
  private apiRoot = 'http://localhost:8000/auth/';

  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /**
   * Initialize session
   * @param authResult Result from authentication request
   */
  private setSession(authResult): void {
    const token = authResult.token;
    const decodedToken = this.jwtHelper.decodeToken(token);
    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', decodedToken.user_id);
    localStorage.setItem('expires_at', expirationDate.toString());

    this.isLoggedEmitter.emit(true);
  }

  /**
   * Get token from localStorage
   */
  get token(): string {
    return localStorage.getItem('token');
  }

  /**
   * Get user id from localStorage
   */
  get userId(): string {
    return localStorage.getItem('user_id');
  }

  /**
   * Get if user token is expired
   */
  get isExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.token);
  }

  /**
   * Request to login user
   * @param username 
   * @param password 
   */
  public login(username: string, password: string): Observable<Object> {
    return this.http.post(
      this.apiRoot.concat('login/'),
      { username, password }
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }

  /**
   * Remove local storage and redirect to login page on logout
   */
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('expires_at');

    this.router.navigateByUrl('/login');
    this.isLoggedEmitter.emit(false);
  }

  /**
   * Refresh token when it is expired
   */
  public refreshToken(): Subscription {
    if (this.isExpired) {
      return this.http.post(
        this.apiRoot.concat('refresh-token/'),
        { token: this.token }
      ).pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
    }
  }

  /**
   * Return if the user is logged in
   */
  public isLoggedIn(): boolean {
    return !this.isExpired;
  }

  /**
   * return if the user is logged out
   */
  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

}