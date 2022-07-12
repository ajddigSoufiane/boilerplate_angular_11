import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import {  Service, ServiceCriteria } from '@models';
import {  nzTableFunction } from '@app/shared/components'; 
  
import { Entity_action } from '@app/shared/enum/entity_action.enum'; 
import {   ServiceService } from '@app/shared/services';
import { Code_Service_Message, Message_Service_Service } from '../shared/message_service_service.service';
import { CustomElementSession } from '@app/shared/utility/form_store';

import { Subject } from 'rxjs'; 
import { USER_CHOICE } from '@app/shared/components/customized-ngZorro/nz-confim-modal/user-choice.enum';
import { NzConfimModalService } from '@app/shared/components/customized-ngZorro/nz-confim-modal/nz-confim-modal.service';
import { ModalParams } from '@app/shared/components/customized-ngZorro/nz-confim-modal/modal-params.model';
import { FieldSearchingServiceListComponent } from './field_searching/field_searching.component'; 



@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent extends nzTableFunction<Service> implements OnInit, OnDestroy {
  @ViewChild('field_searching')  field_searching:FieldSearchingServiceListComponent; 
  

  showCompleteForm:boolean = false
  // drawer attrib
  visible_drawer: boolean;
  action_ecran:Entity_action;
  loading: boolean;
  get _action_ecran(){
    return  this.M_Service_S.action_ecran
  }
  // end drawer attrib

  private subscription: Subscription = new Subscription();


  nzFilterListActif = [
    { text: 'Oui', value: true },
    { text: 'Non', value: false }
  ];

  
  constructor(private M_Service_S:Message_Service_Service,
    private serviceService: ServiceService,
    private cdRef: ChangeDetectorRef
  ) {
    super(Service,'loadServiceData','field_searching'); 
    this.component=this;
   }
   

  ngOnInit() {
    
  
 
    this.cdRef.detectChanges(); 
    if(this.field_searching){ 
      this.field_searching.serviceCriteria = this.formStore.getValueInSessionStorage_FormStore(this,null, this.field_searching.serviceCriteria,this.field_searching.serviceForm); 
      if(this.field_searching.serviceCriteria){ 
       
        this.nzInitDataTable();
        this.loadServiceData();
      }else{ 
        this.nzSearch(this.field_searching.serviceForm.value); 
      }  
    }

    this.messageReceived();
  }
  
  init() {  
    this.nzInitDataTable();
    this.loadServiceData(); 
  }
 
 
 
  loadServiceData() {
    const page: number = this.nzFirstItem - 1;
    this.getPaginationParams(this.field_searching.serviceCriteria, page, this.nzRowsItem, this.nzSortFieldItem, this.nzSortOrderItem);
    let parentObject=this.field_searching_str+'.'
    let criteria= parentObject+'serviceCriteria';
    let nameFormGroup = parentObject+'serviceForm';
    
    let toObjectCustomList:CustomElementSession[] = [
     {nameFuntionToLoad :parentObject+'loadConventionList', formControlName : 'convention'}, 
     {nameFuntionToLoad :parentObject+'loadConventionList', formControlName : 'convention_multip'}, 
    ];  
    this.formStore.setValueInSessionStorage_FormStore(null, this,criteria,nameFormGroup,toObjectCustomList);
    //transform data to tag form 
    this.nzListTagCritier = this.formStore.storeTagCritier(this.field_searching.serviceForm,['dateBetweenFrom','dateBetweenTo'])
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
    this.field_searching.serviceForm.patchValue(this.field_searching.serviceForm.value)
    const subscription = this.serviceService.listServices(this.field_searching.serviceCriteria)
      .subscribe(paginatedList => {
        this.nzPopulateData(paginatedList);
        this.loading =false
      }, error => {this.showError(error.status, error.message)});
    this.subscription.add(subscription);
  }

  reset() {
    this.field_searching.serviceForm.reset({ actif: '', autoChargee: '' });
    this.field_searching.resetCheckBox()
    this.init();
  } 
  
 
  
  //action
  closeService(){
    this.M_Service_S.action_ecran = Entity_action.NONE
    this.visible_drawer = false
  }
 
  viewService(event: any) {
    if(this.M_Service_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(['/referentiel/service/view', event.id], { queryParams: { b_: 1 } });
    }else{
      this.M_Service_S.action_ecran = Entity_action.VIEW
      this.M_Service_S.params = event
      this.visible_drawer = true
    }
  }
  editService(event: any) {
    if(this.M_Service_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(['/referentiel/service/edit', event.id], { queryParams: { b_: 1 } });
    }else{
      this.M_Service_S.action_ecran = Entity_action.EDIT
      this.M_Service_S.params=event;
      this.visible_drawer = true
    }
  } 
  addService(){
    if(this.M_Service_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(['/referentiel/service/add'])
    }else{
      this.M_Service_S.action_ecran = Entity_action.ADD
      this.visible_drawer = true
    } 
  }
   //drawer action all notification of action in entity you will get in here 
   messageReceived(){
    this.M_Service_S.lisner_brodcast_observable
      .subscribe(message => {
        
        switch (message.code) {
          case Code_Service_Message.ADD_Service:
            this.init();
            this.closeService()
            break;
          case Code_Service_Message.EDIT_Service:  
            this.init();
            this.closeService()
            break;
          case Code_Service_Message.DEL_Service: 
            this.init();
            this.closeService()
            break;
          case Code_Service_Message.VIEW_Service:  
            this.closeService()
            break;
          case Code_Service_Message.CLOSE_Service:    
            this.closeService()
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
         this.serviceService.deleteService(this.nzSelectedList)
         .subscribe(() => {
           this.nzInitDataTable();
           this.loadServiceData();
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
  this.loadServiceData();
}
nzExport(id, fileType) {
  const columns: any[] = this.getTableColumns(id);
  if (columns && columns.length > 0) {
    this.addBusy();
    this.field_searching.formToCriteria(this.field_searching.serviceForm.value);
    this.field_searching.serviceCriteria.exportModel = { 'columnModels': columns, 'fileType': fileType };
    const subscription = this.serviceService.exportServices(this.field_searching.serviceCriteria)
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

 