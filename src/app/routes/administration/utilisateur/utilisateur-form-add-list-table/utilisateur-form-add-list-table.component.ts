import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';   
import { BaseComponent } from '@app/shared/components';
import { BusinessModel, Utilisateur } from '@app/shared/models';
import { UtilisateurService } from '@app/shared/services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-utilisateur-form-add-list-table',
  templateUrl: './utilisateur-form-add-list-table.component.html',
  styleUrls: ['./utilisateur-form-add-list-table.component.scss']
})
export class UtilisateurFormAddTableComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() utilisateurListSelected: EventEmitter<any> = new EventEmitter();
  @Output() removeDomaineFromSelectedList: EventEmitter<any> = new EventEmitter();
  utilisateurList: any[] = [];
  @Input() readOnly: boolean;  
  @Input('idItem') 
  set _idItem(value){
    this.idItem =value;
    if(this.idItem)
    this.loadUtilisateurList(); 
  } 
  idItem: number; 
  loading:boolean;
  private allUtilisateurList: any[] = [];
  private checkAll: boolean;
  private nameFilter: string;
  private subscription: Subscription = new Subscription(); 
  total: number; 
  editCache: { [key: string]: { edit: boolean; data: Utilisateur } } = {};
 
  constructor(private utilisateurService:UtilisateurService,private fb: FormBuilder) {
    super(); 
  }

  ngOnInit() {
  
  }

  
  
  //reset 
  loadUtilisateurList() {
    if(this.idItem){
      let criteria = {listName:"allTarifSupplementaireChoixList"}
      
      
      
      
      
      
      
      
      
        
      
        
      
      
    }
  }
  addCollection(list:any[]){
    this.utilisateurList=list;
    if(this.utilisateurList && this.utilisateurList.length>0){
      this.utilisateurList.map(a=>{
        a.id_=a.id
      return  a
      })
      this.updateEditCache();
      this.total= this.utilisateurList.length;
    } 
  }
  addRow(): void {
    let i = this.utilisateurList.length;
    let obj = new Utilisateur();
    
    
    this.utilisateurList = [
      obj,
      ...this.utilisateurList
    ];
    this.updateEditCache();
    
  }
 
  removeSelected(namelistAll,nameListSelected): void {
    for (let utilisateur of this[nameListSelected]) {
      let index = this[namelistAll].findIndex(element => element.id_ === utilisateur.id_);
      if (index > -1) {
        this[namelistAll].splice(index, 1);
      }
    }
  }
  
   
 
  hasSelectElement=(listName)=>{
    return this[listName].findIndex(d => d.selectedObject == true)!=-1
  }
  selectOrDeselectAll(event, utilisateurList: Array<BusinessModel>) {
   
    for (let utilisateur of utilisateurList) {
      utilisateur.selectedObject = event;
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
    const index = this.utilisateurList.findIndex(item => item.id_ === id_);
    this.editCache[id_] = {
      data: { ...this.utilisateurList[index] },
      edit: false
    };
    
    
    
  }

  saveEdit(id_: string): void {
    const index = this.utilisateurList.findIndex(item => item.id_ === id_);
    
    Object.assign(this.utilisateurList[index], this.editCache[id_].data);
    this.editCache[id_].edit = false;
    this.utilisateurListSelected.emit(this.utilisateurList)
  }

  updateEditCache(): void {
    this.utilisateurList.forEach(item => {
      this.editCache[item.id_] = {
        edit: false,
        data: { ...item }
      };
    });
  }

 
  
  deleteRow(id_: any): void {  
    this.utilisateurList = this.utilisateurList.filter(d => (  d.id_ != id_));
    this.updateEditCache();
  }
  deletAllRow(listName='utilisateurList',emitName ="removeDomaineFromSelectedList") {
      
    let utilisateurDeleteList= this[listName].filter(d => d.selectedObject == true);
    this[listName]= this[listName].filter(d => d.selectedObject != true); 
    this.updateEditCache();
    this[emitName].emit({id: null, list: this[listName] , item:utilisateurDeleteList});
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
