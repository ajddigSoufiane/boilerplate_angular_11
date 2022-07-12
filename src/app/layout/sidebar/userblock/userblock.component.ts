import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import { SettingsService } from '@core/settings/settings.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    itemSelected: any;
    list=[
        {
            class:"eno-purple-primary-0",
            subList:["eno-purple-1","eno-purple-2","eno-purple-3"]
        },
        {
            class:"eno-blue-primary-0",
            subList:["eno-blue-1","eno-blue-2","eno-blue-3"]
        }
    ]
    user: any;
  
    constructor(public userblockService: UserblockService,
                private settingsService?: SettingsService) {
        this.user = settingsService.getCurrentUser();
    }

    ngOnInit() {
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }
    selectClass(item){
        this.itemSelected = item;
    }
}
