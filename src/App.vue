<template>
    <div id="app" class="container">
        <header class="header">
            <h1>was<span>geit</span></h1>
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
        public commit() {
            return buildInfo.commit.slice(0, 8)
        }

        public time() {
            return buildInfo.time
        }

        public url() {
            return `https://github.com/bjorm/wasgeit-frontend/commit/${buildInfo.commit}`
        }
    }
</script>
