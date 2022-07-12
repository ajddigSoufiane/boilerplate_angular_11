import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';  
import { SettingsService } from '@core/settings/settings.service';
import { AuthHttpService } from './auth-http.service';
import { environment } from '@environments/environment';
import { JwtHelper } from './JwtHelper';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { HandleError as HandleErrorExp, HttpErrorHandler } from './http-error-handler.service';
import { throwError } from 'rxjs';
import { Base64 } from '@app/shared/utility/webtoolkit.base64';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string ="/boileplate";
  handleErrorExp: HandleErrorExp;

  constructor(private settings: SettingsService,
              private httpErrorHandler: HttpErrorHandler,
              private authHttp: AuthHttpService,
              private router: Router) {
    this.handleErrorExp = httpErrorHandler.createHandleError('AuthService');
  }

  login( username: string, password: string ): Observable<any> {
      let body = new URLSearchParams();
      body.set('username', username);
      body.set('password', password);
      body.set('grant_type', 'password');

     return this.authHttp.postBsicAuth( environment.settings.oauthUrl + this.settings.oauth.loginUrl, body,this.settings.oauth.clientId,this.settings.oauth.secret )
     .pipe(
          map(this.extractData),
          catchError(this.handleError)
      )
  }

  logoutSession(id: number): Observable<any> {
    const body = JSON.stringify({
      id: id
    });
    return this.authHttp.postTypeResponse(environment.settings.oauthUrl + this.settings.oauth.logoutUrl, body) 
      .pipe(
        map(this.logout2),
        catchError(this.handleError)
    )
  }

  loginSSO(id: any): Observable<any> {
    const body = JSON.stringify({
      id: id,
    });
    return this.authHttp.postTypeResponse(environment.settings.oauthUrl + this.settings.oauth.loginUrl, body)
      .pipe(
        map(this.extractData),
        catchError(this.handleErrorExp('SSO'))
      );
  }

  getCurrenUser(username: string): Observable<any> {
    return this.authHttp.getTypeResponse(environment.settings.apiUrl + this.settings.server.currentUserUrl)
        .pipe(
            map(res => {
              this.extractDataCurrentUser(res.body);
              this.settings.checkCurrentUser();
            }),
            catchError(this.handleErrorExp('getCurrenUser'))
        );
  }

  private extractData(res: any) {
    const token = (res && res.body) ? res.body.access_token : null;
    if (token) {
      localStorage.setItem('jwt1', token);
    } else {
      this.removeToken();
    }
    return true;
  }

  private extractDataCurrentUser(res: any) {
    localStorage.setItem('currentUser1', Base64.encode(JSON.stringify(res)));
    return true;
  }

  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    switch (error.status) {
      case 401:
        errMsg = 'login.message.badCredentials';
        break;
      case 400:
        errMsg = 'login.message.badCredentials';
        break;
      case 0:
        errMsg = 'accesServeur.message.error';
        break;
      default:
        errMsg = error.message ? error.message : error.toString();
    }
    return throwError(errMsg);
  }

  removeToken(): void {
    localStorage.removeItem('jwt1');
    localStorage.removeItem('currentUser1');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.removeToken();
  }

  isLoggedIn(): boolean {
    let isLogged = false;
    const token: string = localStorage.getItem( 'jwt1' );
    if ( token !== null ) {
      isLogged = this.tokenNotExpired( token );
      if ( isLogged === false ) {
        this.removeToken();
      }
    }
    return isLogged;
  }

  logout2(): void {
  }

  tokenNotExpired(token: string): boolean {
    const jwtHelper = new JwtHelper();
    return !jwtHelper.isTokenExpired(token);
  }
}
