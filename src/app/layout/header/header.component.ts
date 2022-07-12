import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
const screenfull = require('screenfull');

import { UserblockService } from '../sidebar/userblock/userblock.service';
import { SettingsService } from '@core/settings/settings.service';
import { MenuService } from '@core/menu/menu.service';
import { AuthService } from '@core/auth/auth.service';
import { BaseComponent } from '@app/shared/components';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Utilisateur } from '@app/shared/models';
import { UtilisateurService } from '@services'
import { LayoutComponent } from '../layout.component';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  navCollapsed = true; // for horizontal layout
  menuItems = []; // for horizontal layout
  @Output("isCollapsedEvent") public isCollapsedEvent = new EventEmitter<any>();
  @Input("content_logo") content_logo;
  @Input("parent") parent: LayoutComponent;
  isNavSearchVisible: boolean;
  @ViewChild("fsbutton", { static: true }) fsbutton; // the fullscreen button
  ListSetting: any[];
  user: any;
  isCollapsed: boolean;
  constructor(
    public menu: MenuService,
    private utilisateurService: UtilisateurService,
    public userblockService: UserblockService,
    public settings: SettingsService,
    private fb: FormBuilder,
    private authService?: AuthService,
    private settingsService?: SettingsService
  ) {
    // show only a few items on demo
    super();
    this.menuItems = menu.getMenu().slice(0, 4); // for horizontal layout
    this.ListSetting = [];
    this.ListSetting.push({
      imageUrl: "fa fa-home fa-2x text-info",
      text: "menu.home.title",
      link: "/boileplate",
    });
    this.ListSetting.push({
      imageUrl: "fa fa-cog fa-2x text-info",
      text: "menu.referentiel.title",
      link: "/referentiel",
      categorie: "REFERENTIEL",
    });
    this.ListSetting.push({
      imageUrl: "fa fa-user-cog fa-2x text-info",
      text: "menu.administration.title",
      link: "/administration",
      categorie: "ADMINISTRATION",
    });
    this.user = settingsService.getCurrentUser();
  }

  ngOnInit() {
    this.isNavSearchVisible = false;

    const ua = window.navigator.userAgent;
    if (ua.indexOf("MSIE ") > 0 || !!ua.match(/Trident.*rv\:11\./)) {
      // Not supported under IE
      this.fsbutton.nativeElement.style.display = "none";
    }

    this.updatePasswordForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });

    
    
    
    
    
    
    
  }
  linkAdmin() {
    //administration not implement
    
  }
  toggleUserBlock(event) {
    event.preventDefault();
    this.userblockService.toggleVisibility();
  }

  openNavSearch(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setNavSearchVisible(true);
  }

  setNavSearchVisible(stat: boolean) {
    
    this.isNavSearchVisible = stat;
  }

  getNavSearchVisible() {
    return this.isNavSearchVisible;
  }

  toggleOffsidebar() {
    this.settings.toggleLayoutSetting("offsidebarOpen");
  }

  toggleCollapsedSideabar() {
    this.settings.toggleLayoutSetting("isCollapsed");
  }

  isCollapsedText() {
    return this.settings.getLayoutSetting("isCollapsedText");
  }

  toggleFullScreen(event) {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

  logout() {
    this.authService.logout();
  }
  redirection(item) {
    if (item && item.link) {
      this.router.navigate([item.link]);
    }
  }

  // password updating

  isUpdatePasswordVisible = false;
  isUpdatePasswordLoading = false;

  handleCancelUpdatePassword() {}
  updatePassword() {
    if (this.updatePasswordForm.valid) {
      this.addBusy();
      let user = new Utilisateur();
      user.id = this.currentUser.id;

      if (
        this.updatePasswordForm.controls["newPassword"].value ==
        this.updatePasswordForm.controls["checkPassword"].value
      )
        user.newPassword =
          this.updatePasswordForm.controls["newPassword"].value;
      user.oldPassword = this.updatePasswordForm.controls["oldPassword"].value;

      this.utilisateurService.updateUtilisateurPassword(user).subscribe(
        (success) => {
          this.router.navigate(["/login"], {
            queryParams: { logout: "logout" },
          });
        },
        (error) => this.handleError(error)
      );
    }
  }

  updatePasswordForm: FormGroup;

  submitForm(): void {
    for (const i in this.updatePasswordForm.controls) {
      this.updatePasswordForm.controls[i].markAsDirty();
      this.updatePasswordForm.controls[i].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.updatePasswordForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (
      control.value !== this.updatePasswordForm.controls.newPassword.value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  isCollapsedToggel() {
    this.parent.toggleCollapsed();
  }
  isSelectedUrl(link) {
    let list_split_link = link.split("/");
    if (list_split_link.length > 0) {
      let url_concat = "";
      let count = 0;
      for (let item of list_split_link) {
        if (item != "" && this.router.url.indexOf(item) != -1) {
          url_concat = url_concat + "/" + item;
          count++;
        }
      }

      return (
        this.router.url.indexOf(url_concat) != -1 &&
        url_concat.length > 0 
      );
    } else return false;
  }
}
