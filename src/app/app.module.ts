import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AgendaService } from './agenda.service';


@NgModule({
  declarations: [
    AppComponent,
    VenueListComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [AgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
