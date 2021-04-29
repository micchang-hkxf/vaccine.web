<template>
    <app-layout>
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <!--<v-btn @click="switch('one')">one</v-btn>
    <sys-dialog ref-key="one"></sys-dialog>-->
                <v-btn @click="show('two')">two</v-btn>
                <com-dialog ref-key="two"></com-dialog>
            </div>
        </template>
    </app-layout>
</template>

<script>
    import comDialog from 'components/dialog'
    import appMenu from 'components/main/menu'
    import appLayout from 'components/app_layout'
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
            show: function (refKey) {
                this.$bus.$emit(`${refKey}_switch`);
            }
        },
        components: {
            appLayout, appMenu, comDialog
        }
    }
</script>
<style>
</style>
