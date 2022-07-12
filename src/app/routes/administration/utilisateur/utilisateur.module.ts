import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TranslateService } from './translate/translate.service';
import { TranslatePipe } from './translate/translate.pipe'; 
import { UtilisateurAddComponent } from './utilisateur-add/utilisateur-add.component';
import { UtilisateurEditComponent } from './utilisateur-edit/utilisateur-edit.component';
import { UtilisateurViewComponent } from './utilisateur-view/utilisateur-view.component';
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import { Message_Utilisateur_Service } from './shared/message_utilisateur_service.service';
import { UtilisateurSelectListTableComponent } from './utilisateur-select-list-table/utilisateur-select-list-table.component';
import { UtilisateurSelectListTableFilterPipe } from './utilisateur-select-list-table/utilisateur-select-list-table-filter.pipe';
import { UtilisateurFormAddTableComponent } from './utilisateur-form-add-list-table/utilisateur-form-add-list-table.component';
import { UtilisateurFormAddTableFilterPipe } from './utilisateur-form-add-list-table/utilisateur-form-add-list-table-filter.pipe';
import { FieldSearchingUtilisateurListComponent } from './utilisateur-list/field_searching/field_searching.component';
 
const Routes = [
  { path: 'add', component: UtilisateurAddComponent },
  { path: 'edit/:id', component: UtilisateurEditComponent },
  { path: 'list', component: UtilisateurListComponent },
  { path: 'view/:id', component: UtilisateurViewComponent }
]
@NgModule({
  declarations: [
    UtilisateurAddComponent,
    UtilisateurEditComponent,
    UtilisateurViewComponent,
    UtilisateurListComponent,
    FieldSearchingUtilisateurListComponent,
    UtilisateurSelectListTableComponent, 
    UtilisateurSelectListTableFilterPipe,
    UtilisateurFormAddTableComponent,
    UtilisateurFormAddTableFilterPipe,
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
    Message_Utilisateur_Service
  ],
})
export class UtilisateurModule {

 }
 