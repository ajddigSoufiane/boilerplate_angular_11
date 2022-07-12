import { SettingsService } from '@core/settings/settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceLocator } from '@core/service-locator';
import { convertToCSV } from '../utility/helper';
import { TranslatorService } from '@core/translator/translator.service';
import { BaseCriteria, BaseModel } from '@models';
import { BusyComponent } from './busy/busy.component';
import { saveAs as importedSaveAs } from 'file-saver';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { OnDestroy, Inject, PLATFORM_ID, Component } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { Base64 } from '../utility/webtoolkit.base64';
import { FormStore } from '../utility/form_store';
import { ColorsService } from '../colors/colors.service';
import { Entity_action } from '../enum/entity_action.enum';
import { Mode_ecran } from '../enum/mode_ecran.enum';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FactoryComponentService } from '../services/factory-component/factory-component.service';
import { NzNotificationCustomService } from './customized-ngZorro/nz-notification-custom/nz-notification-custom.service';
import { TYPE_NOTIFICATION } from './customized-ngZorro/nz-notification-custom/type_notification.enum';
import { NzConfimModalService } from './customized-ngZorro/nz-confim-modal/nz-confim-modal.service';
import { UtilityService } from '../services/common-services/utility.service';

import * as moment from 'moment';

@Component( {
    template: "",
})
export class BaseComponent {
    entity_action: typeof Entity_action = Entity_action;
    mode_ecran: typeof Mode_ecran = Mode_ecran;

    translator: TranslatorService;
    settings: SettingsService;
    router: Router;
    toasterService: ToastrService;
    notificationService: NzNotificationCustomService;

    _activeroute: ActivatedRoute;
    bsValue = new Date();
    bsRangeValue: Date[];
    maxDate = new Date();
    nzDateConfig = {
        dateTime: "dd/MM/yyyy HH:mm",
        dateTimeBackEnd: "DD/MM/YYYY HH:mm",
        dateBackEnd: "DD/MM/YYYY",
        date: "dd/MM/yyyy",
        time: "HH:mm",
    };

    ismeridian = false;
    busy: BusyComponent = new BusyComponent();
    locale = "fr";
    validMessage: String = "";
    currentUser: any;

    // DATA table
    nbrRow = [5, 10, 20];

    swalConfig: any = {};
    formStore: FormStore;
    _colorsService: any;
    factoryComponentService: FactoryComponentService;
    nzConfimModalService: NzConfimModalService;
    utilityService: UtilityService;
    protected constructor( @Inject( PLATFORM_ID ) private platformId?) {
        this.settings = ServiceLocator.injector.get( SettingsService );
        this.utilityService = ServiceLocator.injector.get( UtilityService );
        this.router = ServiceLocator.injector.get( Router );
        this.toasterService = ServiceLocator.injector.get( ToastrService );
        this.translator = ServiceLocator.injector.get( TranslatorService );
        this.validMessage = this.translator.instant( "common.message.valid.date" );
        this.currentUser = this.settings.getCurrentUser();
        // console.log(this.currentUser)
        this._activeroute = ServiceLocator.injector.get( ActivatedRoute );
        this._colorsService = ServiceLocator.injector.get( ColorsService );
        this.notificationService = ServiceLocator.injector.get(
            NzNotificationCustomService
        );
        this.factoryComponentService = ServiceLocator.injector.get(
            FactoryComponentService
        );
        this.nzConfimModalService =
            ServiceLocator.injector.get( NzConfimModalService );

        this.formStore = new FormStore( this._activeroute, this.router );
        /**
         * Description: SweetAlert object
         */
        this.swalConfig = {
            title: this.translator.instant( "common.text.confirmation" ),
            text: this.translator.instant( "common.message.confirm.deleteAll" ),
            icon: "warning",
            buttons: {
                cancel: {
                    text: this.translator.instant( "common.text.no" ),
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: false,
                },
                confirm: {
                    text: this.translator.instant( "common.text.yes" ),
                    value: true,
                    visible: true,
                    className: "bg-danger",
                    closeModal: false,
                },
            },
        };
    }

    addBusy() {
        this.busy.addBusy();
    }

    removeBusy() {
        this.busy.removeBusy();
    }

