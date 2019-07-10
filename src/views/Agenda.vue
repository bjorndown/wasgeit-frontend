<template>
    <div>
        <input type='text' v-model="searchStr" @input="updateAgenda()"/>
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
                <router-link v-bind:to="previousPage()">zrügg</router-link>
            </li>
            <li v-if="hasNextPage()">
                <router-link v-bind:to="nextPage()">füre</router-link>
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
                '$route'(to: Route, from: Route) {
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
        beforeRouteUpdate(to: Route, from: Route, next: any) {
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

        public nextPage() {
            return {name: 'agenda', params: {page: this.page() + 1}}
        }

        public previousPage() {
            return {name: 'agenda', params: {page: this.page() - 1}}
        }

        public page(): number {
            return parseInt(this.$attrs.page, 10)
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
