import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {MenuService} from '@core/menu/menu.service';
// import {mon_dossier} from '@routes/menu';


const routes: Routes = [
    {path: '', component: HomeComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule
    ]
})
export class HomeModule {

        constructor(public menuService: MenuService) {
            // menuService.addMenu([mon_dossier]);
        }
}
