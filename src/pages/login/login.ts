import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import Basepage from '../base';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends Basepage {   // extents base.ts

  email = '';
  password = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    super(toastCtrl, loadingCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.showLoading("Login...");
    this.firebaseAuth
    .auth
    .signInAndRetrieveDataWithEmailAndPassword(this.email, this.password)
    .then((user) => {
      //this.showToast('Login Success');
      this.hideLoading();
    })
    .catch((error) =>{
      this.hideLoading();
      this.showToast(error.message);
    })
  }

  navigateRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
