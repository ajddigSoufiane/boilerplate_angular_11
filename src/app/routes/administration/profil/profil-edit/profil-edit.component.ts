import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '@app/shared/components';  
import {  ProfilService } from '@app/shared/services'; 
import { Subscription } from 'rxjs';

import * as moment from 'moment'; 
import { Profil, Role } from '@app/shared/models';
import { Message_Profil_Service } from '../shared/message_profil_service.service';
@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.scss']
})
export class ProfilEditComponent extends BaseComponent implements OnInit {
 
  
  private subscription: Subscription = new Subscription();
  public rolesSelected: Array<Role> = [];

  profil: Profil; 
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
 createForm() {
   this.profilForm = this.fb.group({
    code: [ '', Validators.required ],
			libelle: [ '', Validators.required ],
			description: [ '' ],
			actif: [ true ]
   });
 }
 //end declaration form
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute, 
    private M_Profil_S:Message_Profil_Service,
    private profilService: ProfilService ) {
    super();
    this.createForm();
  }

  ngOnInit() {
    console.log(this.currentUser)
    if (this.hasRole('ROLE_UPDATE_PROFIL')) {
      this.initData();
      this.loadprofil();
      this.loadRoles();
    } else {
      this.showUnauthorizedError();
    }
  }

  init() {
   
  }

  initData() {
    this.profil = new Profil();
    this.profilsSelected=[]
  }
  loadRoles() {
    
    
    let id=(this.M_Profil_S.modeEcran==this.mode_ecran.ECRAN)? this.route.snapshot.params.id : this.M_Profil_S.params.id
    const subscription = this.profilService.getRolesProfil(id)
      .subscribe(rolesList => {
        this.rolesSelected = rolesList;
      
       
      
      
      
      
      }, error => this.handleError(error));
    this.subscription.add(subscription);
  }
  
  loadprofil() {
    let id=(this.M_Profil_S.modeEcran==this.mode_ecran.ECRAN)? this.route.snapshot.params.id : this.M_Profil_S.params.id
    const subscription = this.profilService.getProfil(id)
      .subscribe(profil => {
        this.init();
        this.profil = profil;
        this.patchValues();
      }, error => this.handleError(error));
    this.subscription.add(subscription);
  }

  patchValues() {
    if (this.profil) {
      //patch date if is string before patch
      
      
      this.profilForm.patchValue(this.profil);
      //patch date
     
     
      
      
      
      
      
      
  
    }
  }
  public toDate(date){
    let parts = date.split('/');

    let dateFormat = new Date(parseInt(parts[2], 10),parseInt(parts[1], 10) - 1,parseInt(parts[0], 10));
    return dateFormat;
  }
  putRolesList(rolesListSelected: Array<Role>) {
    this.rolesSelected = rolesListSelected;
}
  updateProfil() {
  
    this.validateFormprofil(this.profilForm);
    if (this.profilForm.valid) {
       if (this.hasRole('ROLE_UPDATE_PROFIL')) {
        this.addBusy();
        Object.assign(this.profil, this.profilForm.value);
        
        this.profil.rolesList = this.rolesSelected
        
   
        //send multiple
        
    
        const subscription = this.profilService.updateProfil(this.profil)
          .subscribe(() => {
            this.showInfo('common.message.update.info');
            
            if(this.M_Profil_S.modeEcran==this.mode_ecran.ECRAN){
              this.router.navigate(['/referentiel/profil/view', this.profil.id]);
            }else{
              this.M_Profil_S.addProfil(this.profil)
            }
          }, error => this.handleError(error));
        this.subscription.add(subscription);
       } else {
         this.showUnauthorizedError();
       }
    }
  }

  validateFormprofil(form) {
    this.detectInvalideFormControle(form);
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
  retour(){
    if(this.M_Profil_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(["/referentiel/profil/list"]); 
    }else{
      this.M_Profil_S.closeActionProfil(true)
    } 
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
