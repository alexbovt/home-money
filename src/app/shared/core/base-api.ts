import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class BaseApi {

  private readonly baseUrl = 'http://localhost:3000';

  constructor(public http: HttpClient) {
  }

  public get<T>(url: string = ''): Observable<T> {
    return this.http.get<T>(this.getUrl(url));
  }

  public post<T, U extends object>(url: string = '', data: U): Observable<T> {
    return this.http.post<T>(this.getUrl(url), data);
  }

  public put<T, U extends object>(url: string = '', data: U): Observable<T> {
    return this.http.put<T>(this.getUrl(url), data);
  }

  public delete<T, U extends object>(url: string = '', data: U): Observable<T> {
    return this.http.delete<T>(this.getUrl(url), data);
  }

  private getUrl(url: string = ''): string {
    return `${this.baseUrl}/${url}`;
  }

}
