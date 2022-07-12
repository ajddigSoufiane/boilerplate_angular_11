import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import {  Utilisateur, UtilisateurCriteria } from '@models';
import {  nzTableFunction } from '@app/shared/components'; 
  
import { Entity_action } from '@app/shared/enum/entity_action.enum'; 
import { UtilisateurService } from '@app/shared/services';
import { Code_Utilisateur_Message, Message_Utilisateur_Service } from '../shared/message_utilisateur_service.service';
import { CustomElementSession } from '@app/shared/utility/form_store';

import { Subject } from 'rxjs'; 
import { USER_CHOICE } from '@app/shared/components/customized-ngZorro/nz-confim-modal/user-choice.enum';
import { NzConfimModalService } from '@app/shared/components/customized-ngZorro/nz-confim-modal/nz-confim-modal.service';
import { ModalParams } from '@app/shared/components/customized-ngZorro/nz-confim-modal/modal-params.model';
import { FieldSearchingUtilisateurListComponent } from './field_searching/field_searching.component'; 



@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.scss']
})
export class UtilisateurListComponent extends nzTableFunction<Utilisateur> implements OnInit, OnDestroy {
  @ViewChild('field_searching')  field_searching:FieldSearchingUtilisateurListComponent; 
  

  showCompleteForm:boolean = false
  // drawer attrib
  visible_drawer: boolean;
  action_ecran:Entity_action;
  loading: boolean;
  get _action_ecran(){
    return  this.M_Utilisateur_S.action_ecran
  }
  // end drawer attrib

  private subscription: Subscription = new Subscription();


  nzFilterListActif = [
    { text: 'Oui', value: true },
    { text: 'Non', value: false }
  ];

  
  constructor(private M_Utilisateur_S:Message_Utilisateur_Service,
    private utilisateurService: UtilisateurService,
    private cdRef: ChangeDetectorRef
  ) {
    super(Utilisateur,'loadUtilisateurData','field_searching'); 
    this.component=this;
   }
   

  ngOnInit() {
    if (this.hasRole('ROLE_READ_UTILISATEUR')) {
  //     this.nzInitDataTable();
 
    this.cdRef.detectChanges(); 
    if(this.field_searching){ 
      this.field_searching.utilisateurCriteria = this.formStore.getValueInSessionStorage_FormStore(this,null, this.field_searching.utilisateurCriteria,this.field_searching.utilisateurForm); 
      if(this.field_searching.utilisateurCriteria){ 
       
        this.nzInitDataTable();
        this.loadUtilisateurData();
      }else{ 
        this.nzSearch(this.field_searching.utilisateurForm.value); 
      }  
    }

    this.messageReceived();
  }else{
    this.showUnauthorizedError(true);
  }
  }
  
  init() {  
    this.nzInitDataTable();
    this.loadUtilisateurData(); 
  }
 
 
 
  loadUtilisateurData() {
    const page: number = this.nzFirstItem - 1;
    this.getPaginationParams(this.field_searching.utilisateurCriteria, page, this.nzRowsItem, this.nzSortFieldItem, this.nzSortOrderItem);

    //transform data to tag form 
    this.nzListTagCritier = this.formStore.storeTagCritier(this.field_searching.utilisateurForm,['dateBetweenFrom','dateBetweenTo'])
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
    this.field_searching.utilisateurForm.patchValue(this.field_searching.utilisateurForm.value)
    const subscription = this.utilisateurService.listUtilisateurs(this.field_searching.utilisateurCriteria)
      .subscribe(paginatedList => {
        this.nzPopulateData(paginatedList);
        this.loading =false
      }, error => {this.showError(error.status, error.message)});
    this.subscription.add(subscription);
  }

  reset() {
    this.field_searching.utilisateurForm.reset();
    this.field_searching.utilisateurCriteria=new UtilisateurCriteria()
    // this.field_searching.resetCheckBox()
    this.init();
  } 
  
 
  
  //action
  closeUtilisateur(){
    this.M_Utilisateur_S.action_ecran = Entity_action.NONE
    this.visible_drawer = false
  }
 
  viewUtilisateur(event: any) {
    if(this.M_Utilisateur_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(['/referentiel/utilisateur/view', event.id], { queryParams: { b_: 1 } });
    }else{
      this.M_Utilisateur_S.action_ecran = Entity_action.VIEW
      this.M_Utilisateur_S.params = event
      this.visible_drawer = true
    }
  }
  editUtilisateur(event: any) {
    if(this.M_Utilisateur_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(['/referentiel/utilisateur/edit', event.id], { queryParams: { b_: 1 } });
    }else{
      this.M_Utilisateur_S.action_ecran = Entity_action.EDIT
      this.M_Utilisateur_S.params=event;
      this.visible_drawer = true
    }
  } 
  addUtilisateur(){
    if(this.M_Utilisateur_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(['/referentiel/utilisateur/add'])
    }else{
      this.M_Utilisateur_S.action_ecran = Entity_action.ADD
      this.visible_drawer = true
    } 
  }
   //drawer action all notification of action in entity you will get in here 
   messageReceived(){
    this.M_Utilisateur_S.lisner_brodcast_observable
      .subscribe(message => {
        
        switch (message.code) {
          case Code_Utilisateur_Message.ADD_Utilisateur:
            this.init();
            this.closeUtilisateur()
            break;
          case Code_Utilisateur_Message.ADD_And_New_Utilisateur:
            this.init();
            break;
          case Code_Utilisateur_Message.EDIT_Utilisateur:  
            this.init();
            this.closeUtilisateur()
            break;
          case Code_Utilisateur_Message.DEL_Utilisateur: 
            this.init();
            this.closeUtilisateur()
            break;
          case Code_Utilisateur_Message.VIEW_Utilisateur:  
            this.closeUtilisateur()
            break;
          case Code_Utilisateur_Message.CLOSE_Utilisateur:    
            this.closeUtilisateur()
            break; 
          default:
            break;
        } 
      }); 
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  nzDeleteItem(item?) {
    if (this.hasRole('ROLE_DELETE_UTILISATEUR')) { 
   /**
      * @author Amine nargis 
      * @note : Usage of the modal example 
     */
    console.log(item)
     let modalParams = new ModalParams()
     if(item.enabled == true){
      modalParams.message = '<div>Êtes-vous sûr de vouloir désactiver cet utilisateur ?</div>';
     }else{
      modalParams.message = '<div>Êtes-vous sûr de vouloir activer cet utilisateur ?</div>';
     }

     this.nzConfimModalService.confirmation(modalParams); // Modal callback
     this.nzConfimModalService.responseConfirm.subscribe(data=>{ 
       if ( data == USER_CHOICE.YES){ // When the user presses yes
        item.enabled = !item.enabled;
         this.utilisateurService.updateUtilisateur(item)
         .subscribe(() => {
           this.nzInitDataTable();
           this.loadUtilisateurData();
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
  this.loadUtilisateurData();
}
nzExport(id, fileType) {
  const columns: any[] = this.getTableColumns(id);
  if (columns && columns.length > 0) {
    this.addBusy();
    this.field_searching.formToCriteria(this.field_searching.utilisateurForm.value);
    this.field_searching.utilisateurCriteria.exportModel = { 'columnModels': columns, 'fileType': fileType };
    const subscription = this.utilisateurService.exportUtilisateurs(this.field_searching.utilisateurCriteria)
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

 