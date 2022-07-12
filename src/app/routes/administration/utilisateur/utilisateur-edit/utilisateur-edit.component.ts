import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '@app/shared/components';  
import { UtilisateurService } from '@app/shared/services'; 
import { Subscription } from 'rxjs';

import * as moment from 'moment'; 
import {  Utilisateur } from '@app/shared/models';
import { Message_Utilisateur_Service } from '../shared/message_utilisateur_service.service';
@Component({
  selector: 'app-utilisateur-edit',
  templateUrl: './utilisateur-edit.component.html',
  styleUrls: ['./utilisateur-edit.component.scss']
})
export class UtilisateurEditComponent extends BaseComponent implements OnInit {
 
  
  private subscription: Subscription = new Subscription();
  utilisateur: Utilisateur; 
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
 createForm() {
   this.utilisateurForm = this.fb.group({
    prenom: [null,Validators.required], 
    nom:[null,Validators.required],
    cin: [null],
    adresse: [null],
    email: [null],
    username: [null,Validators.required],
    profil: [null,Validators.required],
    employe: [null,Validators.required],
    enabled: [true]
   });
 }
 //end declaration form
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute, 
    private M_Utilisateur_S:Message_Utilisateur_Service,
    private utilisateurService: UtilisateurService
    ) {
    super();
    this.createForm();
  }

  ngOnInit() {
    if (this.hasRole('ROLE_UPDATE_UTILISATEUR')) {
      this.initData()
      this.loadutilisateur();
    } else {
      this.showUnauthorizedError(true);
    }
  }

  init() {
   
  }

  initData() {
    this.utilisateur = new Utilisateur();
    this.utilisateursSelected=[]
    this.getProfil();
    // this.getEmploye();
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
  
  loadutilisateur() {
    let id=(this.M_Utilisateur_S.modeEcran==this.mode_ecran.ECRAN)? this.route.snapshot.params.id : this.M_Utilisateur_S.params.id
    const subscription = this.utilisateurService.getUtilisateur(id)
      .subscribe(utilisateur => {
        this.init();
        this.utilisateur = utilisateur;
        this.patchValues();
        // if(this.utilisateur && this.utilisateur.employe && this.utilisateur.employe.nom){
        //   this.getEmploye(this.utilisateur.employe.nom);
        // }
      }, error => this.handleError(error));
    this.subscription.add(subscription);
  }

  patchValues() {
    if (this.utilisateur) {
      this.utilisateurForm.patchValue(this.utilisateur);
    }
  }
  public toDate(date){
    let parts = date.split('/');

    let dateFormat = new Date(parseInt(parts[2], 10),parseInt(parts[1], 10) - 1,parseInt(parts[0], 10));
    return dateFormat;
  }

  updateUtilisateur() {
  
    this.validateFormutilisateur(this.utilisateurForm);
    if (this.utilisateurForm.valid) {
       if (this.hasRole('ROLE_UPDATE_UTILISATEUR')) {
        this.addBusy();
        Object.assign(this.utilisateur, this.utilisateurForm.value);
        const subscription = this.utilisateurService.updateUtilisateur(this.utilisateur)
          .subscribe(() => {
            this.showInfo('common.message.update.info');
            
            if(this.M_Utilisateur_S.modeEcran==this.mode_ecran.ECRAN){
              this.router.navigate(['/referentiel/utilisateur/view', this.utilisateur.id]);
            }else{
              this.M_Utilisateur_S.addUtilisateur(this.utilisateur)
            }
          }, error => this.handleError(error));
        this.subscription.add(subscription);
       } else {
         this.showUnauthorizedError();
       }
    }
  }

  validateFormutilisateur(form) {
    this.detectInvalideFormControle(form);
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
  retour(){
    if(this.M_Utilisateur_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(["/referentiel/utilisateur/list"]); 
    }else{
      this.M_Utilisateur_S.closeActionUtilisateur(true)
    } 
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
