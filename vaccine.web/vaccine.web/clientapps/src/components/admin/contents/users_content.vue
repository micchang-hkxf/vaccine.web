<template>
    <app-layout class="users-list">
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>

            <div class="page-title-block">人員管理</div>
            <div id="app" class="table-list">
                <com-table ref-key="table" :headers="headers" :items="getTableItems" :total-count="totalCount" :show-select="showSelect"
                           :items-per-page="itemsPerPage" :total-visible="totalVisible">
                    <template v-slot:item.no="{item}">
                        <div>{{item}}</div>
                    </template>
                    <template v-slot:search-bar>
                        <v-row>
                            <v-col class="d-flex" cols="12" md="6" lg="6" sm="6" xs="6">
                                <v-select v-model="selectStatus"
                                          :items="getRoleItems"
                                          item-text="state"
                                          item-value="id"
                                          label="全部角色"
                                          :menu-props="{ bottom: true, offsetY: true }"
                                          outlined
                                          clearable
                                          style="margin-right: 10px;min-width:150px"
                                          return-object>
                                </v-select>

                                <v-select v-model="selectStatus2"
                                          :items="getAreaItems"
                                          item-text="state"
                                          item-value="state"
                                          label="有/無管轄區域"
                                          :menu-props="{ bottom: true, offsetY: true }"
                                          outlined
                                          clearable
                                          style="margin-right: 10px;min-width:150px"
                                          class="search-filter"
                                          return-object>
                                </v-select>
                                <v-select v-model="selectStatus3"
                                          :items="permissionStatus"
                                          item-text="state"
                                          item-value="state"
                                          label="權限啟用/停用"
                                          :menu-props="{ bottom: true, offsetY: true }"
                                          outlined
                                          clearable
                                          style="margin-right: 10px;min-width:150px"
                                          class="search-filter"
                                          return-object>
                                </v-select>
                                <v-select v-model="selectStatus4"
                                          :items="getUserItems"
                                          item-text="state"
                                          item-value="state"
                                          label="人員姓名/編號"
                                          :menu-props="{ bottom: true, offsetY: true }"
                                          outlined
                                          clearable
                                          style="margin-right: 10px;min-width:150px"
                                          class="search-filter"
                                          return-object>
                                </v-select>


                                <v-btn icon color="#626781" style="top:10px" @click.stop="search()">
                                    <v-icon>fas fa-search</v-icon>
                                </v-btn>
                            </v-col>

                        </v-row>


                    </template>

                    <template v-slot:toolbar-action={}>
                        <!--<v-checkbox :ripple="false" hide-details @click="switchSelect"></v-checkbox>
                <v-btn color="#F0524B" :disabled="selectedItems.length<=0 " @click="deleteSelected(selected)">
                    <span style="color:white">刪除選取項目{{selectedItems.length}}</span>
                </v-btn>
                -->
                        <v-spacer></v-spacer>

                        <v-menu bottom right offset-y>
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" color="#626781" @click.stop="">
                                    <v-icon left color='white' size="15">fas fa-plus</v-icon>
                                    <span style="color:white">新增人員</span>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item @click.stop="editItem(item)">
                                    <v-list-item-action-text>
                                        選擇新增方式:
                                    </v-list-item-action-text>
                                </v-list-item>
                                <v-list-item @click.stop="newItem('newuser')">
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
                                <v-list-item @click.stop="stopItem(item)">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>far fa-eye-slash</v-icon>
                                        </v-btn>停用
                                    </v-list-item-action-text>
                                </v-list-item>
                                <v-list-item @click.stop="removeItem(item)">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>far fa-trash-alt</v-icon>
                                        </v-btn>刪除
                                    </v-list-item-action-text>
                                </v-list-item>
                            </v-list>
                        </v-menu>

                    </template>
                </com-table>
            </div>

            <com-dialog ref="dialogPanel" ref-key="newuser" width="60%">
                <template v-slot:toolbar>
                    公文管理環境檢測
                </template>
                <template v-slot:content>

                </template>
                <template v-slot:action="{close}">
                    <v-btn @click="close">取消</v-btn>
                    <v-spacer></v-spacer>

                    <v-btn>送出</v-btn>
                </template>
            </com-dialog>
        </template>


    </app-layout>
</template>


<style>
    .users-list .table-list {
        background: var(--w) 0% 0% no-repeat padding-box !important;
        background: #FFFFFF 0% 0% no-repeat padding-box !important;
        border: 1px solid #3642501A !important;
        opacity: 1 !important;
        margin: 24px !important;
    }
    .users-list .app-content {
        background: #F2F3F7 !important;
    }
    .page-title-block {
        height: 65px;
        padding: 20px;
        background: #FFFFFF80 !important;
        font-size: 20px;
    }
</style>


<script>
    import appMenu from 'components/admin/menu'
    import appLayout from 'components/admin/app_layout'
    import comTable from 'components/table'
    import comDialog from 'components/dialog'
    import { mapGetters } from 'vuex'
    //import usersStore  from 'stores/admin/usersStore'

    export default {
        data: () => ({
            totalCount: 12,
            itemsPerPage: 3,
            totalVisible: 4,
            showSelect: false,
            headers: [
                //{ text: '', value: 'checked', align: 'start', sortable: false, flex: 3 },
                { text: '建立日期', value: 'date', align: 'start', sortable: true, flex: 6 },
                { text: '場次標題', value: 'title', sortable: false, flex: 6 },
                { text: '疫苗類型', value: 'type', sortable: false, flex: 6 },
                { text: '行政區', value: 'district', sortable: false, flex: 6 },
                { text: '村里', value: 'village', sortable: false, flex: 6 },
                { text: '醫療院所', value: 'institution', sortable: false, flex: 6 },
                { text: '院所行政區', value: 'instutionDistrict', sortable: false, flex: 6 },
                { text: '設站時間', value: 'stationTime', sortable: false, flex: 6 },
                { text: '報名時間', value: 'registrationTime', sortable: false, flex: 6 },
                { text: '名額', value: 'quota', sortable: false, flex: 6 },
                { text: '復審合格數', value: 'qualified', sortable: false, flex: 6 },
                { text: '', value: 'modify', sortable: false },
            ],
            desserts: [],
            selectStatus: null,
            selectStatus2: null,
            selectStatus3: null,
            selectStatus4: null,
            permissionStatus: [
                { state: '啟用', id: 'on' },
                { state: '停用', id: 'off' },
              
            ],

        }),
        computed: {
            ...mapGetters('users', ['getTableItems']),
            ...mapGetters('users', ['getAreaItems']),
            ...mapGetters('users', ['getRoleItems']),
            ...mapGetters('users', ['getUserItems'])

        },
        props: {

        },
        created: function () {
        },
        methods: {
            //show: function (refKey) {
            //    this.$bus.$emit(`${refKey}_switch`);
            //},
            editItem: function () {
                alert('edit');
            },
            stopItem: function () {
                alert('stop');
            },
            removeItem: function () {
                alert('remove');
            },
            search: function () {
                console.log("Label: ", this.selectStatus.id)
                console.log("Value: ", this.selectStatus.state)
            },
            newItem: function (refKey) {
                this.$bus.$emit(`${refKey}_show`, true);
            },
            close: function () {
            }
        },
        components: {
            appLayout, appMenu, comTable, comDialog
        }
    }

</script>