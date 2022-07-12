import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  breadCrum: Array<Breadcrumb> = new Array<Breadcrumb>();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        if (e.url) {
          this.generateBreadCrumb(e.url);
        }

      });
  }

  ngOnInit() {
    this.generateBreadCrumb(this.router.url);
  }

  generateBreadCrumb(url: string) {
    const splitedUrl: Array<string> = url.split(/[\/?]/)
                                      .filter(item => item !== '' && item.match(/[\W]/) === null && item.match(/[0-9]/) === null);
    let breadCrumUrl = '';
    this.breadCrum = splitedUrl.map((item, i) => {
      let tempText = 'menu.';
      breadCrumUrl = breadCrumUrl.concat('/', item);
      if (item === 'add') {
        tempText = tempText.concat(splitedUrl[i - 1], '.add');
      } else if (item === 'edit') {
        tempText = tempText.concat(splitedUrl[i - 1], '.edit');
      } else if (item === 'view') {
        tempText = tempText.concat(splitedUrl[i - 1], '.view');
      } else if (item === 'list') {
        tempText = tempText.concat(splitedUrl[i - 1], '.list');
      } 
      else if (item === 'historique') {
        tempText = tempText.concat(splitedUrl[i - 1], '.historique');
      } else if (item === 'simple') {
        tempText = tempText.concat(splitedUrl[i - 1], '.simple');
      } else {
        tempText = tempText.concat(item, '.title');
      }
      return new Breadcrumb(tempText, breadCrumUrl);
    });
  }

}

export class Breadcrumb {
  text: string;
  url: string;

  constructor(text?: string, url?: string) {
    this.text = text;
    this.url = url;
  }
}
