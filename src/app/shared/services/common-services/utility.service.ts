import {Injectable} from '@angular/core';
import {AuthHttpService} from '@core/auth/auth-http.service';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import {FileUploader} from 'ng2-file-upload';
import { HttpErrorHandler, HandleError } from '@core/auth/http-error-handler.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  
  uploadUrl = environment.settings.apiUrl + `/utility/uploadFile`;

  private handleError: HandleError;
  constructor(
    private httpErrorHandler: HttpErrorHandler,
    private authHttp: AuthHttpService
  ) {
    this.handleError = httpErrorHandler.createHandleError("UtilityService");
  }

  getUploadHeaders(){
    return { Authorization: "Bearer " + localStorage.getItem("jwt1") }
  }

  getCurrentDate(): Observable<any> {
    return this.authHttp
      .get(environment.settings.apiUrl + `/utility/getCurrentDate`)
      .pipe(catchError(this.handleError("getCurrentDate", [])));
  }

  getMyDate(): Observable<any> {
    return this.authHttp
      .get(environment.settings.apiUrl + `/utility/getMyDate`)
      .pipe(catchError(this.handleError("getMyDate", [])));
  }

  uploadFile(): FileUploader {
    return new FileUploader({
      url: environment.settings.apiUrl + `/utility/uploadFile`,
      headers: [
        {
          name: "Authorization",
          value: "Bearer " + localStorage.getItem("jwt1"),
        },
      ],
    });
  }
}
