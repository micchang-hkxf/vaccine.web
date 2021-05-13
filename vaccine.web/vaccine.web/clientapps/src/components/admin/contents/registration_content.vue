<template>
    <app-layout>
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:content-title>
            報名表管理

        </template>
        <template v-slot:app-content>
            <div id="app">
                <v-card style="margin-left: 20px; margin-right: 20px; margin-top: 20px;">
                    <com-table ref-key="table" :headers="getHeaders" :items="items" :total-count="totalCount"
                               :items-per-page="itemsPerPage" :total-visible="totalVisible" :show-select="showSelect"
                               :change-page="changePage"
                               style="margin-left: 15px;padding-top: 15px;margin-right: 15px;">
                        <!--<template v-slot:item.date="{item}">
                    <div>{{item}}</div>
                </template>-->
                        <template v-slot:item.quota>
                            <div>45/<span style="color:dimgrey">60</span></div>
                        </template>
                        <template v-slot:search-bar>
                            <div style="display:flex;justify-content:flex-start;margin-left:10px;margin-top:10px;">
                                <v-row>
                                    <v-col cols="2">
                                        <v-select v-model="selectVaccine"
                                                  :items="getVaccines"
                                                  item-text="name"
                                                  item-value="name"
                                                  label="所有疫苗類型"
                                                  :menu-props="{ bottom: true, offsetY: true }"
                                                  outlined
                                                  dense
                                                  clearable
                                                  style="margin-right: 10px;"
                                                  class="search-filter"
                                                  return-object>
                                        </v-select>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-select v-model="selectDistrict"
                                                  :items="getDistricts"
                                                  item-text="name"
                                                  item-value="name"
                                                  label="全部行政區"
                                                  :menu-props="{ bottom: true, offsetY: true }"
                                                  outlined
                                                  dense
                                                  clearable
                                                  style="margin-right: 10px;"
                                                  class="search-filter"
                                                  return-object>
                                        </v-select>
                                    </v-col>

                                    <v-col cols="2">
                                        <v-select v-model="selectVillage"
                                                  :items="getVillages"
                                                  item-text="name"
                                                  item-value="name"
                                                  label="全部村里"
                                                  :menu-props="{ bottom: true, offsetY: true }"
                                                  outlined
                                                  dense
                                                  clearable
                                                  style="margin-right: 10px;"
                                                  class="search-filter"
                                                  return-object>
                                        </v-select>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-select v-model="selectInstitution"
                                                  :items="getInstitutions"
                                                  item-text="name"
                                                  item-value="name"
                                                  label="全部醫療院所"
                                                  :menu-props="{ bottom: true, offsetY: true }"
                                                  outlined
                                                  dense
                                                  clearable
                                                  style="margin-right: 10px;"
                                                  class="search-filter"
                                                  return-object>
                                        </v-select>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-text-field v-model="keyWord" label="標題關鍵字" outlined dense clearable></v-text-field>
                                    </v-col>
                                    <v-btn icon color="#626781" style="top:5px;" :ripple="false"
                                           @click="getRegistForm(1)">
                                        <v-icon>fas fa-search</v-icon>
                                    </v-btn>
                                </v-row>
                            </div>


                        </template>

                        <template v-slot:toolbar-action={selectAll,deleteSelected,selectedItems,selected}>
                            <v-btn color="#F0524B" :disabled="selected.length<=0 " @click="deleteSelected(selected)">
                                <span style="color:white">刪除選取項目 ({{selected.length}})</span>
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
                                    <v-list-item @click.stop="">
                                        <v-list-item-action-text>
                                            選擇新增方式:
                                        </v-list-item-action-text>
                                    </v-list-item>
                                    <v-list-item @click.stop="manualInput">
                                        <v-list-item-action-text>
                                            <v-btn icon dense>
                                                <v-icon small>far fa-edit</v-icon>
                                            </v-btn>手動輸入
                                        </v-list-item-action-text>
                                    </v-list-item>
                                    <v-list-item @click.stop="fileImport">
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
                </v-card>
            </div>
        </template>
    </app-layout>
</template>

<style>
    * {
        font-family: "微軟正黑體", "Roboto", sans-serif, "Arial", "Font Awesome 5 Free", "Material Design Icons", "Material Icons", "sans-serif";
        font-weight: 400;
        font-size: 14px;
    }

    .app-content {
        background-color: #F2F3F7;
    }
    
    .content-bar {
        font-size: 16px;
        /*margin-top: 80px;*/
        margin-left: 0px;
        padding: 0px !important;
    }

    .v-toolbar, .v-card{
        border-radius: 0px !important;
        box-shadow: none !important;
    }

    .v-application .elevation-1 {
        box-shadow: none !important;
    }


    .v-list-item__title {
        color: lightgray;
        font-size: 14px;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        color: rgba(0, 0, 0, 0.6);
        background: rgba(98, 103, 129, 0.06);
    }
</style>




<script>
    import appMenu from 'components/admin/menu';
    import appLayout from 'components/admin/app_layout';
    import comTable from 'components/table'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        // router,
        data: () => ({
            totalCount: 12,
            itemsPerPage: 2,
            totalVisible: 4,
            showSelect: true,
            selectVaccine: '',
            selectDistrict: '',
            selectVillage: '',
            selectInstitution: '',
            keyWord: '',  
            items:[]
        }),
        computed: {
            ...mapGetters('registration',['getHeaders','getVaccines', 'getDistricts', 'getVillages','getInstitutions']),
        },
        props: {

        },
        created: function () {
            var page = 1;
            this.getRegistForm(page);
        },
    methods: {
        ...mapActions('registration', ['loadRegistForm']),
        getRegistForm: function (page) {
            var params = {
                vaccine: this.selectVaccine,
                district: this.selectDistrict,
                village: this.selectVillage,
                institution: this.selectInstitution,
                keyWord: this.keyWord,
                pageSize: this.itemsPerPage,
                page: page,
            };
            this.loadRegistForm(params).then((r) => {
                this.totalCount = r.totalCount;
                this.items.splice(0);
                r.datas.forEach((x) => this.items.push(x));
            }).catch((e) => {
                console.log(e);

            });
        },
        changePage: function (pager) {
            console.log(pager);
            ///{ page: 2, pageSize: 20}
            this.getRegistForm(pager.page);
        },
            deleteSelected: function (item) {
                console.log('delete',item)
            },
            manualInput: function () {
                console.log('manualInput')
            },
            fileImport: function () {
                console.log('fileImport')
            }
        },
        components: {
            appLayout, appMenu, comTable
        }
    };
</script>