    protected getCurrentUser() {
        if ( localStorage.getItem( 'currentUser1' ) ) {
            this.currentUser = JSON.parse( Base64.decode( localStorage.getItem( 'currentUser1' ) ) );
            return this.currentUser;
        }

        return null;
    }
    protected hasDefaultPassword(): boolean {
        if ( this.currentUser && this.currentUser.resetPassword ) {
            return true
        }

        return false
    }
    changeFormInvalide( form: FormGroup ) {
        form.valueChanges.subscribe(( data ) => {
            for ( const inner in form.controls ) {
                if ( form.controls[inner].valid && form.controls[inner].enabled ) {
                    $( "[formcontrolname='" + inner + "']" ).removeClass( "is-invalid" );
                    $( "[name='" + inner + "']" ).removeClass( "is-invalid" );
                }
            }
        });
    }

    resetValidateForm( form: FormGroup ) {
        for ( const inner in form.controls ) {
            $( "[formcontrolname='" + inner + "']" ).removeClass( "is-invalid" );
            $( "[name='" + inner + "']" ).removeClass( "is-invalid" );
        }
    }

    detectInvalideFormControle( form: FormGroup, focus?: boolean, top?: number ) {
        if ( !top ) {
            top = 100;
        }
        let targetPremier = null;
        for ( const target in form.controls ) {
            if (
                form.controls[target] &&
                !form.controls[target].valid &&
                form.controls[target].enabled &&
                form.controls[target] instanceof FormControl
            ) {
                if ( !targetPremier ) {
                    // console.log(target,form.controls[target])
                    targetPremier = target;
                }
                if ( $( "[formcontrolname='" + target + "']" )[0] ) {
                    $( "[formcontrolname='" + target + "']" ).addClass( "is-invalid" );
                }
                if ( $( "[name='" + target + "']" )[0] ) {
                    $( "[name='" + target + "']" ).addClass( "is-invalid" );
                }

                form.get( target ).markAsTouched();
                form.get( target ).markAsDirty();
                form.get( target ).updateValueAndValidity();
            } else {
                if ( $( "[formcontrolname='" + target + "']" )[0] ) {
                    $( "[formcontrolname='" + target + "']" ).removeClass( "is-invalid" );
                }
                if ( $( "[name='" + target + "']" )[0] ) {
                    $( "[name='" + target + "']" )
                        .closest( ".form-group" )
                        .removeClass( "is-invalid" );
                }
            }
        }

        if ( !focus && targetPremier ) {
            if ( $( "[formcontrolname='" + targetPremier + "']" )[0] ) {
                $( "[formcontrolname='" + targetPremier + "']" ).each( function() {
                    this.focus();
                    if ( $( this ).offset().top > 0 || $( this ).offset().top > top ) {
                        $( "html,body" ).animate(
                            { scrollTop: $( this ).offset().top - top },
                            "slow"
                        );
                    }
                });
            } else if ( $( "[name='" + targetPremier + "']" )[0] ) {
                $( "[name='" + targetPremier + "']" ).each( function() {
                    this.focus();

                    if ( $( this ).offset().top > 0 || $( this ).offset().top > top ) {
                        $( "html,body" ).animate(
                            { scrollTop: $( this ).offset().top - top },
                            "slow"
                        );
                    }
                });
            }
            //  console.log(targetPremier," test 1 ",focus)
            focus = true;
        }
        return focus;
    }

    getFile( response: HttpResponse<any>, name ): File {
        let contentType = response.headers.get( "Content-Type" );
        const blob = new Blob( [this.getResponseBody( response )], {
            type: contentType,
        });
        if ( contentType.lastIndexOf( ";" ) >= 0 ) {
            contentType = contentType.substring( 0, contentType.indexOf( ";" ) );
        }
        const file = new File( [blob], this.getFileName( name ), {
            type: contentType,
            lastModified: Date.now(),
        });
        return file;
    }

    getFileName( path ) {
        return path.match( /[-_\w]+[.][\w]+$/i )[0];
    }

    handleError( error: HttpErrorResponse ) {
        if ( error.error instanceof ErrorEvent ) {
            // Client-side errors
            this.showError( error.status, error.message );
        } else {
            // Server-side errors
            let error_show = error.error ? error.error : error;
            if ( error.status === 500 ) {
                this.showError( error.status, error_show.message );
            } else if ( error.status === 401 ) {
                this.router.navigate( ["/boileplate"] );
            } else {
                this.showError( error.status, error_show.message );
            }
        }
    }

