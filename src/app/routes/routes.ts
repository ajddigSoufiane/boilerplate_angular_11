import {LayoutComponent} from '../layout/layout.component';
import {AuthGuard} from '@core/auth/auth-guard.service';

export const routes = [
  {
    path: "",
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/boileplate",
        pathMatch: "full",
      },

      {
        path: "home",
        redirectTo: "/boileplate",
        pathMatch: "full",
      },

      
      {
        path: "referentiel",
        loadChildren: () =>
          import("./referentiel/referentiel.module").then(
            (m) => m.ReferentielModule
          ),
        resolve: { hero: "referentiel" },
      },
      {
        path: "administration",
        loadChildren: () =>
          import("./administration/administration.module").then(
            (m) => m.AdministrationModule
          ),
        resolve: { hero: "administration" },
      },
      {
        path: "boileplate",
        loadChildren: () =>
          import("./boileplate/boileplate.module").then((m) => m.BoilerplateModule),
      },
    ],
  },

  // Not found
  { path: "**", redirectTo: "boileplate" },
];
