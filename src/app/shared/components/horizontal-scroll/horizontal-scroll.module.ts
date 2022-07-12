import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalScrollComponent } from './horizontal-scroll.component';
import { Custom_scroll_barDirective } from './custom_scroll_bar.directive';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  imports: [
    CommonModule,NzIconModule
  ],
  declarations: [HorizontalScrollComponent,Custom_scroll_barDirective],
  exports:[
    HorizontalScrollComponent,Custom_scroll_barDirective
  ]
})
export class HorizontalScrollModule { }
