import { Component, OnInit, Injector, OnDestroy, Input } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { SettingsService } from '@core/settings/settings.service';
import { HttpClient } from '@angular/common/http';
import { BaseComponent } from '@shared/components';
import { APP_URL } from '@shared/utility/url-enumeration';
import { MenuService } from '@core/menu/menu.service';
import { filter } from 'rxjs/operators';
import { Base64 } from "@shared/utility/webtoolkit.base64";
import { CookieService } from 'ngx-cookie';
import { environment } from '@environments/environment';
import { LayoutComponent } from '@app/layout/layout.component';
import { Administration, Menu,  Referentiel } from '@app/routes/menu';

@Component({
  selector: "app-sidebar-application",
  templateUrl: "./sidebar-app.component.html",
  styleUrls: ["./sidebar-app.component.scss"],
})
export class SidebarApplicationComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @Input("parent")
  parent: LayoutComponent;

  menuItems: Array<any>;
  router: Router;
  sbclickEvent = "click.sidebar-toggle";
  $doc: any = null;

  
  isHidden = true;

  /**
   * Description: Declare the icons
   */
  hasSubmenu = "fas fa-folder";
  singleMenuItem = "fas fa-file-alt";
  initialURL = "";
  idPatient: number;
  hasDossierCancer: boolean;
  theme = false;

  checkInitialURL() {
    
    
    

    
    
    
    
    

    
    
    
    
    

    
    
    
    
    
    
    
    

    

    this.menuItems = Referentiel.submenu;

    this.menuItems = Menu.submenu;
  }
  constructor(
    public menu: MenuService,
    public settings: SettingsService,
    public injector: Injector,
    private cookieService: CookieService
  ) {
    super();

    
    
    
    
    this.checkInitialURL();
    console.log("this.menu.getMenu()", this.menu.getMenu());
    this.menuItems = this.menu.getMenu();
    this.menu.menuSubject.asObservable().subscribe(() => {
      this.menuItems = this.menu.getMenu();
    });
  }

  ngAfterViewInit() {}

  ngOnInit() {
    this.router = this.injector.get(Router);

    this.router.events.subscribe((val) => {
      // close any submenu opened when route changes
      this.removeFloatingNav();
      // scroll view to top
      window.scrollTo(0, 0);
      // close sidebar on route change
      this.settings.setLayoutSetting("asideToggled", false);

      /**
       * Description: Only change the content of menuItems if the /XXX is not started with initialURL
       */
      if (this.router.url.indexOf("/" + this.initialURL) === -1) {
        this.checkInitialURL();
      }
    });

    // enable sidebar autoclose from extenal clicks
    this.anyClickClose();
  }
  isSelectedUrl(link){ 
    let list_split_link = link.split("/");
    if (list_split_link.length > 0) {
      let url_concat = "";
      let count = 0;
      for (let item of list_split_link) {
        if (item != "" && this.router.url.indexOf(item) != -1){
          url_concat = url_concat + "/" + item;
          count ++ ;
        }
      }
    
      return (this.router.url.indexOf(url_concat) != -1 && url_concat.length>0 && count>2);  
    }else 
    return false
  }
  anyClickClose() {
    this.$doc = $(document).on(this.sbclickEvent, (e) => {
      if (!$(e.target).parents(".aside-container").length) {
        this.settings.setLayoutSetting("asideToggled", false);
      }
    });
  }

  ngOnDestroy() {
    if (this.$doc) this.$doc.off(this.sbclickEvent);
  }
  toggleSubmenuClick(event, route?: string) {
    if (route) {
      this.router.navigate([route]);
    }
    // this.toggleIcon();
    event.preventDefault();
    if (
      !this.isSidebarCollapsed() &&
      !this.isSidebarCollapsedText() &&
      !this.isEnabledHover()
    ) {
      let ul = $(event.currentTarget.nextElementSibling);

      // hide other submenus
      let parentNav = ul.parents(".sidebar-subnav");
      $(".sidebar-subnav").each((idx, el) => {
        let $el = $(el);
        // if element is not a parent or self ul
        if (el !== parentNav[0] && el !== ul[0]) {
          this.closeMenu($el);
        }
      });

      // abort if not UL to process
      if (!ul.length) {
        return;
      }

      // any child menu should start closed
      ul.find(".sidebar-subnav").each((idx, el) => {
        this.closeMenu($(el));
      });

      // toggle UL height
      const ulHeight = ul.css("height");
      if (ulHeight === "auto" || parseInt(ulHeight, 10)) {
        this.closeMenu(ul);
      } else {
        // expand menu
        ul.on("transitionend", () => {
          ul.css("height", "auto").off("transitionend");
        }).css("height", ul[0].scrollHeight);
        // add class to manage animation
        ul.addClass("opening");
        /**
         * Description: Changing the folder status (Icon) to opened.
         */
        ul.parent().find("em").first().removeClass("fa fa-folder");
        ul.parent().find("em").first().addClass("fa fa-folder-open");
      }
    }
  }

  toggleSubmenuHover(event) {
    let self = this;
    if (
      this.isSidebarCollapsed() ||
      this.isSidebarCollapsedText() ||
      this.isEnabledHover()
    ) {
      event.preventDefault();

      this.removeFloatingNav();

      let ul = $(event.currentTarget.nextElementSibling);
      let anchor = $(event.currentTarget);

      if (!ul.length) {
        return; // if not submenu return
      }

      let $aside = $(".aside-container");
      let $asideInner = $aside.children(".aside-inner"); // for top offset calculation
      let $sidebar = $asideInner.children(".sidebar");
      let mar =
        parseInt($asideInner.css("padding-top"), 0) +
        parseInt($aside.css("padding-top"), 0);
      let itemTop = anchor.parent().position().top + mar - $sidebar.scrollTop();

      let floatingNav = ul.clone().appendTo($aside);
      let vwHeight = document.body.clientHeight;

      // let itemTop = anchor.position().top || anchor.offset().top;

      floatingNav
        .removeClass("opening") // necesary for demo if switched between normal//collapsed mode
        .addClass("nav-floating")
        .css({
          position: this.settings.getLayoutSetting("isFixed")
            ? "fixed"
            : "absolute",
          top: itemTop,
          bottom:
            floatingNav.outerHeight(true) + itemTop > vwHeight ? 0 : "auto",
        });

      floatingNav
        .on("mouseleave", () => {
          floatingNav.remove();
        })
        .find("a")
        .on("click", function (e) {
          e.preventDefault(); // prevents page reload on click
          // get the exact route path to navigate
          let routeTo = $(this).attr("route");
          if (routeTo) self.router.navigate([routeTo]);
        });

      this.listenForExternalClicks();
    }
  }
  // Close menu collapsing height
  closeMenu(elem) {
    elem.css("height", elem[0].scrollHeight); // set height
    elem.css("height", 0); // and move to zero to collapse
    elem.removeClass("opening");
    /**
     * Description: Change the folder status (Icon) to closed.
     */
    elem.parent().find("em").first().removeClass("fa fa-folder-open");
    elem.parent().find("em").first().addClass("fa fa-folder");
  }

  listenForExternalClicks() {
    let $doc = $(document).on("click.sidebar", (e) => {
      if (!$(e.target).parents(".aside-container").length) {
        this.removeFloatingNav();
        $doc.off("click.sidebar");
      }
    });
  }
  removeFloatingNav() {
    $(".nav-floating").remove();
  }
  isSidebarCollapsed() {
    return this.settings.getLayoutSetting("isCollapsed");
  }
  isSidebarCollapsedText() {
    return this.settings.getLayoutSetting("isCollapsedText");
  }
  isEnabledHover() {
    return this.settings.getLayoutSetting("asideHover");
  }

  toLink(menu) {
    if (menu.link) {
      if (menu.modeExtenalTab) {
        if (menu.code == "CHIMIO") {
          var options = { path: "/", domain: "" };
          this.cookieService.remove("u_i");
          this.cookieService.put(
            "u_i",
            Base64.encode(
              this.currentUser.username +
                "_" +
                this.currentUser.id +
                "_" +
                environment.settings.domain +
                "_" +
                this.idPatient
            ),
            options
          );
          this.cookieService.put(
            "p_id",
            Base64.encode(this.idPatient),
            options
          );
          let linkSplited = menu.link.split("|");
          if (linkSplited.length > 1) {
            this.cookieService.put("Link_External", Base64.encode(""), options);
            this.cookieService.put("tab", Base64.encode("true"), options);
            this.cookieService.put(
              "appUrl_dmcToChimio",
              Base64.encode(linkSplited[1]),
              options
            );
            menu.link = menu.link.split(";")[0];
            let newWindow = window.open(linkSplited[0], "_blank");
          }
        } else {
          window.open(menu.link, "_blank");
        }
      } else {
        this.router.navigate([menu.link]);
      }
    }
  }

  hasAnyCategorieRoles(item) {
    if (item.type == "module") {
      return this.hasAnyCategorieRole(item.categories);
    } else {
      return true;
    }
  }
}
