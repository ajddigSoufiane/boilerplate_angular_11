import {NgModule} from '@angular/core';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {SharedModule} from '@shared/shared.module';
import { ChangePasswordComponent } from './changePassword/change-password.component';

@NgModule({
    imports: [
        SharedModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent,
        ChangePasswordComponent
    ]
})
export class LoginModule {
}