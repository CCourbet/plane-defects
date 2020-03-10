import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Defect } from '../models/defect.interface';

@Injectable({
  providedIn: 'root'
})
export class DefectService {

  private apiRoot = 'http://localhost:8000/defect/';

  constructor(private http: HttpClient) { }

  /**
   * Post defect to database
   * @param defect to post
   */
  postDefect(defect: Defect) {
    return this.http.post(this.apiRoot, defect);
  }
}
