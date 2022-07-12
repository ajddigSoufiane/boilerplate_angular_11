import { Injectable } from '@angular/core';  
import { Entity_action } from '@app/shared/enum/entity_action.enum';
import {   Mode_ecran } from '@app/shared/enum/mode_ecran.enum';

import {Observable, interval, Subject} from "rxjs"; 
@Injectable( )
export class Message_Service_Service {
  
  modeEcran = Mode_ecran.DRAWER
  action_ecran = Entity_action.NONE

  brodcast: Subject<Send_Service_Message>;
  lisner_brodcast_observable:Observable<Send_Service_Message>;
  params: any;
  constructor( ) { 
    this.brodcast = new Subject<Send_Service_Message>();
    this.lisner_brodcast_observable = this.brodcast.asObservable();
  }

  addService(object){ 
    let send :Send_Service_Message =new Send_Service_Message();
    send.code = Code_Service_Message.ADD_Service; 
    send.object =object
    this.brodcast.next(send); 
  }
  editService(object){ 
    let send :Send_Service_Message =new Send_Service_Message();
    send.code = Code_Service_Message.EDIT_Service; 
    send.object =object
    this.brodcast.next(send); 
  }
  delService(object){ 
    let send :Send_Service_Message =new Send_Service_Message();
    send.code = Code_Service_Message.DEL_Service; 
    send.object =object
    this.brodcast.next(send); 
  }
  closeActionService(bool){ 
    let send :Send_Service_Message =new Send_Service_Message();
    send.code = Code_Service_Message.CLOSE_Service; 
    send.object =bool
    this.brodcast.next(send); 
  }
} 

export class Send_Service_Message{
  code : string;
  object :any;
}
export enum Code_Service_Message{
  //analyse
  ADD_Service="ADD_Service",
  DEL_Service="DEL_Service", 
  EDIT_Service="EDIT_Service", 
  VIEW_Service="VIEW_Service",  
  CLOSE_Service="CLOSE_Service",  
}