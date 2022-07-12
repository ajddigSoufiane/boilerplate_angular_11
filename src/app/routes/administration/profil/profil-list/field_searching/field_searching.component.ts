import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '@app/shared/components';
import { ProfilCriteria } from '@app/shared/models'; 
import * as moment from 'moment'; 
@Component({
  selector: 'app-field-searching',
  templateUrl: './field_searching.component.html' 
})
export class FieldSearchingProfilListComponent extends BaseComponent implements OnInit {
  
  @ViewChild('form_search') form_search //do not remove important !
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() reset: EventEmitter<any> = new EventEmitter();

  @ViewChild('libelle') intitule
  @ViewChild('code') code
  @ViewChild('description') description
  
  @ViewChild('libelle') libelle


  public profilForm: FormGroup;
  public profilCriteria: ProfilCriteria; 

  //start list of select
  parametresList: any[]; 
  conventionList: any[];
  //end list of select


  public showMoreForm=false;
  listNameCheckBoxGroup: string[] =[];
  listNameDateRange: string[] = [];

  constructor(private fb: FormBuilder ) {
    super();
    this.createForm(); 
   
   }

  ngOnInit() {
    this.init();
  }
  init(){ 
  }
  createForm() {
    this.profilForm = this.fb.group({
      code: [null],
      codeLike: [null],
      libelleLike: [null],
			libelle: [null],
			description: [null],
			
    });
 
  }
  formToCriteria(profilForm: any) {
    this.profilCriteria = new ProfilCriteria();
    if (profilForm) {
      Object.assign(this.profilCriteria, profilForm);
      // delete this.profilCriteria.dateBetweenFrom, delete this.profilCriteria.dateBetweenTo
      
       let arrayDate=[];
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      if (this.profilForm.controls['codeLike'].value) {
        this.profilCriteria.codeLike = this.profilForm.controls['codeLike'].value;
      }
      if (this.profilForm.controls['libelleLike'].value) {
        this.profilCriteria.libelleLike = this.profilForm.controls['libelleLike'].value;
      }
      
      
      
    }
   
    
  } 
 
  resetCheckBox=()=>{ 
      
      
      
      
      
  }
   
 

}
