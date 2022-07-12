import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ActivatedRoute, NavigationStart } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { APP_URL } from '@shared/utility/url-enumeration';
import { filter } from 'rxjs/operators'; 
declare var $: any;
@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent extends BaseComponent implements OnInit {
  param: string;
  urlParam: string;
  breadCrum: Array<Breadcrumb> = new Array<Breadcrumb>();
  breadCrum2: Array<Breadcrumb> = new Array<Breadcrumb>();
  counter = 0;
  showBreadcrumb: boolean;
  menuItems;
  isCollapsed;
  constructor(public route: ActivatedRoute, private authService: AuthService) {
    super();
    this.router.events
      .pipe(filter((e) => e instanceof NavigationStart))
      .subscribe((e: any) => {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        if (e.url.split("/").length > 1) {
          this.showBreadcrumb = true;
        } else {
          this.showBreadcrumb = false;
        }
      });

    // this.menuItems = mon_dossier;
  }

  ngOnInit() {
    if (this.router.url.split("/").length > 1) {
      this.showBreadcrumb = true;
    } else {
      this.showBreadcrumb = false;
    }
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  isCollapsedEvent(isCollapsedEvent) {
    this.isCollapsed = isCollapsedEvent;
  }
  closeDrawerMenu() {
    this.isCollapsed = false;
  }

  hasDisplayNone = (className) =>
    $("#" + className)
      .css("display")
      .toLowerCase() == "none";
  isMobileDevice = () => this.hasDisplayNone("nz-side-mobile") == false;
  hideDrawer = () => {
    if (this.isMobileDevice()) {
      this.closeDrawerMenu();
    }
  };
  isSelectedUrl(link) {
    // let list_split_link = link.split("/");
    // if (list_split_link.length > 0) {
    //   let url_concat = "";
    //   let count = 0;
    //   for (let item of list_split_link) {
    //     if (item != "" && this.router.url.indexOf(item) != -1) {
    //       url_concat = url_concat + "/" + item;
    //       count++;
    //     }
    //   }

    //   return (
    //     this.router.url.indexOf(url_concat) != -1 &&
    //     url_concat.length > 0  
    //   );
    // } else return false;
    return false;
  }
}
export class Breadcrumb {
  key: string;
  text: string;
  url: string;
  constructor(key?: string, text?: string, url?: string) {
    this.key = key;
    this.text = text;
    this.url = url;
  }
}