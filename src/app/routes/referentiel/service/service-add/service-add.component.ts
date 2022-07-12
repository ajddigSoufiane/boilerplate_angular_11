import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '@app/shared/components'; 
import { Service } from '@app/shared/models'; 

import * as moment from 'moment'; 
import { Message_Service_Service } from '../shared/message_service_service.service';
import { ServiceService } from '@app/shared/services';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss']
})
export class ServiceAddComponent extends BaseComponent implements OnInit {
  
  private subscription: Subscription = new Subscription();
  private service: Service; 
  saveAndQuit: boolean; 
  get _mode_ecran(){
    return  this.M_Service_S.modeEcran
  }
  upDownIcon:boolean;
  //start declaration list
  radioList: { name: string; displayText: string; }[];
  conventionList: any[];
  parametresList: any[];


  
  //end declaration list
  //start declaration form
  serviceForm: FormGroup;
  createForm= () => {
    this.serviceForm = this.fb.group({
      nom: [null],
      code: [null,Validators.required],
      hopital: [null],
      codeSIH: [null],
      default: [null],
    });
    
  }
  //end declaration form

  constructor(private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private M_Service_S:Message_Service_Service,
    private serviceService: ServiceService 
   ) {
    super();
    this.createForm();
    this.changeFormInvalide(this.serviceForm);
  }

  ngOnInit() { 
    if (!this.hasRole('ROLE_REF_PARAMSURVEILLANCE_WRITE')) {
      this.init();
    } else {
       this.showUnauthorizedError(true);
     }
  }

  init() {
    this.service = new Service();
    this.initData(); 
    this.saveAndQuit = true; 
  }

  initData() {
    this.radioList =  [
      {'name':'H','displayText':'Homme'},
    {'name':'F','displayText':'Femme'},
    {'name':'NONE','displayText':'Non défini'}]
    this.conventionList = [];
    // this.loadData(this.patientSevice,'conventionList')
    this.parametresList = [];
    // this.loadData( this.patientSevice,"parametresList",null,this.serviceForm.controls['parametres']);
    this.servicesSelected=[];
    this.showUnauthorizedError();
  }
 
 
  saveService(serviceForm: any, saveAndQuit?: boolean) {
    
    this.validateFormService(this.serviceForm);
    if (this.serviceForm.valid) {
      if (!this.hasRole('ROLE_REF_PARAMSURVEILLANCE_WRITE')) {
        this.addBusy();
       
        Object.assign(this.service, serviceForm);
     
        const subscription = this.serviceService.saveService(this.service)
          .subscribe(success => {
            this.showInfo('common.message.create.info');
            if (saveAndQuit) {
              const id = success;
              if(this.M_Service_S.modeEcran==this.mode_ecran.ECRAN){
                this.router.navigate(['/referentiel/service/view', id]);
              }else{
                this.M_Service_S.addService(success)
              }

            }
            this.reset();
          }, error => this.handleError(error));
        this.subscription.add(subscription);
       } else {
         this.showUnauthorizedError();
       }
    }
  }

  validateFormService(form) {
    this.detectInvalideFormControle(form);
  }

  reset() {

    this.serviceForm.reset({
      ordre: 1,
      actif: true
    });
    this.resetValidateForm(this.serviceForm);
    this.init();
  }
  retour(){
    if(this.M_Service_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(["/referentiel/service/list"]); 
    }else{
      this.M_Service_S.closeActionService(true)
    }
   
  } 
  /* start list multiple interaction */
  servicesSelected: Array<any> = [];
  putServicesList(servicesListSelected: Array<Service>) {
    this.servicesSelected = servicesListSelected;
  }

  updateServicesList(receivedData: any) {
    
    
    this.servicesSelected = receivedData.list;
  
  }
  /* end  list multiple interaction*/
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
