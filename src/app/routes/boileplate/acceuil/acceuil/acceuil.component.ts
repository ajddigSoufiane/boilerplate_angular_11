import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import * as moment from 'moment';
import { Subscription } from "rxjs/Subscription";
import {BaseComponent} from '@components';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"; 
import { Menu,  Referentiel } from "@app/routes/menu";

@Component({
    selector: 'app-acceuil',
    templateUrl: './acceuil.component.html',
    styleUrls: ['./acceuil.component.scss'],
	encapsulation: ViewEncapsulation.None    
})
export class AcceuilComponent extends BaseComponent implements OnInit, OnDestroy {
    menuItems: { id: string; text: string; icon?: string; link: string; categories: string[]; level: number; submenu: { text: string; icon?: string; link: string; roles: string[]; level: number; }[]; }[];
  menuFavorisItems: { id: string; text: string; icon?: string; link: string; img: string; categories: string[]; level: number; submenu: { text: string; icon?: string; link: string; roles: string[]; level: number; }[]; }[];
  filteredOptions:any[];
   menuAllItem=[...Menu.submenu,Referentiel];
  
    constructor( private fb: FormBuilder ) {
        super();
        
    }
    
    ngOnInit() {
      this.menuItems = Menu.submenu; 

        this.filteredOptions =  []
        
      
    }

    onChange(value: string): void { 
      this.filteredOptions =   this.menuAllItem.filter(option => {
        if(this.inputValue=="" || this.inputValue==null){
          return false
        }else{
          return option.text.toLowerCase().indexOf(this.inputValue.toLowerCase()) !== -1
        }
        
       });
       this.filteredOptions.push(...Referentiel.submenu.filter(option => { 
        if(this.inputValue=="" || this.inputValue==null){
          return false
        }else{
          return option.text.toLowerCase().indexOf(this.inputValue.toLowerCase()) !== -1
        }
        
       }) );
    }
  
    init(){
    	 
    }  
    
    initData(){
	 
    }      
    inputValue?: string;
  optionGroups: AutocompleteOptionGroups[] = [];

 	public ngOnDestroy() {
 
    }

}

export interface AutocompleteOptionGroups {
  text: string;
  count?: number;
  submenu?: AutocompleteOptionGroups[];
  link?:any;
}