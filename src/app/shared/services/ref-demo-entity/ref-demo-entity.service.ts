import {Injectable} from "@angular/core";
import {SettingsService} from "@core/settings/settings.service";
import {AuthHttpService} from '@core/auth/auth-http.service';
import { environment } from '@environments/environment';
import { HttpErrorHandler, HandleError } from '@core/auth/http-error-handler.service';
import { Observable } from "rxjs/Observable";
import { catchError } from 'rxjs/operators'; 
import { PaginatedList, RefDemoEntity, RefDemoEntityCriteria } from "@app/shared/models";

@Injectable({
  providedIn: "root",
})
export class RefDemoEntityService {
  private handleError: HandleError;

  constructor(
    private settings: SettingsService,
    private httpErrorHandler: HttpErrorHandler,
    private authHttp: AuthHttpService
  ) {
    this.handleError = httpErrorHandler.createHandleError(
      "RefDemoEntityService"
    );
  }

  saveRefDemoEntity(
    refRefDemoEntity: RefDemoEntity
  ): Observable<RefDemoEntity> {
    return this.authHttp
      .post<RefDemoEntity>(
        environment.settings.apiUrl + `/parametrage`,
        JSON.stringify(refRefDemoEntity)
      )
      .pipe(
        catchError(this.handleError("saveRefDemoEntity", refRefDemoEntity))
      );
  }

  updateRefDemoEntity(
    refRefDemoEntity: RefDemoEntity
  ): Observable<RefDemoEntity> {
    return this.authHttp
      .put<RefDemoEntity>(
        environment.settings.apiUrl + `/parametrage`,
        JSON.stringify(refRefDemoEntity)
      )
      .pipe(
        catchError(this.handleError("updateRefDemoEntity", refRefDemoEntity))
      );
  }

  getRefDemoEntity(
    id: number,
    includes?: Array<string>,
    excludes?: Array<string>
  ): Observable<any> {
    var p_includes: string = includes ? "?includes=" + includes : "";
    var p_excludes: string = excludes ? "&excludes=" + excludes : "";
    var params = p_includes + p_excludes;
    return this.authHttp
      .get<RefDemoEntity>(
        environment.settings.apiUrl + `/parametrage/${id}` + params
      )
      .pipe(catchError(this.handleError("getRefDemoEntity")));
  }

  deleteRefDemoEntity(
    refRefDemoEntityListForDelete: Array<RefDemoEntity>
  ): any {
    let body = JSON.stringify(refRefDemoEntityListForDelete);
    return this.authHttp
      .delete(environment.settings.apiUrl + `/parametrage/delete`, body)
      .pipe(catchError(this.handleError("deleteRefDemoEntity")));
  }

  findRefDemoEntitysByCriteria(
    refRefDemoEntityCriteria: RefDemoEntityCriteria
  ): Observable<any> {
    return this.authHttp
      .post<RefDemoEntity[]>(
        environment.settings.apiUrl + `/parametrage/listByCriteria`,
        JSON.stringify(refRefDemoEntityCriteria)
      )
      .pipe(catchError(this.handleError("findRefDemoEntitysByCriteria")));
  }

  listRefDemoEntitys(
    refRefDemoEntityCriteria: RefDemoEntityCriteria
  ): Observable<any> {
    return this.authHttp
      .post<PaginatedList>(
        environment.settings.apiUrl + `/utilisateur/paginatedListByCriteria`,
        JSON.stringify(refRefDemoEntityCriteria)
      )
      .pipe(catchError(this.handleError("listRefDemoEntitys")));
  }

  getRefDemoEntitysDataSize(
    refRefDemoEntityCriteria: RefDemoEntityCriteria
  ): Observable<any> {
    return this.authHttp
      .post<any>(
        environment.settings.apiUrl + `/parametrage/getRefDemoEntitysDataSize`,
        JSON.stringify(refRefDemoEntityCriteria)
      )
      .pipe(catchError(this.handleError("getRefDemoEntitysDataSize")));
  }

  exportRefDemoEntitys(
    refRefDemoEntityCriteria: RefDemoEntityCriteria
  ): Observable<any> {
    return this.authHttp
      .postFile(
        environment.settings.apiUrl + `/parametrage/exportRefDemoEntitys/`,
        JSON.stringify(refRefDemoEntityCriteria),
        { responseType: "blob" }
      )
      .pipe(catchError(this.handleError("exportRefDemoEntitys")));
  }
  downLoadFile(id: number): Observable<any> {
    return this.authHttp
      .getFile(environment.settings.apiUrl + `/parametrage/downloadCr/${id}`, {
        responseType: "blob",
      })
      .pipe(catchError(this.handleError("downloadCr")));
  }

  getList(criteria: any): Observable<any> {
    return this.authHttp
      .get("/assets/i18n/data.json")
      .pipe(catchError(this.handleError("getList")));
  }
}
