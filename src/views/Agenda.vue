<template>
    <div>
        <h2 hidden aria-hidden="false">Agenda</h2>
        <input type="search" v-model="searchStr"
               @input="updateAgenda()"
               v-bind:list="hasAutoComplete()"
               aria-label="search for specific events"/>
        <datalist id="venues">
            <option v-for="venue in venues">{{ venue.Name }}</option>
        </datalist>
        <div class="search-mode-control">
            <input id="search-mode-title" type="radio" value="title" v-model="searchMode" @change="resetSearchStr()">
            <label for="search-mode-title">Titel</label>

            <input id="search-mode-date" type="radio" value="date" v-model="searchMode" @change="resetSearchStr()">
            <label for="search-mode-date">Datum</label>

            <input id="search-mode-venue" type="radio" value="venue" v-model="searchMode" @change="resetSearchStr()">
            <label for="search-mode-venue">Lokal</label>
        </div>
        <ul>
            <li v-for="day in pagedDays">
                <h3>{{ formatDate(day) }}</h3>
                <ul>
                    <li v-for="ev in filteredAgenda[day]">
                        <a v-bind:href="ev.venue.URL" class="venue-badge">{{ ev.venue.Name }}</a>
                        <a v-bind:href="ev.url">{{ ev.title }}</a>
                    </li>
                </ul>
            </li>
        </ul>
        <p v-if="noResult()">Sorry, kein Resultat für diesen Suchbegriff.</p>
        <ul class="pager">
            <li v-if="hasPreviousPage()">
                <router-link aria-label="previous page" class="button" v-bind:to="previousPage()">&#9664;</router-link>
            </li>
            <li v-if="hasNextPage()">
                <router-link aria-label="next page" class="button" v-bind:to="nextPage()">&#9654;</router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {formatDate} from '@/shared/formatted-date'
    import {Agenda, Venue} from '@/model'
    import {Route} from 'vue-router'

    interface VenueSet {
        [name: string]: Venue
    }

    @Component({
            // TODO FIXME wtf
            watch: {
                $route(to: Route, from: Route) {
                    (this as any).updateAgenda()
                }
            }
        }
    )
    export default class AgendaView extends Vue {
        public searchStr: string = ''
        public searchMode: SearchMode = 'title'

        public agenda: Agenda = {}
        public filteredAgenda: Agenda = {}

        public days: string[] = []
        public pagedDays: string[] = []

        public venues: VenueSet = {}

        public readonly daysPerPage = 20

        public updateAgenda() {
            this.filteredAgenda = filterAgenda(this.agenda, this.searchStr, this.searchMode)

            const sliceStart = (this.page() - 1) * this.daysPerPage
            const sliceEnd = this.page() * this.daysPerPage
            this.days = Object.keys(this.filteredAgenda)
            this.pagedDays = this.days.slice(sliceStart, sliceEnd)
        }

        public resetSearchStr(): void {
            this.searchStr = ''
        }

        public hasAutoComplete(): string | null {
            return this.searchMode === 'venue' ? 'venues' : null
        }

        public formatDate(day: string): string {
            return formatDate(day)
        }

        public hasPreviousPage() {
            return this.page() > 1
        }

        public hasNextPage() {
            return this.page() * this.daysPerPage <= this.days.length
        }

        public goToPage(pageNumber: number) {
            return {name: 'agenda', params: {page: pageNumber}}
        }

        public nextPage() {
            return this.goToPage(this.page() + 1)
        }

        public previousPage() {
            return this.goToPage(this.page() - 1)
        }

        public noResult(): boolean {
            return Object.keys(this.filteredAgenda).length === 0
        }

        public page(): number {
            const parsed = parseInt(this.$attrs.page, 10)
            if (isNaN(parsed)) {
                console.error(`${this.$attrs.page} is not a number`)
                return 1
            }
            return parsed
        }

        public mounted() {
            fetch('/rest/agenda')
                .then((response) => response.json())
                .then((agendaJson) => {
                    this.agenda = agendaJson
                    this.days = Object.keys(agendaJson).sort()
                    this.venues = this.collectVenues()
                }).then(() => this.updateAgenda())
        }

        private collectVenues(): VenueSet {
            // TODO get them from backend?
            const venues: { [name: string]: Venue } = {}
            for (const day of Object.keys(this.agenda)) {
                for (const ev of this.agenda[day]) {
                    venues[ev.venue.ShortName] = ev.venue
                }
            }
            return venues
        }


    }

    function normalizeDate(date: string) {
        return formatDate(date)
            .replace(/\./g, '')
            .replace(/ +/g, ' ')
            .toLowerCase()
    }

    type SearchMode = 'title' | 'date' | 'venue'

    const filterFunctions = {
        title(day: string, searchStr: string, agenda: Agenda, filteredAgenda: Agenda) {
            for (const event of agenda[day]) {
                if (event.title.toLowerCase().includes(searchStr.toLowerCase())) {
                    if (!filteredAgenda[day]) {
                        filteredAgenda[day] = []
                    }

                    filteredAgenda[day].push(event)
                }
            }
        },
        date(day: string, searchStr: string, agenda: Agenda, filteredAgenda: Agenda) {
            const cleanedDate = normalizeDate(day)
            if (cleanedDate.includes(searchStr.toLowerCase())) {
                filteredAgenda[day] = agenda[day]
            }
        },
        venue(day: string, searchStr: string, agenda: Agenda, filteredAgenda: Agenda) {
            for (const event of agenda[day]) {
                if (event.venue.Name.toLowerCase().includes(searchStr.toLowerCase())) {
                    console.debug(`${event.venue.Name} does include ${searchStr}`)
                    if (!filteredAgenda[day]) {
                        filteredAgenda[day] = []

                    }
                    filteredAgenda[day].push(event)
                }
            }
        }
    }

    export function filterAgenda(agenda: Agenda, searchStr: string, searchMode: SearchMode): Agenda {
        if (searchStr === '') {
            return agenda
        }

        const filteredAgenda: Agenda = {}
        const filterFn = filterFunctions[searchMode]

        for (const day in agenda) {
            if (agenda.hasOwnProperty(day)) {
                filterFn(day, searchStr, agenda, filteredAgenda)
            }
        }

        return filteredAgenda
    }

</script>
