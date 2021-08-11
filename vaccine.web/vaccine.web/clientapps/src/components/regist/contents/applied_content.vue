<template>
    <app-layout :app-bar="appBar" class="applied-content">
        <template v-slot:regist-title>
            活動內容
        </template>
        <template v-slot:regist-content>
            <template v-if="session.messageCode === 1 && $moment(now) < $moment(session.sessionStart)">
                <div class="applied-header btn-not-started d-flex justify-center align-center">
                    接種未開始
                </div>
            </template>
            <template v-else-if="session.messageCode === 1 && $moment(session.sessionStart) <= $moment(now) && $moment(now) <= $moment(session.sessionEnd)">
                <div class="applied-header btn-in-progress d-flex justify-center align-center">
                    接種進行中
                </div>
            </template>
            <template v-else-if="session.messageCode === 1 && $moment(now) > $moment(session.sessionEnd)">
                <div class="applied-header btn-over d-flex justify-center align-center">
                    接種已結束
                </div>
            </template>
            <template v-else-if="session.messageCode === 2 || session.messageCode === 3">
                <div class="applied-header btn-over d-flex justify-center align-center">
                    複檢未通過
                </div>
            </template>
            <template v-else-if="session.messageCode === 4 || session.messageCode === 5">
                <div class="applied-header btn-over d-flex justify-center align-center">
                    報名已取消
                </div>
            </template>
            <template v-else>
                <div class="applied-header btn-over d-flex justify-center align-center">
                    異常
                </div>
            </template>
            <div class="applied-container">
                <apply-viewer></apply-viewer>
                <v-divider></v-divider>
                <div class="descript-container">
                    <div class="descript-header d-flex justify-start">活動聲明：</div>
                    <div class="descript-content d-flex justify-start">
                        為避免重複接種，報名後請勿再自行前往院所接種或跨里報名，接種當日，將再次檢核接種資格，屆時依現場判讀可接種之疫苗別為準。
                    </div>
                </div>
            </div>
            <div class="applied-actions" v-if="isNeedLogin && (session.messageCode === 1 || session.messageCode === 2)">
                <v-btn @click.stop="cancelRegistered()">我要取消報名</v-btn>
            </div>
            <!--共用 loading -->
            <com-loading ref-key="loading"></com-loading>
            <!---->
            <com-confirm ref="alertRegistered" ref-key="alertRegistered" :left-click="alertRegisteredLeftClick" :right-click="alertRegisteredRightClick" right-color="rgba(240,82,75,1) !important">
                <template v-slot:confirm-image>
                    <v-img src="/alert_warning.svg"></v-img>
                </template>
                <template v-slot:confirm-text>
                    <div class="sub-title">取消本次報名？</div>
                    <div class="sub-title-name">{{session.sessionName}}</div>
                </template>
                <template v-slot:confirm-left-btn-text>
                    保留
                </template>
                <template v-slot:confirm-right-btn-text>
                    我要取消
                </template>
            </com-confirm>
        </template>
    </app-layout>
</template>

<script>
    import appLayout from 'components/regist/regist_layout'
    import applyViewer from 'components/regist/forms/apply_viewer'
    import comLoading from 'components/loading'
    import comConfirm from 'components/confirm'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
            },
            isNeedLogin: true,
            now: new Date()
        }),
        computed: {
            ...mapGetters('regist', ['getUserInfo']),
        },
        props: {

        },
        created: function () {
            this.session = this.$store.getters['regist/user/getActivityApply'];
            window.scrollTo(0, 0);
        },
        methods: {
            ...mapActions('regist', ['deleteApply']),
            toTpton: function () {

            },
            toLogin: function () {

            },
            cancelRegistered: function () {
                this.$bus.$emit('alertRegistered_show', true);
            },
            alertRegisteredLeftClick: function () {
                this.$bus.$emit('alertRegistered_show', false);
            },
            alertRegisteredRightClick: function () {
                var comp = this;

                var userInfo = comp.getUserInfo;

                if (userInfo !== null) {
                    comp.$bus.$emit('loading_show4', '資料處理中...');

                    comp.deleteApply({ uid: userInfo.identify, activityId: comp.session.sessionId })
                        .then(function (result) {
                            console.log(result);
                            comp.$bus.$emit('loading_hide4');
                            comp.$bus.$emit('alertRegistered_show', false);
                            comp.$router.push({ name: 'regist', params: { mode: 'applied' } });
                        })
                        .catch(ex => {
                            console.log(ex);
                            comp.$bus.$emit('loading_hide4');
                            comp.$bus.$emit('alertRegistered_show', false);
                        });
                }
            },
        },
        components: {
            appLayout, applyViewer, comLoading, comConfirm
        }
    }
