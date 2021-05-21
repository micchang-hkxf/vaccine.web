<template>
    <app-layout>
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:content-title>
            稽核
        </template>
        <template v-slot:app-content>
            <v-card>
                <com-table ref-key="table" :headers="headers" :items="items" :total-count="totalCount"
                           :items-per-page="itemsPerPage" :total-visible="totalVisible" :show-select="showSelect"
                           :change-page="changePage"
                           style="margin-left: 15px;padding-top: 15px;margin-right: 15px;">
                    <template v-slot:item.quota>
                        <div>45/<span style="color:dimgrey">60</span></div>
                    </template>
                    <template v-slot:search-bar>
                        <div style="display:flex;justify-content:flex-start;margin-left:10px;margin-top:10px;">
                            <v-row>
                                <v-col cols="7">
                                    <v-select v-model="selectType"
                                              :items="getTypes"
                                              item-text="name"
                                              item-value="name"
                                              placeholder="全部報表類型"
                                              :menu-props="{ bottom: true, offsetY: true }"
                                              outlined
                                              dense
                                              clearable
                                              style="margin-right: 10px;"
                                              class="search-filter"
                                              return-object>
                                    </v-select>
                                </v-col>
                                <v-col cols="7">
                                    <v-text-field v-model="keyWord" placeholder="使用者/所屬單位/檔名關鍵字" outlined dense clearable></v-text-field>
                                </v-col>
                                <v-btn icon color="#626781" style="top:5px;" :ripple="false"
                                       @click="getAudit(1)">
                                    <v-icon>fas fa-search</v-icon>
                                </v-btn>
                            </v-row>
                        </div>


                    </template>

                    <template v-slot:toolbar-action>
                        <span> 檔案下載紀錄 : </span>
                        <v-spacer></v-spacer>
                        <template>
                            <v-btn v-on="on" color="#626781" :ripple="false" @click.stop="addFile">
                                <v-icon left color='white' size="15">fas fa-plus</v-icon>
                                <span style="color:white">新增案件抽查表</span>
                            </v-btn>
                        </template>
                    </template>
                    <template v-slot:item.modify="{item}">
                        <template>
                            <!--<v-btn dark icon v-on="on" @click.stop="downloadFile">
                        <v-icon color='#858585'>mdi-dots-horizontal</v-icon>
                        <span style="color:white">下載</span>
                    </v-btn>-->
                            <v-btn v-on="on" color="#736DB9" @click.stop="downloadFile(item)" :ripple="false">
                                <v-icon left color='white' size="15">
                                    mdi-arrow-down
                                </v-icon>
                                <span style="color:white">下載</span>
                            </v-btn>
                        </template>
                    </template>
                </com-table>
            </v-card>
            <!--共用 alert -->
            <com-confirm ref="alert" ref-key="alert" :right-click="alertClick">
                <template v-slot:confirm-image>
                    <v-img src="/alert_warning.svg"></v-img>
                </template>
                <template v-slot:confirm-text>
                    {{alertMessage}}
                </template>
                <template v-slot:confirm-right-btn-text>
                    返回
                </template>
            </com-confirm>
            <!---->
            <editor ref="auditEditor" ref-key="auditEditor" width="688" :title="title" :action="formAction"></editor>
            <!---->
            <com-dialog ref="auditViewer" ref-key="auditViewer" width="688">
                <template v-slot:toolbar>
                    {{viewerTitle}}
                    <v-spacer></v-spacer>
                    <v-btn icon @click.stop="close" :ripple="false">
                        <v-icon color="white">fas fa-times</v-icon>
                    </v-btn>
                </template>
                <template v-slot:content>
                    <div class="confirm-description">請確認抽查條件內容無誤。</div>
                    <v-divider></v-divider>
                    <div class="confirm-content">
                        <v-row>
                            <v-col cols="12">
                                <label>查詢時間（民國年）</label>
                                <div>{{result.model.audit_year}}</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <label>查詢時間（月）</label>
                                <div>{{result.model.audit_month}}</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <label>抽查類型</label>
                                <div>{{result.model.audit_type.state}}</div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <label>下載事由</label>
                                <div>{{result.model.audit_reason}}</div>
                            </v-col>
                        </v-row>
                    </div>
                    <v-divider></v-divider>
                </template>
                <template v-slot:action>
                    <v-spacer></v-spacer>
                    <v-btn outlined :ripple="false" @click="backToEdit"><span style="color:#626781;">修改</span></v-btn>
                    <v-btn @click="save" color="primary" :ripple="false">確定</v-btn>
                </template>
            </com-dialog>
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

    .confirm-description {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: left;
        opacity: 1;
        margin-bottom: 10px;
    }

    .confirm-content {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: left;
        opacity: 1;
        margin: 10px 0;
    }

    .confirm-content label {
        color: #62678166;
    }
