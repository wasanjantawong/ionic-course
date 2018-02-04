import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import Basepage from '../base';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends Basepage  {

  email: string = '';
  password: string = '';
  displayName: string = '';
  age: number;
  tel: string = '';

  loader:Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    super(toastCtrl, loadingCtrl)
  }


  register(){
    //console.log(this.email, this.password);
    this.showLoading("Registering...");
    this
    .firebaseAuth
    .auth
    .createUserWithEmailAndPassword(this.email, this.password)
    .then(user => {
      //console.log(user);
      user.updateProfile({
        displayName : this.displayName,
        photoURL : 'https://support.apple.com/content/dam/edam/applecare/images/en_US/osxserver/psp-mini-hero-profile-manager_2x.png'
      })

      //store data
      this
      .firebaseFirestore
      .collection('users')
      .doc(user.uid)
      .set({ // insert into user
        name : this.displayName,
        email : this.email,
        tel : this.tel,
        age : this.age
      })
      // .then(data => {

      // })
      // .catch(error =>{

      // })

      this.hideLoading();
    }) //true
    .catch((error) => {
      //console.log(error);
      this.hideLoading();
      this.showToast(error.message);
    })
    //console.log(this.email, this.password, this.age, this.displayName, this.tel);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
