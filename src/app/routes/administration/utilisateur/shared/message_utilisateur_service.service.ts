import { Injectable } from '@angular/core';  
import { Entity_action } from '@app/shared/enum/entity_action.enum';
import {   Mode_ecran } from '@app/shared/enum/mode_ecran.enum';

import {Observable, interval, Subject} from "rxjs"; 
@Injectable( )
export class Message_Utilisateur_Service {
  
  modeEcran = Mode_ecran.DRAWER
  action_ecran = Entity_action.NONE

  brodcast: Subject<Send_Utilisateur_Message>;
  lisner_brodcast_observable:Observable<Send_Utilisateur_Message>;
  params: any;
  constructor( ) { 
    this.brodcast = new Subject<Send_Utilisateur_Message>();
    this.lisner_brodcast_observable = this.brodcast.asObservable();
  }

  addUtilisateur(object,saveAndNew?){ 
    let send :Send_Utilisateur_Message =new Send_Utilisateur_Message();
    if(saveAndNew)
    send.code = Code_Utilisateur_Message.ADD_And_New_Utilisateur; 
    if(!saveAndNew)
    send.code = Code_Utilisateur_Message.ADD_Utilisateur; 
    send.object =object
    this.brodcast.next(send); 
  }
  editUtilisateur(object){ 
    let send :Send_Utilisateur_Message =new Send_Utilisateur_Message();
    send.code = Code_Utilisateur_Message.EDIT_Utilisateur; 
    send.object =object
    this.brodcast.next(send); 
  }
  delUtilisateur(object){ 
    let send :Send_Utilisateur_Message =new Send_Utilisateur_Message();
    send.code = Code_Utilisateur_Message.DEL_Utilisateur; 
    send.object =object
    this.brodcast.next(send); 
  }
  closeActionUtilisateur(bool){ 
    let send :Send_Utilisateur_Message =new Send_Utilisateur_Message();
    send.code = Code_Utilisateur_Message.CLOSE_Utilisateur; 
    send.object =bool
    this.brodcast.next(send); 
  }
} 

export class Send_Utilisateur_Message{
  code : string;
  object :any;
}
export enum Code_Utilisateur_Message{
  //analyse
  ADD_Utilisateur="ADD_Utilisateur",
  DEL_Utilisateur="DEL_Utilisateur", 
  EDIT_Utilisateur="EDIT_Utilisateur", 
  VIEW_Utilisateur="VIEW_Utilisateur",  
  CLOSE_Utilisateur="CLOSE_Utilisateur",  
  ADD_And_New_Utilisateur = "ADD_And_New_Utilisateur",
}