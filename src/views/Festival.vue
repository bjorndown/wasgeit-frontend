<template>
    <div>
        <h2 hidden aria-hidden="false">Festivals</h2>

        <h3>Momentan</h3>

        <ul>
            <li v-for="festival in currentFestivals">
                <span class="venue-badge">{{ festival.title }}</span>
                <span class="festival-location">{{ festival.location }}</span>
                <FestivalDetailsComponent v-bind:festival="festival"></FestivalDetailsComponent>
            </li>
        </ul>

        <template v-for="startDate in getDates(upcomingFestivals)">
            <h3>Ab {{ formatDate(startDate) }}</h3>

            <ul>
                <li v-for="festival in upcomingFestivals[startDate]">
                    <span class="venue-badge">{{ festival.title }}</span>
                    <span class="festival-location">{{ festival.location }}</span>
                    <FestivalDetailsComponent v-bind:festival="festival"></FestivalDetailsComponent>
                </li>
            </ul>
        </template>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {formatDate} from '@/shared/formatted-date'
    import {Festival} from '@/model'
    import isAfter from 'date-fns/isAfter'
    import isBefore from 'date-fns/isBefore'
    import addDays from 'date-fns/addDays'
    import FestivalDetailsComponent from '@/components/FestivalDetails.vue'

    interface StartDateToFestival {
        [date: string]: Festival[]
    }

    @Component({
        components: {
            FestivalDetailsComponent
        }
    })
    export default class WhatElseView extends Vue {
        public currentFestivals: Festival[] = []
        public upcomingFestivals: StartDateToFestival = {}

        public formatDate(date: string): string {
            return formatDate(date)
        }

        public mounted() {
            fetch('/rest/festivals')
                .then((response) => response.json())
                .then((festivalJson) => {
                    this.currentFestivals = this.getCurrentFestivals(festivalJson)
                    this.upcomingFestivals = this.getUpcomingFestivals(festivalJson)
                })
        }

        public getCurrentFestivals(festivals: Festival[]): Festival[] {
            const now = new Date()
            return festivals.filter((festival) => isAfter(addDays(new Date(festival.date_end), 1), now) &&
                isBefore(new Date(festival.date_start), now))
        }

        public getUpcomingFestivals(festivals: Festival[]): StartDateToFestival {
            const now = new Date()
            const upcomingFestivals = festivals.filter((festival) => isAfter(new Date(festival.date_start), now))
            const startDateToFestival: StartDateToFestival = {}

            for (const festival of upcomingFestivals) {
                if (!startDateToFestival[festival.date_start]) {
                    startDateToFestival[festival.date_start] = []
                }
                startDateToFestival[festival.date_start].push(festival)
            }

            return startDateToFestival
        }

        public getDates(festivals: StartDateToFestival): string[] {
            return Object.keys(festivals).sort()
        }

    }
</script>

<style scoped>
    .festival-location {
        font-size: small;
        margin: 0 .2em 0 .2em;
    }

    ul li {
        margin-bottom: .5em;
    }
</style>