    showError( status: number, message: string | any ) {
        this.removeBusy();
        switch ( status ) {
            case 401:
                this.showUnauthorizedError();
                this.router.navigate( ["/boileplate"] );
                break;
            case 0:
                // this.notificationService.create('error',this.translator.instant('accesServeur.message.error'), 'Erreur', {
                //     nzClass: 'notification_'+'error'  ,
                //     nzDuration: 0
                // });
                this.notificationService.showNotification(
                    TYPE_NOTIFICATION.ERROR,
                    "Erreur",
                    this.translator.instant( "accesServeur.message.error" )
                );

                setTimeout(() => {
                    this.logout();
                }, 2000 );
                break;
            default:
                this.notificationService.showNotification(
                    TYPE_NOTIFICATION.ERROR,
                    "Erreur",
                    this.translator.instant( message || "accesServeur.message.error" )
                );

            //   this.notificationService.create('error',this.translator.instant(message || 'accesServeur.message.error'), 'Erreur',{
            //     nzClass: 'notification_'+'error'  ,
            //     nzDuration: 0
            // });
        }
    }

    showFileError( status: number ) {
        this.removeBusy();
        let element;
        switch ( status ) {
            case 401:
                this.showUnauthorizedError();
                this.router.navigate( ["/login"] );
                break;
            case 404:
                // this.notificationService.create('error',this.translator.instant('common.message.fileNotFound'), 'Erreur',{
                //   nzClass: 'notification_'+'error'  ,
                //   nzDuration: 0
                // });
                this.notificationService.showNotification(
                    TYPE_NOTIFICATION.ERROR,
                    "Erreur",
                    this.translator.instant( "common.message.fileNotFound" )
                );
                break;
            default:
                this.notificationService.showNotification(
                    TYPE_NOTIFICATION.ERROR,
                    "Erreur",
                    this.translator.instant( "erreur.message" )
                );
            // this.notificationService.create('error',this.translator.instant('erreur.message'), 'Erreur',{
            //     nzClass: 'notification_'+'error' ,
            //     nzDuration: 0
            // });
        }
    }

    showErrorMessage( message: string | any ) {
        this.removeBusy();
        if ( message ) {
            // this.toasterService.error(this.translator.instant(message), 'Erreur', {closeButton: true});
            this.notificationService.showNotification(
                TYPE_NOTIFICATION.ERROR,
                "Erreur",
                this.translator.instant( message )
            );
            //   this.notificationService.create('error',this.translator.instant(message), 'Erreur',{
            //     nzClass: 'notification_'+'error' ,
            //     nzDuration: 0
            // })
        }
    }

    showUnauthorizedError( redirect?: boolean ) {
        this.removeBusy();
        // this.toasterService.error(this.translator.instant('accesControle.description'), this.translator.instant('accesControle.title'), {closeButton: true});
        //    this.notificationService.create('error',this.translator.instant('accesControle.description'), this.translator.instant('accesControle.title'),{
        //     nzClass: 'notification_'+'error',
        //     nzDuration: 0
        // })
        this.notificationService.showNotification(
            TYPE_NOTIFICATION.ERROR,
            this.translator.instant( "accesControle.title" ),
            this.translator.instant( "accesControle.description" )
        );
        if ( redirect ) {
            this.router.navigate( ["/boileplate"] );
        }
    }

    showInfo( info: string | any ) {
        this.removeBusy();
        this.notificationService.showNotification(
            TYPE_NOTIFICATION.SUCCESS,
            this.translator.instant( info ),
            this.translator.instant( "common.text.info" )
        );

        // this.notificationService.create(
        //   'success',
        //   this.translator.instant('common.text.info'),
        //   this.translator.instant(info),
        //   {
        //     nzClass: 'notification_'+'success' ,
        //     nzDuration: 0,
        // }
        // );
        // this.toasterService.success(this.translator.instant(info), this.translator.instant('common.text.info'), {closeButton: true});
    }

    download( dataList: Array<any> ) {
        const csvData = convertToCSV( dataList );
        const a = document.createElement( "a" );
        a.setAttribute( "style", "display:none;" );
        document.body.appendChild( a );
        const blob = new Blob( [csvData], { type: "text/csv;charset=UTF-8" });
        const url = window.URL.createObjectURL( blob );
        a.href = url;
        a.download = "export.csv";
        a.click();
    }

    downloadFile( response: HttpResponse<any> ) {
        const blob = new Blob( [this.getResponseBody( response )], {
            type: response.headers.get( "Content-Type" ),
        });
        this.removeBusy();
        let fileName: any = response.headers.get( "etag" );
        fileName = fileName.split( '"' ).join( '' );
        importedSaveAs( blob, fileName );
    }

