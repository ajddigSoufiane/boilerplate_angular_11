import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TranslateService } from './translate/translate.service';
import { TranslatePipe } from './translate/translate.pipe'; 
import { RefDemoEntityAddComponent } from './ref-demo-entity-add/ref-demo-entity-add.component';
import { RefDemoEntityEditComponent } from './ref-demo-entity-edit/ref-demo-entity-edit.component';
import { RefDemoEntityViewComponent } from './ref-demo-entity-view/ref-demo-entity-view.component';
import { RefDemoEntityListComponent } from './ref-demo-entity-list/ref-demo-entity-list.component';
import { Message_RefDemoEntity_Service } from './shared/message_ref-demo-entity_service.service';
import { RefDemoEntitySelectListTableComponent } from './ref-demo-entity-select-list-table/ref-demo-entity-select-list-table.component';
import { RefDemoEntitySelectListTableFilterPipe } from './ref-demo-entity-select-list-table/ref-demo-entity-select-list-table-filter.pipe';
import { RefDemoEntityFormAddTableComponent } from './ref-demo-entity-form-add-list-table/ref-demo-entity-form-add-list-table.component';
import { RefDemoEntityFormAddTableFilterPipe } from './ref-demo-entity-form-add-list-table/ref-demo-entity-form-add-list-table-filter.pipe';
import { FieldSearchingRefDemoEntityListComponent } from './ref-demo-entity-list/field_searching/field_searching.component';
 
const Routes = [
  { path: 'add', component: RefDemoEntityAddComponent },
  { path: 'edit/:id', component: RefDemoEntityEditComponent },
  { path: 'list', component: RefDemoEntityListComponent },
  { path: 'view/:id', component: RefDemoEntityViewComponent }
]
@NgModule({
  declarations: [
    RefDemoEntityAddComponent,
    RefDemoEntityEditComponent,
    RefDemoEntityViewComponent,
    RefDemoEntityListComponent,
    FieldSearchingRefDemoEntityListComponent,
    RefDemoEntitySelectListTableComponent, 
    RefDemoEntitySelectListTableFilterPipe,
    RefDemoEntityFormAddTableComponent,
    RefDemoEntityFormAddTableFilterPipe,
    TranslatePipe 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    SharedModule,
    FormsModule,

  ],
  exports: [RouterModule],
  providers: [
    TranslateService,
    Message_RefDemoEntity_Service
  ],
})
export class RefDemoEntityModule {

 }
 