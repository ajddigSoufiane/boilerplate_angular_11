import {Injectable} from "@angular/core";
declare var $: any;

@Injectable()
export class SettingsService {
    
    user: any;
    public app: any;
    public server: any;
    public oauth: any;
    public layout: any;
    currentUser: any;
    
    constructor() {
        
        // User Settings
        // -----------------------------------
        this.user = {
            name: 'John',
            job: 'ng-developer',
            picture: 'assets/img/user/02.jpg'
        };
        
        // App Settings
        // -----------------------------------
        this.app = {
            name: 'BOILEPLATE',
            description: '',
            production: false,
            domain: '1',
            sessionTimeout: 900,     // 15 min
            year: ((new Date()).getFullYear()), 
            build: 'v3.2 build.date',
        };
        
        // Server Settings
        // -----------------------------------
        this.server = {
            currentUserUrl: '/utilisateur/getCurrentUserByDomain/' + this.app.domain + '/'
        };
        
        this.oauth = {
                loginUrl: '/oauth/token',
           		clientId: 'moncabClientId',
                secret: 'monc@b@secret'
            };
        
        // Layout Settings
        // -----------------------------------
        this.layout = {
            isFixed: true,
            isCollapsed: false,
            isBoxed: false,
            isRTL: false,
            horizontal: false,
            isFloat: false,
            asideHover: false,
            theme: null,
            asideScrollbar: false,
            isCollapsedText: false,
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp'
        };
        
    }
    
    checkCurrentUser() {
      const currentUser = localStorage.getItem('currentUser1');
      if (currentUser) {
        this.currentUser =  JSON.parse(atob(localStorage.getItem('currentUser1')));
      } else {
        this.currentUser = undefined;
      }
    }

    getCurrentUser(): any {
        return this.currentUser;
    }
    
    getAppSetting(name) {
        return name ? this.app[name] : this.app;
    }
    
    getUserSetting(name) {
        return name ? this.user[name] : this.user;
    }
    
    getLayoutSetting(name) {
        return name ? this.layout[name] : this.layout;
    }
    
    setAppSetting(name, value) {
        if (typeof this.app[name] !== 'undefined') {
            this.app[name] = value;
        }
    }
    
    setUserSetting(name, value) {
        if (typeof this.user[name] !== 'undefined') {
            this.user[name] = value;
        }
    }
    
    setLayoutSetting(name, value) {
        if (typeof this.layout[name] !== 'undefined') {
            return this.layout[name] = value;
        }
    }
    
    toggleLayoutSetting(name) {
        return this.setLayoutSetting(name, !this.getLayoutSetting(name));
    }
    
}