    getPaginationParams(
        criteria: BaseCriteria,
        first: number,
        rows: number,
        sortField: string,
        sortOrder: string
    ) {
        if ( criteria ) {
            criteria.page = first;
            criteria.maxResults = rows;
            criteria.sortField = sortField;
            criteria.sortOrder = sortOrder;
        }
    }

    idsToObjects( items: any[] ) {
        if ( items ) {
            const results: any[] = [];
            for ( const item of items ) {
                results.push( new BaseModel( item.id ) );
            }
            return results;
        }
        return null;
    }

    objectToIds( items: any[] ) {
        if ( items ) {
            const results: Array<number> = [];
            for ( const item of items ) {
                results.push( item );
            }
            return results;
        }
        return null;
    }

    uniqueID() {
        const id = Date.now() + Math.random();
        return Math.floor( id );
    }

    renameFile( fileName: string ) {
        try {
            const extension = fileName.substring( fileName.lastIndexOf( "." ) );
            return this.uniqueID() + extension;
        } catch ( e ) {
            return this.uniqueID() + "";
        }
    }

    validateFile( file: File ): boolean {
        const accept = {
            binary: ["image/*"],
            text: [
                "image/jpeg",
                "image/gif",
                "image/png",
                "image/jpg",
                "image/bmp",
                "text/plain",
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ],
        };
        if ( accept.text.indexOf( file.type ) === -1 ) {
            this.showErrorMessage( "common.message.formatNotSopported" );
            return false;
        } else if ( file.size > 10485760 ) {
            this.showErrorMessage( "common.message.invalidSizeMessage" );
            return false;
        } else if ( file.size <= 0 ) {
            this.showErrorMessage( "common.message.invalidSize" );
            return false;
        }
        return true;
    }

    validateImage( file: File ): boolean {
        const accept = {
            binary: ["image/*"],
            text: ["image/jpeg", "image/gif", "image/png", "image/jpg"],
        };
        // console.log( file.type );
        if ( accept.text.indexOf( file.type ) === -1 ) {
            this.showErrorMessage( "common.message.formatNotSopported" );
            return false;
        } else if ( file.size === 0 || file.size > 10485760 ) {
            this.showErrorMessage( "common.message.invalidSizeMessage" );
            return false;
        }
        return true;
    }

    getResponseBody( response: any ) {
        return response["body"];
    }

    hasRole( role_: string ) {
        if ( this.currentUser ) {
            const roles: string[] = this.currentUser.rolesByDomain;
            if ( roles ) {
                const index = roles.findIndex(( element ) => element === role_ );
                if ( index >= 0 ) {
                    return true;
                }
            }
        }
        return false;
    }

    hasAnyRoles( roles: string[] ) {
        if ( roles && roles.length > 0 ) {
            for ( const role of roles ) {
                if ( role && role !== "" && this.hasRole( role ) ) {
                    return true;
                }
            }
        }
        return false;
    }

    hasCategorieRole( categorieRole_: string ) {
        if ( this.currentUser ) {
            const categorieRoles: string[] = this.currentUser.categorieRoles;
            if ( categorieRoles ) {
                const index = categorieRoles.findIndex(
                    ( element ) => element === categorieRole_
                );
                if ( index >= 0 ) {
                    return true;
                }
            }
        }
        return false;
    }

