import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiRoot = 'http://localhost:8000/user/';

  constructor(private http: HttpClient) { }

  /**
   * Get user from its id
   * @param id user id
   */
  public getUser(id) {
    return this.http.get(this.apiRoot + `${id}`);
  }

}
