import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the Mapping provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WarframeMapping {
  public cache: any = [];
  public refresh: boolean;

  constructor(public http: Http, public storage: Storage) {  
  }

  public loadData(refresh){
    return new Promise(resolve => {
      var live_data = new Date();
      this.http.get('../assets/data/mapping.json?live=' + live_data.getTime())
        .map(res => res.json())
        .subscribe(data => {
          this.cache = data;
          this.storage.set('warframe-mappings', JSON.stringify(this.cache));
          resolve(this.cache);
        });
    });
  }

  public getMapping(refresh){
    if(!this.cache || this.cache.length <= 0 || refresh){
      console.log('from function');
      return this.loadData(refresh);
    }
    else{
      if(this.cache && this.cache.length > 0){
        return Promise.resolve(this.cache);
      }
      else{
        console.log('from storage');
        return this.storage.get('warframe-mappings');
      }
    }
  }
}
