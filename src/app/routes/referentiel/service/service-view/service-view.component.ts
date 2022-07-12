import { Component, OnDestroy, OnInit  } from '@angular/core'; 
import { Subscription } from 'rxjs/Subscription'; 
import { BaseComponent } from '@app/shared/components'; 
import { ActivatedRoute  } from '@angular/router';

const swal = require('sweetalert');
import 'rxjs/add/operator/switchMap'; 
import {   ServiceService } from '@app/shared/services'; 
import { Service } from '@app/shared/models';
import { Message_Service_Service } from '../shared/message_service_service.service';
import { ModalParams } from '@app/shared/components/customized-ngZorro/nz-confim-modal/modal-params.model';
import { USER_CHOICE } from '@app/shared/components/customized-ngZorro/nz-confim-modal/user-choice.enum';
 
@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.scss']
})
export class ServiceViewComponent extends BaseComponent implements OnInit, OnDestroy {
 
  
  private subscription: Subscription = new Subscription();
  service: Service;
  typeValeurGraphes: any =[];
  parametresList: any[];
  get _mode_ecran(){
    return  this.M_Service_S.modeEcran
  }
  upDownIcon:boolean;
  constructor(private route: ActivatedRoute, 
    private M_Service_S:Message_Service_Service,
    private serviceService: ServiceService) {
    super();
  }

  ngOnInit() {
     if (!this.hasRole('ROLE_REF_PARAMSURVEILLANCE_READ')) {
      this.init();
      this.loadService();
     } else {
       this.showUnauthorizedError(true);
     }
  }

  init() {
    this.initData();
  }

  initData() {
    this.service = new Service();  
  }

  loadService() {
    
    
    let id=(this.M_Service_S.modeEcran==this.mode_ecran.ECRAN)? this.route.snapshot.params.id : this.M_Service_S.params.id
    const subscription = this.serviceService.getService(id)
      .subscribe(service => {
        this.service = service;
       let json = `{"servicesSelected":[{"code":"1","id":1,"libelle":"Prélèvement à domicile <5km","selectedObject":false},{"code":"9","id":9,"libelle":"Prélèvement à domicile 5-10km","selectedObject":false} ],"timer": "30/06/2021 11:01","id":`+service.id+`,"libelle":"test ux","code":"UXUI","actif":true,"radio":"H","textarea":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lo",
       "summernote":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lo","convention":{"id":200,"value":"COVID"},"parametres":[{"name":3,"displayText":"NPC"},{"name":2,"displayText":"NF"}],"date":"17/06/2021 09:34"}`
       this.service = JSON.parse(json);
       
      
      
      
      
      }, error => this.handleError(error));
    this.subscription.add(subscription);
  }
  editService(item){
    if(this.M_Service_S.modeEcran==this.mode_ecran.ECRAN){ 
      this.router.navigate(["/referentiel/service/list",item.id]); 
    }else{ 
      this.M_Service_S.params=item;
      this.M_Service_S.action_ecran=this.entity_action.EDIT
    }
  }
  deleteService(id) {
     if (!this.hasRole('ROLE_REF_PARAMSURVEILLANCE_WRITE')) { 
      
      let body = new Service()
      body.id = id
      let modalParams = new ModalParams()
      modalParams.nzCancelText =  this.translator.instant('common.message.delete.info');
      modalParams.nzOkText =  this.translator.instant('common.message.delete.info'); 
 
      this.nzConfimModalService.confirmation(modalParams); // Modal callback
      this.nzConfimModalService.responseConfirm.subscribe(data=>{ 
        if ( data == USER_CHOICE.YES){ // When the user presses yes
            const subscription = this.serviceService.deleteService([body])
              .subscribe(() => {
                  this.showInfo('common.message.delete.info');
                if(this.M_Service_S.modeEcran==this.mode_ecran.ECRAN){
                  this.router.navigate(["/referentiel/service/list"]); 
                }else{ 
                  this.M_Service_S.delService(body)
                }
              }, error => this.handleError(error));
            this.subscription.add(subscription);
          } else {
            this.nzConfimModalService.reset()
          }
        });
     
     } else {
     this.showUnauthorizedError();
     }
  }
 
  retour(){
    if(this.M_Service_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(["/referentiel/service/list"]); 
    }else{
      this.M_Service_S.closeActionService(true)
    }
   
  }
  transformToList(str) {
    if (str)
      return str.replace(/_/g, ',');
    else
      return str
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
