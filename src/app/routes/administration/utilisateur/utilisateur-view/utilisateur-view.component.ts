import { Component, OnDestroy, OnInit  } from '@angular/core'; 
import { Subscription } from 'rxjs/Subscription'; 
import { BaseComponent } from '@app/shared/components'; 
import { ActivatedRoute  } from '@angular/router';

const swal = require('sweetalert');
import 'rxjs/add/operator/switchMap'; 
import { UtilisateurService } from '@app/shared/services'; 
import { Utilisateur } from '@app/shared/models';
import { Message_Utilisateur_Service } from '../shared/message_utilisateur_service.service';
import { ModalParams } from '@app/shared/components/customized-ngZorro/nz-confim-modal/modal-params.model';
import { USER_CHOICE } from '@app/shared/components/customized-ngZorro/nz-confim-modal/user-choice.enum';
 
@Component({
  selector: 'app-utilisateur-view',
  templateUrl: './utilisateur-view.component.html',
  styleUrls: ['./utilisateur-view.component.scss']
})
export class UtilisateurViewComponent extends BaseComponent implements OnInit, OnDestroy {
 
  
  private subscription: Subscription = new Subscription();
  utilisateur: Utilisateur;
  typeValeurGraphes: any =[];
  parametresList: any[];
  get _mode_ecran(){
    return  this.M_Utilisateur_S.modeEcran
  }
  upDownIcon:boolean;
  constructor(private route: ActivatedRoute,
    private M_Utilisateur_S:Message_Utilisateur_Service,
    private utilisateurService: UtilisateurService) {
    super();
  }

  ngOnInit() {
     if (this.hasRole('ROLE_READ_UTILISATEUR')) {
      this.init();
      this.loadUtilisateur();
     } else {
       this.showUnauthorizedError(true);
     }
  }

  init() {
    this.initData();
  }

  resetPassword(){
    const subscription = this.utilisateurService
    .resetUtilisateurPassword(this.utilisateur.id)
    .subscribe(
      (paginatedList) => {
        this.showInfo("common.message.resetPassword.info");
      },
      (error) => {
        this.showError(error.status, error.message);
      }
    );
  this.subscription.add(subscription);


  }
  initData() {
    this.utilisateur = new Utilisateur();  
  }

  loadUtilisateur() {
    
    
    let id=(this.M_Utilisateur_S.modeEcran==this.mode_ecran.ECRAN)? this.route.snapshot.params.id : this.M_Utilisateur_S.params.id
    const subscription = this.utilisateurService.getUtilisateur(id)
      .subscribe(utilisateur => {
        this.utilisateur = utilisateur;
      }, error => this.handleError(error));
    this.subscription.add(subscription);
  }
  editUtilisateur(item){
    if(this.M_Utilisateur_S.modeEcran==this.mode_ecran.ECRAN){ 
      this.router.navigate(["/referentiel/utilisateur/list",item.id]); 
    }else{ 
      this.M_Utilisateur_S.params=item;
      this.M_Utilisateur_S.action_ecran=this.entity_action.EDIT
    }
  }
  deleteUtilisateur(item?) {
     if (this.hasRole('ROLE_DELETE_UTILISATEUR')) { 
      
      let body = new Utilisateur();
      let modalParams = new ModalParams();
      if(item.enabled == true){
       modalParams.message = '<div>Êtes-vous sûr de desactiver ces enregistrements ?</div>';
      }else{
       modalParams.message = '<div>Êtes-vous sûr de activer ces enregistrements ?</div>';
      }
 
      this.nzConfimModalService.confirmation(modalParams); // Modal callback
      this.nzConfimModalService.responseConfirm.subscribe(data=>{ 
        if ( data == USER_CHOICE.YES){ // When the user presses yes
          item.enabled = !item.enabled;
            const subscription = this.utilisateurService.updateUtilisateur(item)
              .subscribe(() => {
                  this.showInfo('common.message.delete.info');
                if(this.M_Utilisateur_S.modeEcran==this.mode_ecran.ECRAN){
                  this.router.navigate(["/referentiel/utilisateur/list"]); 
                }else{ 
                  this.M_Utilisateur_S.delUtilisateur(body)
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
    if(this.M_Utilisateur_S.modeEcran==this.mode_ecran.ECRAN){
      this.router.navigate(["/referentiel/utilisateur/list"]); 
    }else{
      this.M_Utilisateur_S.closeActionUtilisateur(true)
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