    hasAnyCategorieRole( categorieRoles: string[] ) {
        if ( categorieRoles && categorieRoles.length > 0 ) {
            for ( const categorieRole of categorieRoles ) {
                if (
                    categorieRole &&
                    categorieRole !== "" &&
                    this.hasCategorieRole( categorieRole )
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    hasRolesOrCategorie( item: any ) {
        if ( item.roles && item.roles.length > 0 ) {
            return this.hasAnyRoles( item.roles );
        } else if ( item.categories && item.categories.length > 0 ) {
            return this.hasAnyCategorieRole( item.categories );
        }
        return false;
    }

    getTableColumns( id ): any[] {
        const list: any[] = [];
        const dataTable: any = document.getElementById( id );
        const columns = dataTable.getElementsByClassName( "column" );
        let label = "";
        let format = "";
        for ( let columnIt = 0; columnIt < columns.length; columnIt++ ) {
            const column = columns[columnIt];
            if ( column && column.hasAttribute( "columnName" ) ) {
                label = columns[columnIt].innerText;
            }
            if ( column && column.hasAttribute( "format" ) ) {
                format = column.getAttribute( "format" );
            }
            list.push( {
                name: column.getAttribute( "columnName" ),
                label: label,
                format: format,
            });
        }
        if ( !list || list.length <= 0 ) {
            console.error(
                "no (column class or columnName attribute) found in " + id + " !!"
            );
        }
        return list;
    }

    removeToken(): void {
        localStorage.removeItem( "jwt1" );
        localStorage.removeItem( "currentUser1" );
        localStorage.removeItem( "dateExpiration1" );
        localStorage.clear();
        sessionStorage.clear();
    }

    logout(): void {
        this.removeToken();
        this.router.navigate( ["/login"] );
    }

    pushInList( list: Array<any>, obj: any ) {
        if ( obj ) {
            if ( !list ) {
                list = [];
            }
            const index = list.findIndex(( element ) => element.id === obj.id );
            if ( index < 0 ) {
                list.unshift( obj );
            }
        }
    }

    removeExistInList( list: Array<any>, srcList: Array<any> ) {
        if ( list && list.length > 0 && srcList && srcList.length > 0 ) {
            for ( const obj of srcList ) {
                const index = list.findIndex(( element ) => element.id === obj.id );
                if ( index > -1 ) {
                    list.splice( index, 1 );
                }
            }
        }
    }

    populateList( list: Array<any>, srcList: Array<any> ) {
        if ( !list ) {
            list = [];
        }
        this.removeExistInList( list, srcList );
        if ( srcList ) {
            list.push.apply( list, srcList );
        }
    }

    /**
     * @author ajddig
     * @param idTable : id of table
     * @param arry : array of role
     */
    calculColspan( idTable: string, arry?: any[] ) {
        let nombrecolspan = $( "#" + idTable + " .columnG th" ).length;
        if ( arry ) {
            for ( let i = 0; i < arry.length; i++ ) {
                if ( this.hasRole( arry[i] ) ) {
                    nombrecolspan--;
                }
            }
        }
        return nombrecolspan;
    }

    nzCompareSelectedByName( o1: any, o2: any ): boolean {
        return o1 && o2 ? o1.name === o2.name : o1 === o2;
    }

    nzCompareSelectedByID( o1: any, o2: any ): boolean {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    }

    nzCompareSelectedByLabel( o1: any, o2: any ): boolean {
        return o1 && o2 ? o1.label === o2.label : o1 === o2;
    }
    nzCompareSelectedByDisplayText( o1: any, o2: any ): boolean {
        return o1 && o2 ? o1.displayText === o2.displayText : o1 === o2;
    }

    /* nzCompareSelectedByID(c1: any, c2: any): boolean {
      return c1 && c2 ? c1.id == c2.id : true;
    } */
    /* nzCompareSelectedByID = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2); */

    onlyNumberKey( event ) {
        return event.charCode == 8 || event.charCode == 0
            ? null
            : event.charCode >= 48 && event.charCode <= 57;
    }
    onlyNumberKeyDiffOf0( event ) {
        return event.charCode == 8 || event.charCode == 0
            ? null
            : event.charCode >= 49 && event.charCode <= 57;
    }

    //juste for test data
    loadData(
        service,
        name,
        key?: string,
        formControl?: AbstractControl,
        callBack?: any
    ) {
        let criteria = { listName: name };
        this["isLoading" + name] = true;
        service.getList( criteria ).subscribe(
            ( list ) => {
                this[name] = [];
                this["isLoading" + name] = false;
                if ( list && list[criteria.listName].length > 0 ) {
                    this[name] = list[criteria.listName];
                    if ( key )
                        this[name] = this[name].filter(
                            ( a ) => a.value.toLowerCase().indexOf( key.toLowerCase() ) != -1
                        );
                    //juste for checkbox

                    if ( callBack ) callBack();
                }
            },
            ( error ) => this.showError( error.status, error.message )
        );
    }
    //end for test
    //this function for scroll to specifique place in page
    goto( elem: string ) {
        console.log( elem );
        document
            .querySelector( elem )
            .scrollIntoView( { behavior: "smooth", block: "start" });
    }
    //this function for nz-checkbox-group composent convert list any form to {id:any,label:any}
    convertToFormaCheckbox = ( list, attr_name_id, att_name_label ) => {
        return list && list.length > 0
            ? list.map(( a ) => {
                return { id: a[attr_name_id], label: a[att_name_label] };
            })
            : [];
    };
    convertFormCheckboxTodata = ( list, controlForm ) => {
        let parametres: any[] = [];
        if (
            list &&
            list.length > 0 &&
            controlForm.value &&
            controlForm.value.length > 0
        ) {
            parametres = controlForm.value
                .filter(( a ) => a.checked == true )
                .map(( a ) => {
                    return { name: a.id, displayText: a.label };
                });
        }
        return parametres;
    };
    patchDataCheckBoxToForm = ( listIdToPatch, list ) => {
        let ids = listIdToPatch;
        list = this.convertToFormaCheckbox( list, "id", "libelle" );
        if ( list ) {
            for ( let iterator of list ) {
                if ( ids.indexOf( iterator.id ) != -1 ) {
                    iterator.checked = true;
                }
            }
        }
        return list;
    };
    //added by chaimae
    public toDate( date ) {
        let parts = date.split( "/" );

        let dateFormat = new Date(
            parseInt( parts[2], 10 ),
            parseInt( parts[1], 10 ) - 1,
            parseInt( parts[0], 10 )
        );
        return dateFormat;
    }
    formatDate = ( date ) => {
        let parts = date.split( "/" );
        let partHS = parts[2].split( " " );
        let heurSecond = partHS[1].split( ":" );
        let dateFormat = new Date(
            parseInt( parts[2], 10 ),
            parseInt( parts[1], 10 ) - 1,
            parseInt( parts[0], 10 ),
            parseInt( heurSecond[0], 10 ),
            parseInt( heurSecond[1], 10 )
        );
        return dateFormat;
    };
    formatDateNoTime = ( date ) => {
        let parts = date.split( "/" );
        let dateFormat = new Date(
            parseInt( parts[2], 10 ),
            parseInt( parts[1], 10 ) - 1,
            parseInt( parts[0], 10 ),
        );
        return dateFormat;
    };
    formatTime = ( time: string ) => {
        let date = new Date();
        let dateString = moment( date ).format( this.nzDateConfig.dateBackEnd );
        return this.formatDate( dateString + " " + time );
    };
    config: any = {
        airMode: false,
        tabDisable: true,
        codemirror: {
            mode: "text/html",
            htmlMode: true,
            lineNumbers: true,
        },
        lang: "UTF-8",
        popover: {
            table: [
                ["add", ["addRowDown", "addRowUp", "addColLeft", "addColRight"]],
                ["delete", ["deleteRow", "deleteCol", "deleteTable"]],
            ],
            image: [
                ["image", ["resizeNone", "resizeFull", "resizeHalf", "resizeQuarter"]],
                ["float", ["floatLeft", "floatRight", "floatNone"]],
                ["remove", ["removeMedia"]],
            ],
            link: [["link", ["linkDialogShow", "unlink"]]],
            air: [
                [
                    "font",
                    [
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "superscript",
                        "subscript",
                        "clear",
                    ],
                ],
            ],
        },
        height: "100px",
        uploadImagePath: "/api/upload",
        toolbar: [
            ["paperSize", ["paperSize"]],
            ["misc", ["codeview", "undo", "redo", "codeBlock"]],
            [
                "font",
                [
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "superscript",
                    "subscript",
                    "clear",
                ],
            ],
            ["fontsize", ["fontname", "fontsize", "color"]],
            ["para", ["style0", "ul", "ol", "paragraph", "height"]],
            ["insert", ["table", "picture", "link", "video", "hr"]],
            ["customButtons", ["testBtn"]],
        ],
        codeviewFilter: true,
        codeviewFilterRegex:
        /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
        codeviewIframeFilter: true,
    };
    configReadOnly: any = {
        airMode: false,
        disable: true,
        tabDisable: true,
        contenteditable: true,
        popover: {},
        height: "auto",
        uploadImagePath: "/api/upload",
        toolbar: [],
        buttons: {
            /* testBtn: customButton */
        },
        callbacks: {
            onInit: function() {
                $(() => {
                    $( ".note-handle" ).hide();
                    //  if( !$('.note-frame').hasClass('note-document')) $('.note-frame').addClass('note-document');
                    //  if( !$('.note-frame').hasClass('a4')) $('.note-editing-area').addClass('a4');
                    //   $('.note-editable').css('width','1100px');
                    $( ".note-editable" ).attr( "contenteditable", "false" );
                    // this.summernote('disable');
                });
            },
        },
        codeviewFilter: true,
        codeviewFilterRegex:
        /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
        codeviewIframeFilter: true,
        // disableResizeEditor: true,
        disableDragAndDrop: true,
    };
    updateList( list, item ) {
        return [item, ...list];
    }
    getDayName( d ) {
        let days = ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."];
        return days[d.getDay()];
    }
    public ngOnDestroy() {
        this.locale = null;
        this.validMessage = null;
        this.currentUser = null;
    }
}

