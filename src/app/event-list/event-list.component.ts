import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../agenda.service';
import { Agenda } from '../model/agenda';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {

  public agenda: Agenda;
  public days: string[];
  private sub: Subscription;

  constructor(private agendaService: AgendaService) { }

  ngOnInit(): void {
    this.sub = this.agendaService.get().subscribe((agenda: Agenda) => {
      this.agenda = agenda;
      this.days = Object.keys(agenda)
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  formatDate(isoDate: string): string {
    let tokens = isoDate.split('-');
    if (tokens.length != 3) {
      throw new Error(`'${isoDate}' is not a valid ISO date.`);
    }
    let year = tokens[0], month = tokens[1], day = tokens[2];
    let date = new Date(Date.UTC(parseInt(year), parseInt(month)-1, parseInt(day), 0, 0, 0, 0));
    let options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    let thisYear = new Date().getFullYear();
    let locale = new Intl.DateTimeFormat('de-CH', options);
    let parts: any = (<any>locale).formatToParts(date);
    if (thisYear === parseInt(year)) {
      return `${parts[0].value} ${parts[2].value}${parts[3].value} ${parts[4].value}`
    } else {
      return `${parts[0].value} ${parts[2].value}${parts[3].value} ${parts[4].value} ${parts[6].value}`
    }
  }
}
