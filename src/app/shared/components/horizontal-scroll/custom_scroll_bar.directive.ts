import { AfterContentChecked, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustom_scroll_bar]',
  exportAs:'appCustom_scroll_bar'
})
export class Custom_scroll_barDirective {

  disableBtn:boolean=true;
  top:number;
  offSetWidth:number;
  scrollWidth:number;
  left: any;
  hasHorizontalScrollbar: boolean=true;
  constructor(private eleRef:ElementRef){
    
  }

  @HostListener('scroll') onScrollEvent(event:Event){ 
      this.left=this.eleRef.nativeElement.scrollLeft;
      this.offSetWidth=this.eleRef.nativeElement.offsetWidth;
      this.scrollWidth=this.eleRef.nativeElement.offsetWidth;
      this.hasHorizontalScrollbar = this.eleRef.nativeElement.scrollWidth > this.eleRef.nativeElement.clientWidth;
      if(this.left === 0){
        this.disableBtn=false;
      }
      if(this.left>this.scrollWidth-this.offSetWidth-1){
        this.disableBtn=true;
      }
  }
  updateHasHorizontalScrollbar(){
    this.hasHorizontalScrollbar = (this.eleRef.nativeElement.scrollWidth > this.eleRef.nativeElement.clientWidth || (this.eleRef.nativeElement.scrollWidth == 0 && this.eleRef.nativeElement.clientWidth==0));
  }
   
}
