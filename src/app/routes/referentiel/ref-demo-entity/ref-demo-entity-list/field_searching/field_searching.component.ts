import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '@app/shared/components';
import { RefDemoEntityCriteria } from '@app/shared/models'; 
import { RefDemoEntityService } from '@app/shared/services';
import * as moment from 'moment'; 
@Component({
  selector: 'app-field-searching',
  templateUrl: './field_searching.component.html',
  styles: [
    `
    .title_search {
        padding: 15px 15px 0px;
        background-color: $eno-vertical;
    }
    `
  ]
})
export class FieldSearchingRefDemoEntityListComponent extends BaseComponent implements OnInit {
  
  @ViewChild('form_search') form_search //do not remove important !
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() reset: EventEmitter<any> = new EventEmitter();

  @ViewChild('convention_multip') convention_multip
  @ViewChild('convention') convention
  @ViewChild('dateBetween') dateBetween
  @ViewChild('hl7') hl7 
  @ViewChild('actif') actif
  @ViewChild('code') code
  @ViewChild('libelleLike') libelleLike
  @ViewChild('parametres') parametres
  
  public refDemoEntityForm: FormGroup;
  public refDemoEntityCriteria: RefDemoEntityCriteria; 

  //start list of select
  parametresList: any[]; 
  conventionList: any[];
  //end list of select


  public showMoreForm=false;
  listNameCheckBoxGroup: string[] =[];
  listNameDateRange: string[] = [];

  constructor(private fb: FormBuilder,private refDemoEntityService:RefDemoEntityService) {
    super();
    this.createForm(); 
   
   }

  ngOnInit() {
    this.init();
  }
  init(){
    this.loadParametresList()
  }
  createForm() {
    this.listNameCheckBoxGroup= ['parametres']
    this.listNameDateRange= ['dateBetween']
    this.refDemoEntityForm = this.fb.group({
      libelleLike: [''], 
      actif: [''],
      convention: [null],
      code: [''],
      dateBetween: [null, null],
      dateBetweenFrom: [null],
      dateBetweenTo: [null],
      hl7: [null],
      convention_multip: [null],
      parametres:[]
    });
 
  }
  formToCriteria(refDemoEntityForm: any) {
    this.refDemoEntityCriteria = new RefDemoEntityCriteria();
    if (refDemoEntityForm) {
      Object.assign(this.refDemoEntityCriteria, refDemoEntityForm);
      delete this.refDemoEntityCriteria.dateBetweenFrom, delete this.refDemoEntityCriteria.dateBetweenTo
      
       let arrayDate=[];
      if(!this.refDemoEntityCriteria.dateBetweenFrom){
        let dateBetweenFrom: any = (this.refDemoEntityForm.controls['dateBetweenFrom'].value && this.refDemoEntityForm.controls['dateBetweenFrom'].value) ? this.refDemoEntityForm.controls['dateBetweenFrom'].value : null;
        if (dateBetweenFrom && typeof dateBetweenFrom !== 'string') {
          this.refDemoEntityCriteria.dateBetweenFrom = moment(dateBetweenFrom).format('DD/MM/YYYY').concat(' 00:00');
          arrayDate.push(dateBetweenFrom)
        }else if(dateBetweenFrom){
          arrayDate.push(dateBetweenFrom)
        }
      
      }
      if(!this.refDemoEntityCriteria.dateBetweenTo){
        let dateBetweenTo: any = (this.refDemoEntityForm.controls['dateBetweenTo'].value && this.refDemoEntityForm.controls['dateBetweenTo'].value) ? this.refDemoEntityForm.controls['dateBetweenTo'].value : null;
        if (dateBetweenTo && typeof dateBetweenTo !== 'string') {
          this.refDemoEntityCriteria.dateBetweenTo = moment(dateBetweenTo).format('DD/MM/YYYY').concat(' 00:00');
          arrayDate.push(dateBetweenTo)
          if(arrayDate.length>0 && arrayDate.length<=1)
          arrayDate.push(arrayDate[0])
        }if(dateBetweenTo){
          arrayDate.push(dateBetweenTo)
        }else{
          if(arrayDate.length>0)
           arrayDate.push(arrayDate[0])
        }
      }
      
      if(arrayDate.length>0){
        this.refDemoEntityForm.controls['dateBetween'].setValue(arrayDate) 
        this.refDemoEntityForm.controls['dateBetweenTo'].setValue(this.refDemoEntityForm.controls['dateBetweenTo'].value )
        this.refDemoEntityForm.controls['dateBetweenTo'].updateValueAndValidity()
        this.refDemoEntityForm.controls['dateBetweenFrom'].setValue( this.refDemoEntityForm.controls['dateBetweenFrom'].value )
        this.refDemoEntityForm.controls['dateBetweenFrom'].updateValueAndValidity() 
      }else{
        this.refDemoEntityForm.controls['dateBetween'].setValue(null) 
        this.refDemoEntityForm.controls['dateBetweenTo'].setValue(this.refDemoEntityForm.controls['dateBetweenTo'].value )
        this.refDemoEntityForm.controls['dateBetweenTo'].updateValueAndValidity()
        this.refDemoEntityForm.controls['dateBetweenFrom'].setValue( this.refDemoEntityForm.controls['dateBetweenFrom'].value )
        this.refDemoEntityForm.controls['dateBetweenFrom'].updateValueAndValidity() 
      }
      
      if (this.refDemoEntityForm.controls['convention'].value) {
        this.refDemoEntityCriteria.convention = this.refDemoEntityForm.controls['convention'].value;
      }
    }
   
    
  } 
  loadParametresList(){
    this.parametresList = [];
    this.loadData( this.refDemoEntityService,"parametresList",null,null,()=>{
      this.resetCheckBox()
    });
  }
  resetCheckBox=()=>{ 
      if(!this.refDemoEntityForm.controls['parametres'].value) { 
        let list = [...this.parametresList ]
        list=this.convertToFormaCheckbox( list,'id','libelle')
        this.refDemoEntityForm.controls['parametres'].setValue( list )
      } 
  }
  loadConventionList(){ 
    this.conventionList = [];
    this.loadData(this.refDemoEntityService,'conventionList')
  }
 

}
