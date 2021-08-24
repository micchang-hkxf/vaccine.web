<template>
    <div class="applied-list">
        <div class="action-bar">
            <v-text-field placeholder="查詢行政區、村里或場次標題" v-model="filterKeyword" hide-details dense height="48px" outlined @change="search"  @input="search" autocomplete="off">
                <template v-slot:append>
                    <img src="/regist/search.svg" />
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
                        <div class="d-flex flex-row justify-space-between" v-if="applied.brandName !== ''">
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
                                {{$moment(applied.startApplyDate).format('YYYY/MM/DD,HH:mm')}}<br /> - {{$moment(applied.endApplyDate).format('YYYY/MM/DD,HH:mm')}}
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">序號：</div>
                            <div class="action-info-data text-right">{{applied.applyNo}}</div>
                        </div>
                    </div>
                </div>
                <div class="action-button d-flex justify-center align-center">
                    <template v-if="applied.messageCode === 1 && $moment(now) < $moment(applied.implementStartTime)">
                        <v-btn class="btn-not-started" height="100%" width="100%" elevation="0" @click="toSession(applied)">
                            接種 未開始
                        </v-btn>
                    </template>
                    <template v-else-if="applied.messageCode === 1 && $moment(applied.implementStartTime) <= $moment(now) && $moment(now) <= $moment(applied.implementEndTime)">
                        <v-btn class="btn-in-progress" height="100%" width="100%" elevation="0" @click="toSession(applied)">
                            接種 進行中
                        </v-btn>
                    </template>
                    <template v-else-if="applied.messageCode === 1 && $moment(now) > $moment(applied.implementEndTime)">
                        <v-btn class="btn-over" height="100%" width="100%" elevation="0" @click="toSession(applied)">
                            接種 已結束
                        </v-btn>
                    </template>
                    <template v-else-if="applied.messageCode === 2 || applied.messageCode === 3">
                        <v-btn class="btn-over" height="100%" width="100%" elevation="0" @click="toSession(applied)">
                            複檢 未通過
                        </v-btn>
                    </template>
                    <template v-else-if="applied.messageCode === 4 || applied.messageCode === 5">
                        <v-btn class="btn-over" height="100%" width="100%" elevation="0" @click="toSession(applied)">
                            報名 已取消
                        </v-btn>
                    </template>
                    <template v-else>
                        <v-btn class="btn-over" height="100%" width="100%" elevation="0" @click="toSession(applied)">
                            異常
                        </v-btn>
                    </template>
                </div>
            </v-card>
            <div class="null-list" v-if="isLogin && applieds.length === 0">
                <div class="null-content">
                    <img src="/regist/null_list.svg" />
                    <div>尚無相關紀錄</div>
                </div>
            </div>
            <div class="pls-login" v-if="!isLogin">
                <div class="login-content">
                    <img src="/regist/lock.svg" />
                    <div class="msg">請登入您的身份以查詢接種資料</div>
                    <v-btn class="click-login" @click="toLogin">點我登入</v-btn>
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
            isShow: false,
            now: new Date()
        }),
        computed: {
            ...mapGetters('regist', ['getUserInfo']),
            isLogin: function () {
                if (!this.getUserInfo) return false;
                return true;
            }
        },
        props: {

        },
        created: function () {
            this.isShow = true;
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
                        var brands = [];
                        f.vaccines.forEach(v => {
                            brands.push(v.itemName);
                        });
                        f.brandName = brands.join('、');
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
                    registStart: applied.startApplyDate,
                    registEnd: applied.endApplyDate,
                    maxLimit: applied.maxLimit,
                    totalCount: applied.totalCount,
                    brandId: applied.brandId,
                    brandName: applied.brandName,
                    implementAddr: applied.implementAddr,
                    groupName: applied.vaccineGroupName,
                    signUp: false,
                    applyNo: applied.applyNo,
                    messageCode: applied.messageCode,
                    actName: applied.actName,
                    cancelTime: applied.cancelTime
                };
                
                this.setActivityApply(session).then(() => {
                    this.$router.push({ path: 'applied', params: session });
                });
            },
            toLogin: function () {
                this.$bus.$emit('login_switch_show');
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
        margin-bottom: 78px;
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
        width: 100%;
    }

    .applied-list/deep/ .null-content {
        position: relative;
        top: 112px;
    }

    .applied-list/deep/ .btn-not-started {
        background: #77CCDB80 0% 0% no-repeat padding-box !important;
        opacity: 1;
    }

    .applied-list/deep/ .btn-in-progress {
        background: #77CCDB 0% 0% no-repeat padding-box !important;
        opacity: 1;
    }

    .applied-list/deep/ .btn-over {
        background: #4349691A 0% 0% no-repeat padding-box !important;
        color: #43496980 !important;
        opacity: 1;
    }

    .applied-list/deep/ .action-container [class^="btn-"] .v-btn__content {
        width: 70px;
        white-space: normal;
        word-break: keep-all;
    }

    .applied-list/deep/ .action {
        background-color: #FFF;
        width: 100% !important;
        height: 200px !important;
        text-align: left;
        font: normal normal normal 12px/20px Noto Sans T Chinese;
        letter-spacing: 0px;
    }

    .applied-list/deep/ .pls-login {
        text-align: center;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #43496980;
        min-height: calc(100vh - 256px);
        width: 100%;
    }

    .applied-list/deep/ .login-content {
        position: relative;
        top: 56px;
    }

    .applied-list/deep/ .login-content img {
        width: 96px;
        height: 96px;
    }

    .applied-list/deep/ .login-content .msg {
        position: relative;
        margin: 0 auto;
        width: 136px;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #43496980;
        opacity: 1;
    }

    .applied-list/deep/ .click-login {
        margin-top: 32px;
        background: #736DB9 0% 0% no-repeat padding-box !important;
        border-radius: 4px;
        text-align: center;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
    }

    /* Extra small devices (portrait phones, less than 576px) */
    @media (max-width: 575.98px) {
    }

    /* Small devices (landscape phones, 576px and up) */
    @media (min-width: 576px) and (max-width: 767.98px) {
    }

    /** Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) and (max-width: 991.98px) {
        .applied-list/deep/ .action-container {
            display: flex;
            flex-wrap: wrap;
            width: 800px;
        }

        .applied-list/deep/ .action {
            width: 387px !important;
            margin: 6px !important;
        }

        .applied-list/deep/ .action-container {
            padding-left: 0;
            padding-right: 0;
        }
    }

    /* Large devices (desktops, 992px and up) */
    @media (min-width: 992px) and (max-width: 1199.98px) {
        .applied-list/deep/ .action-container {
            display: flex;
            flex-wrap: wrap;
            width: 800px;
        }

        .applied-list/deep/ .action {
            width: 387px !important;
            margin: 6px !important;
        }

        .applied-list/deep/ .action-container {
            padding-left: 0;
            padding-right: 0;
        }
    }

    /* Extra large devices (large desktops, 1200px and up) */
    @media (min-width: 1200px) {
        .applied-list/deep/ .action-container {
            display: flex;
            flex-wrap: wrap;
            width: 800px;
        }

        .applied-list/deep/ .action {
            width: 387px !important;
            margin: 6px !important;
        }

        .applied-list/deep/ .action-container {
            padding-left: 0;
            padding-right: 0;
        }
    }
</style>
