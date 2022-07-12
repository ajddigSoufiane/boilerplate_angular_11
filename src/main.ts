/*!
 *
 * Angle - Bootstrap Admin Template
 *
 * Version: 4.2.2
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

// import "./vendor.ts";
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
  if (window) {
    window.console.log = function () {};
  }
}
function addScript(link) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = link;
  document.head.append(script);
}
function addLink(css) {
  const link = document.createElement("link");
  link.href = css;
  link.rel = "stylesheet";
  document.head.append(link);
}
document.addEventListener("DOMContentLoaded", () => {
  let p = platformBrowserDynamic().bootstrapModule(AppModule);
  p.then(() => {
    (<any>window).appBootstrap && (<any>window).appBootstrap();
  });
});
// .catch(err => console.error(err));
