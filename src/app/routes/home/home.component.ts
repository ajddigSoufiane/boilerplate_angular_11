import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    currentUser

    constructor() {
    }

    ngOnInit() {

        const currentUser = localStorage.getItem('currentUser1');
        if (currentUser) {
            this.currentUser =  JSON.parse(atob(localStorage.getItem('currentUser1')));
        } else {
            this.currentUser = {};
        }


    }

}
