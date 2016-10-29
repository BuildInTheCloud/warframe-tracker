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
          credits: missionInfo.missionReward && missionInfo.missionReward.credits ? missionInfo.missionReward.credits : 0,
          items: []
        }
      };

      //if - items
      if (missionInfo.missionReward.items && missionInfo.missionReward.items.length > 0) {
        missionInfo.missionReward.items.forEach((reward_item) => {
          //add the item to our reward item array
          let item_type = reward_item.ItemType || reward_item;
          alert_item.rewards.items.push({
            item: item_type.substring((item_type.lastIndexOf('/') + 1))
          });
        })
      }

      //if - countedItems
      if (missionInfo.missionReward.countedItems && missionInfo.missionReward.countedItems.length > 0) {
        missionInfo.missionReward.countedItems.forEach((counted_item) => {
          //add the counted item to our reward items array
          alert_item.rewards.items.push({
            item: counted_item.ItemType.substring((counted_item.ItemType.lastIndexOf('/') + 1)),
            count: counted_item.ItemCount
          });
        })
      }

      //add alert to list
      this.feed_data.alerts.push(alert_item);
    });
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
