import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgxSelectModule} from 'ngx-select-ex';
import {SharedModule} from '@shared/shared.module'; 
import { TranslatePipe } from './translate/translate.pipe';
import {TranslateService} from './translate/translate.service'; 
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzPopoverModule } from 'ng-zorro-antd/popover'; 
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AcceuilComponent } from './acceuil/acceuil.component';


const routes: Routes = [
    {path: '', redirectTo: 'acceuil', pathMatch: 'full' },
    {path: 'acceuil', component: AcceuilComponent}
]

@NgModule({
    declarations: [
        AcceuilComponent,
        TranslatePipe
        
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        FormsModule,
        NgxSelectModule,
        NzUploadModule,
        NzTableModule,
        NzAlertModule,
        NzModalModule,
        NzButtonModule,
        NzFormModule,
        NzAvatarModule,
        NzCommentModule,
        NzTagModule,
        NzDatePickerModule,
        NzDrawerModule,
        NzDescriptionsModule,
        NzSelectModule,
        NzRadioModule,
        NzPopoverModule,
        NzSpinModule
    ],
    exports: [RouterModule],
   providers: [ 
        TranslateService 
    ],
})

export class AcceuilModule {
}
