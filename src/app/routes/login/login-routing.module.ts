import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';

const LoginRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'login/:id', component: LoginComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(LoginRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})

export class LoginRoutingModule {
}