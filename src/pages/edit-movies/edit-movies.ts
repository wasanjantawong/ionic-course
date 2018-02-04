import { AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Basepage from '../base';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-edit-movies',
  templateUrl: 'edit-movies.html',
})
export class EditMoviesPage extends Basepage {
  id: string;
  uid: string;

  name: string = '';
  des:string = '';
  le:string = '';
  img:string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseFirestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    
    public toaseCtrl: ToastController,
    public loaddindCtrl: LoadingController

  ) {
    super(toaseCtrl, loaddindCtrl);
    this.id = this.navParams.get('id');
    //console.log(this.id);
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;
    
    this.firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .collection('movies')
    .doc(this.id)
    .valueChanges()
    .subscribe( (movie:any) =>{
      this.name = movie.name;
      this.des = movie.description;
      this.le = movie.length;
      this.img = movie.img;
      console.log(movie.des);
    })
  }

  save(){
    this.showLoading('Updating...');
    this.firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .collection('movies')
    .doc(this.id)
    .update({
      name : this.name,
      description: this.des,
      length: this.le,
      img : this.img
    })
    .then( () =>{
      this.hideLoading();
      this.showToast('Updated successfully');
      this.navCtrl.pop();
    })
    .catch( (error) =>{
      this.hideLoading();
      this.showToast(error);
    })
  }

}
