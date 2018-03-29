import {Component, OnInit} from '@angular/core';
import {AgendaService} from '../agenda.service';
import {Agenda} from '../model/agenda';
import {Subscription} from 'rxjs/Subscription';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';
import {formatDate} from "../date";
import {Event} from "../model/event";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit, OnDestroy {

  public agenda: Agenda;
  public days: string[];
  private sub: Subscription;

  constructor(private agendaService: AgendaService) {
  }

  ngOnInit(): void {
    this.sub = this.agendaService.get().subscribe((agenda: Agenda) => {
      this.agenda = agenda;
      this.days = Object.keys(agenda)
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  createCalendarEntry(event: Event) {
    let filename = `${event.title}.ics`;
    let now = this.toCalendarTime(new Date());

    let start = this.toCalendarTime(new Date(event.datetime));

    let abitlater = new Date(event.datetime);
    abitlater.setHours(abitlater.getHours() + 2);
    let end = this.toCalendarTime(abitlater)

    let data = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART:${start}
DTEND:${end}
CREATED:${now}
DESCRIPTION:${event.title}
LOCATION:${event.venue.Name}
URL:${event.url}
STATUS:CONFIRMED
SUMMARY:${event.title}
TRANSP:OPAQUE
SEQUENCE:0
END:VEVENT
END:VCALENDAR
`;

    let blob = new File([data], filename, {type: 'text/calendar'});
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      let elem = window.document.createElement('a');
      let href = window.URL.createObjectURL(blob);
      elem.href = href;
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
      window.URL.revokeObjectURL(href)
    }
  }

  toCalendarTime(date: Date): string {
    return date.toISOString().slice(0, -5).replace(/[-:.]/g, '') + 'Z'
  }

  formatDate = formatDate
}
