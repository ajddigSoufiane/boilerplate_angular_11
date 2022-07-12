import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '@app/shared/components';
import { ServiceCriteria } from '@app/shared/models'; 
import * as moment from 'moment'; 
@Component({
  selector: 'app-field-searching',
  templateUrl: './field_searching.component.html' 
})
export class FieldSearchingServiceListComponent extends BaseComponent implements OnInit {
  
  @ViewChild('form_search') form_search //do not remove important !
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() reset: EventEmitter<any> = new EventEmitter();

  @ViewChild('nom') nom
  @ViewChild('hopital') hopital
  @ViewChild('codeSIH') codeSIH 
  @ViewChild('code') code
  @ViewChild('default') default

 

  public serviceForm: FormGroup;
  public serviceCriteria: ServiceCriteria; 

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
    this.serviceForm = this.fb.group({
      code: [''], 
      nom:[null],
      description: [null],
      codeINPE: [null],
      telephone: [null],
      adresse: [null],
      ordre: [null],
      fax: [null],
      numCompte: [null],
      hI7: [null],
      actif: [true]
    });
 
  }
  formToCriteria(serviceForm: any) {
    this.serviceCriteria = new ServiceCriteria();
    if (serviceForm) {
      Object.assign(this.serviceCriteria, serviceForm);
      
      
       let arrayDate=[];
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      if (this.serviceForm.controls['code'].value) {
        this.serviceCriteria.code = this.serviceForm.controls['code'].value;
      }
    }
   
    
  } 
  
  resetCheckBox=()=>{ 
      
      
      
      
      
  }
 
 

}
