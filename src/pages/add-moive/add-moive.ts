import { AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the AddMoivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-moive',
  templateUrl: 'add-moive.html',
})
export class AddMoivePage {

  name: string = '';
  des:string = '';
  le:string = '';
  img:string = '';


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore
  ) {
  }

  create(){
    // console.log(this.name, this.des, this.le, this.img)
    this.firebaseFirestore
    .collection('users')
    .doc(this.firebaseAuth.auth.currentUser.uid)
    .collection('movies')
    .add({
      name : this.name,
      length : this.le,
      description : this.des,
      img : this.img
    })
    .then(() => {
      this.navCtrl.pop();
    })
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad AddMoivePage');
  // }

}
