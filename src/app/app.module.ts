import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgendaService } from './agenda.service';
import { AppRoutingModule } from './app-routing.module';
import { NewsComponent } from './news/news.component';
import { AgendaComponent } from './agenda/agenda.component';
import {NewsService} from "./news.service";


@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    AgendaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    AppRoutingModule
  ],
  providers: [AgendaService, NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
