import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {formatDate} from "../date";
import {News} from "../model/news";
import {NewsService} from "../news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public news: News;
  public days: string[];
  private sub: Subscription;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.sub = this.newsService.get().subscribe((news: News) => {
      this.news = news;
      this.days = Object.keys(news).sort().reverse()
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  buildTitle(isoDate: string): string {
    let date = new Date(isoDate);
    let today = new Date();
    let diff = today.getDate() - date.getDate();

    switch (diff) {
      case 0:
        return 'Heute gefunden';
      case 1:
        return 'Gestern gefunden';
      default:
        return `Vor ${diff} Tagen gefunden`;
    }
  }

  formatDate = formatDate
}
