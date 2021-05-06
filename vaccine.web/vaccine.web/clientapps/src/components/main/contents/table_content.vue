<template>
    <app-layout>
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <v-btn @click="show('table')">table</v-btn>
                <com-table ref-key="table" :headers="headers" :items="desserts"  :total-count="totalCount" 
                           :items-per-page="itemsPerPage" :total-visible="totalVisible"   >
                    <template v-slot:item.no="{item}">
                     
                        <div>{{item}}</div>
                    </template>

                    <template v-slot:item.modify>
                        modify
                    </template>
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
            totalCount: 12,
            itemsPerPage: 3,
            totalVisible: 4,
            headers: [
                { text: '', value: 'checked', align: 'start', sortable: false, flex: 3 },
                { text: '建立日期',     value: 'date', align: 'start',sortable: true, flex:6},
                { text: '場次標題', value: 'title', sortable: false, flex: 6},
                { text: '疫苗類型', value: 'type', sortable: false, flex: 6},
                { text: '行政區', value: 'district', sortable: false, flex: 6},
                { text: '村里', value: 'village', sortable: false, flex: 6},
                { text: '醫療院所', value: 'institution', sortable: false, flex: 6 },
                { text: '院所行政區', value: 'instutionDistrict', sortable: false, flex: 6 },
                { text: '設站時間', value: 'stationTime', sortable: false, flex: 6},
                { text: '報名時間', value: 'registrationTime', sortable: false, flex: 6 },
                { text: '名額', value: 'quota', sortable: false, flex: 6},
                { text: '復審合格數', value: 'qualified', sortable: false, flex: 6},
                { text: '', value: 'modify', sortable: false },
            ],
            desserts: [
                {
                    checked:false,
                    date: '2021/04/12',
                    title: '110年5月份新冠疫苗 接種',
                    type: '新冠肺炎',
                    district: '內湖區',
                    village: '西康里',
                    institution: '王慶森診所',
                    instutionDistrict: '內湖區',
                    stationTime:'2021/05/08 08:30 - 11:30',
                    registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                    quota: '425/670',
                    qualified: '423',
                },
                {
                    checked: false,
                    date: '2021/04/08',
                    title: '110年5月份新冠疫苗 接種',
                    type: '新冠肺炎',
                    district: '內湖區',
                    village: '西康里',
                    institution: '王慶森診所',
                    instutionDistrict: '內湖區',
                    stationTime: '2021/05/08 08:30 - 11:30',
                    registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                    quota: '425/670',
                    qualified: '423',
                },
                {
                    checked: false,
                    date: '2021/04/12',
                    title: '110年5月份新冠疫苗 接種',
                    type: '新冠肺炎',
                    district: '內湖區',
                    village: '西康里',
                    institution: '王慶森診所',
                    instutionDistrict: '內湖區',
                    stationTime: '2021/05/08 08:30 - 11:30',
                    registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                    quota: '425/670',
                    qualified: '423',
                },
                {
                    checked: false,
                    date: '2021/04/12',
                    title: '110年5月份新冠疫苗 接種',
                    type: '新冠肺炎',
                    district: '內湖區',
                    village: '西康里',
                    institution: '王慶森診所',
                    instutionDistrict: '內湖區',
                    stationTime: '2021/05/08 08:30 - 11:30',
                    registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                    quota: '425/670',
                    qualified: '423',
                },
                {
                    checked: false,
                    date: '2021/04/03',
                    title: '110年5月份新冠疫苗 接種',
                    type: '新冠肺炎',
                    district: '內湖區',
                    village: '西康里',
                    institution: '王慶森診所',
                    instutionDistrict: '內湖區',
                    stationTime: '2021/05/08 08:30 - 11:30',
                    registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                    quota: '425/670',
                    qualified: '423',
                },
                {
                    checked: false,
                    date: '2021/04/06',
                    title: '110年5月份新冠疫苗 接種',
                    type: '新冠肺炎',
                    district: '內湖區',
                    village: '西康里',
                    institution: '王慶森診所',
                    instutionDistrict: '內湖區',
                    stationTime: '2021/05/08 08:30 - 11:30',
                    registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                    quota: '425/670',
                    qualified: '423',
                },
                {
                    checked: false,
                    date: '2021/04/10',
                    title: '110年5月份新冠疫苗 接種',
                    type: '新冠肺炎',
                    district: '內湖區',
                    village: '西康里',
                    institution: '王慶森診所',
                    instutionDistrict: '內湖區',
                    stationTime: '2021/05/08 08:30 - 11:30',
                    registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                    quota: '425/670',
                    qualified: '423',
                },
                {
                    checked: false,
                    date: '2021/04/22',
                    title: '110年5月份新冠疫苗 接種',
                    type: '新冠肺炎',
                    district: '內湖區',
                    village: '西康里',
                    institution: '王慶森診所',
                    instutionDistrict: '內湖區',
                    stationTime: '2021/05/08 08:30 - 11:30',
                    registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                    quota: '425/670',
                    qualified: '423',
                },
                {
                    checked: false,
                    date: '2021/04/02',
                    title: '110年5月份新冠疫苗 接種',
                    type: '新冠肺炎',
                    district: '內湖區',
                    village: '西康里',
                    institution: '王慶森診所',
                    instutionDistrict: '內湖區',
                    stationTime: '2021/05/08 08:30 - 11:30',
                    registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                    quota: '425/670',
                    qualified: '423',
                },
                {
                    checked: false,
                    date: '2021/04/01',
                    title: '110年5月份新冠疫苗 接種',
                    type: '新冠肺炎',
                    district: '內湖區',
                    village: '西康里',
                    institution: '王慶森診所',
                    instutionDistrict: '內湖區',
                    stationTime: '2021/05/08 08:30 - 11:30',
                    registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                    quota: '425/670',
                    qualified: '423',
                },
                {
                    checked: false,
                    date: '2021/04/10',
                    title: '110年5月份新冠疫苗 接種',
                    type: '新冠肺炎',
                    district: '內湖區',
                    village: '西康里',
                    institution: '王慶森診所',
                    instutionDistrict: '內湖區',
                    stationTime: '2021/05/08 08:30 - 11:30',
                    registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                    quota: '425/670',
                    qualified: '423',
                },
                {
                    checked: false,
                    date: '2021/04/15',
                    title: '110年5月份新冠疫苗 接種',
                    type: '新冠肺炎',
                    district: '內湖區',
                    village: '西康里',
                    institution: '王慶森診所',
                    instutionDistrict: '內湖區',
                    stationTime: '2021/05/08 08:30 - 11:30',
                    registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                    quota: '425/670',
                    qualified: '423',
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