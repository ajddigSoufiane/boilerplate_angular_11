import {Injectable} from "@angular/core";
import {SettingsService} from "@core/settings/settings.service";
import {AuthHttpService} from '@core/auth/auth-http.service';
import { environment } from '@environments/environment';
import { HttpErrorHandler, HandleError } from '@core/auth/http-error-handler.service';
import { Observable } from "rxjs/Observable";
import { catchError } from 'rxjs/operators';
import { CategorieParametrage, CategorieParametrageCriteria, PaginatedList } from '@models';

@Injectable({
	providedIn: 'root',
})
export class CategorieParametrageService {
    
	private handleError: HandleError;
        
    constructor(private settings: SettingsService,
                private httpErrorHandler: HttpErrorHandler,    
                private authHttp: AuthHttpService) {
                this.handleError = httpErrorHandler.createHandleError('CategorieParametrageService');                
    }
    
    saveCategorieParametrage(categorieParametrage: CategorieParametrage): Observable<CategorieParametrage> {
        return this.authHttp.post<CategorieParametrage>(environment.settings.apiUrl + `/categorieParametrage`, JSON.stringify(categorieParametrage))
        .pipe(
        catchError(this.handleError('saveCategorieParametrage', categorieParametrage))
      );
    }
    
    updateCategorieParametrage(categorieParametrage: CategorieParametrage): Observable<CategorieParametrage> {
        return this.authHttp.put<CategorieParametrage>(environment.settings.apiUrl + `/categorieParametrage`, JSON.stringify(categorieParametrage))
        .pipe(
        catchError(this.handleError('updateCategorieParametrage', categorieParametrage))
      );
    }
    
    getCategorieParametrage( id: number, includes?: Array<string>, excludes?: Array<string> ): Observable<any> {
        var p_includes: string = includes ? '?includes=' + includes : '';
        var p_excludes: string = excludes ? '&excludes=' + excludes : '';
        var params = p_includes + p_excludes;
        return this.authHttp.get<CategorieParametrage>( environment.settings.apiUrl + `/categorieParametrage/${id}` + params )
       .pipe(
        catchError(this.handleError('getCategorieParametrage'))
      );     
    }
    
    deleteCategorieParametrage(categorieParametrageListForDelete: Array<CategorieParametrage>): any {
        let body = JSON.stringify(categorieParametrageListForDelete);
        return this.authHttp.delete(environment.settings.apiUrl + `/categorieParametrage/delete`, body)
		.pipe(
	        catchError(this.handleError('deleteCategorieParametrage'))
	      );
    }

    findCategorieParametragesByCriteria(categorieParametrageCriteria: CategorieParametrageCriteria): Observable<any> {
        return this.authHttp.post<CategorieParametrage[]>(environment.settings.apiUrl + `/categorieParametrage/listByCriteria`, JSON.stringify(categorieParametrageCriteria))
		.pipe(
	        catchError(this.handleError('findCategorieParametragesByCriteria'))
	      );
    }
    
    listCategorieParametrages(categorieParametrageCriteria: CategorieParametrageCriteria): Observable<any> {
        return this.authHttp.post<PaginatedList>(environment.settings.apiUrl + `/categorieParametrage/paginatedListByCriteria`, JSON.stringify(categorieParametrageCriteria))
		.pipe(
	        catchError(this.handleError('listCategorieParametrages'))
	      );
    }
    
    getCategorieParametragesDataSize(categorieParametrageCriteria: CategorieParametrageCriteria): Observable<any> {
        return this.authHttp.post<any>(environment.settings.apiUrl + `/categorieParametrage/getCategorieParametragesDataSize`, JSON.stringify(categorieParametrageCriteria))
		.pipe(
	        catchError(this.handleError('getCategorieParametragesDataSize'))
	      );
    }
    
    exportCategorieParametrages( categorieParametrageCriteria: CategorieParametrageCriteria ): Observable<any> {

        return this.authHttp.postFile( environment.settings.apiUrl + `/categorieParametrage/exportCategorieParametrages/`, JSON.stringify( categorieParametrageCriteria ), { responseType: 'blob' })
		.pipe(
	        catchError(this.handleError('exportCategorieParametrages'))
	      );
    }




}
