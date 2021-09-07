<template>
    <app-layout :app-bar="appBar" class="agree-content">
        <template v-slot:regist-title>
            報名登記與身份驗證
        </template>
        <template v-slot:regist-content>
            <div class="agree-container">
                <apply-viewer></apply-viewer>
                <v-divider></v-divider>
            </div>
            <div class="agree-actions" v-if="isNeedLogin && isShow">
                <div class="action-header">請選擇登記方式：</div>
                <div class="action-content d-flex flex-row justify-space-between">
                    <div class="action tp-pass d-flex flex-column justify-center align-center" @click="toTpPass($route.params.vote_no)">
                        <div>
                            <img src="/regist/tp_pass.svg">
                        </div>
                        <div class="action-label">台北通帳號登入</div>
                    </div>
                    <div class="action d-flex flex-column justify-center align-center" @click.stop="toLocalPass($route.params.vote_no)">
                        <div>
                            <img src="/regist/editor_pen.svg">
                        </div>
                        <div class="action-label">手動輸入資料</div>
                    </div>
                </div>
                <!--<v-btn :to="{name:'apply'}">申請</v-btn>
        <v-btn :to="{name:'regist'}">返回</v-btn>-->
            </div>
            <login-switch ref="switch" :login-done="loginDone" :login-cancel="loginCancel"></login-switch>
        </template>
    </app-layout>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import appLayout from 'components/regist/regist_layout'
    import applyViewer from 'components/regist/forms/apply_viewer'
    import loginSwitch from 'components/regist/forms/login_switcher'
    import moment from "moment";

    export default {
        // router,
        data: () => ({
            activeId: 555 ,
            appBar: {
                elevation: 0,
                height: '144px'
            },
            isNeedLogin: true,
            isShow: false,
            now: new Date()
        }),
        computed: {
            ...mapGetters('regist', ['getUserInfo']),
        },
        props: {

        },
        created: function () {
            this.isShow = false;
            this.session = this.$store.getters['regist/user/getActivityApply'];
            if (moment(this.session.registStart) <= moment(this.now) && moment(this.now) <= moment(this.session.registEnd)) {
                if (this.session.totalCount < this.session.maxLimit) {
                    this.isShow = true;
                }
            }
            window.scrollTo(0, 0);
        },
        methods: {
            ...mapActions('regist', ['setUserInfo']),
            toTpPass: function (sessionId) {
                this.$refs.switch.toTpPassLogin(`/regist/#/apply/${sessionId}`);
            },
            toLocalPass: function (sessionId) {
                this.$refs.switch.toLocalLogin(`/apply/${sessionId}`);
            },
            loginDone: function () {
                this.$router.push({ path: `/apply/${this.$route.params.vote_no}` });
            },
            loginCancel: function () {

            },
            //toLogin: function () {
            //    if (!this.getUserInfo) {
            //        this.$refs.login.create();
            //        return;
            //    }
            //    this.$router.push({ path: `/apply/${this.activeId}` });
            //},
            //userSign: function () {
            //    this.$router.push({ path: `/apply/${this.activeId}` });
            //}
        },
        components: {
            appLayout, applyViewer, loginSwitch
        }
    }
</script>

