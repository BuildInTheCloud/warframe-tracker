import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Warframe {
  data: any;
  console: any = { ps4: 'ps4', xbox: 'xbox', pc: 'pc' };
  feeds: any = {
      ps4: 'warframe/api/ps4',
      xbox: 'warframe/api/xbox',
      pc: 'warframe/api/pc'
  };

  constructor(public http: Http) {
  }

  getData(type) {
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
}