import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TranslateService } from './translate/translate.service';
import { TranslatePipe } from './translate/translate.pipe'; 
import { ProfilAddComponent } from './profil-add/profil-add.component';
import { ProfilEditComponent } from './profil-edit/profil-edit.component';
import { ProfilViewComponent } from './profil-view/profil-view.component';
import { ProfilListComponent } from './profil-list/profil-list.component';
import { Message_Profil_Service } from './shared/message_profil_service.service';
import { ProfilSelectListTableComponent } from './profil-select-list-table/profil-select-list-table.component';
import { ProfilSelectListTableFilterPipe } from './profil-select-list-table/profil-select-list-table-filter.pipe';
import { ProfilFormAddTableComponent } from './profil-form-add-list-table/profil-form-add-list-table.component';
import { ProfilFormAddTableFilterPipe } from './profil-form-add-list-table/profil-form-add-list-table-filter.pipe';
import { FieldSearchingProfilListComponent } from './profil-list/field_searching/field_searching.component';
import { RoleComponent } from './role/role.component';
import { TreeModule } from 'angular-tree-component';

const Routes = [
  { path: 'add', component: ProfilAddComponent },
  { path: 'edit/:id', component: ProfilEditComponent },
  { path: 'list', component: ProfilListComponent },
  { path: 'view/:id', component: ProfilViewComponent }
]
@NgModule({
  declarations: [
    ProfilAddComponent,
    ProfilEditComponent,
    ProfilViewComponent,
    ProfilListComponent,
    FieldSearchingProfilListComponent,
    ProfilSelectListTableComponent, 
    ProfilSelectListTableFilterPipe,
    ProfilFormAddTableComponent,
    RoleComponent,
    ProfilFormAddTableFilterPipe,
    TranslatePipe 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    SharedModule,
    FormsModule,
    TreeModule.forRoot()

  ],
  exports: [RouterModule],
  providers: [
    TranslateService,
    Message_Profil_Service
  ],
})
export class ProfilModule {

 }
 