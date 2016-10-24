import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Warframe } from '../../providers/warframe';
import { WarframeMapping } from '../../providers/mapping';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  feed_data: any = {
    alerts:{}
  };
  warframe_mapping: any;

  constructor(public navCtrl: NavController, public warframe_service: Warframe, public mapping_service: WarframeMapping) {
    this.loadData();
  }

  /* Load Warframe data */
  loadData(){
    this.mapping_service.getMapping(false)
    .then(data => {
      //alert(data);
      this.warframe_mapping = data || [];
      console.log(this.warframe_mapping);
      return Promise.resolve();
    })
    .then(data => {
      this.warframe_service.getData('pc').then(data => {
        console.log(data);

        //prepare data
        this.feed_data.alerts = data.Alerts || [];
        this.mapAlerts(this.feed_data.alerts);
      })
    });
  }

  /* Prepare warframe alerts */
  mapAlerts(warframe_alerts){
    warframe_alerts.forEach((item) => {
      let missionInfo = item.MissionInfo || {};
      let expiry = item.Expiry || {};

      let alert_item =  {
        node: this.warframe_mapping.nodes[missionInfo.location],
        faction: this.warframe_mapping.factions[missionInfo.faction],
        expiration: expiry.sec,
        rewards: {
          credits: missionInfo.missionReward && missionInfo.missionReward.credits ? missionInfo.missionReward.credits : 0,
          items: []
        }
      };

      //items
      if(missionInfo.missionReward.items && missionInfo.missionReward.items.length > 0){
        missionInfo.missionReward.items.forEach((reward_item) => {
          //add the item to our reward item array
          let item_type = reward_item.ItemType || reward_item;
          alert_item.rewards.items.push({
            item:item_type.substring((item_type.lastIndexOf('/') + 1))
          });
        })
      }

      //countedItems
      if(missionInfo.missionReward.countedItems && missionInfo.missionReward.countedItems.length > 0){
        missionInfo.missionReward.countedItems.forEach((counted_item) => {
          //add the counted item to our reward items array
          alert_item.rewards.items.push({
            item: counted_item.ItemType.substring((counted_item.ItemType.lastIndexOf('/') + 1)),
            count: counted_item.ItemCount
          });
        })
      }

      //planet | stage | mission 

    });
  }

  mapInvasions(invasions){
  }
  
  mapSyndicates(syndicates){
  }

  mapVoidFissures(fissures){
  }

  mapSorties(sorties){
  }
}
