<template>
    <app-layout>
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:content-title>
            yteset
        </template>
        <template v-slot:app-content>
            <div id="app">
                main page @ vue <br />
            </div>
        </template>
    </app-layout>
</template>

<style>
    .personal_col {
        width: 80px !important;
        height: 60px !important;
    }

    .user-title:hover {
        color: gray;
    }
</style>

<script>

    import appMenu from 'components/admin/menu';
    import appLayout from 'components/admin/app_layout';
    //import axios from 'axios';
    //import { mapState } from 'vuex'

    export default {
        // router,
        data: () => ({

        }),
        computed: {
            //...mapState('user', ['moduleEnabled']),
            //...mapState('config', ['configEnabled']),
        },
        props: {

        },
        created: function () {

        },
        methods: {

        },
        components: {
            appLayout, appMenu
        }
    };
</script>
