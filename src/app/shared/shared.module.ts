import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { NzListModule } from 'ng-zorro-antd/list';
// import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
// import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { PaginationModule } from 'ngx-bootstrap/pagination';
// import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
// import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
// import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FlotDirective } from './directives/flot/flot.directive';
import { SparklineDirective } from './directives/sparkline/sparkline.directive';
import { EasypiechartDirective } from './directives/easypiechart/easypiechart.directive';
import { ColorsService } from './colors/colors.service';
import { CheckallDirective } from './directives/checkall/checkall.directive';
import { VectormapDirective } from './directives/vectormap/vectormap.directive';
import { NowDirective } from './directives/now/now.directive';
import { ScrollableDirective } from './directives/scrollable/scrollable.directive';
import { JqcloudDirective } from './directives/jqcloud/jqcloud.directive';
import { ToastrModule } from 'ngx-toastr';
import { BusyModule } from '@shared/components/busy/busy.module';
import { TraceModule } from '@shared/components/trace/trace.module';
import { DebounceClickDirective } from '@shared/directives/debounce/debounce-click.directive';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NzResultModule } from 'ng-zorro-antd/result';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table'; 
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select'; 
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NgxSummernoteModule } from 'ngx-summernote';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { HorizontalScrollModule } from './components/horizontal-scroll/horizontal-scroll.module';
import { NzTableDropdownFilterModule } from './components/customized-ngZorro/nz-table-function/nz-table-function.module';
import { NzCalendarModule } from "ng-zorro-antd/calendar";
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'; // a plugin
// import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'; // a plugin
import { NzProgressModule } from "ng-zorro-antd/progress";
import { NzWeekendModule } from './components/nz-weekend/nz-weekend.module';
FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    interactionPlugin,
    resourceTimelinePlugin,
    // resourceTimeGridPlugin,
])

// https://angular.io/styleguide#!#04-10
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    // AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    // CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    // DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    // PaginationModule.forRoot(),
    // ProgressbarModule.forRoot(),
    // RatingModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    HorizontalScrollModule,
    // TypeaheadModule.forRoot(),
    // ToasterModule
    ToastrModule,
    BusyModule,
    TraceModule,
    NzIconModule,
    NzFormModule,
    NzResultModule,
    NzToolTipModule,
    NzPaginationModule,
    NzTableModule,
    NzDropDownModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzMenuModule,
    NzEmptyModule,
    NzRadioModule,
    NzSpinModule,
    NzCardModule,
    NzCheckboxModule,
    NzTabsModule,
    NzAvatarModule,
    NzModalModule,
    NzTagModule,
    NzDatePickerModule,
    NzBadgeModule,
    NzAlertModule,
    NzSkeletonModule,
    NzPopoverModule,
    NzDividerModule,
    NzLayoutModule,
    NzStatisticModule,
    NzInputNumberModule,
    NzTimelineModule,
    NzCollapseModule,
    NzUploadModule,
    NzAutocompleteModule,
    NzTimePickerModule,
    NzStepsModule,
    NzListModule,
    NzDrawerModule,
    NzNotificationModule,
    NgxSummernoteModule,
    NzPopconfirmModule,
    NzTableDropdownFilterModule,
    FullCalendarModule,
    NzProgressModule,
    NzCalendarModule,
    NzWeekendModule,
  ],
  providers: [ColorsService, NzMessageService],
  declarations: [
    FlotDirective,
    SparklineDirective,
    EasypiechartDirective,
    CheckallDirective,
    VectormapDirective,
    NowDirective,
    ScrollableDirective,
    JqcloudDirective,
    DebounceClickDirective,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    // AccordionModule,
    AlertModule,
    ButtonsModule,
    // CarouselModule,
    CollapseModule,
    DatepickerModule,
    NzDatePickerModule,
    BsDatepickerModule,
    BsDropdownModule,
    ModalModule,
    // PaginationModule,
    // ProgressbarModule,
    // RatingModule,
    TabsModule,
    TimepickerModule,
    TooltipModule,
    // PopoverModule,
    // TypeaheadModule,
    // ToasterModule,
    ToastrModule,
    // FlotDirective,
    // SparklineDirective,
    // EasypiechartDirective,
    // CheckallDirective,
    // VectormapDirective,
    // NowDirective,
    // ScrollableDirective,
    // JqcloudDirective
    TraceModule,
    DebounceClickDirective,
    NzIconModule,
    NzFormModule,
    NzIconModule,
    NzFormModule,
    NzResultModule,
    NzToolTipModule,
    NzPaginationModule,
    NzTableModule,
    NzDropDownModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzMenuModule,
    NzEmptyModule,
    NzRadioModule,
    NzSpinModule,
    NzCardModule,
    NzCheckboxModule,
    NzTabsModule,
    NzAvatarModule,
    NzModalModule,
    NzTagModule,
    NzBadgeModule,
    NzAlertModule,
    NzSkeletonModule,
    NzPopoverModule,
    NzDividerModule,
    NzLayoutModule,
    NzStatisticModule,
    NzInputNumberModule,
    NzTimelineModule,
    NzCollapseModule,
    NzUploadModule,
    NzAutocompleteModule,
    NzTimePickerModule,
    NzStepsModule,
    NzListModule,
    NzDrawerModule,
    NzNotificationModule,
    NgxSummernoteModule,
    NzPopconfirmModule,
    HorizontalScrollModule,
    NzTableDropdownFilterModule,
    FullCalendarModule,
    NzProgressModule,
    NzCalendarModule,
    NzWeekendModule,
  ],
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
