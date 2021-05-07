<template>
    <app-layout  enabled-drawer="true">
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                main page @ vue aaacgb<br />
                vuetify: {{($vuetify.breakpoint!=null?'vuetify已啟用':'')}}<br />
                vue-router: {{($route!=null?'router已啟用':'')}}<br />
                config : {{ configEnabled }}<br />
                vuex : {{ moduleEnabled }}<br />
                i18n : {{ $t('i18nEnabled') }}<br />
                axios : {{ axiosState }}<br />
                moment : {{ ($moment?"moment 時間格式元件已啟用": "")}}
            </div>
        </template>
    </app-layout>
</template>

<script>
    import appMenu from 'components/main/menu'
    import appLayout from 'components/app_layout'
    import axios from 'axios'
    import { mapState } from 'vuex'
    export default {
        // router,
        data: () => ({
            axiosState: '',
            momentState: new Date(),
        }),
        computed: {
            ...mapState('user', ['moduleEnabled']),
            ...mapState('config', ['configEnabled']),
        },
        props: {

        },
        created: function () {
            axios.get('/api/state').then(r => {
                this.$set(this, 'axiosState', r.data.axiosEnabled);
            })
        },
        methods: {

        },
        components: {
            appLayout, appMenu
        }
    }
</script>
<style>
    .app {
    }
</style>
