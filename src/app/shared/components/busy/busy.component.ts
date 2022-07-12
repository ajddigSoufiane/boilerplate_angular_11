import { Component, Input, OnChanges } from '@angular/core';


@Component({
  selector: 'busy',
  templateUrl: 'busy.component.html',
})
export class BusyComponent implements OnChanges {
  @Input('Busy-Etat')
  etat: any;
  @Input('templet-loding')
  templet_loding: any = `<div class="loader-cercle"></div>`;

  constructor() {
  }

  ngOnChanges(changes) {
    if (this.etat) {
      this.addBusy();
    } else {
      this.removeBusy();
    }
  }

  removeBusy() {
    const a = document.getElementById('busy');
    if (a) {
      a.remove();
    }
  }

  addBusy() {
    const element = document.createElement('div');
    element.innerHTML = `<div class="fullscreen">${this.templet_loding}</div>`;
    element.id = 'busy';
    document.getElementsByTagName('body')[0].appendChild(element);
  }

}
