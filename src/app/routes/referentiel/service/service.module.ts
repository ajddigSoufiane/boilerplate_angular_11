import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TranslateService } from './translate/translate.service';
import { TranslatePipe } from './translate/translate.pipe'; 
import { ServiceAddComponent } from './service-add/service-add.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { ServiceViewComponent } from './service-view/service-view.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { Message_Service_Service } from './shared/message_service_service.service'; 
import { FieldSearchingServiceListComponent } from './service-list/field_searching/field_searching.component';
 
const Routes = [
  { path: 'add', component: ServiceAddComponent },
  { path: 'edit/:id', component: ServiceEditComponent },
  { path: 'list', component: ServiceListComponent },
  { path: 'view/:id', component: ServiceViewComponent }
]
@NgModule({
  declarations: [
    ServiceAddComponent,
    ServiceEditComponent,
    ServiceViewComponent,
    ServiceListComponent,
    FieldSearchingServiceListComponent, 
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
    Message_Service_Service
  ],
})
export class ServiceModule {

 }
 