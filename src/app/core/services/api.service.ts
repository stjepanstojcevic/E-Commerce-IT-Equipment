import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Token } from '../models';

const BASE_URL = env.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private options = { 
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Authorization': `Bearer ${Token.Create().token}`
    })
  }

  private optionsFile = { 
    headers: new HttpHeaders({
      'Authorization': `Bearer ${Token.Create().token}`
    })
  };
  
  private headersGet = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${Token.Create().token}`
  });
  
  private headersGetFile = new HttpHeaders({
    'Accept': '*/*',
    'Authorization': `Bearer ${Token.Create().token}`
  });

  constructor(private httpClient: HttpClient) {}

  public get(path: string, token: string = null, params: HttpParams = new HttpParams()): Observable<any> {
    var headers;
    if (token) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }else{
      headers = this.headersGet;
    }

    return this.httpClient.get(BASE_URL + path, { params, headers })
      .pipe(catchError(this.formatErrors));
  }

  public getFile(path: string, params: HttpParams = new HttpParams()): any {
    return this.httpClient
      .get(BASE_URL + path, { params, headers: this.headersGetFile, responseType: "blob" })
      .pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .put(BASE_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public putForm(path: string, formData: FormData): Observable<any> {
    return this.httpClient
      .put(BASE_URL + path, formData, this.optionsFile)
      .pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(BASE_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public postForm(path: string, formData: FormData): Observable<any> {
    return this.httpClient
      .post(BASE_URL + path, formData, this.optionsFile)
      .pipe(catchError(this.formatErrors));
  }

  public delete(path: string): Observable<any> {
    return this.httpClient.delete(BASE_URL + path, this.options).pipe(catchError(this.formatErrors));
  }

  public formatErrors(error: any): Observable<any> {
    return throwError(error.error);
  }
}
