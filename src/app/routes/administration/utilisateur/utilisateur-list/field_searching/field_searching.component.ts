import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '@app/shared/components';
import {  UtilisateurCriteria } from '@app/shared/models';
import { UtilisateurService } from '@app/shared/services';
import * as moment from 'moment'; 
@Component({
  selector: 'app-field-searching',
  templateUrl: './field_searching.component.html' 
})
export class FieldSearchingUtilisateurListComponent extends BaseComponent implements OnInit {
  
  @ViewChild('form_search') form_search //do not remove important !
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() reset: EventEmitter<any> = new EventEmitter();

  @ViewChild('prenom') prenom
  @ViewChild('nom') nom
  @ViewChild('cin') cin
  @ViewChild('adresse') adresse 
  @ViewChild('email') email
  @ViewChild('profil') profil
  @ViewChild('employe') employe

  public utilisateurForm: FormGroup;
  public utilisateurCriteria: UtilisateurCriteria; 

  //start list of select
  profilList: any[]; 
  employeList: any[];
  //end list of select


  public showMoreForm=false;
  listNameCheckBoxGroup: string[] =[];
  listNameDateRange: string[] = [];

  constructor(private fb: FormBuilder , private utilisateurService: UtilisateurService) {
    super();
    this.createForm(); 
   
   }

  ngOnInit() {
    this.init();
  }
  init(){
    this.getProfil()
  }
  createForm() {
    this.utilisateurForm = this.fb.group({
      prenom: [null], 
      nomLike:[null],
      cin: [null],
      adresse: [null],
      emailLike: [null],
      profilId:[null],
      employeId:[null],
      enabled:[true]
    });
 
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
  formToCriteria(utilisateurForm: any) {
    this.utilisateurCriteria = new UtilisateurCriteria();
    if (utilisateurForm) {
      Object.assign(this.utilisateurCriteria, utilisateurForm);

      
      if (this.utilisateurForm.controls['prenom'].value) {
        this.utilisateurCriteria.prenom = this.utilisateurForm.controls['prenom'].value;
      }
      if (this.utilisateurForm.controls['nomLike'].value) {
        this.utilisateurCriteria.nomLike = this.utilisateurForm.controls['nomLike'].value;
      }
      if (this.utilisateurForm.controls['profilId'].value) {
        this.utilisateurCriteria.profilId = this.utilisateurForm.controls['profilId'].value;
      }
      if (this.utilisateurForm.controls['cin'].value) {
        this.utilisateurCriteria.cin = this.utilisateurForm.controls['cin'].value;
      }
      if (this.utilisateurForm.controls['emailLike'].value) {
        this.utilisateurCriteria.emailLike = this.utilisateurForm.controls['emailLike'].value;
      }
      if (this.utilisateurForm.controls['employeId'].value) {
        this.utilisateurCriteria.employeId = this.utilisateurForm.controls['employeId'].value;
      }
      if (this.utilisateurForm.controls['adresse'].value) {
        this.utilisateurCriteria.adresse = this.utilisateurForm.controls['adresse'].value;
      }
      if (this.utilisateurForm.controls['enabled'].value) {
        this.utilisateurCriteria.enabled = this.utilisateurForm.controls['enabled'].value;
      }
      
      
 
    }
   
    
  } 

  resetCheckBox=()=>{ 
      
      
      
      
      
  }

 

}
