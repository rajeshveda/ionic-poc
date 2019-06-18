import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

declare var RadaeePDFPlugin: any;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      console.log('Activate license for Radee');
      if (platform.is('cordova')) {
        RadaeePDFPlugin.activateLicense(
          {
            licenseType: 1, //0: for standard license, 1: for professional license, 2: for premium license
            company: "IEEE", //the company name you entered during license activation
            email: "t.glover@ieee.org", //the email you entered during license activation
            // key: "8KIBCG-5CNBOY-Q1NDS8-ZETU10-4RHWA9-JTQ7AD" //you license activation key for ios
            key: "LWCJNE-OEG7AF-Q1NDS8-ZETU10-0Z8ZHC-3Y4722"  //you license activation key for android
          },
          function (message) { // Callback for successful opening.
            console.log("Radee Success: " + message);
          },
          function (err) { // Callback in case of error.
            console.log("Radee Failure: " + err);
          });
      }
    });
  }
}
