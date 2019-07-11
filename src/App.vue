<template>
    <div id="app" class="container">
        <header class="header">
            <h1>was<span>geit</span></h1>
            <p class="force-reload-banner" v-bind:hidden="isForceReloadBannerHidden()">
                <a v-on:click="forceReload">Deine Version von wasgeit ist veraltet. Tipp hier um sie zu
                    aktualisieren.</a>
            </p>
        </header>
        <nav>
            <ul role="menubar">
                <li role="menuitem">
                    <router-link class="button" to="/agenda">Agenda</router-link>
                </li>
                <li role="menuitem">
                    <router-link class="button" to="/news">News</router-link>
                </li>
            </ul>
        </nav>
        <main class="content">
            <router-view/>
        </main>
        <footer class="footer">
            <small>Built from <a v-bind:href="url()">{{ commit() }} at {{ time() }}</a></small>
        </footer>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {buildInfo} from './shared/build-info'

    @Component({})
    export default class App extends Vue {
        public showForceReloadButton: boolean = false

        public commit() {
            return buildInfo.commit.slice(0, 8)
        }

        public time() {
            return buildInfo.time
        }

        public url() {
            return `https://github.com/bjorm/wasgeit-frontend/commit/${buildInfo.commit}`
        }

        public forceReload(): void {
            location.reload(true)
        }

        public isForceReloadBannerHidden(): boolean {
            return !this.showForceReloadButton
        }

        public mounted() {
            this.checkIfReloadBannerShouldBeShown()
                .then((showForceReloadButton: boolean) => {
                    console.debug(`Will show force reload banner: ${showForceReloadButton}`)
                    return showForceReloadButton
                })
                .then((showForceReloadButton: boolean) => this.showForceReloadButton = showForceReloadButton)
        }

        public getRemoteCommitHash(): Promise<string> {
            return fetch('/version.json')
                .then((response) => response.json())
                .then((response) => response.WASGEIT_BUILD_COMMIT)
                .then((commit) => {
                    console.debug(`Got commit hash ${commit} from remote`)
                    return commit
                })
        }

        public checkIfReloadBannerShouldBeShown(): Promise<boolean> {
            console.debug(`Local commit hash: ${buildInfo.commit}`)
            const commitFromRemote = this.getRemoteCommitHash()
            const isIosDevice = window.navigator.userAgent.search('iPhone OS') !== -1
            console.debug(`Is iOS device: ${isIosDevice}`)
            return commitFromRemote.then((remoteCommit: string) => isIosDevice && remoteCommit !== buildInfo.commit)
        }

    }
</script>
