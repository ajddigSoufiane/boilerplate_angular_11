import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import {  RefDemoEntity, RefDemoEntityCriteria } from '@models';
import {  nzTableFunction } from '@app/shared/components'; 
  
import { Entity_action } from '@app/shared/enum/entity_action.enum'; 
import {  RefDemoEntityService } from '@app/shared/services';
import { Code_RefDemoEntity_Message, Message_RefDemoEntity_Service } from '../shared/message_ref-demo-entity_service.service';
import { CustomElementSession } from '@app/shared/utility/form_store';

import { Subject } from 'rxjs'; 
import { USER_CHOICE } from '@app/shared/components/customized-ngZorro/nz-confim-modal/user-choice.enum';
import { NzConfimModalService } from '@app/shared/components/customized-ngZorro/nz-confim-modal/nz-confim-modal.service';
import { ModalParams } from '@app/shared/components/customized-ngZorro/nz-confim-modal/modal-params.model';
import { FieldSearchingRefDemoEntityListComponent } from './field_searching/field_searching.component'; 



@Component({
  selector: 'app-ref-demo-entity-list',
  templateUrl: './ref-demo-entity-list.component.html',
  styleUrls: ['./ref-demo-entity-list.component.scss']
})
export class RefDemoEntityListComponent extends nzTableFunction<RefDemoEntity> implements OnInit, OnDestroy {
  @ViewChild('field_searching')  field_searching:FieldSearchingRefDemoEntityListComponent; 
  

  showCompleteForm:boolean = false
  // drawer attrib
  visible_drawer: boolean;
  action_ecran:Entity_action;
  loading: boolean;
  get _action_ecran(){
    return  this.M_RefDemoEntity_S.action_ecran
  }
  // end drawer attrib

  private subscription: Subscription = new Subscription();


