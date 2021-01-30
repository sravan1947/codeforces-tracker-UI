import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class CodeforcesService {

    constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
    
    getMyInfo(): Observable<any> {
    return this.http.get<any>(baseURL + 'codeforces')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
  compare(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<any>(baseURL + 'codeforces/compare', data, httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
  getUserInfo(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<any>(baseURL + 'codeforces', data, httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}

