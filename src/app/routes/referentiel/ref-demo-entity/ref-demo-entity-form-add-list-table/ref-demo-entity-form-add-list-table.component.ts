import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';   
import { BaseComponent } from '@app/shared/components';
import { BusinessModel, RefDemoEntity } from '@app/shared/models';
import { RefDemoEntityService } from '@app/shared/services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ref-demo-entity-form-add-list-table',
  templateUrl: './ref-demo-entity-form-add-list-table.component.html',
  styleUrls: ['./ref-demo-entity-form-add-list-table.component.scss']
})
export class RefDemoEntityFormAddTableComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() refDemoEntityListSelected: EventEmitter<any> = new EventEmitter();
  @Output() removeDomaineFromSelectedList: EventEmitter<any> = new EventEmitter();
  refDemoEntityList: any[] = [];
  @Input() readOnly: boolean;  
  @Input('idItem') 
  set _idItem(value){
    this.idItem =value;
    if(this.idItem)
    this.loadRefDemoEntityList(); 
  } 
  idItem: number; 
  loading:boolean;
  private allRefDemoEntityList: any[] = [];
  private checkAll: boolean;
  private nameFilter: string;
  private subscription: Subscription = new Subscription(); 
  total: number; 
  editCache: { [key: string]: { edit: boolean; data: RefDemoEntity } } = {};
 
  constructor(private refDemoEntityService:RefDemoEntityService,private fb: FormBuilder) {
    super(); 
  }

  ngOnInit() {
  
  }

  
  
  //reset 
  loadRefDemoEntityList() {
    if(this.idItem){
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
        
        this.addCollection(this.allRefDemoEntityList)
        
        }, error => this.handleError(error));
      this.subscription.add(subscription);
    }
  }
  addCollection(list:any[]){
    this.refDemoEntityList=list;
    if(this.refDemoEntityList && this.refDemoEntityList.length>0){
      this.refDemoEntityList.map(a=>{
        a.id_=a.id
      return  a
      })
      this.updateEditCache();
      this.total= this.refDemoEntityList.length;
    } 
  }
  addRow(): void {
    let i = this.refDemoEntityList.length;
    let obj = new RefDemoEntity();
    obj.id_= this.generateId()
    obj.add= true;
    this.refDemoEntityList = [
      obj,
      ...this.refDemoEntityList
    ];
    this.updateEditCache();
    this.startEdit(`${obj.id_}`)
  }
 
  removeSelected(namelistAll,nameListSelected): void {
    for (let refDemoEntity of this[nameListSelected]) {
      let index = this[namelistAll].findIndex(element => element.id_ === refDemoEntity.id_);
      if (index > -1) {
        this[namelistAll].splice(index, 1);
      }
    }
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
  startEdit(id_: string): void {
    this.editCache[id_].edit = true;
  }

  cancelEdit(id_: string): void {
    const index = this.refDemoEntityList.findIndex(item => item.id_ === id_);
    this.editCache[id_] = {
      data: { ...this.refDemoEntityList[index] },
      edit: false
    };
    if(this.editCache[id_].data.add == true){
      this.deleteRow(id_)
    }
  }

  saveEdit(id_: string): void {
    const index = this.refDemoEntityList.findIndex(item => item.id_ === id_);
    this.editCache[id_].data.add=false
    Object.assign(this.refDemoEntityList[index], this.editCache[id_].data);
    this.editCache[id_].edit = false;
    this.refDemoEntityListSelected.emit(this.refDemoEntityList)
  }

  updateEditCache(): void {
    this.refDemoEntityList.forEach(item => {
      this.editCache[item.id_] = {
        edit: false,
        data: { ...item }
      };
    });
  }

 
  
  deleteRow(id_: any): void {  
    this.refDemoEntityList = this.refDemoEntityList.filter(d => (  d.id_ != id_));
    this.updateEditCache();
  }
  deletAllRow(listName='refDemoEntityList',emitName ="removeDomaineFromSelectedList") {
      
    let refDemoEntityDeleteList= this[listName].filter(d => d.selectedObject == true);
    this[listName]= this[listName].filter(d => d.selectedObject != true); 
    this.updateEditCache();
    this[emitName].emit({id: null, list: this[listName] , item:refDemoEntityDeleteList});
  }
  generateId():string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  public ngOnDestroy() {
 
    this.subscription.unsubscribe();
  }

}
