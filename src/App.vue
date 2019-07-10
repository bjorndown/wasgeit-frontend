<template>
    <div id="app" class="container">
        <div class="header">
            <h1>was<span>geit</span></h1>
            <ul id="nav" role="menu">
                <li>
                    <router-link to="/agenda">Agenda</router-link>
                </li>
                <li>
                    <router-link to="/news">News</router-link>
                </li>
            </ul>
            <p class="force-reload-banner" v-bind:hidden="isForceReloadBannerHidden()">
                <a v-on:click="forceReload">Deine Version von wasgeit ist veraltet. Tipp hier um sie zu
                    aktualisieren.</a>
            </p>
        </div>
        <router-view/>
        <small>Built from <a v-bind:href="url">{{ commit() }} at {{ time() }}</a></small>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {buildInfo} from './shared/build-info'

    @Component({
        components: {}
    })
    export default class App extends Vue {
        public showForceReloadButton: boolean = false;

        public commit() {
            return buildInfo.commit.slice(0, 8)
        }

        public time() {
            return buildInfo.time
        }

        public url() {
            return  `https://github.com/bjorm/wasgeit-frontend/commit/${buildInfo.commit}`
        }

        public forceReload(): void {
            location.reload(true)
        }

        public isForceReloadBannerHidden(): boolean {
            return !this.showForceReloadButton;
        }
    }
</script>
