import {Injectable} from "@angular/core";
import {SettingsService} from "@core/settings/settings.service";
import {AuthHttpService} from '@core/auth/auth-http.service';
import { environment } from '@environments/environment';
import { HttpErrorHandler, HandleError } from '@core/auth/http-error-handler.service';
import { Observable } from "rxjs/Observable";
import { catchError } from 'rxjs/operators';
import { Service, ServiceCriteria, PaginatedList, BusinessModel } from '@models';

@Injectable({
	providedIn: 'root',
})
export class ServiceService {
    
	private handleError: HandleError;
        
    constructor(private settings: SettingsService,
                private httpErrorHandler: HttpErrorHandler,    
                private authHttp: AuthHttpService) {
                this.handleError = httpErrorHandler.createHandleError('ServiceService');                
    }
    
    saveService(service: Service): Observable<Service> {
        return this.authHttp.post<Service>(environment.settings.apiUrl + `/service`, JSON.stringify(service))
        .pipe(
        catchError(this.handleError('saveService', service))
      );
    }
    
    updateService(service: Service): Observable<Service> {
        return this.authHttp.put<Service>(environment.settings.apiUrl + `/service`, JSON.stringify(service))
        .pipe(
        catchError(this.handleError('updateService', service))
      );
    }
    
    getService( id: number, includes?: Array<string>, excludes?: Array<string> ): Observable<any> {
        var p_includes: string = includes ? '?includes=' + includes : '';
        var p_excludes: string = excludes ? '&excludes=' + excludes : '';
        var params = p_includes + p_excludes;
        return this.authHttp.get<Service>( environment.settings.apiUrl + `/service/${id}` + params )
       .pipe(
        catchError(this.handleError('getService'))
      );     
    }
    
    deleteService(serviceListForDelete: Array<Service>): any {
        let body = JSON.stringify(serviceListForDelete);
        return this.authHttp.delete(environment.settings.apiUrl + `/service/delete`, body)
		.pipe(
	        catchError(this.handleError('deleteService'))
	      );
    }

    findServicesByCriteria(serviceCriteria: ServiceCriteria): Observable<any> {
        return this.authHttp.post<Service[]>(environment.settings.apiUrl + `/service/listByCriteria`, JSON.stringify(serviceCriteria))
		.pipe(
	        catchError(this.handleError('findServicesByCriteria'))
	      );
    }
    
    listServices(serviceCriteria: ServiceCriteria): Observable<any> {
        return this.authHttp.post<PaginatedList>(environment.settings.apiUrl + `/service/paginatedListByCriteria`, JSON.stringify(serviceCriteria))
		.pipe(
	        catchError(this.handleError('listServices'))
	      );
    }
    
    getServicesDataSize(serviceCriteria: ServiceCriteria): Observable<any> {
        return this.authHttp.post<any>(environment.settings.apiUrl + `/service/getServicesDataSize`, JSON.stringify(serviceCriteria))
		.pipe(
	        catchError(this.handleError('getServicesDataSize'))
	      );
    }
    
    exportServices( serviceCriteria: ServiceCriteria ): Observable<any> {

        return this.authHttp.postFile( environment.settings.apiUrl + `/service/exportServices/`, JSON.stringify( serviceCriteria ), { responseType: 'blob' })
		.pipe(
	        catchError(this.handleError('exportServices'))
	      );
    }


    getEtablissementList(): Observable<any> {
        return this.authHttp.get<BusinessModel[]>(environment.settings.apiUrl + `/service/getEtablissementList`)
		.pipe(
	        catchError(this.handleError('getEtablissementList', []))
	      );
    }



}
