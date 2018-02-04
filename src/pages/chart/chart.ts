import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import Basepage from '../base';


@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'

})
export class ChartPage extends Basepage {
  @ViewChild('lineCanvas') lineCanvas;
  uid: string;
  lineChart: any;
  datas = [];
  labels = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    super(toastCtrl, loadingCtrl);
  }

  ionViewDidLoad() {
    //this.showLoading('loading chart...');
    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .collection('movies')
    .valueChanges() //คล้ายๆ values change
    .subscribe(movies =>{
      this.datas = movies.map((movie:any) =>{
        return movie.length;
      })
      this.labels = movies.map((movie:any) =>{
        return movie.name;
      })
/////////
this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
  type: 'line',
  data: {
      labels: this.labels,
      datasets: [
          {
              label: "My First dataset",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 5,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.datas,
              spanGaps: false,
          }
      ]
  }

});
/////////////
    });
  }
}
