import {Injectable} from "@angular/core";
import {SettingsService} from "@core/settings/settings.service";
import {AuthHttpService} from '@core/auth/auth-http.service';
import { environment } from '@environments/environment';
import { HttpErrorHandler, HandleError } from '@core/auth/http-error-handler.service';
import { Observable } from "rxjs/Observable";
import { catchError } from 'rxjs/operators';
import { CategorieRole, CategorieRoleCriteria, PaginatedList, BusinessModel } from '@models';

@Injectable({
	providedIn: 'root',
})
export class CategorieRoleService {
    
	private handleError: HandleError;
        
    constructor(private settings: SettingsService,
                private httpErrorHandler: HttpErrorHandler,    
                private authHttp: AuthHttpService) {
                this.handleError = httpErrorHandler.createHandleError('CategorieRoleService');                
    }
    
    saveCategorieRole(categorieRole: CategorieRole): Observable<CategorieRole> {
        return this.authHttp.post<CategorieRole>(environment.settings.apiUrl + `/categorieRole`, JSON.stringify(categorieRole))
        .pipe(
        catchError(this.handleError('saveCategorieRole', categorieRole))
      );
    }
    
    updateCategorieRole(categorieRole: CategorieRole): Observable<CategorieRole> {
        return this.authHttp.put<CategorieRole>(environment.settings.apiUrl + `/categorieRole`, JSON.stringify(categorieRole))
        .pipe(
        catchError(this.handleError('updateCategorieRole', categorieRole))
      );
    }
    
    getCategorieRole( id: number, includes?: Array<string>, excludes?: Array<string> ): Observable<any> {
        var p_includes: string = includes ? '?includes=' + includes : '';
        var p_excludes: string = excludes ? '&excludes=' + excludes : '';
        var params = p_includes + p_excludes;
        return this.authHttp.get<CategorieRole>( environment.settings.apiUrl + `/categorieRole/${id}` + params )
       .pipe(
        catchError(this.handleError('getCategorieRole'))
      );     
    }
    
    deleteCategorieRole(categorieRoleListForDelete: Array<CategorieRole>): any {
        let body = JSON.stringify(categorieRoleListForDelete);
        return this.authHttp.delete(environment.settings.apiUrl + `/categorieRole/delete`, body)
		.pipe(
	        catchError(this.handleError('deleteCategorieRole'))
	      );
    }

    findCategorieRolesByCriteria(categorieRoleCriteria: CategorieRoleCriteria): Observable<any> {
        return this.authHttp.post<CategorieRole[]>(environment.settings.apiUrl + `/categorieRole/listByCriteria`, JSON.stringify(categorieRoleCriteria))
		.pipe(
	        catchError(this.handleError('findCategorieRolesByCriteria'))
	      );
    }
    
    listCategorieRoles(categorieRoleCriteria: CategorieRoleCriteria): Observable<any> {
        return this.authHttp.post<PaginatedList>(environment.settings.apiUrl + `/categorieRole/paginatedListByCriteria`, JSON.stringify(categorieRoleCriteria))
		.pipe(
	        catchError(this.handleError('listCategorieRoles'))
	      );
    }
    
    getCategorieRolesDataSize(categorieRoleCriteria: CategorieRoleCriteria): Observable<any> {
        return this.authHttp.post<any>(environment.settings.apiUrl + `/categorieRole/getCategorieRolesDataSize`, JSON.stringify(categorieRoleCriteria))
		.pipe(
	        catchError(this.handleError('getCategorieRolesDataSize'))
	      );
    }
    
    exportCategorieRoles( categorieRoleCriteria: CategorieRoleCriteria ): Observable<any> {

        return this.authHttp.postFile( environment.settings.apiUrl + `/categorieRole/exportCategorieRoles/`, JSON.stringify( categorieRoleCriteria ), { responseType: 'blob' })
		.pipe(
	        catchError(this.handleError('exportCategorieRoles'))
	      );
    }


    getParentList(): Observable<any> {
        return this.authHttp.get<BusinessModel[]>(environment.settings.apiUrl + `/categorieRole/getParentList`)
		.pipe(
	        catchError(this.handleError('getParentList', []))
	      );
    }



}
