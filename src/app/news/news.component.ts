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
    const MS_IN_A_DAY = 1000 * 60 * 60 * 24;
    let date = new Date(isoDate);
    let today = new Date();
    let diffInMs = today.getTime() - date.getTime();
    let diffInDays = Math.floor(diffInMs / MS_IN_A_DAY);

    switch (diffInDays) {
      case 0:
        return 'Heute gefunden';
      case 1:
        return 'Gestern gefunden';
      case 2:
        return 'Vorgestern gefunden';
      default:
        return `Vor ${diffInDays} Tagen gefunden`;
    }
  }

  formatDate = formatDate
}
