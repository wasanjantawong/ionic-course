import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';



@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  name: string = '';
  email: string = '';
  age: number;
  tel: string = '';
  photoUrl: string = '';
  uid: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore
  ) {
  }

  ionViewDidLoad() { // if open screen
    this.email = this.firebaseAuth.auth.currentUser.email;
    this.name = this.firebaseAuth.auth.currentUser.displayName;
    this.photoUrl = this.firebaseAuth.auth.currentUser.photoURL;

    this.uid = this.firebaseAuth.auth.currentUser.uid;
    this
    .firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .valueChanges()
    .subscribe((data:any) =>{
      //console.log(data.age);
      this.age = data.age;
      this.tel = data.tel;
    });

    //this.tel = this.firebaseFirestore
  }

  logout(){
    //log out
    this.firebaseAuth.auth.signOut(); //log out all
  }

}
