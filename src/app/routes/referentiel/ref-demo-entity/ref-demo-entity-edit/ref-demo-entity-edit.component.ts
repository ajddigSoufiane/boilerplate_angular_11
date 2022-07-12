import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '@app/shared/components';  
import {   ParametrageService, RefDemoEntityService } from '@app/shared/services'; 
import { Observable, Observer, Subscription } from 'rxjs';

import * as moment from 'moment'; 
import { ParametrageCriteria, RefDemoEntity, UploadModel } from '@app/shared/models';
import { Message_RefDemoEntity_Service } from '../shared/message_ref-demo-entity_service.service';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
@Component({
  selector: "app-ref-demo-entity-edit",
  templateUrl: "./ref-demo-entity-edit.component.html",
  styleUrls: ["./ref-demo-entity-edit.component.scss"],
})
export class RefDemoEntityEditComponent
  extends BaseComponent
  implements OnInit
{
  private subscription: Subscription = new Subscription();
  refDemoEntity: RefDemoEntity;
  get _mode_ecran() {
    return this.M_RefDemoEntity_S.modeEcran;
  }
  upDownIcon: boolean;
  //start declaration list
  radioList: { name: string; displayText: string }[];
  conventionList: any[];
  parametresList: any[];
  //end declaration list
  //start declaration form
  refDemoEntityForm: FormGroup;
  createForm() {
    this.refDemoEntityForm = this.fb.group({
      libelle: [null, Validators.required],
      code: [{ value: "", disabled: true }, Validators.required],
      actif: [true],
      radio: ["F"],
      textarea: [""],
      convention: [""],
      parametres: [""],
      date: [null],
      summernote: [""],
      timer: [null],
      id: [], 
      checkSum: [null],
      fileName: [null],
    });
  }
  //end declaration form
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private M_RefDemoEntity_S: Message_RefDemoEntity_Service,
    private refDemoEntityService: RefDemoEntityService,
    private parametrageService: ParametrageService
  ) {
    super();
    this.createForm();
  }

  ngOnInit() {
    if (!this.hasRole("ROLE_REF_PARAMSURVEILLANCE_WRITE")) {
      this.initData();
      this.loadrefDemoEntity();
    } else {
      this.showUnauthorizedError(true);
    }
  }

  init() {
    
  }

  initData() {
    this.refDemoEntity = new RefDemoEntity();
    this.radioList = [
      { name: "H", displayText: "Homme" },
      { name: "F", displayText: "Femme" },
      { name: "NONE", displayText: "Non défini" },
    ];
    this.conventionList = [];
    this.loadData(this.refDemoEntityService, "conventionList");
    this.parametresList = [];
    this.loadData(
      this.refDemoEntityService,
      "parametresList",
      null,
      this.refDemoEntityForm.controls["parametres"]
    );
    this.refDemoEntitysSelected = [];
  }

  loadrefDemoEntity() {
    let id =
      this.M_RefDemoEntity_S.modeEcran == this.mode_ecran.ECRAN
        ? this.route.snapshot.params.id
        : this.M_RefDemoEntity_S.params.id;
    const subscription = this.refDemoEntityService
      .getRefDemoEntity(id)
      .subscribe(
        (refDemoEntity) => {
          this.init();
          this.refDemoEntity = refDemoEntity;
          //juste for test
          let json =
            `{"refDemoEntitysSelected":[{"code":"1","id":1,"libelle":"Prélèvement à domicile <5km","selectedObject":false},{"code":"9","id":9,"libelle":"Prélèvement à domicile 5-10km","selectedObject":false} ],"timer": "30/06/2021 11:01","id":` +
            refDemoEntity.id +
            `,"fileName": "xxx.png","checkSum":"456465464","urlFile":"http://www.baidu.com/xxx.png","libelle":"test ux","code":"UXUI","actif":true,"radio":"H","textarea":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lo",
        "summernote":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lo","convention":{"id":200,"value":"COVID"},"parametres":[{"name":3,"displayText":"NPC"},{"name":2,"displayText":"NF"}],"date":"17/06/2021 09:34"}`;
          this.refDemoEntity = JSON.parse(json);
          this.patchValues();
        },
        (error) => this.handleError(error)
      );
    this.subscription.add(subscription);
  }

  patchValues() {
    if (this.refDemoEntity) {
      //patch date if is string before patch
      this.refDemoEntity.date = this.formatDate(this.refDemoEntity.date);
      this.refDemoEntity.timer = this.formatDate(this.refDemoEntity.timer);
      this.refDemoEntityForm.patchValue(this.refDemoEntity);
      //patch date
      
      
      //patch checkbox
      //send multiple
      this.refDemoEntitysSelected = [
        ...this.refDemoEntity.refDemoEntitysSelected,
      ];
      this.refDemoEntityForm.controls["parametres"].setValue(
        this.patchDataCheckBoxToForm(
          this.refDemoEntity.parametres.map((a) => a.name),
          this.parametresList
        )
      );
      //patch file
      this.uploadModel.fileList=[]
      let file: NzUploadFile = {
        uid: "1",
        name: this.refDemoEntity.fileName,
        status: "done",
        url: this.refDemoEntity.urlFile,
      };
      this.uploadModel.fileList.push(file);
    }
  }
  public toDate(date) {
    let parts = date.split("/");

    let dateFormat = new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10)
    );
    return dateFormat;
  }

  updateRefDemoEntity() {
    this.validateFormrefDemoEntity(this.refDemoEntityForm);
    if (this.refDemoEntityForm.valid) {
      if (!this.hasRole("ROLE_REF_PARAMSURVEILLANCE_WRITE")) {
        this.addBusy();
        Object.assign(this.refDemoEntity, this.refDemoEntityForm.value);
        
        if (this.refDemoEntityForm.controls["date"].value instanceof Date) {
          let d: Date = this.refDemoEntityForm.controls["date"].value;
          if (d && typeof d != "string") {
            
            
            this.refDemoEntity.date = moment(d).format("DD/MM/YYYY HH:mm");
          }
        }
        //send checkbox
        this.refDemoEntity.parametres = this.convertFormCheckboxTodata(
          this.parametresList,
          this.refDemoEntityForm.controls["parametres"]
        );

        //send multiple
        this.refDemoEntity.refDemoEntitysSelected = [
          ...this.refDemoEntitysSelected,
        ];

        const subscription = this.refDemoEntityService
          .updateRefDemoEntity(this.refDemoEntity)
          .subscribe(
            () => {
              this.showInfo("common.message.update.info");
              
              if (this.M_RefDemoEntity_S.modeEcran == this.mode_ecran.ECRAN) {
                this.router.navigate([
                  "/referentiel/refDemoEntity/view",
                  this.refDemoEntity.id,
                ]);
              } else {
                this.M_RefDemoEntity_S.addRefDemoEntity(this.refDemoEntity);
              }
            },
            (error) => this.handleError(error)
          );
        this.subscription.add(subscription);
      } else {
        this.showUnauthorizedError();
      }
    }
  }

  validateFormrefDemoEntity(form) {
    this.detectInvalideFormControle(form);
  }
  /* start list multiple interaction */
  refDemoEntitysSelected: Array<any> = [];
  putRefDemoEntitysList(refDemoEntitysListSelected: Array<RefDemoEntity>) {
    this.refDemoEntitysSelected = refDemoEntitysListSelected;
  }

  updateRefDemoEntitysList(receivedData: any) {
    
    
    this.refDemoEntitysSelected = receivedData.list;
    
  }
  /* end  list multiple interaction*/
  retour() {
    if (this.M_RefDemoEntity_S.modeEcran == this.mode_ecran.ECRAN) {
      this.router.navigate(["/referentiel/refDemoEntity/list"]);
    } else {
      this.M_RefDemoEntity_S.closeActionRefDemoEntity(true);
    }
  }

  // upload file
  uploadModel = new UploadModel(
    this.utilityService.uploadUrl,
    this.utilityService.getUploadHeaders()
  );
  handleChange({ file, fileList, event }: NzUploadChangeParam): void {
    this.uploadModel.fileList = fileList;
    if (file.status === "removed") {
      this.refDemoEntityForm.patchValue({ checkSum: null, fileName: null });
      this.uploadModel.fileAlreadyUploaded = false;
    }
    if (file.status === "done") {
      this.uploadModel.isUploadLoading = true;
      this.uploadModel.fileAlreadyUploaded = true;
      this.refDemoEntityForm.patchValue({
        checkSum: file.response.checksumValue,
        fileName: file.name,
      });
      
    } else if (file.status === "error") {
      console.log("file error", file);
      
    }
  }

  loadParametreMaxSize() {
    let parametrageCriteria: ParametrageCriteria = new ParametrageCriteria();
    parametrageCriteria.code = "SIZE_UPLOAD_FILE";
    this.parametrageService
      .findParametragesByCriteria(parametrageCriteria)
      .subscribe(
        (response) => {
          this.uploadModel.maxSizeUpload = parseFloat(response[0].valeur);
          console.log("this.maxSizeUpload", this.uploadModel.maxSizeUpload);
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      console.log("file.type", file);
      
      
      
      const rptdesign = true;
      
      
      
      
      
      
      

      const isLt2M = file.size / 1000 < this.uploadModel.maxSizeUpload;
      if (!isLt2M) {
        this.showErrorMessage(
          "Le fichier doit être inférieure à " +
            this.uploadModel.maxSizeUpload +
            "Kb !"
        );
        observer.complete();
        return;
      }
      observer.next(rptdesign && isLt2M);
      observer.complete();
    });
  };

  removeUpload(index) {
    this.refDemoEntityForm.patchValue({ checkSum: null, fileName: null });
    this.uploadModel.fileAlreadyUploaded = false;
    if (this.uploadModel.fileList && this.uploadModel.fileList.length > 0) {
      this.uploadModel.fileList.splice(index, 1);
    }
  }
  // end upload
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
