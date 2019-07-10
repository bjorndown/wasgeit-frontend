<template>
    <div>
        <h1>Gits nid</h1>
        Sorry, öh <code>{{ $route.fullPath }}</code> ? Chume, chume nid drus.
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'

    @Component({})
    export default class NotFound extends Vue {
    }
</script>
