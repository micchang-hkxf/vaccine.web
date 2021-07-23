<template>
    <app-layout :app-bar="appBar" class="applied-content">
        <template v-slot:regist-title>
            活動內容
        </template>
        <template v-slot:regist-content>
            <div class="applied-header d-flex justify-center align-center">
                接種未開始
            </div>
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
            <div class="applied-actions" v-if="isNeedLogin">
                <v-btn :to="{name:'apply'}">我要取消報名</v-btn>                
            </div>
        </template>
    </app-layout>
</template>

<script>
    import appLayout from 'components/regist/regist_layout'
    import applyViewer from 'components/regist/forms/apply_viewer'
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

            },
        },
        components: {
            appLayout, applyViewer
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
        padding-top: 16px;
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
</style>
