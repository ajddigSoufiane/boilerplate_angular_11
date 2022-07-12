import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MenuService {

    menuItems: Array<any>;
    menuSubject: Subject<void>;
    lisner_menu_observable: Observable<void>;

    constructor() {
        this.menuItems = [];
        this.menuSubject = new Subject<void>();
        this.lisner_menu_observable = this.menuSubject.asObservable();
    }

    addMenu(items: Array<any>) {
        
            this.menuItems = items
       
        
        
        
        
        


        this.menuSubject.next();
    }

    getMenu() {
        return this.menuItems;
    }



    getMenuByModuleId(id: string) {
        return this.menuItems.filter(x => x.id == id);
    }

}

export class Send_Menu_Espace {
    code: string;
    object: any;
}
