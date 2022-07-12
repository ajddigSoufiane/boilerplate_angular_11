export const environment = {
  production: true,
  name: "staging",
  settings: {
    domain: "16", 
    // apiUrl: "http://192.168.1.123:8089/SELFRHBACK",
    // oauthUrl: "http://192.168.1.123:8089/SELFRHBACK",
    apiUrl: "http://192.168.1.123:8069/SELFRHBACK",
    oauthUrl: "http://192.168.1.123:8069/SELFRHBACK",
    login: "admin",
    password: "admin", 
  },
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.