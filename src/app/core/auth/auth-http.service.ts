import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

const mergeBasicAuth = (clientId: string, secret: string) => {
  const header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + secret)
    })
  };

  return header;
};

@Injectable({
  providedIn: "root",
})
export class AuthHttpService {
    
  constructor(
    public http: HttpClient,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  getHttpHeader() {
    if (isPlatformBrowser(this.platformId)) {
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt1"),
        }),
      };
    } else {
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      };
    }
  }

  getHttpHeaderBasicAuth(clientId: string, secret: string) {
    if (isPlatformBrowser(this.platformId)) {
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(clientId + ":" + secret),
        }),
      };
    } else {
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      };
    }
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, this.getHttpHeader());
  }

  post<T>(url: string, body: any, param?: any): Observable<T> {
    const options = { headers: this.getHttpHeader().headers };
    if (param && param.responseType) {
      options["responseType"] = param.responseType;
    }
    return this.http.post<T>(url, body, options);
  }

  postTypeResponse(url: string, body: any, param?: any): Observable<any> {
    return this.http.post(url, body, {
      headers: this.getHttpHeader().headers,
      observe: "response",
    });
  }

  getTypeResponse(url: string) {
    return this.http.get(url, {
      headers: this.getHttpHeader().headers,
      observe: "response",
    });
  }

  postFile(url: string, body: any, param: any): Observable<any> {
    return this.http.post(url, body, {
      headers: this.getHttpHeader().headers,
      responseType: param.responseType,
      observe: "response",
    });
  }

  getFile(url: string, param: any): Observable<any> {
    return this.http.get(url, {
      headers: this.getHttpHeader().headers,
      responseType: param.responseType,
      observe: "response",
    });
  }

  postBsicAuth(
    url: string,
    body: any,
    clientId: string,
    secret: string
  ): Observable<any> {
    return this.http.post(url, body.toString(), {
      headers: this.getHttpHeaderBasicAuth(clientId, secret).headers,
      observe: "response",
    });
  }
  

  put<T>(url: string, body: string): Observable<T> {
    return this.http.put<T>(url, body, this.getHttpHeader());
  }

  delete(url: string, body: any): Observable<any> {
    const options = { body: body, headers: this.getHttpHeader().headers };
    return this.http.delete(url, options);
  }

  patch<T>(url: string, body: string): Observable<T> {
    return this.http.patch<T>(url, body, this.getHttpHeader());
  }

  head<T>(url: string): Observable<T> {
    return this.http.head<T>(url, this.getHttpHeader());
  }
}
