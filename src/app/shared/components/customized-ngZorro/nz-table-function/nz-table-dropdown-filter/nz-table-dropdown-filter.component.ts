import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nz-table-dropdown-filter',
  templateUrl: './nz-table-dropdown-filter.component.html',
  styleUrls: ['./nz-table-dropdown-filter.component.scss']
})
export class NzTableDropdownFilterComponent implements OnInit {
  @Input("nzNameSearch") nzNameSearch;
  @Input("nzNameReset") nzNameReset;
  @Output("nzSearch") search: EventEmitter<any> = new EventEmitter();
  @Output("nzReset") reset: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  actionSearch(){
    this.search.emit()
  }
  actionReset(){
    this.reset.emit()
  }
}