</script>
<style scoped>
    .applied-content/deep/.descript-header,
    .applied-content/deep/.descript-content {
        font-size:12px!important;
        color:rgba(98,103,129,0.5)!important;
    }

    .applied-content/deep/ .descript-content {
        padding: 16px 0;
    }

    .applied-content/deep/ .descript-header {
        padding-top: 24px !important;
    }

    .applied-content/deep/ .v-divider {
        margin-top: 24px !important;
    }

    .applied-content/deep/ .applied-container {
        padding-top: 24px !important;
        padding-left: 24px !important;
        padding-right: 24px !important;
        margin-bottom: 78px;
    }

    .applied-content/deep/ .applied-actions {
        padding-top: 48px !important;
        padding-left: 24px !important;
        padding-right: 24px !important;
        padding-bottom: 24px !important;
    }

    .applied-content/deep/ .applied-actions .v-btn {
        width: 100% !important;
        background-color: #F0524B!important;
        color:white!important;
    }

    .applied-content/deep/ .action {
        font-size: 16px;
        color: white;
        background-color: #736DB9;
        width: 150px !important;
        height: 150px;
        border-radius: 10px;
    }

    .applied-content/deep/ .action.tp-pass {
        background-color: #77CCDB;
    }

    .applied-content/deep/ .action-label {
        margin-top: 16px;
    }

    .applied-content/deep/ .applied-header {
        background-color: rgba(119,204,219,0.5)!important;
        font-size:16px!important;
        color:white!important;
        height:48px!important;
    }

    .applied-content/deep/ .applied-header.btn-not-started {
        background: #77CCDB80 0% 0% no-repeat padding-box !important;
    }

    .applied-content/deep/ .applied-header.btn-in-progress {
        background: #77CCDB 0% 0% no-repeat padding-box !important;
    }

    .applied-content/deep/ .applied-header.btn-over {
        background: #4349691A 0% 0% no-repeat padding-box !important;
    }

    .applied-content/deep/ .step-one {
        padding-top: 12px !important;
        padding-bottom: 8px !important;
        padding-left: 0px !important;
    }

    .applied-content/deep/ .step-two {
        padding-top: 12px !important;
        padding-bottom: 8px !important;
        padding-right: 0px !important;
    }

    .applied-content/deep/ .step-one .v-stepper__step__step {
        margin-right: 60px !important;
        height: 32px !important;
        width: 32px !important;
    }

    .applied-content/deep/ .step-two .v-stepper__step__step {
        margin-left: 60px !important;
        height: 32px !important;
        width: 32px !important;
    }

    .applied-content/deep/ .active-step .v-stepper__step__step {
        background-color: #736DB9 !important;
        color: white !important;
    }

    .applied-content/deep/ .disable-step .v-stepper__step__step {
        background-color: rgba(67,73,105,0.1) !important;
        color: rgba(67,73,105,0.5) !important;
    }

    .v-stepper hr {
        margin-top: 26px !important;
        margin-left: -30% !important;
        margin-right: -30% !important;
    }

    .applied-content/deep/ .confirm-text {
        display: block;
    }

    .applied-content/deep/ .sub-title {
        text-align: center;
        font: normal normal normal 20px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
    }

    .applied-content/deep/ .sub-title-name {
        text-align: center;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #77CCDB;
        margin-top: 10px;
    }
</style>
