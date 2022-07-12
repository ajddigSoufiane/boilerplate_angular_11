import {Injectable} from "@angular/core";
import {SettingsService} from "@core/settings/settings.service";
import {AuthHttpService} from '@core/auth/auth-http.service';
import { environment } from '@environments/environment';
import { HttpErrorHandler, HandleError } from '@core/auth/http-error-handler.service';
import { Observable } from "rxjs/Observable";
import { catchError } from 'rxjs/operators';
import { Parametrage, ParametrageCriteria, PaginatedList, BusinessModel, HistCriteria } from '@models';

@Injectable({
	providedIn: 'root',
})
export class ParametrageService {
    
	private handleError: HandleError;
        
    constructor(private settings: SettingsService,
                private httpErrorHandler: HttpErrorHandler,    
                private authHttp: AuthHttpService) {
                this.handleError = httpErrorHandler.createHandleError('ParametrageService');                
    }
    
    saveParametrage(parametrage: Parametrage): Observable<Parametrage> {
        return this.authHttp.post<Parametrage>(environment.settings.apiUrl + `/parametrage`, JSON.stringify(parametrage))
        .pipe(
        catchError(this.handleError('saveParametrage', parametrage))
      );
    }
    
    updateParametrage(parametrage: Parametrage): Observable<Parametrage> {
        return this.authHttp.put<Parametrage>(environment.settings.apiUrl + `/parametrage`, JSON.stringify(parametrage))
        .pipe(
        catchError(this.handleError('updateParametrage', parametrage))
      );
    }
    
    getParametrage( id: number, includes?: Array<string>, excludes?: Array<string> ): Observable<any> {
        var p_includes: string = includes ? '?includes=' + includes : '';
        var p_excludes: string = excludes ? '&excludes=' + excludes : '';
        var params = p_includes + p_excludes;
        return this.authHttp.get<Parametrage>( environment.settings.apiUrl + `/parametrage/${id}` + params )
       .pipe(
        catchError(this.handleError('getParametrage'))
      );     
    }
    
    deleteParametrage(parametrageListForDelete: Array<Parametrage>): any {
        let body = JSON.stringify(parametrageListForDelete);
        return this.authHttp.delete(environment.settings.apiUrl + `/parametrage/delete`, body)
		.pipe(
	        catchError(this.handleError('deleteParametrage'))
	      );
    }

    findParametragesByCriteria(parametrageCriteria: ParametrageCriteria): Observable<any> {
        return this.authHttp.post<Parametrage[]>(environment.settings.apiUrl + `/parametrage/listByCriteria`, JSON.stringify(parametrageCriteria))
		.pipe(
	        catchError(this.handleError('findParametragesByCriteria'))
	      );
    }
    
    listParametrages(parametrageCriteria: ParametrageCriteria): Observable<any> {
        return this.authHttp.post<PaginatedList>(environment.settings.apiUrl + `/parametrage/paginatedListByCriteria`, JSON.stringify(parametrageCriteria))
		.pipe(
	        catchError(this.handleError('listParametrages'))
	      );
    }
    
    getParametragesDataSize(parametrageCriteria: ParametrageCriteria): Observable<any> {
        return this.authHttp.post<any>(environment.settings.apiUrl + `/parametrage/getParametragesDataSize`, JSON.stringify(parametrageCriteria))
		.pipe(
	        catchError(this.handleError('getParametragesDataSize'))
	      );
    }
    
    exportParametrages( parametrageCriteria: ParametrageCriteria ): Observable<any> {

        return this.authHttp.postFile( environment.settings.apiUrl + `/parametrage/exportParametrages/`, JSON.stringify( parametrageCriteria ), { responseType: 'blob' })
		.pipe(
	        catchError(this.handleError('exportParametrages'))
	      );
    }


    getTypeValeurList(): Observable<any[]> {
        return this.authHttp.get<any[]>(environment.settings.apiUrl + `/parametrage/getTypeValeurList`)
		.pipe(
	        catchError(this.handleError('getTypeValeurList', []))
	      );
    }

    getCategorieRoleList(): Observable<any> {
        return this.authHttp.get<BusinessModel[]>(environment.settings.apiUrl + `/parametrage/getCategorieRoleList`)
		.pipe(
	        catchError(this.handleError('getCategorieRoleList', []))
	      );
    }


    listHistParametrages(histCriteria: HistCriteria): Observable<any> {
        return this.authHttp.post<PaginatedList>(environment.settings.apiUrl + `/parametrage/paginatedListHistByCriteria`, JSON.stringify(histCriteria))
		.pipe(
	        catchError(this.handleError('listHistParametrages', histCriteria))
	      );
    }
    
    getUtilisateurHistList(): Observable<any> {
        return this.authHttp.get<BusinessModel[]>(environment.settings.apiUrl + `/utilisateur/getUtilisateurHistList`)
		.pipe(
	        catchError(this.handleError('getUtilisateurHistList', []))
	      );
    }
    
   	exportParametragesHist(histCriteria: HistCriteria): Observable<any> {

        return this.authHttp.postFile( environment.settings.apiUrl + `/parametrage/exportParametragesHist/`, JSON.stringify( histCriteria ), { responseType: 'blob' })
		.pipe(
	        catchError(this.handleError('exportParametragesHist'))
	      );
    }

}
