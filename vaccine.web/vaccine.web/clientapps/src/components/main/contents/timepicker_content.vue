
<template>
    <app-layout enabled-drawer="true">
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                {{timeOne}}
                <com-timepicker v-model="timeOne">

                </com-timepicker>
                {{timeTwo}}
                <com-timepicker v-model="timeTwo">

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
    import comTimepicker from 'components/vue-timepicker/timepicker'
    export default {
        // router,
        data: () => ({
            timeTwo: '13:00',
            timeOne: '14:00',
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