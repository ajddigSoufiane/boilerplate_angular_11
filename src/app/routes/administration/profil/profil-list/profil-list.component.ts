import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import {  Profil, ProfilCriteria } from '@models';
import {  nzTableFunction } from '@app/shared/components'; 
  
import { Entity_action } from '@app/shared/enum/entity_action.enum'; 
import {  ProfilService } from '@app/shared/services';
import { Code_Profil_Message, Message_Profil_Service } from '../shared/message_profil_service.service';
import { CustomElementSession } from '@app/shared/utility/form_store';

import { Subject } from 'rxjs'; 
import { USER_CHOICE } from '@app/shared/components/customized-ngZorro/nz-confim-modal/user-choice.enum';
import { NzConfimModalService } from '@app/shared/components/customized-ngZorro/nz-confim-modal/nz-confim-modal.service';
import { ModalParams } from '@app/shared/components/customized-ngZorro/nz-confim-modal/modal-params.model';
import { FieldSearchingProfilListComponent } from './field_searching/field_searching.component'; 



@Component({
  selector: 'app-profil-list',
  templateUrl: './profil-list.component.html',
  styleUrls: ['./profil-list.component.scss']
})
export class ProfilListComponent extends nzTableFunction<Profil> implements OnInit, OnDestroy {
  @ViewChild('field_searching')  field_searching:FieldSearchingProfilListComponent; 
  

  showCompleteForm:boolean = false
  // drawer attrib
  visible_drawer: boolean;
  action_ecran:Entity_action;
  loading: boolean;
  get _action_ecran(){
    return  this.M_Profil_S.action_ecran
  }
  // end drawer attrib

  private subscription: Subscription = new Subscription();


  nzFilterListActif = [
    { text: 'Oui', value: true },
    { text: 'Non', value: false }
  ];

  
  constructor(private M_Profil_S:Message_Profil_Service,
    private profilService: ProfilService,
    private cdRef: ChangeDetectorRef
  ) {
    super(Profil,'loadProfilData','field_searching'); 
    this.component=this;
   }
   

  ngOnInit() {
    if (this.hasRole('ROLE_READ_PROFIL')) {
  //     this.nzInitDataTable();
 
    this.cdRef.detectChanges(); 
    if(this.field_searching){ 
      this.field_searching.profilCriteria = this.formStore.getValueInSessionStorage_FormStore(this,null, this.field_searching .profilCriteria,this.field_searching.profilForm); 
      if(this.field_searching.profilCriteria){ 
       
        this.nzInitDataTable();
        this.loadProfilData();
      }else{ 
        this.nzSearch(this.field_searching.profilForm.value); 
      }  
    }

    this.messageReceived();
  }else{
    this.showUnauthorizedError(true) ;
  }
  }
  
  init() {  
    this.nzInitDataTable();
    this.loadProfilData(); 
  }
 
 
 
  loadProfilData() {
    const page: number = this.nzFirstItem - 1;
    this.getPaginationParams(this.field_searching.profilCriteria, page, this.nzRowsItem, this.nzSortFieldItem, this.nzSortOrderItem);

    //transform data to tag form 
    this.nzListTagCritier = this.formStore.storeTagCritier(this.field_searching.profilForm,['dateBetweenFrom','dateBetweenTo'])
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
    this.field_searching.profilForm.patchValue(this.field_searching.profilForm.value)
    const subscription = this.profilService.listProfils(this.field_searching.profilCriteria)
      .subscribe(paginatedList => {
        this.nzPopulateData(paginatedList);
        this.loading =false
      }, error => {this.showError(error.status, error.message)});
    this.subscription.add(subscription);
  }

  reset() {
    this.field_searching.profilForm.reset();
    this.field_searching.profilCriteria = new ProfilCriteria()
    
    this.init();
  } 
  
 
  
  //action
  closeProfil(){
    this.M_Profil_S.action_ecran = Entity_action.NONE
    this.visible_drawer = false
  }
 
  viewProfil(event: any) {
    if(this.M_Profil_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(['/referentiel/profil/view', event.id], { queryParams: { b_: 1 } });
    }else{
      this.M_Profil_S.action_ecran = Entity_action.VIEW
      this.M_Profil_S.params = event
      this.visible_drawer = true
    }
  }
  editProfil(event: any) {
    if(this.M_Profil_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(['/referentiel/profil/edit', event.id], { queryParams: { b_: 1 } });
    }else{
      this.M_Profil_S.action_ecran = Entity_action.EDIT
      this.M_Profil_S.params=event;
      this.visible_drawer = true
    }
  } 
  addProfil(){
    if(this.M_Profil_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(['/referentiel/profil/add'])
    }else{
      this.M_Profil_S.action_ecran = Entity_action.ADD
      this.visible_drawer = true
    } 
  }
   //drawer action all notification of action in entity you will get in here 
   messageReceived(){
    this.M_Profil_S.lisner_brodcast_observable
      .subscribe(message => {
        
        switch (message.code) {
          case Code_Profil_Message.ADD_Profil:
            this.init();
            this.closeProfil()
            break;
            case Code_Profil_Message.ADD_And_New_Profil:
            this.init();
            break;
          case Code_Profil_Message.EDIT_Profil:  
            this.init();
            this.closeProfil()
            break;
          case Code_Profil_Message.DEL_Profil: 
            this.init();
            this.closeProfil()
            break;
          case Code_Profil_Message.VIEW_Profil:  
            this.closeProfil()
            break;
          case Code_Profil_Message.CLOSE_Profil:    
            this.closeProfil()
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
    if (this.hasRole('ROLE_DELETE_PROFIL')) { 
   /**
      * @author Amine nargis 
      * @note : Usage of the modal example 
     */
     let modalParams = new ModalParams()

     this.nzConfimModalService.confirmation(modalParams); // Modal callback
     this.nzConfimModalService.responseConfirm.subscribe(data=>{ 
       if ( data == USER_CHOICE.YES){ // When the user presses yes
         this.profilService.deleteProfil(this.nzSelectedList)
         .subscribe(() => {
           this.nzInitDataTable();
           this.loadProfilData();
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
  this.loadProfilData();
}
nzExport(id, fileType) {
  const columns: any[] = this.getTableColumns(id);
  if (columns && columns.length > 0) {
    this.addBusy();
    this.field_searching.formToCriteria(this.field_searching.profilForm.value);
    this.field_searching.profilCriteria.exportModel = { 'columnModels': columns, 'fileType': fileType };
    const subscription = this.profilService.exportProfils(this.field_searching.profilCriteria)
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

 