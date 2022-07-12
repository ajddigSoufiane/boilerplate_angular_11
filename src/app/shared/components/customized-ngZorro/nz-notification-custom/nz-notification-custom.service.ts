 
import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal'; 
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject } from "rxjs"; 
import { TYPE_NOTIFICATION } from './type_notification.enum';
@Injectable({
  providedIn: 'root'
})
export class NzNotificationCustomService {

   
  constructor(private nzNotificationService:NzNotificationService) { 
  }
  
  showNotification(type:TYPE_NOTIFICATION,title:string,body:string,classCss?:string,nzDuration?:number){
   this.nzNotificationService.create(type.toString(),body, title ,{   
        nzClass:( (classCss)? classCss : 'notification_'+type ) ,
        nzDuration: (nzDuration!=undefined)? nzDuration : 3000
    })
    if(TYPE_NOTIFICATION.ERROR == type){
      let elements = document.getElementsByClassName("ant-notification-notice-with-icon") ;
 
      for(let i=0;i<elements.length;i++){
        let icon = elements[i].getElementsByClassName("anticon-close-circle")[0];
        if(icon){
          let tagI = document.createElement("i");
          tagI.setAttribute('class',"ant-notification-notice-icon fas fa-exclamation-triangle  notification_icon_error")
          icon.parentNode.prepend(tagI)
          icon.parentNode.removeChild(icon);
        }
      }

    }
  }
}

