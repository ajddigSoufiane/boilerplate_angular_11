import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { Injector, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_BASE_HREF, registerLocaleData, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';

import { CoreModule } from '@core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { RoutesModule } from '@routes/routes.module';
import { ServiceLocator } from '@core/service-locator';
import { CookieService } from 'ngx-cookie-service';
import { LoginModule } from '@routes/login/login.module';
import { ToastrModule } from 'ngx-toastr'; 
import { FormsModule } from '@angular/forms';
//Change the language for the BsDatePicker
import { frLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

import { CookieModule } from 'ngx-cookie';
defineLocale('fr', frLocale);

/** config angular i18n **/ 
import fr from '@angular/common/locales/fr';

registerLocaleData(fr);
/** config ng-zorro-antd i18n **/
/** config ng-zorro-antd i18n **/ 
import { NZ_I18N, fr_FR } from 'ng-zorro-antd/i18n';
import { NzI18nService } from 'ng-zorro-antd/i18n'; 
import { ErrorInterceptor } from './core/auth/error.interceptor';
// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
      BrowserModule.withServerTransition({ appId: 'serverApp' }),
      HttpClientModule,
      BrowserAnimationsModule, // required for ng2-tag-input
      CoreModule,
      LoginModule,
      LayoutModule,
      SharedModule.forRoot(),
      RoutesModule,
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient]
          }
      }),
      ToastrModule.forRoot(),
      CookieModule.forRoot()
  ],
    providers: [
        NzI18nService, 
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '/BOILEPLATE' },
        { provide: NZ_I18N, useValue: fr_FR },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
                
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
