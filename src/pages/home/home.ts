import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Warframe } from '../../providers/warframe';
import { WarframeMapping } from '../../providers/mapping';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  feed_data: any = {
    alerts: []
  };
  warframe_mapping: any;

  constructor(public navCtrl: NavController, public warframe_service: Warframe, public mapping_service: WarframeMapping) {
    this.loadData();
  }

  /* Load Warframe data */
  loadData() {
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
          this.mapAlerts(data.Alerts || []);
        })
      });
  }

  /* Prepare warframe alerts */
  mapAlerts(warframe_alerts) {
    warframe_alerts.forEach((item) => {
      let missionInfo = item.MissionInfo || {};
      let expiry = item.Expiry || {};

      let node_item = this.warframe_mapping.nodes[missionInfo.location];
      let node_split = node_item ? node_item.split('|') : [];

      let alert_item = {
        node: (node_split[1] || 'N/A'),
        planet: (node_split[0] || 'N/A'),
        mission: this.warframe_mapping.missions[missionInfo.missionType],
        faction: this.warframe_mapping.factions[missionInfo.faction],
        expiration: expiry.sec,
        minEnemyLevel: missionInfo.minEnemyLevel,
        maxEnemyLevel: missionInfo.maxEnemyLevel,
        rewards: {
          credits: 0,
          items: []
        }
      };

      //if - credits
      if(missionInfo.missionReward && missionInfo.missionReward.credits){
        alert_item.rewards.credits = missionInfo.missionReward.credits;
      }

      //if - items
      if (missionInfo.missionReward.items && missionInfo.missionReward.items.length > 0) {
        missionInfo.missionReward.items.forEach((reward_item) => {
          //add the item to our reward item array
          let item_type = reward_item.ItemType || reward_item.substring(reward_item.lastIndexOf('/') + 1);
          let item_img = this.warframe_mapping.reward_images[item_type] || '';

          alert_item.rewards.items.push({
            item: item_img ? item_img.substring(item_img.lastIndexOf('/') + 1)
              .replace('_', '').replace('_', '')
              .replace('.png', '')
              .replace(/([A-Z])/g, ' $1') //insert space between camel-cased letters
              .replace(/^./, str => str.toUpperCase() ) /*make spaced words uppercase*/
              : item_type.substring((item_type.lastIndexOf('/') + 1)).replace('_', ''),
              
            img: item_img,
            endo: reward_item.substring(reward_item.lastIndexOf('/') + 1).indexOf('AlertFusionBundle') > -1,
            blueprint:reward_item.substring(reward_item.lastIndexOf('/') + 1).indexOf('Blueprint') > -1 
          });
        })
      }

      //if - countedItems
      if (missionInfo.missionReward.countedItems && missionInfo.missionReward.countedItems.length > 0) {
        missionInfo.missionReward.countedItems.forEach((counted_item) => {
          //add the counted item to our reward items array
          let counted_item_name = counted_item.ItemType.substring((counted_item.ItemType.lastIndexOf('/') + 1));
          let item_img = this.warframe_mapping.reward_images[counted_item_name] || '';

          alert_item.rewards.items.push({
            item: item_img ? item_img.substring(item_img.lastIndexOf('/') + 1)
              .replace('_', '').replace('_', '')
              .replace('.png', '')
              .replace(/([A-Z])/g, ' $1') //insert space between camel-cased letters
              .replace(/^./, str => str.toUpperCase() ) /*make spaced words uppercase*/ 
              : counted_item_name,

            count: counted_item.ItemCount || 0,
            img: item_img,
            endo: counted_item_name.indexOf('AlertFusionBundle') > -1,
            blueprint:counted_item_name.substring(counted_item_name.lastIndexOf('/') + 1).indexOf('Blueprint') > -1 
          });
        })
      }

      //add alert to list
      this.feed_data.alerts.push(alert_item);
    });
    console.log(this.feed_data.alerts);
  }

  mapInvasions(invasions) {
  }

  mapSyndicates(syndicates) {
  }

  mapVoidFissures(fissures) {
  }

  mapSorties(sorties) {
  }
}
