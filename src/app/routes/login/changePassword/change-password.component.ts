import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { CustomValidators } from "ng2-validation";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";  
import { Utilisateur } from "@app/shared/models";
import { BaseComponent } from "@app/shared/components";
import { UtilisateurService } from "@app/shared/services";

@Component( {
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends BaseComponent implements OnInit {
    loginForm: FormGroup;
    togglePass:boolean = true;
    togglePassConfirm:boolean = true;
    private utilisateur: Utilisateur;
    
    @Output('eventChangePassword') eventChangePassword: EventEmitter<any> = new EventEmitter()

    @Input() changeDefaultPassword: boolean; 
    constructor( private fb: FormBuilder, private utilisateurService: UtilisateurService ) {
        super();

        let password = new FormControl( null, Validators.required );
        let confirmPassword = new FormControl( null, Validators.required );

        this.loginForm = fb.group( {

            'oldPassword': [null],
            'newPassword': password,
            'confirmPassword': confirmPassword
        });
    }

    ngOnInit() {
        if ( !this.changeDefaultPassword ) {
           
        } else {

            this.loginForm.controls['oldPassword'].setValidators( [] );
        }

    }


    changePassword( loginForm: any ) {


        this.loginForm.controls['newPassword'].setValidators( Validators.compose( [Validators.minLength( 6 ), Validators.required] ) );
        this.loginForm.controls['newPassword'].updateValueAndValidity();
        let password = this.loginForm.controls['newPassword'];
        
        this.loginForm.controls['confirmPassword'].setValidators( Validators.compose( [Validators.required, Validators.minLength( 6 )] ) );
        this.loginForm.controls['confirmPassword'].updateValueAndValidity();


        if ( this.loginForm.valid ) {
            this.addBusy();
            this.utilisateur = new Utilisateur();
            Object.assign( this.utilisateur, loginForm );
            this.utilisateur.id = this.currentUser.id;
            this.utilisateur.changeDefaultPassword = this.changeDefaultPassword;
            this.utilisateurService.updateUtilisateurPassword( this.utilisateur )
                .subscribe( success => {
                    this.showInfo( "common.message.update.info" );
                    
                    this.eventChangePassword.emit(true)
                }, error =>  {
                    this.showError( ((error && error.error) ? error.error : error).status,  ((error && error.error) ? error.error : error).message );
                    this.eventChangePassword.emit(true)} 
                    );
        }
    }
    
    

}
