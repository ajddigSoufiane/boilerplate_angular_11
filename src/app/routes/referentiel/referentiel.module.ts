import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeReferentielComponent } from './welcome-referentiel/welcome-referentiel.component';
import {MenuService} from '@core/menu/menu.service';
import {  Referentiel} from '@routes/menu';

const routes: Routes = [
  { path: "", component: WelcomeReferentielComponent }, 
  // {
  //   path: "service",
  //   loadChildren: () =>
  //     import("./service/service.module").then((m) => m.ServiceModule),
  // }, 
  {
    path: "refDemoEntity",
    loadChildren: () =>
      import("./ref-demo-entity/ref-demo-entity.module").then(
        (m) => m.RefDemoEntityModule
      ),
  } 
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [WelcomeReferentielComponent],
    exports: [
        RouterModule
    ]
})
                    
export class ReferentielModule {
                        
        
        
        
}
