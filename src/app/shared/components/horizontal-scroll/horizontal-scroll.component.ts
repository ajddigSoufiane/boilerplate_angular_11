import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.scss']
})
export class HorizontalScrollComponent implements OnInit , AfterViewInit {
  @ViewChild('scrollx') public scrollx: ElementRef<any>;
  @ViewChild('appScrollElement') public appScrollElement:any;

  constructor(
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
   
  }
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    if(this.appScrollElement){
      this.appScrollElement.updateHasHorizontalScrollbar();
      this.cdRef.detectChanges();
    }
  }
  public onPreviousSearchPosition() { 
    this.scrollx.nativeElement.scrollLeft -= 20; 
  }

  public onNextSearchPosition(){
    this.scrollx.nativeElement.scrollLeft += 20; 
  }
}
