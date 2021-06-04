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
            <div class="agree-actions" v-if="isNeedLogin">
                <div class="action-header">請選擇登記方式：</div>
                <div class="action-content d-flex flex-row justify-space-between">
                    <div class="action tp-pass d-flex flex-column justify-center align-center" @click.stop="toTpton()">
                        <div>
                            <img src="/regist/tp_pass.svg">
                        </div>
                        <div class="action-label">台北通帳號登入</div>
                    </div>
                    <div class="action d-flex flex-column justify-center align-center" @click.stop="toLogin()">
                        <div>
                            <img src="/regist/editor_pen.svg">
                        </div>
                        <div class="action-label">手動輸入資料</div>
                    </div>
                </div>
                <!--<v-btn :to="{name:'apply'}">申請</v-btn>
        <v-btn :to="{name:'regist'}">返回</v-btn>-->
            </div>
            <login-editor ref="login"></login-editor>
        </template>
    </app-layout>
</template>

<script>
    import appLayout from 'components/regist/regist_layout'
    import applyViewer from 'components/regist/forms/apply_viewer'
    import loginEditor from 'components/regist/forms/login_editor'
    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
            }, isNeedLogin: true
        }),
        computed: {
        },
        props: {

        },
        created: function () {

        },
        methods: {
            toTpton: function () {

            },
            toLogin: function () {
                this.$refs.login.create();
            },
        },
        components: {
            appLayout, applyViewer, loginEditor
        }
    }
</script>
<style scoped>
    .agree-content/deep/ .action-header {
        padding-top:24px!important;
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
        width: 150px !important;
        height: 150px;
        border-radius: 10px;
    }

        .agree-content/deep/ .action.tp-pass {
            background-color: #77CCDB;
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
</style>
