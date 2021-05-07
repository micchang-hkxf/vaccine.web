<template>
    <app-layout enabled-drawer="true">
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
                <v-btn @click="show3('type1')">type3 show</v-btn>


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
            },
            show3: function (refKey) {
                
                var s = this.$bus;
                s.$emit(`${refKey}_show3`, "資料處理中...");
                //s.$emit(`${refKey}_picpath`, "https://loading.io//mod/spinner/double-ring/sample.gif");
                s.$emit(`${refKey}_picpath`, "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_%28wobbly%29.gif");
                setTimeout(function () {
                    s.$emit(`${refKey}_hide3`);
                },3000);
            },

           
     
        },
        components: {
            appLayout, appMenu, comLoading
        }
    }
</script>
<style>
</style>
