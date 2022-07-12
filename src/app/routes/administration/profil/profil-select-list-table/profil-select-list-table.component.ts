import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';   
import { BaseComponent } from '@app/shared/components';
import { BusinessModel } from '@app/shared/models';
import { ProfilService } from '@app/shared/services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profil-select-list-table',
  templateUrl: './profil-select-list-table.component.html',
  styleUrls: ['./profil-select-list-table.component.scss']
})
export class ProfilSelectListTableComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() profilListSelected: EventEmitter<any> = new EventEmitter();
  @Output() removeDomaineFromSelectedList: EventEmitter<any> = new EventEmitter();
  @Input() profilList: BusinessModel[] = [];
  @Input() readOnly: boolean; 
  loading:boolean;
  private allProfilList: BusinessModel[] = [];
  private checkAll: boolean;
  private nameFilter: string;
  private subscription: Subscription = new Subscription();
  // Access to Modal 
  profilModal :boolean;  
  formGroupFilter: FormGroup;
  total: number;
	
  constructor(private profilService:ProfilService,private fb: FormBuilder) {
    super();
    this.createForm()
  }

  ngOnInit() {
    this.loadProfilList();
    
  }

  
  createForm() {
    this.formGroupFilter = this.fb.group({  
      code: [ '' ],
			libelle: [ '' ],
			description: [ '' ],
			actif: [ true ]
      })
  }
  reset() {
    this.formGroupFilter.reset({ libelle: '', code: '' });
    this.profilList = [];
  }
  changeFormValue(){
    this.formGroupFilter.valueChanges.subscribe((form)=>{

    })
  }
  public loadProfilList() {
    let criteria = {listName:"allTarifSupplementaireChoixList"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
       
    
    
  }
   
  
  addProfilSelected(): void {
 
    if (!this.profilList) {
      this.profilList = [];
    }
    if (this.allProfilList) {
      for (let profil of this.allProfilList) {
        if (profil.selectedObject) {
          profil.selectedObject = false;
          let index = this.profilList.findIndex(element => element.id === profil.id);
          if (index < 0) {
            this.profilList= this.updateList(this.profilList,profil);
          }
        }
      }
      this.nameFilter = '';
      this.removeSelected('allProfilList','profilList');
      this.profilListSelected.emit(this.profilList);
    }
  
  }
 
  
  removeSelected(namelistAll,nameListSelected): void {
    for (let profil of this[nameListSelected]) {
      let index = this[namelistAll].findIndex(element => element.id === profil.id);
      if (index > -1) {
        this[namelistAll].splice(index, 1);
      }
    }
  }
  public removeOneItem(item: any,listName,emit=true,emitName) {
    
   
    this.profilList = this[listName].filter(d => d.id !== item.id);
    
    if(emit)
      this[emitName].emit({id: item.id, list: this.profilList});
    else 
      return item;
  }
   
  public removeAlltem(listName='profilList',emitName ="removeDomaineFromSelectedList") {
      
    let profilList : any[]= this.profilList.filter(d => d.selectedObject == true);
 

    for (const item of profilList) {
      this.removeOneItem(item,listName,false,emitName) 
    }
  
    this[emitName].emit({id: null, list: this.profilList , item:profilList});
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
  closeProfilModalView() { 
    this.profilModal= false;
  }
  openProfilModalView() { 
      this.profilModal= true; 
  }
  public ngOnDestroy() {

    this.reset();
    this.subscription.unsubscribe();
  }
}
