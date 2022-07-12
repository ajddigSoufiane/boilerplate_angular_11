import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: "app-nz-weekend",
  templateUrl: "./nz-weekend.component.html",
  styleUrls: ["./nz-weekend.component.scss"],
})
export class NzWeekendComponent implements OnInit {
  @Input("day_select_on")
  set _day_select(value) {
    if (value && value.length > 0) {
      this.do_change_status("on", value); 
      let listOff = this.listDay.filter((a) => a.status == "none");
      this.do_change_status("off", listOff); 
    }
  }
   
  @Input("day_select_none")
  set day_select_none(value) {
    if (value && value.length > 0) {
      this.do_change_status("none", value);
    }
  }
  day_select: DayItem[];
  listDay: DayItem[];

  constructor() {
    this.initDay();
  }

  ngOnInit() {}
  initDay() {
    this.listDay = [
      { day: "Lu", status: "none", name: "LUNDI" }, // on off
      { day: "Ma", name: "MARDI", status: "none" },
      { day: "Me", name: "MERCREDI", status: "none" },
      { day: "Je", name: "JEUDI", status: "none" },
      { day: "Ve", name: "VENDREDI", status: "none" },
      { day: "Sa", name: "SAMEDI", status: "none" },
      { day: "Di", name: "DIMANCHE", status: "none" },
    ];
  }
  do_change_status(status, day_select) {
    for (const item of this.listDay) {
      let index = day_select.findIndex((obj) => obj.name == item.name);
      if (index > -1) {
        item.status = status;
      }
    }
  }
} 

class DayItem {
  day: string;
  name:string;
  status: string;
}