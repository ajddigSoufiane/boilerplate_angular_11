import { Component, OnDestroy, OnInit  } from '@angular/core'; 
import { Subscription } from 'rxjs/Subscription'; 
import { BaseComponent } from '@app/shared/components'; 
import { ActivatedRoute  } from '@angular/router';

const swal = require('sweetalert');
import 'rxjs/add/operator/switchMap'; 
import {   ProfilService } from '@app/shared/services'; 
import { Profil, Role } from '@app/shared/models';
import { Message_Profil_Service } from '../shared/message_profil_service.service';
import { ModalParams } from '@app/shared/components/customized-ngZorro/nz-confim-modal/modal-params.model';
import { USER_CHOICE } from '@app/shared/components/customized-ngZorro/nz-confim-modal/user-choice.enum';
 
@Component({
  selector: 'app-profil-view',
  templateUrl: './profil-view.component.html',
  styleUrls: ['./profil-view.component.scss']
})
export class ProfilViewComponent extends BaseComponent implements OnInit, OnDestroy {
 
  
  private subscription: Subscription = new Subscription();
  public rolesList: Array<Role> = [];

  profil: Profil;
  typeValeurGraphes: any =[];
  parametresList: any[];
  get _mode_ecran(){
    return  this.M_Profil_S.modeEcran
  }
  upDownIcon:boolean;
  constructor(private route: ActivatedRoute, 
    private M_Profil_S:Message_Profil_Service,
    private profilService: ProfilService) {
    super();
  }

  ngOnInit() {
     if (this.hasRole('ROLE_READ_PROFIL')) {
      this.init();
      this.loadRoles();
      this.loadProfil();
     } else {
       this.showUnauthorizedError(true);
     }
  }

  init() {
    this.initData();
  }

  initData() {
    this.profil = new Profil();  
  }

  loadProfil() {
    
    
    let id=(this.M_Profil_S.modeEcran==this.mode_ecran.ECRAN)? this.route.snapshot.params.id : this.M_Profil_S.params.id
    const subscription = this.profilService.getProfil(id)
      .subscribe(profil => {
        this.profil = profil;
       
      
      
      
      
      }, error => this.handleError(error));
    this.subscription.add(subscription);
  }
  loadRoles() {
    
    
    let id=(this.M_Profil_S.modeEcran==this.mode_ecran.ECRAN)? this.route.snapshot.params.id : this.M_Profil_S.params.id
    const subscription = this.profilService.getRolesProfil(id)
      .subscribe(rolesList => {
        this.rolesList = rolesList;
      
       
      
      
      
      
      }, error => this.handleError(error));
    this.subscription.add(subscription);
  }
  editProfil(item){
    if(this.M_Profil_S.modeEcran==this.mode_ecran.ECRAN){ 
      this.router.navigate(["/referentiel/profil/list",item.id]); 
    }else{ 
      this.M_Profil_S.params=item;
      this.M_Profil_S.action_ecran=this.entity_action.EDIT
    }
  }
  deleteProfil(id) {
     if (this.hasRole('ROLE_DELETE_PROFIL')) { 
      
      let body = new Profil()
      body.id = id
      let modalParams = new ModalParams();
 
      this.nzConfimModalService.confirmation(modalParams); // Modal callback
      this.nzConfimModalService.responseConfirm.subscribe(data=>{ 
        if ( data == USER_CHOICE.YES){ // When the user presses yes
            const subscription = this.profilService.deleteProfil([body])
              .subscribe(() => {
                  this.showInfo('common.message.delete.info');
                if(this.M_Profil_S.modeEcran==this.mode_ecran.ECRAN){
                  this.router.navigate(["/referentiel/profil/list"]); 
                }else{ 
                  this.M_Profil_S.delProfil(body)
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
    if(this.M_Profil_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(["/referentiel/profil/list"]); 
    }else{
      this.M_Profil_S.closeActionProfil(true)
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
