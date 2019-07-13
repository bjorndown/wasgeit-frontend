<template>
    <div class="festival-detail-root">
        <button class="collapse-button" @click="isHidden = !isHidden">
            {{ isHidden ? '+' : '-' }}
        </button>

        <div class="festival-detail-content" v-bind:class="{ hidden: isHidden }">
            <h4>Öffnungszeiten</h4>
            <table>
                <tbody>
                <tr v-for="ot in festival.opening_times">
                    <td class="days">{{ ot.days }}</td>
                    <td class="times">{{ ot.start }} - {{ ot.end }}</td>
                </tr>
                </tbody>
            </table>

            <h4>Endet am</h4>
            {{ formatDate(festival.date_end) }}

            <h4>Website</h4>
            <a class="festival-url" v-bind:href="festival.url">{{ makePresentable(festival.url) }}</a>

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    import {Festival} from '@/model'
    import {formatDate} from '@/shared/formatted-date'
    import isAfter from 'date-fns/isAfter'

    @Component({})
    export default class FestivalDetailsComponent extends Vue {
        @Prop() public festival!: Festival
        public isHidden: boolean = true

        public formatDate(date: string): string {
            return formatDate(date)
        }

        public hasNotStartedYet(): boolean {
            return isAfter(new Date(this.festival.date_start), new Date())
        }

        public makePresentable(url: string): string {
            return url.replace(/https:\/\/|http:\/\//, '').replace(/\/$/, '')
        }
    }
</script>


<style scoped>
    .festival-detail-root {
        display: inline;
    }

    .festival-detail-content {
        margin-bottom: 1em;
    }

    button.collapse-button {
        border-style: none;
        border-radius: 4px;
        font-weight: bold;
        padding: .3em .4em;
        min-width: 1.5em;
        background: #eee;
    }

    a.festival-url {
        font-size: smaller;
        padding: 0;
    }

    table {
        border-spacing: 0;
    }

    td.days {
        padding: 0
    }

    td.times {
        padding-left: 1em;
    }
</style>
