import { Injectable } from '@angular/core';  
import { Entity_action } from '@app/shared/enum/entity_action.enum';
import {   Mode_ecran } from '@app/shared/enum/mode_ecran.enum';

import {Observable, interval, Subject} from "rxjs"; 
@Injectable( )
export class Message_RefDemoEntity_Service {
  
  modeEcran = Mode_ecran.DRAWER
  action_ecran = Entity_action.NONE

  brodcast: Subject<Send_RefDemoEntity_Message>;
  lisner_brodcast_observable:Observable<Send_RefDemoEntity_Message>;
  params: any;
  constructor( ) { 
    this.brodcast = new Subject<Send_RefDemoEntity_Message>();
    this.lisner_brodcast_observable = this.brodcast.asObservable();
  }

  addRefDemoEntity(object){ 
    let send :Send_RefDemoEntity_Message =new Send_RefDemoEntity_Message();
    send.code = Code_RefDemoEntity_Message.ADD_RefDemoEntity; 
    send.object =object
    this.brodcast.next(send); 
  }
  editRefDemoEntity(object){ 
    let send :Send_RefDemoEntity_Message =new Send_RefDemoEntity_Message();
    send.code = Code_RefDemoEntity_Message.EDIT_RefDemoEntity; 
    send.object =object
    this.brodcast.next(send); 
  }
  delRefDemoEntity(object){ 
    let send :Send_RefDemoEntity_Message =new Send_RefDemoEntity_Message();
    send.code = Code_RefDemoEntity_Message.DEL_RefDemoEntity; 
    send.object =object
    this.brodcast.next(send); 
  }
  closeActionRefDemoEntity(bool){ 
    let send :Send_RefDemoEntity_Message =new Send_RefDemoEntity_Message();
    send.code = Code_RefDemoEntity_Message.CLOSE_RefDemoEntity; 
    send.object =bool
    this.brodcast.next(send); 
  }
} 

export class Send_RefDemoEntity_Message{
  code : string;
  object :any;
}
export enum Code_RefDemoEntity_Message{
  //analyse
  ADD_RefDemoEntity="ADD_RefDemoEntity",
  DEL_RefDemoEntity="DEL_RefDemoEntity", 
  EDIT_RefDemoEntity="EDIT_RefDemoEntity", 
  VIEW_RefDemoEntity="VIEW_RefDemoEntity",  
  CLOSE_RefDemoEntity="CLOSE_RefDemoEntity",  
}