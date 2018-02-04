import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import Basepage from '../base';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-set-notification',
  templateUrl: 'set-notification.html',
})
export class SetNotificationPage extends Basepage {
  movie: any;
  date: string;
  time: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public FirebaseAuth: AngularFireAuth,
    public FirebaseFirestore: AngularFirestore,
    public toaseCtrl: ToastController,
    public loaddingCtrl: LoadingController,
    public localNotifications: LocalNotifications,
    public barcode: BarcodeScanner
  ) {
    super(toaseCtrl, loaddingCtrl);
    this.movie = this.navParams.get('movie');
    console.log(this.movie);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetNotificationPage');
  }

  set() {
    let pasedDateTime = Date.parse(this.date + ' ' + this.time);
    let datetime = new Date(pasedDateTime);

    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'คุณมีนัดดูหนังเรื่อง' + this.movie.data.name,
      at: datetime,
      every: 'minute'
    });

    this.showToast("success");

    //Pconsole.log(datetime.toDateString());
  }

  turn_off(){
    this.localNotifications.cancelAll();
    this.showToast("turn Off Ok");
  }

}
