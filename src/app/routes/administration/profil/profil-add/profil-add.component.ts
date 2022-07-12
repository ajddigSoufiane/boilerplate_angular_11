import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '@app/shared/components'; 
import { Profil, Role } from '@app/shared/models';
import {  ProfilService } from '@app/shared/services';

import * as moment from 'moment'; 
import { Message_Profil_Service } from '../shared/message_profil_service.service';
import { ProfilListComponent } from '../profil-list/profil-list.component';

@Component({
  selector: 'app-profil-add',
  templateUrl: './profil-add.component.html',
  styleUrls: ['./profil-add.component.scss']
})
export class ProfilAddComponent extends BaseComponent implements OnInit {
  
  private subscription: Subscription = new Subscription();
  private profil: Profil; 
  public rolesSelected: Array<Role> = [];
  profile: Profil;
  saveAndQuit: boolean; 
  get _mode_ecran(){
    return  this.M_Profil_S.modeEcran
  }
  upDownIcon:boolean;
  //start declaration list
  radioList: { name: string; displayText: string; }[];
  conventionList: any[];
  parametresList: any[];


  
  //end declaration list
  //start declaration form
  profilForm: FormGroup;
  createForm= () => {
    this.profilForm = this.fb.group({
      code: [ '', Validators.required ],
			libelle: [ '', Validators.required ],
			description: [ '' ],
			actif: [ true ]
    });
    
  }
  //end declaration form

  constructor(private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private M_Profil_S:Message_Profil_Service,
    private profilService: ProfilService
   ) {
    super();
    this.createForm();
    this.changeFormInvalide(this.profilForm);
  }

  ngOnInit() { 
    if (this.hasRole('ROLE_CREATE_PROFIL')) {
      this.init();
    } else {
       this.showUnauthorizedError(true);
     }
  }

  init() {
    this.profil = new Profil();
    this.initData(); 
    this.saveAndQuit = true; 
  }

  initData() {
    this.rolesSelected = [];
    this.profilsSelected=[];
  }
  putRolesList(rolesListSelected: Array<Role>) {
    this.rolesSelected = rolesListSelected;
}
 
  saveProfil(profilForm: any, saveAndQuit?: boolean) {
    
    this.validateFormProfil(this.profilForm);
    
    if (this.profilForm.valid) {
      if (this.hasRole('ROLE_CREATE_PROFIL')) {
        this.addBusy();
        Object.assign(this.profil, profilForm);
        this.profil.rolesList = this.rolesSelected;
        const subscription = this.profilService.saveProfil(this.profil)
          .subscribe(success => {
            this.showInfo('common.message.create.info');
            if (saveAndQuit) {
              const id = success;
              if(this.M_Profil_S.modeEcran==this.mode_ecran.ECRAN){
                this.router.navigate(['/referentiel/profil/view', id]);
              }else{
                this.M_Profil_S.addProfil(success)
              }

            }else{
              this.M_Profil_S.addProfil(success,true)
            }
            this.reset();
          }, error => this.handleError(error));
        this.subscription.add(subscription);
       } else {
         this.showUnauthorizedError();
       }
    }
  }

  validateFormProfil(form) {
    this.detectInvalideFormControle(form);
  }

  reset() {

    this.profilForm.reset({
      ordre: 1,
      actif: true
    });
    this.resetValidateForm(this.profilForm);
    this.init();
  }
  retour(){
    if(this.M_Profil_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(["/referentiel/profil/list"]); 
    }else{
      this.M_Profil_S.closeActionProfil(true)
    }
   
  } 
  /* start list multiple interaction */
  profilsSelected: Array<any> = [];
  putProfilsList(profilsListSelected: Array<Profil>) {
    this.profilsSelected = profilsListSelected;
  }

  updateProfilsList(receivedData: any) {
    
    
    this.profilsSelected = receivedData.list;
  
  }
  /* end  list multiple interaction*/
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
