import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '@app/shared/components'; 
import { ParametrageCriteria, RefDemoEntity, UploadModel } from '@app/shared/models';
import {  ParametrageService, RefDemoEntityService } from '@app/shared/services';

import * as moment from 'moment'; 
import { Message_RefDemoEntity_Service } from '../shared/message_ref-demo-entity_service.service';
import { Observable, Observer } from 'rxjs';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: "app-ref-demo-entity-add",
  templateUrl: "./ref-demo-entity-add.component.html",
  styleUrls: ["./ref-demo-entity-add.component.scss"],
})
export class RefDemoEntityAddComponent extends BaseComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  private refDemoEntity: RefDemoEntity;
  saveAndQuit: boolean;
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
  createForm = () => {
    this.refDemoEntityForm = this.fb.group({
      libelle: [null, Validators.required],
      code: [null, Validators.required],
      actif: [true],
      radio: ["F"],
      textarea: [""],
      convention: [""],
      parametres: [""],
      date: [null],
      summernote: [""],
      timer: [null],
      checkSum: [null],
      fileName: [null],
    });
  };
  //end declaration form

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private M_RefDemoEntity_S: Message_RefDemoEntity_Service,
    private refDemoEntityService: RefDemoEntityService,
    private parametrageService: ParametrageService
  ) {
    super();
    this.createForm();
    this.changeFormInvalide(this.refDemoEntityForm);
  }

  ngOnInit() {
    if (!this.hasRole("ROLE_REF_PARAMSURVEILLANCE_WRITE")) {
      this.init();
    } else {
      this.showUnauthorizedError(true);
    }
  }

  init() {
    this.refDemoEntity = new RefDemoEntity();
    this.initData();
    this.saveAndQuit = true;
  }

  initData() {
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
    this.showUnauthorizedError();
  }

  saveRefDemoEntity(refDemoEntityForm: any, saveAndQuit?: boolean) {
    this.validateFormRefDemoEntity(this.refDemoEntityForm);
    
    if (this.refDemoEntityForm.valid) {
      if (!this.hasRole("ROLE_REF_PARAMSURVEILLANCE_WRITE")) {
        this.addBusy();

        Object.assign(this.refDemoEntity, refDemoEntityForm);
        
        
        
        // send date
        if (this.refDemoEntityForm.controls["date"].value instanceof Date) {
          let d: Date = this.refDemoEntityForm.controls["date"].value;
          if (d && typeof d != "string") {
            this.refDemoEntity.date = moment(d).format(
              this.nzDateConfig.dateTimeBackEnd
            );
          }
        }
        // send timer
        if (this.refDemoEntityForm.controls["timer"].value instanceof Date) {
          let d: Date = this.refDemoEntityForm.controls["timer"].value;
          if (d && typeof d != "string") {
            this.refDemoEntity.timer = moment(d).format(
              this.nzDateConfig.dateTimeBackEnd
            );
          }
        }
        //send checkbox
        this.refDemoEntity.parametres = this.convertFormCheckboxTodata(
          this.parametresList,
          this.refDemoEntityForm.controls["parametres"]
        );
        // send summernote
        if (this.refDemoEntityForm.controls["summernote"].value) {
          this.refDemoEntity.summernote = this.refDemoEntityForm.controls[
            "summernote"
          ].value.replace(new RegExp("<br>", "g"), "");
          
          
          this.refDemoEntity.summernote = this.refDemoEntity.summernote.replace(
            new RegExp("&amp;", "g"),
            "&"
          );
        }
        //send multiple
        this.refDemoEntity.refDemoEntitysSelected = [
          ...this.refDemoEntitysSelected,
        ];
        const subscription = this.refDemoEntityService
          .saveRefDemoEntity(this.refDemoEntity)
          .subscribe(
            (success) => {
              this.showInfo("common.message.create.info");
              if (saveAndQuit) {
                const id = success;
                if (this.M_RefDemoEntity_S.modeEcran == this.mode_ecran.ECRAN) {
                  this.router.navigate(["/referentiel/refDemoEntity/view", id]);
                } else {
                  this.M_RefDemoEntity_S.addRefDemoEntity(success);
                }
              }
              this.reset();
            },
            (error) => this.handleError(error)
          );
        this.subscription.add(subscription);
      } else {
        this.showUnauthorizedError();
      }
    }
  }

  validateFormRefDemoEntity(form) {
    this.detectInvalideFormControle(form);
  }

  reset() {
    this.refDemoEntityForm.reset({
      ordre: 1,
      actif: true,
    });
    this.resetValidateForm(this.refDemoEntityForm);
    this.init();
  }
  retour() {
    if (this.M_RefDemoEntity_S.modeEcran == this.mode_ecran.ECRAN) {
      this.router.navigate(["/referentiel/refDemoEntity/list"]);
    } else {
      this.M_RefDemoEntity_S.closeActionRefDemoEntity(true);
    }
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
    if(this.uploadModel.fileList && this.uploadModel.fileList.length>0){
      this.uploadModel.fileList.splice(index,1)
    }
  }
  // end upload 
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
