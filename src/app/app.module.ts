import { ChartPage } from './../pages/chart/chart';
import { EditMoviesPage } from './../pages/edit-movies/edit-movies';
import { AddMoivePage } from './../pages/add-moive/add-moive';
import { RegisterPage } from './../pages/register/register';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { ListPage } from '../pages/list/list';
import { TabPage } from '../pages/tab/tab';
import { LoginPage } from '../pages/login/login';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SetNotificationPage } from '../pages/set-notification/set-notification';

import { LocalNotifications } from '@ionic-native/local-notifications';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

var config = {
  apiKey: "AIzaSyBVWL-eLYkrc9KAtc5Z9Cnpv_h9OArhSXo",
  authDomain: "ionic-course-cfff0.firebaseapp.com",
  databaseURL: "https://ionic-course-cfff0.firebaseio.com",
  projectId: "ionic-course-cfff0",
  storageBucket: "ionic-course-cfff0.appspot.com",
  messagingSenderId: "524183571515"
};
// var config = {
//   apiKey: "AIzaSyDzyh0iEfidKaearbjZQNDR2Dv_tihbpD4",
//   authDomain: "ionic-course-2892e.firebaseapp.com",
//   databaseURL: "https://ionic-course-2892e.firebaseio.com",
//   projectId: "ionic-course-2892e",
//   storageBucket: "ionic-course-2892e.appspot.com",
//   messagingSenderId: "55718317701"
// };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    ListPage,
    TabPage,
    LoginPage,
    RegisterPage,
    AddMoivePage,
    EditMoviesPage,
    ChartPage,
    SetNotificationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule, //auth
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    ListPage,
    TabPage,
    LoginPage,
    RegisterPage,
    AddMoivePage,
    EditMoviesPage,
    ChartPage,
    SetNotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    BarcodeScanner
  ],
})
export class AppModule {}
