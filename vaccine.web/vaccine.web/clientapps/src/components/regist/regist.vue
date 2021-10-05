<template>
    <app-layout :app-bar="appBar">
        <template v-slot:app-bar>
            <div class="regist-header d-flex flex-column">
                <div class="logo-title d-flex flex-row justify-center">
                    <div class="regist-icon">
                        <img src="/regist/regist_logo.png">
                    </div>
                    <div>
                        <div>社區疫苗接種便民服務 </div>
                        <div>-網路報名系統-</div>
                    </div>
                </div>
                <div class="action-title d-flex flex-row justify-center">我要報名</div>
            </div>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <div class="tab-container">
                    <v-tabs color="black" slider-color="#736DB9" grow>
                        <v-tab :ripple="false">我要報名</v-tab>
                        <v-tab :ripple="false">查詢紀錄</v-tab>
                    </v-tabs>
                </div>
            </div>
        </template>
    </app-layout>
</template>

<script>
    import appLayout from 'components/app_layout'
    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height:'160px'
            }
        }),
        computed: {
        },
        props: {

        },
        created: function () {

        },
        methods: {

        },
        components: {
            appLayout
        }
    }
</script>
<style>


    .regist-icon {
        padding-right:8px!important;
    }
    .action-title {
        padding-top: 5px !important;
        max-width: 200%;
        font-size: 16px !important;
        font-weight: bold !important;
    }
    .logo-title {
        max-width: 200%;
    }
    .app-bar {
        width: calc(100vw - 32px) !important;
    }
    .regist-header {
        width: calc(100vw - 32px) !important;
        font-size:20px!important;
    }
    .v-tab.v-tab--active::before {
        color: black;
    }
    .v-tab {
        color: gray;
        font-size: 16px !important;
        border-bottom-style: solid;
        border-bottom-color: lightgray;
        border-bottom-width: 1px;
    }
    .v-toolbar__content {
        background-color: #736DB9;
        color: #ffffff;
    }
    .app {
    }
</style>
