import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NewsComponent} from "./news/news.component";
import {AgendaComponent} from "./agenda/agenda.component";

const routes: Routes = [
  { path: '', redirectTo: '/agenda', pathMatch: 'full' },
  { path: 'agenda', component: AgendaComponent },
  { path: 'news', component: NewsComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
