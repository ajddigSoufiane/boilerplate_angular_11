import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';
import {MenuService} from '@core/menu/menu.service';
import {Administration} from '@routes/menu';

const routes: Routes = [
                        {path: '', component: WelcomeAdminComponent},
    					{ path: 'profil', loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule)},
    					{ path: 'utilisateur', loadChildren: () => import('./utilisateur/utilisateur.module').then(m => m.UtilisateurModule)},
                    ];

                    @NgModule({
                        imports: [
                            RouterModule.forChild(routes),
                        ],
                        declarations: [WelcomeAdminComponent],
                        exports: [
                            RouterModule
                        ]
                    })
                    
export class AdministrationModule {
                        
        constructor(public menuService: MenuService) {
            
        }
}
