/**
 * @author Amine Nargis
 * @description : A simple and easy to use confirmation modal, where you can customize it the way you want.  
 */
import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Subject } from "rxjs"; 
import { ModalParams } from './modal-params.model';
import { USER_CHOICE } from './user-choice.enum';
@Injectable({
  providedIn: 'root'
})
export class NzConfimModalService {

  modalParams: ModalParams;
  responseConfirm: Subject<any>;
  constructor(private modal: NzModalService) {
    this.responseConfirm = new Subject<any>();
  }
  /**
   * @author soufiane ajddig
   * @function get service of  modal
   */
  get _modal(){
    return this.modal;
  }
  /**
   * @author Amine Nargis
   * @param modalParams : If you want to customize the modal Just initialize it,and pass the params that you would like to change.
   * @param modalParams.title : Modal title.
   * @param modalParams.message : Confirmation message.
   */
  confirmation(modalParams?: ModalParams): void {
    if (modalParams) 
    this.modal.confirm({
      nzTitle:  modalParams.title,
      nzContent:  modalParams.message,
      nzOkText: modalParams.nzOkText,
      nzOnOk: () => this.responseConfirm.next(USER_CHOICE.YES),
      nzCancelText: modalParams.nzCancelText,
      nzOnCancel: () => {
        this.modal.closeAll();
      }
    });
  }
  reset(){
    this._modal.closeAll();
    this.responseConfirm = new Subject<any>();
  }
}
