import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';   
import { BaseComponent } from '@app/shared/components';
import { BusinessModel, Profil } from '@app/shared/models';
import { ProfilService } from '@app/shared/services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profil-form-add-list-table',
  templateUrl: './profil-form-add-list-table.component.html',
  styleUrls: ['./profil-form-add-list-table.component.scss']
})
export class ProfilFormAddTableComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() profilListSelected: EventEmitter<any> = new EventEmitter();
  @Output() removeDomaineFromSelectedList: EventEmitter<any> = new EventEmitter();
  profilList: any[] = [];
  @Input() readOnly: boolean;  
  @Input('idItem') 
  set _idItem(value){
    this.idItem =value;
    if(this.idItem)
    this.loadProfilList(); 
  } 
  idItem: number; 
  loading:boolean;
  private allProfilList: any[] = [];
  private checkAll: boolean;
  private nameFilter: string;
  private subscription: Subscription = new Subscription(); 
  total: number; 
  editCache: { [key: string]: { edit: boolean; data: Profil } } = {};
 
  constructor(private profilService:ProfilService,private fb: FormBuilder) {
    super(); 
  }

  ngOnInit() {
  
  }

  
  
  //reset 
  loadProfilList() {
    if(this.idItem){
      let criteria = {listName:"allTarifSupplementaireChoixList"}
      
      
      
      
      
      
      
      
      
        
      
        
      
      
    }
  }
  addCollection(list:any[]){
    this.profilList=list;
    if(this.profilList && this.profilList.length>0){
      this.profilList.map(a=>{
        a.id_=a.id
      return  a
      })
      this.updateEditCache();
      this.total= this.profilList.length;
    } 
  }
  addRow(): void {
    let i = this.profilList.length;
    let obj = new Profil();
    
    
    this.profilList = [
      obj,
      ...this.profilList
    ];
    this.updateEditCache();
    
  }
 
  removeSelected(namelistAll,nameListSelected): void {
    for (let profil of this[nameListSelected]) {
      let index = this[namelistAll].findIndex(element => element.id_ === profil.id_);
      if (index > -1) {
        this[namelistAll].splice(index, 1);
      }
    }
  }
  
   
 
  hasSelectElement=(listName)=>{
    return this[listName].findIndex(d => d.selectedObject == true)!=-1
  }
  selectOrDeselectAll(event, profilList: Array<BusinessModel>) {
   
    for (let profil of profilList) {
      profil.selectedObject = event;
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
    const index = this.profilList.findIndex(item => item.id_ === id_);
    this.editCache[id_] = {
      data: { ...this.profilList[index] },
      edit: false
    };
    
    
    
  }

  saveEdit(id_: string): void {
    const index = this.profilList.findIndex(item => item.id_ === id_);
    
    Object.assign(this.profilList[index], this.editCache[id_].data);
    this.editCache[id_].edit = false;
    this.profilListSelected.emit(this.profilList)
  }

  updateEditCache(): void {
    this.profilList.forEach(item => {
      this.editCache[item.id_] = {
        edit: false,
        data: { ...item }
      };
    });
  }

 
  
  deleteRow(id_: any): void {  
    this.profilList = this.profilList.filter(d => (  d.id_ != id_));
    this.updateEditCache();
  }
  deletAllRow(listName='profilList',emitName ="removeDomaineFromSelectedList") {
      
    let profilDeleteList= this[listName].filter(d => d.selectedObject == true);
    this[listName]= this[listName].filter(d => d.selectedObject != true); 
    this.updateEditCache();
    this[emitName].emit({id: null, list: this[listName] , item:profilDeleteList});
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