</style>

<script>
    import appMenu from 'components/admin/menu';
    import appLayout from 'components/admin/app_layout';
    import comTable from 'components/table'
    import editor from 'components/admin/forms/audit_editor'
    import comDialog from 'components/dialog'
    import comConfirm from 'components/confirm'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        // router,
        data: () => ({
            totalCount: 12,
            itemsPerPage: 2,
            totalVisible: 4,
            showSelect: false,
            selectType: '',
            keyWord: '',
            items: [],
            headers: [
                { text: '下載日期/時間', value: 'date', align: 'start', sortable: true, flex: 6 },
                { text: '使用者', value: 'name', sortable: false, flex: 6 },
                { text: '所屬單位', value: 'affiliation', sortable: false, flex: 6 },
                { text: '報名類型', value: 'type', sortable: false, flex: 6 },
                { text: '檔案標題', value: 'title', sortable: false, flex: 6 },
                { text: '資料筆數', value: 'count', sortable: false, flex: 6 },
                { text: '下載事由', value: 'download', sortable: false, flex: 6 },
                { text: '操作', value: 'modify', sortable: false, flex: 6 },
            ],
            title: '',
            model: {
                audit_year: '',
                audit_month: '',
                audit_type: '',
                audit_reason: ''
            },
            result: {},
            viewerTitle: '',
            alertMessage: '',
        }),
        computed: {
            ...mapGetters('audit', ['getTypes']),
        },
        props: {

        },
        watch: {
            selectType: function (value) {
                if (!value)
                    this.getAudit(1);
            },
            keyWord: function (value) {
                if (!value)
                    this.getAudit(1);
            }
        },
        created: function () {
            var page = 1;
            this.getAudit(page);
        },
        methods: {
            ...mapActions('audit', ['loadAudit', 'saveAudit', 'downloadAudit']),
            getAudit: function (page) {
                var params = {
                    type: this.selectType,
                    keyWord: this.keyWord,
                    pageSize: this.itemsPerPage,
                    page: page,
                };
                this.loadAudit(params).then((r) => {
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
                this.getAudit(pager.page);
            },
            addFile: function () {
                this.title = '新增戶籍資料案件抽查表';
                this.viewerTitle = '確認抽查條件';
                this.$refs.auditEditor.open();
            },
            downloadFile: function (item) {
                var comp = this;
                comp.alertMessage = '';
                comp.downloadAudit(item)
                    .then(function (result) {
                        switch (result.state) {
                            case 'not found':
                                comp.alertMessage = '紀錄不存在';
                                break;
                            default:
                                break;
                        }

                        if (comp.alertMessage !== '') {
                            comp.$bus.$emit('alert_show', true);
                            return;
                        }

                        console.log(result);
                    })
                    .catch(function () {
                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            formAction: function (result) {
                Object.assign(this.result, result);
                switch (result.action) {
                    case 'save':
                        this.$refs.auditViewer.open();
                        break;

                    case 'cancel':
                        console.log('cancel', result)
                        break;
                }
            },
            close: function () {
                this.$refs.auditViewer.close();
                this.$refs.auditEditor.cancel();
            },
            save: function () {
                var comp = this;
                console.log('result', comp.result);
                comp.saveAudit(comp.result.model)
                    .then(function (result) {
                        console.log(result);
                        comp.close();
                    })
                    .catch(function () {
                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            backToEdit: function () {
                this.$refs.auditViewer.close();
                this.$refs.auditEditor.show();
            },
            alertClick: function () {
                this.$bus.$emit('alert_show', false);
            }
        },
        components: {
            appLayout, appMenu, comTable, editor, comDialog, comConfirm
        }
    };
</script>


