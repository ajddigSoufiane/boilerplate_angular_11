import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';   
import { BaseComponent } from '@app/shared/components';
import { BusinessModel } from '@app/shared/models';
import { UtilisateurService } from '@app/shared/services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-utilisateur-select-list-table',
  templateUrl: './utilisateur-select-list-table.component.html',
  styleUrls: ['./utilisateur-select-list-table.component.scss']
})
export class UtilisateurSelectListTableComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() utilisateurListSelected: EventEmitter<any> = new EventEmitter();
  @Output() removeDomaineFromSelectedList: EventEmitter<any> = new EventEmitter();
  @Input() utilisateurList: BusinessModel[] = [];
  @Input() readOnly: boolean; 
  loading:boolean;
  private allUtilisateurList: BusinessModel[] = [];
  private checkAll: boolean;
  private nameFilter: string;
  private subscription: Subscription = new Subscription();
  // Access to Modal 
  utilisateurModal :boolean;  
  formGroupFilter: FormGroup;
  total: number;
	
  constructor(private utilisateurService:UtilisateurService,private fb: FormBuilder) {
    super();
    this.createForm()
  }

  ngOnInit() {
    this.loadUtilisateurList();
    
  }

  
  createForm() {
    this.formGroupFilter = this.fb.group({  
      prenom: [''], 
      nom:[''],
      cin: [''],
      adresse: [''],
      email: [''],
      })
  }
  reset() {
    this.formGroupFilter.reset({ libelle: '', code: '' });
    this.utilisateurList = [];
  }
  changeFormValue(){
    this.formGroupFilter.valueChanges.subscribe((form)=>{

    })
  }
  public loadUtilisateurList() {
    let criteria = {listName:"allTarifSupplementaireChoixList"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
       
    
    
  }
   
  
  addUtilisateurSelected(): void {
 
    if (!this.utilisateurList) {
      this.utilisateurList = [];
    }
    if (this.allUtilisateurList) {
      for (let utilisateur of this.allUtilisateurList) {
        if (utilisateur.selectedObject) {
          utilisateur.selectedObject = false;
          let index = this.utilisateurList.findIndex(element => element.id === utilisateur.id);
          if (index < 0) {
            this.utilisateurList= this.updateList(this.utilisateurList,utilisateur);
          }
        }
      }
      this.nameFilter = '';
      this.removeSelected('allUtilisateurList','utilisateurList');
      this.utilisateurListSelected.emit(this.utilisateurList);
    }
  
  }
 
  
  removeSelected(namelistAll,nameListSelected): void {
    for (let utilisateur of this[nameListSelected]) {
      let index = this[namelistAll].findIndex(element => element.id === utilisateur.id);
      if (index > -1) {
        this[namelistAll].splice(index, 1);
      }
    }
  }
  public removeOneItem(item: any,listName,emit=true,emitName) {
    
   
    this.utilisateurList = this[listName].filter(d => d.id !== item.id);
    
    if(emit)
      this[emitName].emit({id: item.id, list: this.utilisateurList});
    else 
      return item;
  }
   
  public removeAlltem(listName='utilisateurList',emitName ="removeDomaineFromSelectedList") {
      
    let utilisateurList : any[]= this.utilisateurList.filter(d => d.selectedObject == true);
 

    for (const item of utilisateurList) {
      this.removeOneItem(item,listName,false,emitName) 
    }
  
    this[emitName].emit({id: null, list: this.utilisateurList , item:utilisateurList});
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
  closeUtilisateurModalView() { 
    this.utilisateurModal= false;
  }
  openUtilisateurModalView() { 
      this.utilisateurModal= true; 
  }
  public ngOnDestroy() {

    this.reset();
    this.subscription.unsubscribe();
  }
}
