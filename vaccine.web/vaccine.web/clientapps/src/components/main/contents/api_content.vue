
<template>
    <app-layout enabled-drawer="true">
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <v-btn @click="loadUsers">loadUser</v-btn>
                <v-btn @click="toLogin">toLogin</v-btn>
            </div>
        </template>
    </app-layout>
</template>

<style>

</style>


<script>
    import appMenu from 'components/main/menu'
    import appLayout from 'components/app_layout'
    import { mapActions } from 'vuex'
    export default {
        // router,
        data: () => ({
        }),
        computed: {
        },
        props: {

        },
        created: function () {
        },
        methods: {
            ...mapActions('sample', ['getUsers', 'login']),
            loadUsers: function () {
                this.getUsers({
                    page: 1,
                    rows: 20,
                    userTypeFilter: null,
                    statusFilter: null,
                    keywords:null
                }).then(r => {
                    console.log(r);
                });
            },
            toLogin: function () {
                this.login({
                    acc: 'micchang',
                    pd: 'test'
                }).then(r => {
                    console.log(r);
                });
            },
        },
        components: {
            appLayout, appMenu
        }
    }
</script>