  nzFilterListActif = [
    { text: 'Oui', value: true },
    { text: 'Non', value: false }
  ];
  today: Date; 
  minDate: Date; 
  bsInlineRangeValue: Date[];
  bsInlineValue = new Date();  
  constructor(private M_RefDemoEntity_S:Message_RefDemoEntity_Service,
    private refDemoEntityService: RefDemoEntityService,
    private cdRef: ChangeDetectorRef
  ) {
    super(RefDemoEntity,'loadRefDemoEntityData','field_searching'); 
    this.component=this;
    this.today = new Date();
    this.minDate = new Date(this.today.getFullYear(), this.today.getMonth(), 2);
    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), 25);
   }
   

  ngOnInit() {
    
  
 
    this.cdRef.detectChanges(); 
    if(this.field_searching){ 
      this.field_searching.refDemoEntityCriteria = this.formStore.getValueInSessionStorage_FormStore(this,null, this.field_searching.refDemoEntityCriteria,this.field_searching.refDemoEntityForm); 
      if(this.field_searching.refDemoEntityCriteria){ 
       
        this.nzInitDataTable();
        this.loadRefDemoEntityData();
      }else{ 
        this.nzSearch(this.field_searching.refDemoEntityForm.value); 
      }  
    }

    this.messageReceived();
  }
  date = null;
  rangeDate = null;
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

 
  init() {  
    this.nzInitDataTable();
    this.loadRefDemoEntityData(); 
  }
 
 
 
  loadRefDemoEntityData() {
    const page: number = this.nzFirstItem - 1;
    this.getPaginationParams(this.field_searching.refDemoEntityCriteria, page, this.nzRowsItem, this.nzSortFieldItem, this.nzSortOrderItem);
    let parentObject=this.field_searching_str+'.'
    let criteria= parentObject+'refDemoEntityCriteria';
    let nameFormGroup = parentObject+'refDemoEntityForm';
    
    let toObjectCustomList:CustomElementSession[] = [
     {nameFuntionToLoad :parentObject+'loadConventionList', formControlName : 'convention'}, 
     {nameFuntionToLoad :parentObject+'loadConventionList', formControlName : 'convention_multip'}, 
    ];  
    this.formStore.setValueInSessionStorage_FormStore(null, this,criteria,nameFormGroup,toObjectCustomList);
    //transform data to tag form 
    this.nzListTagCritier = this.formStore.storeTagCritier(this.field_searching.refDemoEntityForm,['dateBetweenFrom','dateBetweenTo'])
    //cas of checkbox exclud if don't have any checked element
    this.nzListTagCritier=this.nzListTagCritier.filter((a)=>{
      if(this.field_searching.listNameCheckBoxGroup.indexOf(a.key)!=-1 && a.list){
        return (a.list.findIndex(b=>b.checked==true)!=-1)
      }else{
        return true;
      }
    })
     
    this.loading =true
    //update data in all field searching
    this.field_searching.refDemoEntityForm.patchValue(this.field_searching.refDemoEntityForm.value)
    const subscription = this.refDemoEntityService.listRefDemoEntitys(this.field_searching.refDemoEntityCriteria)
      .subscribe(paginatedList => {
        this.nzPopulateData(paginatedList);
        this.loading =false
      }, error => {this.showError(error.status, error.message)});
    this.subscription.add(subscription);
  }

  reset() {
    this.field_searching.refDemoEntityForm.reset({ actif: '', autoChargee: '' });
    this.field_searching.resetCheckBox()
    this.init();
  } 
  
 
  
  //action
  closeRefDemoEntity(){
    this.M_RefDemoEntity_S.action_ecran = Entity_action.NONE
    this.visible_drawer = false
  }
 
  viewRefDemoEntity(event: any) {
    if(this.M_RefDemoEntity_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(['/referentiel/refDemoEntity/view', event.id], { queryParams: { b_: 1 } });
    }else{
      this.M_RefDemoEntity_S.action_ecran = Entity_action.VIEW
      this.M_RefDemoEntity_S.params = event
      this.visible_drawer = true
    }
  }
  editRefDemoEntity(event: any) {
    if(this.M_RefDemoEntity_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(['/referentiel/refDemoEntity/edit', event.id], { queryParams: { b_: 1 } });
    }else{
      this.M_RefDemoEntity_S.action_ecran = Entity_action.EDIT
      this.M_RefDemoEntity_S.params=event;
      this.visible_drawer = true
    }
  } 
  addRefDemoEntity(){
    if(this.M_RefDemoEntity_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(['/referentiel/refDemoEntity/add'])
    }else{
      this.M_RefDemoEntity_S.action_ecran = Entity_action.ADD
      this.visible_drawer = true
    } 
  }
   //drawer action all notification of action in entity you will get in here 
   messageReceived(){
    this.M_RefDemoEntity_S.lisner_brodcast_observable
      .subscribe(message => {
        
        switch (message.code) {
          case Code_RefDemoEntity_Message.ADD_RefDemoEntity:
            this.init();
            this.closeRefDemoEntity()
            break;
          case Code_RefDemoEntity_Message.EDIT_RefDemoEntity:  
            this.init();
            this.closeRefDemoEntity()
            break;
          case Code_RefDemoEntity_Message.DEL_RefDemoEntity: 
            this.init();
            this.closeRefDemoEntity()
            break;
          case Code_RefDemoEntity_Message.VIEW_RefDemoEntity:  
            this.closeRefDemoEntity()
            break;
          case Code_RefDemoEntity_Message.CLOSE_RefDemoEntity:    
            this.closeRefDemoEntity()
            break; 
          default:
            break;
        } 
      }); 
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  nzDeleteItem() {
    if (!this.hasRole('ROLE_REF_PARAMSURVEILLANCE_WRITE')) { 
   /**
      * @author Amine nargis 
      * @note : Usage of the modal example 
     */
     let modalParams = new ModalParams()

     this.nzConfimModalService.confirmation(modalParams); // Modal callback
     this.nzConfimModalService.responseConfirm.subscribe(data=>{ 
       if ( data == USER_CHOICE.YES){ // When the user presses yes
         this.refDemoEntityService.deleteRefDemoEntity(this.nzSelectedList)
         .subscribe(() => {
           this.nzInitDataTable();
           this.loadRefDemoEntityData();
           this.showInfo('common.message.create.info');
           this.nzConfimModalService.reset(); // important 
         }, error => this.handleError(error));
       }else if(data == USER_CHOICE.NO){// When the user presses no
         this.nzConfimModalService.reset(); // important 
       }
     })
    } else {
    this.showUnauthorizedError();
    }
 }
 nzHandleReset(key,formGroup,criteria){
  super.nzHandleReset(key,formGroup,criteria)
  //if is date check if has date fom and to
  let hasDateInterval = this.field_searching.listNameDateRange.indexOf(key)!=-1
  if(hasDateInterval && formGroup.controls[key+'To'])  formGroup.controls[key+'To'].setValue(null)
  if(hasDateInterval && formGroup.controls[key+'From'])  formGroup.controls[key+'From'].setValue(null) 
  //if group of checkbox reset with unit list
  let hasGroupCheckBox = this.field_searching.listNameCheckBoxGroup.indexOf(key)!=-1;
  if(hasGroupCheckBox){     
      let list = [...this.field_searching[key+"List"] ]
      list=this.convertToFormaCheckbox( list,'id','libelle')
      formGroup.controls[key].setValue( list )
  }
  this.loadRefDemoEntityData();
}
nzExport(id, fileType) {
  const columns: any[] = this.getTableColumns(id);
  if (columns && columns.length > 0) {
    this.addBusy();
    this.field_searching.formToCriteria(this.field_searching.refDemoEntityForm.value);
    this.field_searching.refDemoEntityCriteria.exportModel = { 'columnModels': columns, 'fileType': fileType };
    const subscription = this.refDemoEntityService.exportRefDemoEntitys(this.field_searching.refDemoEntityCriteria)
      .subscribe(response => {
        this.downloadFile(response);
      }, error => this.handleError(error));
    this.subscription.add(subscription);
  }
}
nzIsActiveControl(key,formgroup:FormGroup){ 
   let isActive = super.nzIsActiveControl(key,formgroup);
   //put all logic when custom dropdow active
   //cas of check if formcontrol has checkbox value
   if(isActive && this.field_searching.listNameCheckBoxGroup.length>0 && this.field_searching.listNameCheckBoxGroup.indexOf(key)!=-1 && formgroup.controls[key].value.findIndex(a=> a.checked==true)!=-1)
    {   
      return true
    }else if(isActive && this.field_searching.listNameCheckBoxGroup.length>0 && this.field_searching.listNameCheckBoxGroup.indexOf(key)==-1){
      return isActive
    }
}
}

 