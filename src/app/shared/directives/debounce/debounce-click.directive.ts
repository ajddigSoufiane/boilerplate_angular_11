import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject'; 
import 'rxjs/add/operator/debounceTime';

@Directive({
    selector: '[debounceClick]'
})
export class DebounceClickDirective implements OnInit, OnDestroy {
    @Input() debounceTime = 1000;
    @Output() debounceEvent = new EventEmitter();
    clicks = new Subject(); 

    constructor() {
    }

    ngOnInit() {
       this.clicks.asObservable().debounceTime(this.debounceTime)
            .subscribe(e => this.debounceEvent.emit(e));
    }

    ngOnDestroy() { 
    }

    @HostListener('click', ['$event'])
    clickEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    }

}
