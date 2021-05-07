<template>
    <app-layout>
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <v-btn @click="show('table')">table</v-btn>
                <com-table ref-key="table" :headers="headers" :items="desserts" :total-count="totalCount"
                           :items-per-page="itemsPerPage" :total-visible="totalVisible">
                    <template v-slot:item.no="{item}">
                        <div>{{item}}</div>
                    </template>
                    <template v-slot:search-bar>
                        <v-row>
                            <v-col class="d-flex" cols="12" md="6" lg="6" sm="6" xs="6">
                                <v-select v-model="selectStatus"
                                          :items="options"
                                          item-text="state"
                                          item-value="state"
                                          label="所有疫苗類型"
                                          :menu-props="{ bottom: true, offsetY: true }"
                                          outlined
                                          clearable
                                          style="margin-right: 10px;min-width:150px"
                                          return-object>
                                </v-select>

                                <v-select v-model="selectStatus"
                                          :items="options"
                                          item-text="state"
                                          item-value="state"
                                          label="所有疫苗類型"
                                          :menu-props="{ bottom: true, offsetY: true }"
                                          outlined
                                          clearable
                                          style="margin-right: 10px;min-width:150px"
                                          class="search-filter"
                                          return-object>
                                </v-select>
                                <v-select v-model="selectStatus"
                                          :items="options"
                                          item-text="state"
                                          item-value="state"
                                          label="所有疫苗類型"
                                          :menu-props="{ bottom: true, offsetY: true }"
                                          outlined
                                          clearable
                                          style="margin-right: 10px;min-width:150px"
                                          class="search-filter"
                                          return-object>
                                </v-select>
                                <v-select v-model="selectStatus"
                                          :items="options"
                                          item-text="state"
                                          item-value="state"
                                          label="所有疫苗類型"
                                          :menu-props="{ bottom: true, offsetY: true }"
                                          outlined
                                          clearable
                                          style="margin-right: 10px;min-width:150px"
                                          class="search-filter"
                                          return-object>
                                </v-select>
                                <v-select v-model="selectStatus"
                                          :items="options"
                                          item-text="state"
                                          item-value="state"
                                          label="所有疫苗類型"
                                          :menu-props="{ bottom: true, offsetY: true }"
                                          outlined
                                          clearable
                                          style="margin-right: 10px;min-width:150px"
                                          class="search-filter"
                                          return-object>
                                </v-select>

                                <v-btn icon color="#626781" style="top:10px">
                                    <v-icon>fas fa-search</v-icon>
                                </v-btn>
                            </v-col>

                        </v-row>


                    </template>
                   
                    <template v-slot:toolbar-action={selectAll,deleteSelected,selectedItems,selected,switchSelect} >
                        <v-checkbox :ripple="false" hide-details @click="switchSelect" ></v-checkbox>
                        <v-btn color="#F0524B" :disabled="selectedItems.length<=0 " @click="deleteSelected(selected)">
                            <span style="color:white">刪除選取項目{{selectedItems.length}}</span>
                        </v-btn>
                        <v-spacer></v-spacer>

                        <v-menu bottom right offset-y>
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" color="#626781" @click.stop="">
                                    <v-icon left color='white' size="15">fas fa-plus</v-icon>
                                    <span style="color:white">新增報名表</span>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item @click.stop="editItem(item)">
                                    <v-list-item-action-text>
                                        選擇新增方式:
                                    </v-list-item-action-text>
                                </v-list-item>
                                <v-list-item @click.stop="editItem(item)">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>far fa-edit</v-icon>
                                        </v-btn>手動輸入
                                    </v-list-item-action-text>
                                </v-list-item>
                                <v-list-item @click.stop="editItem(item)">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>far fa-trash-alt</v-icon>
                                        </v-btn>檔案匯入
                                    </v-list-item-action-text>
                                </v-list-item>

                            </v-list>
                        </v-menu>


                    </template>

                    <template v-slot:item.modify>
                        <v-menu bottom right offset-y>
                            <template v-slot:activator="{ on }">
                                <v-btn dark icon v-on="on" @click.stop="">
                                    <v-icon color='#858585'>mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item @click.stop="editItem(item)">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>far fa-edit</v-icon>
                                        </v-btn>編輯
                                    </v-list-item-action-text>
                                </v-list-item>
                                <v-list-item @click.stop="editItem(item)">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>far fa-trash-alt</v-icon>
                                        </v-btn>刪除
                                    </v-list-item-action-text>
                                </v-list-item>
                                <v-list-item @click.stop="editItem(item)">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>mdi-arrow-down</v-icon>
                                        </v-btn>完整下載接種同意書
                                    </v-list-item-action-text>
                                </v-list-item>
                                <v-list-item @click.stop="editItem(item)">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>mdi-arrow-down</v-icon>
                                        </v-btn>下載報名清冊
                                    </v-list-item-action-text>
                                </v-list-item>
                                <v-list-item @click.stop="editItem(item)">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>mdi-arrow-down</v-icon>
                                        </v-btn>下載施打清冊
                                    </v-list-item-action-text>
                                </v-list-item>
                            </v-list>
                        </v-menu>

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
            //selected: false,         
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
            selectStatus: '',
            options: [
                { state: '進行中', id: 'geton' },
                { state: '即將開始(已預先開放)', id: 'abouttostart' },
                { state: '尚未開始', id: 'notyetstart' },
                { state: '已結束', id: 'history' },
            ],
        }),
        watch: {
          
        },
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
            editItem: function () {
                alert('test');
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