
<template>
    <app-layout enabled-drawer="true">
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <com-timepicker>

                </com-timepicker>
            </div>
        </template>
    </app-layout>
</template>

<style>

</style>


<script>
    import appMenu from 'components/main/menu'
    import appLayout from 'components/app_layout'
    import comTimepicker from 'components/timepicker'
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

        },
        components: {
            appLayout, appMenu, comTimepicker
        }
    }
</script>