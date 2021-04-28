<template>
    <app-layout>
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <v-btn @click="show('type1')">type1 show</v-btn>
                <v-btn @click="hide('type1')">type1 hide</v-btn>
                <v-btn @click="show2('type1')">type2 show</v-btn>
                <v-btn @click="hide2('type1')">type2 hide</v-btn>
                <v-btn @click="setrate('type1',50)">type2 setvalue</v-btn>
                <com-loading ref-key="type1"></com-loading>
            </div>
        </template>
    </app-layout>
</template>

<script>

    import comLoading from 'components/loading'
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
                this.$bus.$emit(`${refKey}_show`);
            },
            hide: function (refKey) {
                this.$bus.$emit(`${refKey}_hide`);
            },
            show2: function (refKey) {
                this.$bus.$emit(`${refKey}_show2`);
            },
            hide2: function (refKey) {
                this.$bus.$emit(`${refKey}_hide2`);
            },
            setrate: function (refKey, v) {
                this.$bus.$emit(`${refKey}_setrate`,v);
            }
        },
        components: {
            appLayout, appMenu, comLoading
        }
    }
</script>
<style>
</style>
