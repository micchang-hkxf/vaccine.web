<template>
    <app-layout>
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <v-btn @click="show('table')">table</v-btn>
                <com-table ref-key="table" :headers="headers" :items="desserts">
                    <template v-slot:column.no>
                        <div>9***563214</div>
                        <!--{{item}}-->
                        <!--<div :key="index">9***563214 /////{{item}}</div>-->
                    </template>

                    <!--<template v-slot:column.modify>
                        modify
                    </template>-->
                </com-table>
            </div>
        </template>
    </app-layout>
</template>


<style>

</style>


<script>
    import appMenu from 'components/main/menu'
    import appLayout from 'components/app_layout'
    import comTable from 'components/table'
    export default {
        data: () => ({
            headers: [
                { text: '序號',     value: 'no', align: 'start',sortable: false,},
                { text: '簽核',     value: 'sign', sortable: false},
                { text: '公文文號', value: 'symbo', sortable: false},
                { text: '收文日期', value: 'date', sortable: false},
                { text: '主旨摘要', value: 'keynote', sortable: false},
                { text: '傳送方式', value: 'delivery', sortable: false},
                { text: '', value: 'modify', sortable: false},
            ],
            desserts: [
                {
                    no: '1',
                    sign: 159,
                    symbo: 6.0,
                    date: 24,
                    keynote: 4.0,
                    delivery: '1%',
                },
                {
                    no: '12',
                    sign: 237,
                    symbo: 9.0,
                    date: 37,
                    keynote: 4.3,
                    delivery: '1%',
                },
                {
                    no: '1',
                    sign: 262,
                    symbo: 16.0,
                    date: 23,
                    keynote: 6.0,
                    delivery: '7%',
                },
            ],
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
            },
            //confirmRightClick: function () {
            //    this.$bus.$emit(`confirm_show`, false);
            //},
            //confirmLeftClick: function () {
            //    this.$bus.$emit(`confirm_show`, false);
            //}
        },
        components: {
            appLayout, appMenu, comTable
        }
    }

</script>