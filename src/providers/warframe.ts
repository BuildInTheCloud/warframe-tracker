import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class Warframe {
  data: any;
  console: any = { ps4: 'ps4', xbox: 'xbox', pc: 'pc' };
  feeds: any = {
      ps4: 'warframe/api/ps4',
      xbox: 'warframe/api/xbox',
      pc: 'warframe/api/pc'
  };

  constructor(public http: Http, public storage: Storage) {
  }

  public getData(type) {
    var url: string = this.feeds[type];

    if (this.data) {
      return Promise.resolve(this.data);
    }
    // get data
    return new Promise(resolve => {
      this.http.get(url).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      });
    });
  }

  public getPlatform(){
    let platform = this.storage.get('Warframe_Platform');
    return platform || 'pc';
  }

  public setPlatform(platform){
    this.storage.set('Warframe_Platform', platform);
  }
}