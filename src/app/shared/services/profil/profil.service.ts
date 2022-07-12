import {Injectable} from "@angular/core";
import {SettingsService} from "@core/settings/settings.service";
import {AuthHttpService} from '@core/auth/auth-http.service';
import { environment } from '@environments/environment';
import { HttpErrorHandler, HandleError } from '@core/auth/http-error-handler.service';
import { Observable } from "rxjs/Observable";
import { catchError } from 'rxjs/operators';
import { Profil, ProfilCriteria, PaginatedList, BusinessModel, TreeModel } from '@models';

@Injectable({
	providedIn: 'root',
})
export class ProfilService {
    
	private handleError: HandleError;
        
    constructor(private settings: SettingsService,
                private httpErrorHandler: HttpErrorHandler,    
                private authHttp: AuthHttpService) {
                this.handleError = httpErrorHandler.createHandleError('ProfilService');                
    }
    
    saveProfil(profil: Profil): Observable<Profil> {
        return this.authHttp.post<Profil>(environment.settings.apiUrl + `/profil`, JSON.stringify(profil))
        .pipe(
        catchError(this.handleError('saveProfil', profil))
      );
    }
    
    updateProfil(profil: Profil): Observable<Profil> {
        return this.authHttp.put<Profil>(environment.settings.apiUrl + `/profil`, JSON.stringify(profil))
        .pipe(
        catchError(this.handleError('updateProfil', profil))
      );
    }
    
    getProfil( id: number, includes?: Array<string>, excludes?: Array<string> ): Observable<any> {
        var p_includes: string = includes ? '?includes=' + includes : '';
        var p_excludes: string = excludes ? '&excludes=' + excludes : '';
        var params = p_includes + p_excludes;
        return this.authHttp.get<Profil>( environment.settings.apiUrl + `/profil/${id}` + params )
       .pipe(
        catchError(this.handleError('getProfil'))
      );     
    }
    
    deleteProfil(profilListForDelete: Array<Profil>): any {
        let body = JSON.stringify(profilListForDelete);
        return this.authHttp.delete(environment.settings.apiUrl + `/profil/delete`, body)
		.pipe(
	        catchError(this.handleError('deleteProfil'))
	      );
    }

    findProfilsByCriteria(profilCriteria: ProfilCriteria): Observable<any> {
        return this.authHttp.post<Profil[]>(environment.settings.apiUrl + `/profil/listByCriteria`, JSON.stringify(profilCriteria))
		.pipe(
	        catchError(this.handleError('findProfilsByCriteria'))
	      );
    }
    
    listProfils(profilCriteria: ProfilCriteria): Observable<any> {
        return this.authHttp.post<PaginatedList>(environment.settings.apiUrl + `/profil/paginatedListByCriteria`, JSON.stringify(profilCriteria))
		.pipe(
	        catchError(this.handleError('listProfils'))
	      );
    }
    
    getProfilsDataSize(profilCriteria: ProfilCriteria): Observable<any> {
        return this.authHttp.post<any>(environment.settings.apiUrl + `/profil/getProfilsDataSize`, JSON.stringify(profilCriteria))
		.pipe(
	        catchError(this.handleError('getProfilsDataSize'))
	      );
    }
    
    exportProfils( profilCriteria: ProfilCriteria ): Observable<any> {

        return this.authHttp.postFile( environment.settings.apiUrl + `/profil/exportProfils/`, JSON.stringify( profilCriteria ), { responseType: 'blob' })
		.pipe(
	        catchError(this.handleError('exportProfils'))
	      );
    }


    getRolesList(): Observable<any> {
        return this.authHttp.get<BusinessModel[]>(environment.settings.apiUrl + `/profil/getRolesList`)
		.pipe(
	        catchError(this.handleError('getRolesList', []))
	      );
    }

    getRolesProfil(idProfil: number): Observable<any> {
        return this.authHttp.get<BusinessModel[]>(environment.settings.apiUrl + `/profil/getRolesProfilList/${idProfil}`)
		.pipe(
	        catchError(this.handleError('getRolesProfil', []))
	      );
    }

    getRolesCategorieByDomaine(): Observable<any> {
        let domaineId = this.settings.app.domain;
        return this.authHttp.get<TreeModel[]>( environment.settings.apiUrl + `/profil/getRolesCategorieByDomaine/${domaineId}` )
		.pipe(
	        catchError(this.handleError('getRolesCategorieByDomaine', []))
	      );
    }


}
