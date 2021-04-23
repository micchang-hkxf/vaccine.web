<template>
    <app-layout>
        <template v-slot:app-content>
            <div id="app">
                main page @ vue aaacb<br />
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
            appLayout
        }
    }
</script>
<style>
</style>
