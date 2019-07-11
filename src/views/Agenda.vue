<template>
    <div>
        <h2 hidden aria-hidden="false">Agenda</h2>
        <input type='text' v-model="searchStr" @input="updateAgenda()" aria-label="search for specific events"/>
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
        <ul class="pager">
            <li v-if="hasPreviousPage()">
                <router-link aria-label="previous page" class="button" v-bind:to="previousPage()">&#11207;</router-link>
            </li>
            <li v-if="hasNextPage()">
                <router-link aria-label="next page" class="button" v-bind:to="nextPage()">&#11208;</router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {formatDate} from '@/shared/formatted-date'
    import {agendaSearch} from '@/agenda-filter-operator'
    import {Agenda} from '@/model'
    import {Route} from 'vue-router'

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
        public agenda: Agenda = {}
        public filteredAgenda: Agenda = {}
        public days: string[] = []
        public pagedDays: string[] = []
        public readonly daysPerPage = 20

        public updateAgenda() {
            this.filteredAgenda = agendaSearch(this.agenda, this.searchStr)
            const sliceStart = (this.page() - 1) * this.daysPerPage
            const sliceEnd = this.page() * this.daysPerPage
            this.days = Object.keys(this.filteredAgenda)
            this.pagedDays = this.days.slice(sliceStart, sliceEnd)
            console.debug(`start: ${sliceStart}, end: ${sliceEnd}, all: ${this.days.length}`)
        }

        // TODO FIXME wtf
        public beforeRouteUpdate(to: Route, from: Route, next: any) {
            console.debug('beforeRouteUpdate')
            this.updateAgenda()
            next()
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
                }).then(() => this.updateAgenda())
        }
    }
</script>
