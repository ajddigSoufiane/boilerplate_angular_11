import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';   
import { BaseComponent } from '@app/shared/components';
import { BusinessModel } from '@app/shared/models';
import { RefDemoEntityService } from '@app/shared/services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ref-demo-entity-select-list-table',
  templateUrl: './ref-demo-entity-select-list-table.component.html',
  styleUrls: ['./ref-demo-entity-select-list-table.component.scss']
})
export class RefDemoEntitySelectListTableComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() refDemoEntityListSelected: EventEmitter<any> = new EventEmitter();
  @Output() removeDomaineFromSelectedList: EventEmitter<any> = new EventEmitter();
  @Input() refDemoEntityList: BusinessModel[] = [];
  @Input() readOnly: boolean; 
  loading:boolean;
  private allRefDemoEntityList: BusinessModel[] = [];
  private checkAll: boolean;
  private nameFilter: string;
  private subscription: Subscription = new Subscription();
  // Access to Modal 
  refDemoEntityModal :boolean;  
  formGroupFilter: FormGroup;
  total: number;
	
  constructor(private refDemoEntityService:RefDemoEntityService,private fb: FormBuilder) {
    super();
    this.createForm()
  }

  ngOnInit() {
    this.loadRefDemoEntityList();
    
  }

  
  createForm() {
    this.formGroupFilter = this.fb.group({  
      'code': [''],
      'libelle': ['']
      })
  }
  reset() {
    this.formGroupFilter.reset({ libelle: '', code: '' });
    this.refDemoEntityList = [];
  }
  changeFormValue(){
    this.formGroupFilter.valueChanges.subscribe((form)=>{

    })
  }
  public loadRefDemoEntityList() {
    let criteria = {listName:"allTarifSupplementaireChoixList"}
    const subscription = this.refDemoEntityService.getList(criteria)
      .subscribe(list => {
        //juste for test
        if (list && list[criteria.listName].length > 0) {
          list = list[criteria.listName]; 
        }else{
          list=[];
        }
        this.allRefDemoEntityList = list; 
        if (this.allRefDemoEntityList && this.refDemoEntityList) {
          for (let refDemoEntity of this.refDemoEntityList) {
            let index = this.allRefDemoEntityList.findIndex(element => element.id === refDemoEntity.id);
            if (index > -1) {
              this.allRefDemoEntityList.splice(index, 1);
            }
          }
        }
        this.total= this.allRefDemoEntityList.length
       
      }, error => this.handleError(error));
    this.subscription.add(subscription);
  }
   
  
  addRefDemoEntitySelected(): void {
 
    if (!this.refDemoEntityList) {
      this.refDemoEntityList = [];
    }
    if (this.allRefDemoEntityList) {
      for (let refDemoEntity of this.allRefDemoEntityList) {
        if (refDemoEntity.selectedObject) {
          refDemoEntity.selectedObject = false;
          let index = this.refDemoEntityList.findIndex(element => element.id === refDemoEntity.id);
          if (index < 0) {
            this.refDemoEntityList= this.updateList(this.refDemoEntityList,refDemoEntity);
          }
        }
      }
      this.nameFilter = '';
      this.removeSelected('allRefDemoEntityList','refDemoEntityList');
      this.refDemoEntityListSelected.emit(this.refDemoEntityList);
    }
  
  }
 
  
  removeSelected(namelistAll,nameListSelected): void {
    for (let refDemoEntity of this[nameListSelected]) {
      let index = this[namelistAll].findIndex(element => element.id === refDemoEntity.id);
      if (index > -1) {
        this[namelistAll].splice(index, 1);
      }
    }
  }
  public removeOneItem(item: any,listName,emit=true,emitName) {
    
   
    this.refDemoEntityList = this[listName].filter(d => d.id !== item.id);
    
    if(emit)
      this[emitName].emit({id: item.id, list: this.refDemoEntityList});
    else 
      return item;
  }
   
  public removeAlltem(listName='refDemoEntityList',emitName ="removeDomaineFromSelectedList") {
      
    let refDemoEntityList : any[]= this.refDemoEntityList.filter(d => d.selectedObject == true);
 

    for (const item of refDemoEntityList) {
      this.removeOneItem(item,listName,false,emitName) 
    }
  
    this[emitName].emit({id: null, list: this.refDemoEntityList , item:refDemoEntityList});
  }
  hasSelectElement=(listName)=>{
    return this[listName].findIndex(d => d.selectedObject == true)!=-1
  }
  selectOrDeselectAll(event, refDemoEntityList: Array<BusinessModel>) {
   
    for (let refDemoEntity of refDemoEntityList) {
      refDemoEntity.selectedObject = event;
    }
  }
 
  isCheckAll(list:any[]){
    if(list && list.length>0){
        let deSelect:any[] = list.filter(a=>a.selectedObject==true);
        return deSelect.length==list.length? true : false;
    }else{
        return false;
    }
  }
  closeRefDemoEntityModalView() { 
    this.refDemoEntityModal= false;
  }
  openRefDemoEntityModalView() { 
      this.refDemoEntityModal= true; 
  }
  public ngOnDestroy() {

    this.reset();
    this.subscription.unsubscribe();
  }
}