<style scoped>
    .agree-content/deep/ .app-content {
        /*margin-bottom: 78px;*/
        width: 66%;
        /*max-width: 992px !important;*/
        margin: 0 auto;
    }

    .agree-content/deep/ .action-header {
        padding-top: 24px !important;
    }
    .agree-content/deep/ .v-divider {
        margin-top: 24px !important;
    }
    .agree-content/deep/ .agree-container {
        padding-top: 24px !important;
        padding-left: 24px !important;
        padding-right: 24px !important;
    }
    .agree-content/deep/ .agree-actions {
        padding-left: 24px !important;
        padding-right: 24px !important;
        padding-bottom: 24px !important;
    }

    .agree-content/deep/ .action {
        font-size: 16px;
        color: white;
        background-color: #736DB9;
        /*width: 152px !important;
        height: 150px;*/
        width: 300px !important;
        height: 300px;
        border-radius: 10px;
        cursor: pointer;
    }

    .agree-content/deep/ .action:hover {
        background-color: #736DB980;
    }

    .agree-content/deep/ .action.tp-pass {
        background-color: #77CCDB;
    }

    .agree-content/deep/ .action.tp-pass:hover {
        background-color: #77CCDB80;
    }

    .agree-content/deep/ .action-content {
        padding-top: 20px;
    }
    .agree-content/deep/ .action-label {
        margin-top: 16px;
    }

    
    .agree-content/deep/ .agree-header {
        padding-top: 16px !important;
    }
    .agree-content/deep/ .step-one {
        padding-top: 12px !important;
        padding-bottom: 8px !important;
        padding-left: 0px !important;
    }
    .agree-content/deep/ .step-two {
        padding-top: 12px !important;
        padding-bottom: 8px !important;
        padding-right: 0px !important;
    }
    .agree-content/deep/ .step-one .v-stepper__step__step {
        margin-right: 60px !important;
        height: 32px !important;
        width: 32px !important;
    }
    .agree-content/deep/ .step-two .v-stepper__step__step {
        margin-left: 60px !important;
        height: 32px !important;
        width: 32px !important;
    }
    .agree-content/deep/ .active-step .v-stepper__step__step {
        background-color: #736DB9 !important;
        color: white !important;
    }
    .agree-content/deep/ .disable-step .v-stepper__step__step {
        background-color: rgba(67,73,105,0.1) !important;
        color: rgba(67,73,105,0.5)!important;
    }
    .v-stepper hr {
        margin-top:26px!important;
        margin-left: -30% !important;
        margin-right: -30% !important;
    }

    @media (min-device-width: 110px) and (max-device-width: 319px) and (-webkit-min-device-pixel-ratio: 2) {
        .agree-content/deep/ .app-content {
            /*width: 100%;*/
            margin: 0 auto;
        }

        .agree-content/deep/ .action {
            width: 100px !important;
            height: 100px;
        }

        img {
            width: 60px;
        }

        .agree-content/deep/ .action-label {
            margin-top: 0px;
            font-size: 10px;
        }

    }

    @media (min-device-width: 320px) and (max-device-width: 540px) and (-webkit-min-device-pixel-ratio: 2) {
        .agree-content/deep/ .app-content {
            /*width: 100%;*/
            margin: 0 auto;
        }

        .agree-content/deep/ .action {
            width: 150px !important;
            height: 150px;
        }

        img {
            width: 80px;
        }
    }


    @media (min-width: 540.5px) and (max-width: 767.98px) {
        .agree-content/deep/ .app-content {
            /*width: 90%;*/         
        }

        .agree-content/deep/ .action {
            width: 200px !important;
            height: 200px;
        }

        img {
            width: 100px;
        }
    }


    /** Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) and (max-width: 991.98px) {
        .agree-content/deep/ .app-content {
            /*width: 90%;*/
        }


        .agree-content/deep/ .action {
            width: 240px !important;
            height: 240px;
        }

        .agree-content/deep/ .action img {
            width: 150px;
            height: 150px;
        }

        /*.agree-content/deep/ .agree-container {
            padding-left: 0 !important;
            padding-right: 0 !important;
        }

        .agree-content/deep/ .agree-actions {
            padding-left: 0 !important;
            padding-right: 0 !important;
        }*/
    }

    /* Large devices (desktops, 992px and up) */
    @media (min-width: 992px) and (max-width: 1199.98px) {

        .agree-content/deep/ .app-content {
            /*width: 90%;*/
        }


        .agree-content/deep/ .action {
            width: 386px !important;
            height: 386px;
        }

        .agree-content/deep/ .action img {
            width: 224px;
            height: 224px;
        }

        /*.agree-content/deep/ .agree-container {
            padding-left: 0 !important;
            padding-right: 0 !important;
        }

        .agree-content/deep/ .agree-actions {
            padding-left: 0 !important;
            padding-right: 0 !important;
        }*/
    }

    /* Extra large devices (large desktops, 1200px and up) */
    @media (min-width: 1200px) {
        .agree-content/deep/ .app-content {
            /* margin-bottom: 78px; */
            /*width: 85%;*/
            margin: 0 auto;
        }

        .agree-content/deep/ .action {
            width: 380px !important;
            height: 380px;
        }

        .agree-content/deep/ .action img {
            width: 224px;
            height: 224px;
        }

        /*.agree-content/deep/ .agree-container {
            padding-left: 0 !important;
            padding-right: 0 !important;
        }

        .agree-content/deep/ .agree-actions {
            padding-left: 0 !important;
            padding-right: 0 !important;
        }*/
    }


   
</style>
