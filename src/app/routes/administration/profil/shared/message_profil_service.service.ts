import { Injectable } from '@angular/core';  
import { Entity_action } from '@app/shared/enum/entity_action.enum';
import {   Mode_ecran } from '@app/shared/enum/mode_ecran.enum';

import {Observable, interval, Subject} from "rxjs"; 
@Injectable( )
export class Message_Profil_Service {
  
  modeEcran = Mode_ecran.DRAWER
  action_ecran = Entity_action.NONE

  brodcast: Subject<Send_Profil_Message>;
  lisner_brodcast_observable:Observable<Send_Profil_Message>;
  params: any;
  constructor( ) { 
    this.brodcast = new Subject<Send_Profil_Message>();
    this.lisner_brodcast_observable = this.brodcast.asObservable();
  }

  addProfil(object,saveAndNew?){ 
    let send :Send_Profil_Message =new Send_Profil_Message();
    if(saveAndNew)
    send.code = Code_Profil_Message.ADD_And_New_Profil; 
    if(!saveAndNew)
    send.code = Code_Profil_Message.ADD_Profil;
    send.object =object
    this.brodcast.next(send); 
  }
  editProfil(object){ 
    let send :Send_Profil_Message =new Send_Profil_Message();
    send.code = Code_Profil_Message.EDIT_Profil; 
    send.object =object
    this.brodcast.next(send); 
  }
  delProfil(object){ 
    let send :Send_Profil_Message =new Send_Profil_Message();
    send.code = Code_Profil_Message.DEL_Profil; 
    send.object =object
    this.brodcast.next(send); 
  }
  closeActionProfil(bool){ 
    let send :Send_Profil_Message =new Send_Profil_Message();
    send.code = Code_Profil_Message.CLOSE_Profil; 
    send.object =bool
    this.brodcast.next(send); 
  }
} 

export class Send_Profil_Message{
  code : string;
  object :any;
}
export enum Code_Profil_Message{
  //analyse
  ADD_Profil="ADD_Profil",
  DEL_Profil="DEL_Profil", 
  EDIT_Profil="EDIT_Profil", 
  VIEW_Profil="VIEW_Profil",  
  CLOSE_Profil="CLOSE_Profil",  
  ADD_And_New_Profil = "ADD_And_New_Profil",
}