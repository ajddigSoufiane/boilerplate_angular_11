import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../base-component';

@Component({
    selector: 'app-trace',
    templateUrl: './trace.component.html',
    styleUrls: ['./trace.component.scss']
})
export class TraceComponent extends BaseComponent implements OnInit {

    @Input('createdBy') createdBy: string;
    @Input('createdOn') createdOn: Date;
    @Input('updatedBy') updatedBy: string;
    @Input('updatedOn') updatedOn: Date;

    constructor() {
        super();
    }

    ngOnInit() {
        this.createdBy = '';
        this.createdOn = null;
        this.updatedBy = '';
        this.updatedOn = null;
    }


}
