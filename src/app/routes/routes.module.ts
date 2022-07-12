import {NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot} from '@angular/router';
import { MenuService } from '@app/core/menu/menu.service';
import {TranslatorService} from '@core/translator/translator.service';
import {SharedModule} from '@shared/shared.module';
import { Administration, Referentiel } from './menu';
import {routes} from './routes';
var serviceMenu;
/**
 * @author ajddig soufiane
 * @description ajouter pour chaque router referentiel le menu correspondant 
 */
//start 
const referentiel= {
    provide: 'referentiel',
    useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        serviceMenu.addMenu([...Referentiel.submenu]);
    }
  }
const administration = {
  provide: "administration",
  useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    serviceMenu.addMenu([...Administration.submenu]);
  },
};
//end 
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
  ],
  declarations: [],
  exports: [RouterModule],
  providers: [referentiel, administration],
})
export class RoutesModule {
  constructor(public menuService: MenuService) {
    serviceMenu = menuService;
  }
}
