import { AddMoivePage } from './../add-moive/add-moive';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Item } from 'ionic-angular/components/item/item';
import Basepage from '../base';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { EditMoviesPage } from '../edit-movies/edit-movies';
import { ChartPage } from '../chart/chart';
import { SetNotificationPage } from '../set-notification/set-notification';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage extends Basepage {

  items = [];
  uid: string = '';
  results = [];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,

    public toaseCtrl: ToastController,
    public loaddingCtrl: LoadingController,
    public barcode: BarcodeScanner
  ) {
    super(toaseCtrl, loaddingCtrl)
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.showLoading("Fetching data...")

    this.firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .collection('movies')
    .snapshotChanges() //คล้ายๆ values change
    .subscribe((data:any) =>{
      this.items = [];
      //console.log(data);
      data.map(action =>{ //loop for (int i=0.....)
        this.items.push({
          id : action.payload.doc.id,
          data : action.payload.doc.data()
        })
      });

      this.results = this.items; // insert into arr

      this.hideLoading();
    }, (error) =>{
      this.hideLoading();
      this.showToast(error);
    })
  }

  navigateAddMovie(){
    this.navCtrl.push(AddMoivePage);
  }

  delete(movieId){
    this.showLoading("Delete...")
    this.firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .collection('movies')
    .doc(movieId)
    .delete()
    .then( () =>{
      this.hideLoading();
      this.showToast("success");
    })
    .catch(error => {
      this.hideLoading();
      this.showToast(error);
    });
  }

  edit(movieId){
    this.navCtrl.push(EditMoviesPage, {
      id : movieId //object
    });
  }

  navigateChart(){
    this.navCtrl.push(ChartPage);
  }

  getItems(event){
    let val = event.target.value;
    //console.log(val);
    if(val == ''){
      this.results = this.items;
    }

    if(val && val.trim() != ''){///trim = cut ''
      this.results = this.items.filter( (item) =>{
        return (item.data.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  navi_No(movie){
    this.navCtrl.push(SetNotificationPage, {
      movie: movie
    });
  }

  scan(){
    this.barcode.scan().then((barcodeData)=>{
      this.get_item(barcodeData.text);
    }, (err) =>{

    });
  }

  get_item(code){
    //console.log(val);
    if(code == ''){
      this.results = this.items;
    }

    if(code && code.trim() != ''){///trim = cut ''
      this.results = this.items.filter( (item) =>{
        return (item.data.barcode.toLowerCase().indexOf(code.toLowerCase()) > -1);
      })
    }
  }
}
