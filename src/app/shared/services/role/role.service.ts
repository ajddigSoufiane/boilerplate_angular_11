import {Injectable} from "@angular/core";
import {SettingsService} from "@core/settings/settings.service";
import {AuthHttpService} from '@core/auth/auth-http.service';
import { environment } from '@environments/environment';
import { HttpErrorHandler, HandleError } from '@core/auth/http-error-handler.service';
import { Observable } from "rxjs/Observable";
import { catchError } from 'rxjs/operators';
import { Role, RoleCriteria, PaginatedList, BusinessModel } from '@models';

@Injectable({
	providedIn: 'root',
})
export class RoleService {
    
	private handleError: HandleError;
        
    constructor(private settings: SettingsService,
                private httpErrorHandler: HttpErrorHandler,    
                private authHttp: AuthHttpService) {
                this.handleError = httpErrorHandler.createHandleError('RoleService');                
    }
    
    saveRole(role: Role): Observable<Role> {
        return this.authHttp.post<Role>(environment.settings.apiUrl + `/role`, JSON.stringify(role))
        .pipe(
        catchError(this.handleError('saveRole', role))
      );
    }
    
    updateRole(role: Role): Observable<Role> {
        return this.authHttp.put<Role>(environment.settings.apiUrl + `/role`, JSON.stringify(role))
        .pipe(
        catchError(this.handleError('updateRole', role))
      );
    }
    
    getRole( id: number, includes?: Array<string>, excludes?: Array<string> ): Observable<any> {
        var p_includes: string = includes ? '?includes=' + includes : '';
        var p_excludes: string = excludes ? '&excludes=' + excludes : '';
        var params = p_includes + p_excludes;
        return this.authHttp.get<Role>( environment.settings.apiUrl + `/role/${id}` + params )
       .pipe(
        catchError(this.handleError('getRole'))
      );     
    }
    
    deleteRole(roleListForDelete: Array<Role>): any {
        let body = JSON.stringify(roleListForDelete);
        return this.authHttp.delete(environment.settings.apiUrl + `/role/delete`, body)
		.pipe(
	        catchError(this.handleError('deleteRole'))
	      );
    }

    findRolesByCriteria(roleCriteria: RoleCriteria): Observable<any> {
        return this.authHttp.post<Role[]>(environment.settings.apiUrl + `/role/listByCriteria`, JSON.stringify(roleCriteria))
		.pipe(
	        catchError(this.handleError('findRolesByCriteria'))
	      );
    }
    
    listRoles(roleCriteria: RoleCriteria): Observable<any> {
        return this.authHttp.post<PaginatedList>(environment.settings.apiUrl + `/role/paginatedListByCriteria`, JSON.stringify(roleCriteria))
		.pipe(
	        catchError(this.handleError('listRoles'))
	      );
    }
    
    getRolesDataSize(roleCriteria: RoleCriteria): Observable<any> {
        return this.authHttp.post<any>(environment.settings.apiUrl + `/role/getRolesDataSize`, JSON.stringify(roleCriteria))
		.pipe(
	        catchError(this.handleError('getRolesDataSize'))
	      );
    }
    
    exportRoles( roleCriteria: RoleCriteria ): Observable<any> {

        return this.authHttp.postFile( environment.settings.apiUrl + `/role/exportRoles/`, JSON.stringify( roleCriteria ), { responseType: 'blob' })
		.pipe(
	        catchError(this.handleError('exportRoles'))
	      );
    }


    getCategorieRoleList(): Observable<any> {
        return this.authHttp.get<BusinessModel[]>(environment.settings.apiUrl + `/role/getCategorieRoleList`)
		.pipe(
	        catchError(this.handleError('getCategorieRoleList', []))
	      );
    }



}
