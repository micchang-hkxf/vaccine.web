<template>
    <div class="applied-list">
        <div class="action-bar">
            <v-text-field placeholder="請輸入行政區、村里或場次標題" v-model="filterKeyword" hide-details dense height="48px" outlined @change="search"  @input="search" autocomplete="off">
                <template v-slot:append>
                    <img src="/regist/common_search-24px.svg" />
                </template>
            </v-text-field>
        </div>
        <div class="action-container">
            <v-card class="action d-flex flex-row" elevation="0" v-for="(applied , idx) in applieds" :key="`applied_${idx}`">
                <div class="action-info d-flex flex-column justify-center">
                    <div class="action-info-header d-flex flex-column">
                        <div class="action-info-subject">
                            {{applied.activityName}}
                        </div>
                        <div class="action-info-sec-subject">
                            {{applied.region.distName}}-{{applied.region.villageName}}│{{applied.vaccineGroupName}}
                        </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="action-info-detail d-flex flex-column justify-center">
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">疫苗廠牌：</div>
                            <div class="action-info-data text-right">{{applied.brandName}}</div>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">接種日期：</div>
                            <div class="action-info-data text-right">{{$moment(applied.implementStartTime).format('YYYY/MM/DD')}},{{$moment(applied.implementStartTime).format('HH:mm')}}-{{$moment(applied.implementEndTime).format('HH:mm')}}</div>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">事先報名：</div>
                            <div class="action-info-data text-right">
                                {{$moment(applied.registStart).format('YYYY/MM/DD,HH:mm')}}<br /> - {{$moment(applied.registEnd).format('YYYY/MM/DD,HH:mm')}}
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">序號：</div>
                            <div class="action-info-data text-right">{{applied.applyNo}}</div>
                        </div>
                    </div>
                </div>
                <div class="action-button d-flex justify-center align-center">
                    <v-btn color="rgba(119,204,219,0.5)" height="100%" width="100%" elevation="0" @click="toSession(applied)">
                        報名
                    </v-btn>
                </div>
            </v-card>
            <div class="null-list" v-if="applieds.length === 0">
                <div class="null-content">
                    <img src="/regist/null_list.svg" />
                    <div>尚無相關紀錄</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
            },
            applieds: [],
            filterKeyword: '',
        }),
        computed: {
            ...mapGetters('regist', [ 'getUserInfo']),
        },
        props: {

        },
        created: function () {

        },
        methods: {
            ...mapActions('regist', ['loadAppliedList', 'setActivityApply']),
            search: function () {
                if (!this.getUserInfo) return;
                var params = this.getUserInfo;
                params['keyword'] = this.filterKeyword;
                this.loadAppliedList(params).then((applieds) => {
                    this.applieds.splice(0);
                    if (!applieds) return;
                    applieds.forEach(f => {
                        this.applieds.push(f);
                    });
                });                
            },
            reload: function () {
                this.search();
            },
            toSession: function (applied) {
                var session = {
                    sessionName: applied.activityName,
                    sessionId: applied.activityId,
                    zoneName: applied.region.distName,
                    zoneId: applied.region.distId,
                    villageName: applied.region.villageName,
                    villageId: applied.region.villageId,
                    sessionStart: applied.implementStartTime,
                    sessionEnd: applied.implementEndTime,
                    registStart: applied.registStart,
                    registEnd: applied.registEnd,
                    maxLimit: applied.maxLimit,
                    totalCount: applied.totalCount,
                    brandId: applied.brandId,
                    brandName: applied.brandName,
                    implementAddr: applied.implementAddr,
                    groupName: applied.vaccineGroupName,
                    signUp: false,
                    applyNo: applied.applyNo // 序號
                };
                
                this.setActivityApply(session).then(() => {
                    this.$router.push({ path: 'applied', params: session });
                });
            }
        },
        components: {
        }
    }
</script>
<style scoped>

    .applied-list/deep/ .action-btn-container {
        padding: 16px !important;
    }

    .applied-list/deep/ {
        background-color: #F4F4F4 !important;
    }

    .applied-list/deep/ .action-info-data {
        font-size: 12px;
        color: #434969;
    }

    .applied-list/deep/ .action-info-title {
        font-size: 12px;
        color: #434969;
    }

    .applied-list/deep/ .action-info-subject {
        font-size: 16px;
        font-weight: bold;
        color: #434969;
    }

    .applied-list/deep/ .action-info-sec-subject {
        font-size: 12px;
        color: rgba(98,103,129,0.5) !important;
        padding-bottom: 8px !important;
    }

    .applied-list/deep/ .action-info-title {
        width: 30%;
        color: rgba(98,103,129,0.5) !important;
    }

    .applied-list/deep/ .action-info-data {
        width: 70%;
    }

    .applied-list/deep/ .action-info {
        padding-right: 16px;
    }

    .applied-list/deep/ .action {
        height: 168px;
        padding: 16px;
        border-radius: 8px !important;
    }

    .applied-list/deep/ .action-button {
        width: 64px;
        height: 100%;
    }

    .applied-list/deep/ .action-button .v-btn {
        font-size: 16px;
        color: #ffffff;
        width: 64px;
        margin: 0px;
    }

    .applied-list/deep/ .action-info {
        width: calc(100% - 64px);
        height: 100%;
    }

    .applied-list/deep/ .action-bar {
        padding: 16px !important;
        background-color: #FFFFFF;
    }

    .applied-list/deep/ .action-bar .v-text-field .transparent {
        border-color: rgba(54,66,80,0.2) !important;
    }

    .applied-list/deep/ .action-bar .v-text-field__details {
        display: none !important;
    }

    .applied-list/deep/ .action-container {
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 16px;
        padding-bottom: 16px;
    }

    .applied-list/deep/ .action-info-detail {
        padding-top: 16px !important;
    }

    .applied-list/deep/ .action-info-detail .disabled {
        color: rgba(67,73,105,0.5) !important;
    }

    .applied-list/deep/ .v-text-field__details {
        display: none;
    }

    .applied-list/deep/ .app-content {
        background-color: #F4F4F4;
        height: 100% !important;
    }

    .applied-list/deep/ .action:not(:first-child) {
        margin-top: 16px;
    }

    .applied-list/deep/ .null-list {
        text-align: center;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #43496980;
        min-height: calc(100vh - 256px);
    }

    .applied-list/deep/ .null-content {
        position: relative;
        top: 112px;
    }
</style>
