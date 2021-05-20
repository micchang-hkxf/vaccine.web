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
                        <template v-slot:item.quota="{item}">
                            <div>{{item.cntQuota}}/<span style="color:#626781">{{item.totalQuota}}</span></div>
                        </template>
                        <template v-slot:search-bar>
                            <div style="display:flex;justify-content:flex-start;margin-left:10px;margin-top:10px;">
                                <v-row>
                                    <v-col cols="2">
                                        <v-select v-model="selectVaccine"
                                                  :items="getVaccines"
                                                  item-text="name"
                                                  item-value="name"
                                                  placeholder="所有疫苗類型"
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
                                                  placeholder="全部行政區"
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
                                                  placeholder="全部村里"
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
                                                  placeholder="全部醫療院所"
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
                                        <v-text-field v-model="keyWord" placeholder="標題關鍵字" outlined dense clearable></v-text-field>
                                    </v-col>
                                    <v-btn icon color="#626781" style="top:5px;" :ripple="false"
                                           @click="getRegistForm(1)">
                                        <v-icon>fas fa-search</v-icon>
                                    </v-btn>
                                </v-row>
                            </div>


                        </template>

                        <template v-slot:toolbar-action={selectAll,deleteSelected,selectedItems,selected}>
                            <v-btn color="#F0524B" :disabled="selected.length<=0 " @click="deleteSelected(selected)" :ripple="false">
                                <span style="color:white">刪除選取項目 ({{selected.length}})</span>
                            </v-btn>
                            <v-spacer></v-spacer>

                            <v-menu bottom right offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-btn v-on="on" color="#626781" @click.stop="" :ripple="false">
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
                                    <v-divider></v-divider>
                                    <v-list-item @click.stop="manualInput">
                                        <v-list-item-action-text>
                                            <v-btn icon dense :ripple="false">
                                                <v-icon small>far fa-edit</v-icon>
                                            </v-btn>手動輸入
                                        </v-list-item-action-text>
                                    </v-list-item>
                                    <v-list-item @click.stop="fileImport">
                                        <v-list-item-action-text>
                                            <v-btn icon dense :ripple="false">
                                                <v-icon small>far fa-trash-alt</v-icon>
                                            </v-btn>檔案匯入
                                        </v-list-item-action-text>
                                    </v-list-item>

                                </v-list>
                            </v-menu>

                            <editor ref="registEditor" ref-key="two" width="60%" :title="title" :action="formAction"></editor>

                            <com-dialog ref="registViewer" ref-key="two" width="60%">
                                <template v-slot:toolbar>
                                    {{viewerTitle}}
                                    <v-spacer></v-spacer>
                                    <v-btn icon @click.stop="colse" :ripple="false">
                                        <v-icon color="white">fas fa-times</v-icon>
                                    </v-btn>
                                </template>
                                <template v-slot:content>
                                    點選「確定」後本報名表將立即生效，請再次確認內容無誤。
                                    <v-divider></v-divider>
                                    {{result}}
                                </template>
                                <template v-slot:action>

                                    <v-spacer></v-spacer>
                                    <v-btn outlined :ripple="false" @click="backToEdit"><span style="color:#626781;">修改</span></v-btn>
                                    <v-btn @click="save" color="primary" :ripple="false">確定</v-btn>
                                </template>
                            </com-dialog>

                            <com-confirm ref="registAlert" ref-key="confirm" :right-click="alertRightClick">
                                <template v-slot:confirm-image>
                                    <v-img src="/alert_success.svg"></v-img>
                                </template>
                                <template v-slot:confirm-title>
                                    {{alertTitle}}

                                </template>
                                <template v-slot:confirm-text>
                                    {{alertText}}
                                </template>

                                <template v-slot:confirm-right-btn-text>
                                    確認
                                </template>


                            </com-confirm>

                        </template>

                        <template v-slot:item.modify="{item}">
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
                                    <v-list-item @click.stop="detailItem(item)">
                                        <v-list-item-action-text>
                                            <v-btn icon dense>
                                                <v-icon small>far fa-edit</v-icon>
                                            </v-btn>場次內容
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
                    <!---->
                    <com-dialog ref="dialogDetail" ref-key="dialogDetail" width="100%">
                        <template v-slot:toolbar>
                            場次內容
                            <v-spacer></v-spacer>
                            <v-btn icon @click.stop="closeDetail" :ripple="false">
                                <v-icon color="white">fas fa-times</v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:content>
                            <div class="detail-title">{{detailTitle}}</div>
                            <div class="detail-sub-title">{{detailDistrict}}－{{detailVillage}}｜{{detailType}}</div>
                            <div class="detail-title-desc">
                                <div>設站時間：{{detailStationTime}}</div>
                                <div>報名開放時間：{{detailRegistrationTime}}</div>
                                <div>報名名額：{{detailCntQuota}}/{{detailTotalQuota}}</div>
                                <div>承辦醫院：{{detailInstitution}}（{{detailInstutionDistrict}}）</div>
                            </div>
                            <hr/>
                            <!---->
                            <com-table ref-key="detailTable" :headers="getRegistrationHeaders" :items="detailItems" :total-count="detailTotalCount"
                                       :items-per-page="detailItemsPerPage" :total-visible="detailTotalVisible" :show-select="false"
                                       :change-page="detailChangePage"
                                       style="margin-left: 15px;padding-top: 15px;margin-right: 15px;">

                                <template v-slot:search-bar>
                                    <div style="display:flex;justify-content:flex-start;margin-left:10px;margin-top:10px;">
                                        <v-text-field v-model="detailKeyWord" placeholder="請輸入報名者姓名或身分證" outlined dense clearable class="detail-search-input"></v-text-field>
                                        <v-btn icon color="#626781" style="top:5px;" :ripple="false"
                                               @click="getDetailForm(1)">
                                            <v-icon>fas fa-search</v-icon>
                                        </v-btn>
                                        <div class="detail-rebound-info">
                                            <div>複檢時間：2021/05/06</div>
                                            <div>複檢通過人數：224</div>
                                        </div>
                                        <div class="detail-action">
                                            <v-btn :ripple="false">
                                                <span>再次執行複檢（0）</span>
                                            </v-btn>
                                            <v-btn v-on="on" color="#736DB9" @click.stop="downloadCompleteFile" :ripple="false">
                                                <v-icon left color='white' size="15">
                                                    mdi-arrow-down
                                                </v-icon>
                                                <span style="color:white">下載完整接種同意書</span>
                                            </v-btn>
                                            <v-btn v-on="on" color="#736DB9" @click.stop="downloadSignUpFile" :ripple="false">
                                                <v-icon left color='white' size="15">
                                                    mdi-arrow-down
                                                </v-icon>
                                                <span style="color:white">下載報名清冊</span>
                                            </v-btn>
                                            <v-btn v-on="on" color="#736DB9" @click.stop="downloadVaccinationFile" :ripple="false">
                                                <v-icon left color='white' size="15">
                                                    mdi-arrow-down
                                                </v-icon>
                                                <span style="color:white">下載接種清冊</span>
                                            </v-btn>
                                        </div>
                                    </div>
                                </template>

                                <template v-slot:toolbar-action>
                                    <v-spacer></v-spacer>
                                    <div>*以上檔案可於複檢後下載</div>
                                </template>

                                <template v-slot:item.result="{item}">
                                    <div :class="item.result === '系統異常' ? 'detail-result-abnormal' : ''">{{item.result}}</div>
                                </template>

                                <template v-slot:item.modify="{item}">
                                    <template>
                                        <v-btn v-on="on" color="#736DB9" @click.stop="downloadAgreeFile(item)" :ripple="false">
                                            <v-icon left color='white' size="15">
                                                mdi-arrow-down
                                            </v-icon>
                                            <span style="color:white">下載同意書</span>
                                        </v-btn>
                                    </template>
                                </template>

                            </com-table>
                        </template>
                    </com-dialog>
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

    .v-toolbar, .v-card {
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

    .detail-title {
        font: normal normal normal 24px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #736DB9;
        text-align: left;
        opacity: 1;
    }

    .detail-sub-title {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: left;
        opacity: 1;
        margin: 4px 0;
    }

    .detail-title-desc {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: left;
        opacity: 1;
        margin: 23px 0 18px 0;
    }

    .detail-rebound-info {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: right;
        opacity: 1;
        white-space: nowrap;
        margin: -5px 30px 0 30px;
    }

    .detail-search-input {
        width: 220px;
    }

    .detail-action .v-btn {
        margin: 1px 5px;
    }

    .detail-result-abnormal {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #F0524B;
        text-align: center;
        opacity: 1;
    }
</style>

<script>
    import appMenu from 'components/admin/menu';
    import appLayout from 'components/admin/app_layout';
    import comTable from 'components/table'
    import editor from 'components/admin/forms/regist_editor'
    import comDialog from 'components/dialog'
    import comConfirm from 'components/confirm'
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
            items: [],
            title: '',
            model: {
                regist_title: '',
                regist_type: '',
                regist_district: '',
                regist_village: '',
                regist_date: new Date().toISOString().substr(0, 10),
            },
            result: {},
            viewerTitle:'',
            alertTitle: '',
            alertText: '',
            detailId: '',
            detailTitle: '',
            detailDistrict: '',
            detailVillage: '',
            detailType: '',
            detailInstitution: '',
            detailInstutionDistrict: '',
            detailStationTime: '',
            detailRegistrationTime: '',
            detailCntQuota: '',
            detailTotalQuota: '',
            detailItems: [],
            detailTotalCount: 6,
            detailItemsPerPage: 2,
            detailTotalVisible: 4,
            detailKeyWord: '',
        }),
        computed: {
            ...mapGetters('registration', ['getHeaders', 'getVaccines', 'getDistricts', 'getVillages', 'getInstitutions', 'getRegistrationHeaders']),
        },
        props: {

        },
        created: function () {
            var page = 1;
            this.getRegistForm(page);
        },
        methods: {
            ...mapActions('registration', ['loadRegistForm', 'loadDetailForm']),
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
                console.log('delete', item)
            },
            manualInput: function () {
                this.title = '建立報名表';
                this.viewerTitle = '確認新增報名資訊';
                this.$refs.registEditor.open();
                console.log('manualInput')
            },
            fileImport: function () {
                console.log('fileImport')
            },
            formAction: function (result) {
                Object.assign(this.result, result);
                switch (result.action) {
                    case 'save':
                        this.$refs.registViewer.open();
                        console.log('save', result)
                        break;

                    case 'cancel':
                        console.log('cancel', result)
                        break;
                }
            },
            colse: function () {
                this.$refs.registEditor.close();
            },
            save: function () {
                console.log('result', this.result)
                this.alertTitle = '110年五月份新冠疫苗施打預先報名';
                this.alertText = '成功建立報名表';
                //switch (this.result.mode) {
                //    case 'new':
                //        this.alertTitle = '110年五月份新冠疫苗施打預先報名';
                //        this.alertText = '成功建立報名表';
                //        break;

                //    case 'edit':
                //        this.alertTitle = '110年五月份新冠疫苗施打預先報名';
                //        this.alertText = '已成功變更報名表'
                //}

                this.$refs.registViewer.close();
                this.$refs.registAlert.open();
            },
            backToEdit: function () {
                this.$refs.registViewer.close();
                this.$refs.registEditor.show();
            },
            alertRightClick: function () {
                this.$bus.$emit(`confirm_show`, false);
            },
            detailItem: function (item) {
                this.detailId = item.id;
                this.detailTitle = item.title;
                this.detailType = item.type;
                this.detailDistrict = item.district;
                this.detailVillage = item.village;
                this.detailInstitution = item.institution;
                this.detailInstutionDistrict = item.instutionDistrict;
                this.detailStationTime = item.stationTime;
                this.detailRegistrationTime = item.registrationTime;
                this.detailCntQuota = item.cntQuota;
                this.detailTotalQuota = item.totalQuota;

                this.$bus.$emit('dialogDetail_show', true);

                this.getDetailForm(1);
            },
            closeDetail: function () {
                this.$refs.dialogDetail.close();
            },
            detailChangePage: function (pager) {
                console.log(pager);
                this.getDetailForm(pager.page);
            },
            getDetailForm: function (page) {
                var params = {
                    id: this.detailId,
                    keyWord: this.detailKeyWord,
                    pageSize: this.detailItemsPerPage,
                    page: page,
                };
                this.loadDetailForm(params).then((r) => {
                    this.detailTotalCount = r.totalCount;
                    this.detailItems.splice(0);
                    r.datas.forEach((x) => this.detailItems.push(x));
                }).catch((e) => {
                    console.log(e);
                });
            },
            downloadCompleteFile: function () {
                console.log('downloadCompleteFile');
            },
            downloadSignUpFile: function () {
                console.log('downloadSignUpFile');
            },
            downloadVaccinationFile: function () {
                console.log('downloadSignUpFile');
            },
            downloadAgreeFile: function (item) {
                console.log('downloadAgreeFile ' + item.id);
            }
        },

        components: {
            appLayout, appMenu, comTable, editor, comDialog, comConfirm
        }
    };
</script>


