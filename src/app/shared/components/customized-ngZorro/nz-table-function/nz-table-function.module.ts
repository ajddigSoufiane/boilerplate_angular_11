import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableDropdownFilterComponent } from './nz-table-dropdown-filter/nz-table-dropdown-filter.component';
@NgModule({
  imports: [
    CommonModule,NzIconModule
  ],
  declarations: [NzTableDropdownFilterComponent],
  exports:[
    NzTableDropdownFilterComponent
  ]
})
export class NzTableDropdownFilterModule { }
