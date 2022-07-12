import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '@app/shared/components'; 
import {   Utilisateur } from '@app/shared/models';
import { UtilisateurService } from '@app/shared/services';

import * as moment from 'moment'; 
import { Message_Utilisateur_Service } from '../shared/message_utilisateur_service.service';

@Component({
  selector: 'app-utilisateur-add',
  templateUrl: './utilisateur-add.component.html',
  styleUrls: ['./utilisateur-add.component.scss']
})
export class UtilisateurAddComponent extends BaseComponent implements OnInit {
  
  private subscription: Subscription = new Subscription();
  private utilisateur: Utilisateur; 
  saveAndQuit: boolean; 
  saveAndNew: boolean;
  get _mode_ecran(){
    return  this.M_Utilisateur_S.modeEcran
  }
  upDownIcon:boolean;
  //start declaration list
  radioList: { name: string; displayText: string; }[];
  profilList: any[];
  employeList:any[];
  nzFilterOption = () => true;


  
  //end declaration list
  //start declaration form
  utilisateurForm: FormGroup;
  createForm= () => {
    this.utilisateurForm = this.fb.group({
      prenom: [null,Validators.required], 
      nom:[null,Validators.required],
      cin: [null],
      adresse: [null],
      email: [null],
      username: [null,Validators.required],
      profil: [null,Validators.required],
      employe: [null,Validators.required]

    });
    
  }
  //end declaration form

  constructor(private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private M_Utilisateur_S:Message_Utilisateur_Service,
    private utilisateurService: UtilisateurService,
   ) {
    super();
    this.createForm();
    this.changeFormInvalide(this.utilisateurForm);
  }

  ngOnInit() { 
    if (this.hasRole('ROLE_CREATE_UTILISATEUR')) {
      this.init();
    } else {
       this.showUnauthorizedError(true);
     }
  }
  getProfil(){
    this.utilisateurService.getProfilList().subscribe(data=>{
      this.profilList = data
    })
  }
  getEmploye(event?:any){
    // let employeCriteria=new EmployeCriteria();
    // employeCriteria.maxResults=10;
    // employeCriteria.nomLike=event;
    
    // this.utilisateurService.findEmployesByCriteria(employeCriteria).subscribe(data=>{
    //   this.employeList = data
    // })
  }
  init() {
    this.utilisateur = new Utilisateur();
    this.initData(); 
    this.saveAndQuit = true; 
    this.saveAndNew=true;
  }

  initData() {
    this.utilisateursSelected=[];
    this.getProfil();
    // this.getEmploye();
  }
 
 
  saveUtilisateur(utilisateurForm: any, saveAndQuit?: boolean,saveAndNew?:boolean) {
    this.validateFormUtilisateur(this.utilisateurForm);
    
    if (this.utilisateurForm.valid) {
      if (this.hasRole('ROLE_CREATE_UTILISATEUR')) {
        this.addBusy();
        Object.assign(this.utilisateur, utilisateurForm);
        const subscription = this.utilisateurService.saveUtilisateur(this.utilisateur)
          .subscribe(success => {
            this.showInfo('common.message.create.info');
            if (saveAndQuit) {
              const id = success;
              if(this.M_Utilisateur_S.modeEcran==this.mode_ecran.ECRAN){
                this.router.navigate(['/referentiel/utilisateur/view', id]);
              }else{
                this.M_Utilisateur_S.addUtilisateur(success)
              }

            }
            else if(saveAndNew){
              this.M_Utilisateur_S.addUtilisateur(success,true)
            }
            this.reset();
          }, error => this.handleError(error));
        this.subscription.add(subscription);
       } else {
         this.showUnauthorizedError();
       }
    }
  }

  validateFormUtilisateur(form) {
    this.detectInvalideFormControle(form);
  }

  reset() {

    this.utilisateurForm.reset({
      ordre: 1,
      actif: true
    });
    this.resetValidateForm(this.utilisateurForm);
    this.init();
  }
  retour(){
    if(this.M_Utilisateur_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(["/referentiel/utilisateur/list"]); 
    }else{
      this.M_Utilisateur_S.closeActionUtilisateur(true)
    }
   
  } 
  /* start list multiple interaction */
  utilisateursSelected: Array<any> = [];
  putUtilisateursList(utilisateursListSelected: Array<Utilisateur>) {
    this.utilisateursSelected = utilisateursListSelected;
  }

  updateUtilisateursList(receivedData: any) {
    
    
    this.utilisateursSelected = receivedData.list;
  
  }
  /* end  list multiple interaction*/
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
