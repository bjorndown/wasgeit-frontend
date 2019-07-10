<template>
    <div>
        <input type='text' v-model="searchStr"/>
        <ul>
            <li v-for="day in Object.keys(filteredAgenda()).sort()">
                <h3>{{ day}}</h3>
                <ul>
                    <li v-for="ev in filteredAgenda()[day]">
                        <a v-bind:href="ev.venue.URL" class="venue-badge">{{ ev.venue.Name }}</a>
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
    import {agendaSearch} from '@/agenda-filter-operator'

    @Component({})
    export default class Agenda extends Vue {
        public searchStr: string = ''
        public agenda: {} = {}
        public days: string[] = []

        public filteredAgenda() {
            return agendaSearch(this.agenda, this.searchStr)
        }

        public format(day: string): string {
            return formatDate(day)
        }

        public mounted() {
            fetch('/rest/agenda').then((response) => response.json()).then((agendaJson) => {
                this.agenda = agendaJson
                this.days = Object.keys(agendaJson).sort()
            })
        }
    }
</script>
