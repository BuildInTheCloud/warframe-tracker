import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

//pipes
import { CommaSeparatedNumberPipe } from '../pipes/comma-separate';

//ionic services
import { Storage } from '@ionic/storage';

//--services
import { Warframe } from '../providers/warframe';
import { WarframeMapping } from '../providers/mapping';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CommaSeparatedNumberPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    /*{
      provide: Warframe,
      useFactory: () => { return new Warframe(); },
      deps: [],
      multi:true
    },
    {
      provide: WarframeMapping,
      useFactory: () => { return new WarframeMapping(); },
      deps:[],
      multi:true
    },*/
    Warframe,
    WarframeMapping,
    Storage 
  ]
})
export class AppModule {}
