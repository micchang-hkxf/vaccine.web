<template>
    <app-layout>
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <v-btn @click="show('table')">table</v-btn>
                <com-table ref-key="table" :headers="headers" :items="tableItems">
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
    import appMenu from 'components/admin/menu'
    import appLayout from 'components/admin/app_layout'
    import comTable from 'components/table'
    import { mapGetters } from 'vuex'
    //import usersStore  from 'stores/admin/usersStore'

    export default {
        data: () => ({
            headers: [
                { text: '序號', value: 'no', align: 'start', sortable: false, },
                { text: '簽核', value: 'sign', sortable: false },
                { text: '公文文號', value: 'symbo', sortable: false },
                { text: '收文日期', value: 'date', sortable: false },
                { text: '主旨摘要', value: 'keynote', sortable: false },
                { text: '傳送方式', value: 'delivery', sortable: false },
                { text: '', value: 'modify', sortable: false },
            ],
            desserts: [],
        }),
        computed: {
            ...mapGetters('users',['tableItems'])

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