import { Component, OnInit, OnDestroy } from '@angular/core';
import { request } from 'http';
declare var $: any;

import { MenuService } from '@core/menu/menu.service';
import { SettingsService } from '@core/settings/settings.service';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APP_URL } from '@shared/utility/url-enumeration';
import { BaseComponent } from '@shared/components';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent implements OnInit, OnDestroy {
    initialRoute: string = '';
    subscription: Subscription = new Subscription();
    menuItems: Array<any>;
    // router: Router;
    sbclickEvent = 'click.sidebar-toggle';
    $doc: any = null;
    url: any = APP_URL;


    constructor(private httpClient: HttpClient) {
     super()
      if (this.router.url.split('/').length > 1) {
        this.initialRoute = this.router.url.split(/[\/?]/)[1];
        
        if(this.initialRoute && this.initialRoute=='home')
            this.initialRoute=this.url.Main;
      }

    }

    ngOnInit() {

      const subscription = this.router.events.subscribe(() => {
        if (this.router.url.split('/').length > 1) {
            this.initialRoute = this.router.url.split(/[\/?]/)[1];
        } else {
            this.initialRoute = '';
        }
        
        if(this.initialRoute && this.initialRoute=='home')
            this.initialRoute=this.url.Main;

    });

        this.subscription.add(subscription);

    }

   

    ngOnDestroy() {
    this.subscription.unsubscribe();
    }


  
}