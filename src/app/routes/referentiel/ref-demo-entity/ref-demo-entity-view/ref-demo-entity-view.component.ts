import { Component, OnDestroy, OnInit  } from '@angular/core'; 
import { Subscription } from 'rxjs/Subscription'; 
import { BaseComponent } from '@app/shared/components'; 
import { ActivatedRoute  } from '@angular/router';

const swal = require('sweetalert');
import 'rxjs/add/operator/switchMap'; 
import {   RefDemoEntityService } from '@app/shared/services'; 
import { RefDemoEntity } from '@app/shared/models';
import { Message_RefDemoEntity_Service } from '../shared/message_ref-demo-entity_service.service';
import { ModalParams } from '@app/shared/components/customized-ngZorro/nz-confim-modal/modal-params.model';
import { USER_CHOICE } from '@app/shared/components/customized-ngZorro/nz-confim-modal/user-choice.enum';
 
@Component({
  selector: "app-ref-demo-entity-view",
  templateUrl: "./ref-demo-entity-view.component.html",
  styleUrls: ["./ref-demo-entity-view.component.scss"],
})
export class RefDemoEntityViewComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  private subscription: Subscription = new Subscription();
  refDemoEntity: RefDemoEntity;
  typeValeurGraphes: any = [];
  parametresList: any[];
  get _mode_ecran() {
    return this.M_RefDemoEntity_S.modeEcran;
  }
  upDownIcon: boolean;
  constructor(
    private route: ActivatedRoute,
    private M_RefDemoEntity_S: Message_RefDemoEntity_Service,
    private refDemoEntityService: RefDemoEntityService
  ) {
    super();
  }

  ngOnInit() {
    if (!this.hasRole("ROLE_REF_PARAMSURVEILLANCE_READ")) {
      this.init();
      this.loadRefDemoEntity();
    } else {
      this.showUnauthorizedError(true);
    }
  }

  init() {
    this.initData();
  }

  initData() {
    this.refDemoEntity = new RefDemoEntity();
  }

  loadRefDemoEntity() {
    
    
    let id =
      this.M_RefDemoEntity_S.modeEcran == this.mode_ecran.ECRAN
        ? this.route.snapshot.params.id
        : this.M_RefDemoEntity_S.params.id;
    const subscription = this.refDemoEntityService
      .getRefDemoEntity(id)
      .subscribe(
        (refDemoEntity) => {
          this.refDemoEntity = refDemoEntity;
          let json =
            `{"refDemoEntitysSelected":[{"code":"1","id":1,"libelle":"Prélèvement à domicile <5km","selectedObject":false},{"code":"9","id":9,"libelle":"Prélèvement à domicile 5-10km","selectedObject":false} ],"timer": "30/06/2021 11:01","id":` +
            refDemoEntity.id +
            `,"libelle":"test ux","code":"UXUI","actif":true,"radio":"H","textarea":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lo",
       "fileName": "xxx.png","checkSum":"456465464","urlFile":"http://www.baidu.com/xxx.png","summernote":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lo","convention":{"id":200,"value":"COVID"},"parametres":[{"name":3,"displayText":"NPC"},{"name":2,"displayText":"NF"}],"date":"17/06/2021 09:34"}`;
          this.refDemoEntity = JSON.parse(json);
          //format timer
          if (this.refDemoEntity.timer) {
            let split = this.refDemoEntity.timer.split(" ");
            this.refDemoEntity.timer = split.length > 1 ? split[1] : "";
          }
        },
        (error) => this.handleError(error)
      );
    this.subscription.add(subscription);
  }
  editRefDemoEntity(item) {
    if (this.M_RefDemoEntity_S.modeEcran == this.mode_ecran.ECRAN) {
      this.router.navigate(["/referentiel/refDemoEntity/list", item.id]);
    } else {
      this.M_RefDemoEntity_S.params = item;
      this.M_RefDemoEntity_S.action_ecran = this.entity_action.EDIT;
    }
  }
  deleteRefDemoEntity(id) {
    if (!this.hasRole("ROLE_REF_PARAMSURVEILLANCE_WRITE")) {
      let body = new RefDemoEntity();
      body.id = id;
      let modalParams = new ModalParams();
      modalParams.nzCancelText = this.translator.instant(
        "common.message.delete.info"
      );
      modalParams.nzOkText = this.translator.instant(
        "common.message.delete.info"
      );

      this.nzConfimModalService.confirmation(modalParams); // Modal callback
      this.nzConfimModalService.responseConfirm.subscribe((data) => {
        if (data == USER_CHOICE.YES) {
          // When the user presses yes
          const subscription = this.refDemoEntityService
            .deleteRefDemoEntity([body])
            .subscribe(
              () => {
                this.showInfo("common.message.delete.info");
                if (this.M_RefDemoEntity_S.modeEcran == this.mode_ecran.ECRAN) {
                  this.router.navigate(["/referentiel/refDemoEntity/list"]);
                } else {
                  this.M_RefDemoEntity_S.delRefDemoEntity(body);
                }
              },
              (error) => this.handleError(error)
            );
          this.subscription.add(subscription);
        } else {
          this.nzConfimModalService.reset();
        }
      });
    } else {
      this.showUnauthorizedError();
    }
  }

  retour() {
    if (this.M_RefDemoEntity_S.modeEcran == this.mode_ecran.ECRAN) {
      this.router.navigate(["/referentiel/refDemoEntity/list"]);
    } else {
      this.M_RefDemoEntity_S.closeActionRefDemoEntity(true);
    }
  }
  transformToList(str) {
    if (str) return str.replace(/_/g, ",");
    else return str;
  }
  downLoadFile(event: any) {
    if (event) {
      this.addBusy();
      this.refDemoEntityService.downLoadFile(event.id).subscribe(
        (response) => {
          this.downloadFile(response);
        },
        (error) => {
          this.showFileError(error.status);
          this.removeBusy();
        }
      );
    }
  }
  selectedDate = new Date("2017-01-25");
  onChange(event){
    this.selectedDate = event;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
