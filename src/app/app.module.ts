import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { EventListComponent } from './event-list/event-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AgendaService } from './agenda.service';


@NgModule({
  declarations: [
    AppComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [AgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
