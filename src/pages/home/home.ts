import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Warframe } from '../../providers/warframe';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public service: Warframe) {
    this.loadData();
  }

  loadData(){
    this.service.getData('pc').then(data => {
      console.log(data);
    })
  }

}
