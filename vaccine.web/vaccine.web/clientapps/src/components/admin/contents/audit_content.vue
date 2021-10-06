<template>
    <app-layout class="audit-list">
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:content-title>
            稽核
        </template>
        <template v-slot:app-content>
            <v-card>
                <com-table ref="auditTable" ref-key="table" :headers="headers" :items="items" :total-count="totalCount"
                           :items-per-page="itemsPerPage" :total-visible="totalVisible" :show-select="showSelect"
                           :change-page="changePage">
                    <template v-slot:item.quota>
                        <div>45/<span style="color:dimgrey">60</span></div>
                    </template>
                    <template v-slot:search-bar>
                        <div>
                            <v-row>
                                <v-select v-model="selectType"
                                          :items="getTypes"
                                          item-text="name"
                                          item-value="name"
                                          placeholder="全部報表類型"
                                          :menu-props="{ bottom: true, offsetY: true }"
                                          outlined
                                          dense
                                          clearable
                                          style="max-width:260px"
                                          class="search-filter fs"
                                          return-object>
                                </v-select>
                                <v-text-field v-model="keyWord"
                                              class="fs"
                                              placeholder="使用者/所屬單位/檔名關鍵字"
                                              outlined
                                              dense
                                              clearable
                                              style="max-width:260px"
                                              @keyup.enter="getAudit(1)">
                                </v-text-field>
                                <v-btn icon style="top:3px;" :ripple="false"
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
                            <v-btn color="#626781" :ripple="false" @click.stop="addFile">
                                <img src="/addregist.svg">
                                <span style="color:white">新增案件抽查表</span>
                            </v-btn>
                        </template>
                    </template>

                    <template v-slot:item.date="{item}">
                        <span class="nowrap">{{$moment(item.date).format('YYYY/MM/DD HH:mm')}}</span>
                    </template>

                    <template v-slot:item.modify="{item}">
                        <template>
                            <!--<v-btn dark icon v-on="on" @click.stop="downloadFile">
                                <v-icon color='#858585'>mdi-dots-horizontal</v-icon>
                                <span style="color:white">下載</span>
                            </v-btn>-->
                            <v-btn color="#736DB9" @click.stop="downloadFile(item)" :ripple="false">
                                <img src="/download.svg">
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
                    <v-btn outlined :ripple="false" @click="backToEdit" style="margin-right:16px;" :disabled="isLoading"><span style="color:#626781;">修改</span></v-btn>
                    <v-btn @click="save" color="primary" :ripple="false" :disabled="isLoading"><span>確定</span></v-btn>
                </template>
            </com-dialog>
            <com-loading :enabled="isLoading"></com-loading>
        </template>
    </app-layout>
</template>

<style>

    .v-btn--contained {
        box-shadow: none !important;
    }

    .dialog-auditEditor .v-card__actions {
        padding-top: 0px !important;
        padding-bottom: 24px !important;
        padding-left: 32px !important;
        padding-right: 32px !important;
    }

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


    .audit-list .v-list-item__title {
        color: #000 !important;
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
        margin: 24px 0;
    }

    .confirm-content {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: left;
        opacity: 1;
        margin: 0 0 24px 0;
    }

        .confirm-content label {
            color: #62678166;
        }

    .fa-search:before {
        content: url('/admin/common_search-24px.svg') !important;
    }

    .auditViewer .v-card__text {
        padding: 0 32px 0 24px !important;
    }

    .auditViewer .col {
        padding: 24px 12px 0 12px;
    }

    .auditViewer .v-card__actions {
        padding: 24px 32px !important;
    }

    .table-content-field .nowrap {
        white-space: nowrap;
    }
</style>

<script>
    import appMenu from 'components/admin/menu';
    import appLayout from 'components/admin/app_layout';
    import comTable from 'components/table'
    import editor from 'components/admin/forms/audit_editor'
    import comLoading from 'components/circle_loading'
    import comDialog from 'components/dialog'
    import comConfirm from 'components/confirm'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        // router,
        data: () => ({
            totalCount: 0,
            itemsPerPage: 5,
            totalVisible: 10,
            showSelect: false,
            selectType: '',
            keyWord: '',
            items: [],
            headers: [
                { text: '下載日期/時間', value: 'date', align: 'center', sortable: true, flex: 6 },
                { text: '使用者', value: 'name', sortable: false, align: 'center', flex: 6 },
                { text: '所屬單位', value: 'affiliation', sortable: false, align: 'center', flex: 6 },
                { text: '報表類別', value: 'type', sortable: false, align: 'center', flex: 6 },
                { text: '檔案名稱', value: 'title', sortable: false, align: 'center', flex: 6 },
                { text: '資料筆數', value: 'count', sortable: false, align: 'center', flex: 6 },
                { text: '下載事由', value: 'download', sortable: false, align: 'center', flex: 6 },
                //{ text: '操作', value: 'modify', sortable: false, align: 'center', flex: 6 },
            ],
            title: '',
            model: {
                audit_year: '',
                audit_month: '',
                audit_type: '',
                audit_reason: ''
            },
            result: {
                model: {
                    audit_year: '',
                    audit_month: '',
                    audit_type: '',
                    audit_reason: ''
                }
            },
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
            this.loadAuditTypes();
            this.getAudit(1);
        },
        methods: {
            ...mapActions('audit', ['loadAuditTypes', 'loadAudit', 'saveAudit', 'downloadAudit']),
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
                    this.$refs.auditTable.gofrontPage(page);
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
                comp.isLoading = true;
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
                        comp.isLoading = false;
                        console.log(result);
                    })
                    .catch(function () {
                        comp.isLoading = false;
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
                        comp.getAudit(1);

                        // 新增完直接下載
                        var data = result.datas;
                        var item = {
                            id: data.seq,
                            date: data.createTime,
                            name: data.uName,
                            affiliation: data.unit,
                            type: data.typeName,
                            title: data.fileName,
                            count: data.dataCount,
                            download: data.desc,
                            fileId: data.fileId
                        };
                        comp.downloadFile(item);
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
            appLayout, appMenu, comTable, editor, comDialog, comConfirm , comLoading
        }
    };
</script>


