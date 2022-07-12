import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '@app/shared/components';  
import {  ServiceService } from '@app/shared/services'; 
import { Subscription } from 'rxjs';

import * as moment from 'moment'; 
import { Service } from '@app/shared/models';
import { Message_Service_Service } from '../shared/message_service_service.service';
@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent extends BaseComponent implements OnInit {
 
  
  private subscription: Subscription = new Subscription();
  service: Service; 
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
 createForm() {
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
    private route: ActivatedRoute, 
    private M_Service_S:Message_Service_Service,
    private serviceService: ServiceService ) {
    super();
    this.createForm();
  }

  ngOnInit() {
    if (!this.hasRole('ROLE_REF_PARAMSURVEILLANCE_WRITE')) {
      this.initData()
      this.loadservice();
    } else {
      this.showUnauthorizedError(true);
    }
  }

  init() {
   
  }

  initData() {
    this.service = new Service();
    this.radioList =  [
      {'name':'H','displayText':'Homme'},
      {'name':'F','displayText':'Femme'},
      {'name':'NONE','displayText':'Non défini'}
    ]
    this.conventionList = [];
    // this.loadData(this.patientSevice,'conventionList')
    this.parametresList = [];
    // this.loadData( this.patientSevice,"parametresList",null,this.serviceForm.controls['parametres']);
    this.servicesSelected=[]
  }

  
  loadservice() {
    let id=(this.M_Service_S.modeEcran==this.mode_ecran.ECRAN)? this.route.snapshot.params.id : this.M_Service_S.params.id
    const subscription = this.serviceService.getService(id)
      .subscribe(service => {
        this.init();
        this.service = service;
        //juste for test
        let json = `{"servicesSelected":[{"code":"1","id":1,"libelle":"Prélèvement à domicile <5km","selectedObject":false},{"code":"9","id":9,"libelle":"Prélèvement à domicile 5-10km","selectedObject":false} ],"timer": "30/06/2021 11:01","id":`+service.id+`,"libelle":"test ux","code":"UXUI","actif":true,"radio":"H","textarea":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lo",
        "summernote":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lo","convention":{"id":200,"value":"COVID"},"parametres":[{"name":3,"displayText":"NPC"},{"name":2,"displayText":"NF"}],"date":"17/06/2021 09:34"}`
        this.service = JSON.parse(json);
        this.patchValues();
      }, error => this.handleError(error));
    this.subscription.add(subscription);
  }

  patchValues() {
    if (this.service) {
      this.serviceForm.patchValue(this.service);
    }
  }
  public toDate(date){
    let parts = date.split('/');

    let dateFormat = new Date(parseInt(parts[2], 10),parseInt(parts[1], 10) - 1,parseInt(parts[0], 10));
    return dateFormat;
  }

  updateService() {
  
    this.validateFormservice(this.serviceForm);
    if (this.serviceForm.valid) {
       if (!this.hasRole('ROLE_REF_PARAMSURVEILLANCE_WRITE')) {
        this.addBusy();
        Object.assign(this.service, this.serviceForm.value);
        const subscription = this.serviceService.updateService(this.service)
          .subscribe(() => {
            this.showInfo('common.message.update.info');
            
            if(this.M_Service_S.modeEcran==this.mode_ecran.ECRAN){
              this.router.navigate(['/referentiel/service/view', this.service.id]);
            }else{
              this.M_Service_S.addService(this.service)
            }
          }, error => this.handleError(error));
        this.subscription.add(subscription);
       } else {
         this.showUnauthorizedError();
       }
    }
  }

  validateFormservice(form) {
    this.detectInvalideFormControle(form);
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
  retour(){
    if(this.M_Service_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(["/referentiel/service/list"]); 
    }else{
      this.M_Service_S.closeActionService(true)
    } 
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
