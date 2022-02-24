import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import {IonicStorageModule} from '@ionic/storage-angular'
import {StorageService} from './services/storage.service'
import {AuthService} from './services/auth.service'
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ // Modules
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ // Service
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StorageService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
