import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SummaryPage } from '../summary/summary';
import { HttpApiProvider } from "../../providers/http-api/http-api";
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the ConsultlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultlist',
  templateUrl: 'consultlist.html',
  providers: [HttpApiProvider]
})
export class ConsultlistPage {
  load:any;
  // list =  [{"apt_date":"12-July-2018","doctor":"Dr. Jacob Abraham","clinic":"Deira Clinic","modules":[{"type":"lab","action":"lab","icon":"water","color":"danger"},{"type":"Examination","action":"examination","icon":"paper","color":"secondary"},{"type":"vital","action":"vital","icon":"heart","color":"danger"}]},{"apt_date":"01-June-2018","doctor":"Dr. Omar Abdullah","clinic":"Deira Clinic","modules":[{"type":"lab","action":"lab","icon":"water","color":"danger"},{"type":"Examination","action":"examination","icon":"paper","color":"secondary"},{"type":"vital","action":"vital","icon":"heart","color":"danger"}]},{"apt_date":"13-March-2018","doctor":"Dr. Omar Abdullah","clinic":"Naif Clinic","modules":[{"type":"lab","action":"lab","icon":"water","color":"danger"},{"type":"Examination","action":"examination","icon":"paper","color":"light"},{"type":"vital","action":"vital","icon":"heart","color":"danger"}]},{"apt_date":"01-Jan-2018","doctor":"Dr. Ammara Amber","clinic":"Al Rigga Clinic","modules":[{"type":"lab","action":"lab","icon":"water","color":"danger"},{"type":"Examination","action":"examination","icon":"paper","color":"light"},{"type":"vital","action":"vital","icon":"heart","color":"danger"}]}];
  list;
  op_number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loader: LoadingController,
    private httpApi: HttpApiProvider) {
      this.op_number = localStorage.getItem('op_number');
}

  visitSummary(obj){
    this.navCtrl.push(SummaryPage,{
      consult_id: obj.consult_id,
      office_id:obj.office_id,
      doctor_name:obj.doctors_name
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultlistPage');
    this.load = this.loader.create({spinner: 'dots',content : 'Loading Consults!'});
    this.load.present()
      .then(()=>{
      this.httpApi.getConsultList(this.op_number)
        .subscribe((result:any)=>{
          this.list = JSON.parse(result._body).data;
          this.load.dismiss();
        },error=>{
          console.log(error);
          this.load.dismiss();
        })});
  }

}
