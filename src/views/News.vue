<template>
  <div>
    <h2 class="hidden">News</h2>
    <ul>
      <li v-for="day in days">
        <h3>{{ buildTitle(day) }}</h3>

        <ul>
          <li v-for="ev in news[day]">
            <a v-bind:href="ev.venue.URL" class="venue-badge">{{ formatDate(ev.datetime) }}</a>
            &nbsp;
            <a v-bind:href="ev.url">{{ ev.title }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {formatDate} from '@/shared/formatted-date'

  @Component({})
  export default class News extends Vue {
    public news: {} = {}
    public days: string[] = []

    public formatDate(date: string): string {
      return formatDate(date)
    }

    public mounted() {
      fetch('/rest/news').then((response) => response.json()).then((newsJson) => {
        this.days = Object.keys(newsJson).sort().reverse()
        this.news = newsJson
      })
    }

    buildTitle(isoDate: string): string {
      const MS_IN_A_DAY = 1000 * 60 * 60 * 24
      let date = new Date(isoDate)
      let today = new Date()
      let diffInMs = today.getTime() - date.getTime()
      let diffInDays = Math.floor(diffInMs / MS_IN_A_DAY)

      switch (diffInDays) {
        case 0:
          return 'Heute gefunden'
        case 1:
          return 'Gestern gefunden'
        default:
          return `Vor ${diffInDays} Tagen gefunden`
      }
    }

  }
</script>
