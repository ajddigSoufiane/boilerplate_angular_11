import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {AuthService} from '@core/auth/auth.service';
import {BaseComponent} from '@components'; 
import { environment } from '@environments/environment'; 

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnDestroy {
    loginForm: FormGroup; 
    togglePass:boolean = true;
    changeDefaultPassword=false;
    constructor(private fb: FormBuilder,
                private route: ActivatedRoute, 
                private authService: AuthService) {
        super();
        this.loginForm = fb.group({
            'username': ["", Validators.required],
            'password': ["", Validators.required]
        });
    }

    login(value: any) {
        this.addBusy();
        const subscription = this.authService.login(value.username, value.password).subscribe(
            () => {
                if (this.authService.isLoggedIn) {
                    this.getCurrenUser(value.username);
                }
            },
            error => this.showError(error.status, <any>error)); 
    }

    getCurrenUser(username: string) {
        const subscription = this.authService.getCurrenUser(username)
            .subscribe(() => { 
                if(this.getCurrentUser().resetPassword==true){
                    this.changeDefaultPassword = true;
                    return;
                }else{
                   
                    let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
                    redirect  =  ( !this.getCurrentUser().employe )? '/administration' : redirect  
                    if( !this.getCurrentUser().employe){
                        this.showErrorMessage("Veuillez associer un employé à l'utilisateur")
                    }
                    const navigationExtras: NavigationExtras = {
                        queryParamsHandling: 'preserve',
                        preserveFragment: true
                    };
                    this.removeBusy();
                    this.router.navigate([redirect], navigationExtras);
                }
               
            }, error => this.showError(error.status, <any>error)); 
    }

    logout() {
        this.authService.removeToken();
    }
    eventChangeDefaultPassword(){
        this.changeDefaultPassword = false;
    }
    public ngOnDestroy() { 
    }
}
