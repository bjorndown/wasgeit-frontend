import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../agenda.service';
import { Agenda } from '../model/agenda';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { formatDate } from "../date";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit, OnDestroy {

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

  formatDate = formatDate
}
