import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

declare var RadaeePDFPlugin: any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public platform: Platform, public navCtrl: NavController) {

  }


  public openPDF() {
    if (this.platform.is('cordova')) {

      console.log('Button clicked');
      let filepath = 'http://www.radaeepdf.com/documentation/MRBrochoure.pdf';

      this.registerCallbacks();
      console.log('Before PDF opening');
      let reader = new Promise((resolve, reject) => {
        let openpdf = RadaeePDFPlugin.open(
          {
            url: filepath,
            gotoPage: 0
          },
          (message) => {
            console.log("Radee open pdf Success - PDF opens " + message);

            // RadaeePDFPlugin.willCloseReaderCallback(this.willCloseReader());
            //    RadaeePDFPlugin.didChangePageCallback((message) => this.updatePageNumber(message, subscription));
          },
          (err) => {
            console.log("Radee open pdf Failure - PDF can't open " + err);
          }
        );
        resolve(openpdf);
      });

    }
    else
      console.log('Not a cordova platform');

  }

  public registerCallbacks() {
    RadaeePDFPlugin.willCloseReaderCallback(() => this.willCloseReader('willCloseReaderCallback'));


    RadaeePDFPlugin.willShowReaderCallback(() => this.willCloseReader('willShowReaderCallback'));

    RadaeePDFPlugin.didShowReaderCallback(() => this.willCloseReader('didShowReaderCallback'));

    RadaeePDFPlugin.didCloseReaderCallback(() => this.willCloseReader('didCloseReaderCallback'));



    // RadaeePDFPlugin.didSearchTermCallback(function (message) { didSearchTerm(message); });

    // RadaeePDFPlugin.didTapOnPageCallback(function (message) { didTapOnPage(message); });

    // RadaeePDFPlugin.didTapOnAnnotationOfTypeCallback(function (message) { didTapOnAnnotationOfType(message); });

  }

  public willCloseReader(funcName) {

    console.log('Last seen Page', '');
    console.log("--- Callback: ", funcName);

  }


}
