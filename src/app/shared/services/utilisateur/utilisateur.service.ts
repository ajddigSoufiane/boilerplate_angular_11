import { Injectable } from "@angular/core";
import { SettingsService } from "@core/settings/settings.service";
import { AuthHttpService } from "@core/auth/auth-http.service";
import { environment } from "@environments/environment";
import {
  HttpErrorHandler,
  HandleError,
} from "@core/auth/http-error-handler.service";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import {
  Utilisateur,
  UtilisateurCriteria,
  PaginatedList,
  BusinessModel,
  Profil 
} from "@models";

@Injectable({
  providedIn: "root",
})
export class UtilisateurService {
  private handleError: HandleError;

  constructor(
    private settings: SettingsService,
    private httpErrorHandler: HttpErrorHandler,
    private authHttp: AuthHttpService
  ) {
    this.handleError = httpErrorHandler.createHandleError("UtilisateurService");
  }

  saveUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.authHttp
      .post<Utilisateur>(
        environment.settings.apiUrl + `/utilisateur`,
        JSON.stringify(utilisateur)
      )
      .pipe(catchError(this.handleError("saveUtilisateur", utilisateur)));
  }

  updateUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.authHttp
      .put<Utilisateur>(
        environment.settings.apiUrl + `/utilisateur`,
        JSON.stringify(utilisateur)
      )
      .pipe(catchError(this.handleError("updateUtilisateur", utilisateur)));
  }

  getUtilisateur(
    id: number,
    includes?: Array<string>,
    excludes?: Array<string>
  ): Observable<any> {
    var p_includes: string = includes ? "?includes=" + includes : "";
    var p_excludes: string = excludes ? "&excludes=" + excludes : "";
    var params = p_includes + p_excludes;
    return this.authHttp
      .get<Utilisateur>(
        environment.settings.apiUrl + `/utilisateur/${id}` + params
      )
      .pipe(catchError(this.handleError("getUtilisateur")));
  }

  deleteUtilisateur(utilisateurListForDelete: Array<Utilisateur>): any {
    let body = JSON.stringify(utilisateurListForDelete);
    return this.authHttp
      .delete(environment.settings.apiUrl + `/utilisateur/delete`, body)
      .pipe(catchError(this.handleError("deleteUtilisateur")));
  }

  findUtilisateursByCriteria(
    utilisateurCriteria: UtilisateurCriteria
  ): Observable<any> {
    return this.authHttp
      .post<Utilisateur[]>(
        environment.settings.apiUrl + `/utilisateur/listByCriteria`,
        JSON.stringify(utilisateurCriteria)
      )
      .pipe(catchError(this.handleError("findUtilisateursByCriteria")));
  }

  listUtilisateurs(utilisateurCriteria: UtilisateurCriteria): Observable<any> {
    return this.authHttp
      .post<PaginatedList>(
        environment.settings.apiUrl + `/utilisateur/paginatedListByCriteria`,
        JSON.stringify(utilisateurCriteria)
      )
      .pipe(catchError(this.handleError("listUtilisateurs")));
  }

  getUtilisateursDataSize(
    utilisateurCriteria: UtilisateurCriteria
  ): Observable<any> {
    return this.authHttp
      .post<any>(
        environment.settings.apiUrl + `/utilisateur/getUtilisateursDataSize`,
        JSON.stringify(utilisateurCriteria)
      )
      .pipe(catchError(this.handleError("getUtilisateursDataSize")));
  }

  exportUtilisateurs(
    utilisateurCriteria: UtilisateurCriteria
  ): Observable<any> {
    return this.authHttp
      .postFile(
        environment.settings.apiUrl + `/utilisateur/exportUtilisateurs/`,
        JSON.stringify(utilisateurCriteria),
        { responseType: "blob" }
      )
      .pipe(catchError(this.handleError("exportUtilisateurs")));
  }

  getPersonnelList(): Observable<any> {
    return this.authHttp
      .get<BusinessModel[]>(
        environment.settings.apiUrl + `/utilisateur/getPersonnelList`
      )
      .pipe(catchError(this.handleError("getPersonnelList", [])));
  }

  getEtablissementList(): Observable<any> {
    return this.authHttp
      .get<BusinessModel[]>(
        environment.settings.apiUrl + `/utilisateur/getEtablissementList`
      )
      .pipe(catchError(this.handleError("getEtablissementList", [])));
  }

  // findEmployesByCriteria(employeCriteria: EmployeCriteria): Observable<any> {
  //   return this.authHttp.post<Employe[]>(environment.settings.apiUrl + `/employe/listByCriteria`, JSON.stringify(employeCriteria))
  //     .pipe(
  //       catchError(this.handleError('findEmployesByCriteria'))
  //     );
  // }

  getServiceList(): Observable<any> {
    return this.authHttp
      .get<BusinessModel[]>(
        environment.settings.apiUrl + `/utilisateur/getServiceList`
      )
      .pipe(catchError(this.handleError("getServiceList", [])));
  }

  getProfilList(): Observable<any> {
    return this.authHttp
      .get<BusinessModel[]>(
        environment.settings.apiUrl + `/utilisateur/getProfilList`
      )
      .pipe(catchError(this.handleError("getProfilList", [])));
  }


  resetUtilisateurPassword(id: number): Observable<any> {
    return this.authHttp.get<any>(environment.settings.apiUrl + `/utilisateur/resetPassword/${id}`)
      .pipe(
        catchError(this.handleError('resetUtilisateurPassword'))
      );
  }

  getProfileList(): Observable<any> {
    return this.authHttp
      .get<BusinessModel[]>(
        environment.settings.apiUrl + `/utilisateur/getProfileList`
      )
      .pipe(catchError(this.handleError("getProfileList", [])));
  }

  getLaboratoireList(): Observable<any> {
    return this.authHttp
      .get<BusinessModel[]>(
        environment.settings.apiUrl + `/utilisateur/getLaboratoireList`
      )
      .pipe(catchError(this.handleError("getLaboratoireList", [])));
  }

  updateUtilisateurPassword(user) {
    return this.authHttp
      .put<Utilisateur>(
        environment.settings.apiUrl + `/utilisateur/changePassword/${user.id}`,
        JSON.stringify(user)
      )
      .pipe(catchError(this.handleError("updateUtilisateur", user)));
  }
}
