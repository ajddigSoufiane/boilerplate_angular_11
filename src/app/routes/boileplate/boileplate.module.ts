import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {MenuService} from '@core/menu/menu.service';
import { Referentiel} from '@routes/menu';
var serviceMenu :MenuService;

/**
 * @author ajddig soufiane
 * @description ajouter pour chaque router le menu correspondant 
 */
//start 
// const mon_espace= {
//     provide: 'mon_espace',
//     useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//         serviceMenu.addMenu([...Espace.submenu]);
//     }
//   } 
// const espace_manager = {
//   provide: "espace_manager",
//   useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//     serviceMenu.addMenu([...Espace_manager.submenu]);
//   },
// }; 
//end 
const routes: Routes = [
  {
    path: "",
    redirectTo: "/boileplate/acceuil",
    pathMatch: "full",
  },
  
  

   
  {
    path: "",
    loadChildren: () =>
      import("./acceuil/acceuil.module").then((m) => m.AcceuilModule),
    // resolve: { hero: "mon_espace" },
  },
];
                 
@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule], 
})
export class BoilerplateModule {
  constructor(public menuService: MenuService) {
    serviceMenu = menuService;
  }
}
