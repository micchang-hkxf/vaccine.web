<template>
    <app-layout :app-bar="appBar" class="regist-content">
        <template v-slot:regist-title>
            我要報名
        </template>
        <template v-slot:regist-content>
            <v-tabs color="black" slider-color="#736DB9" grow>
                <v-tab>我要報名</v-tab>
                <v-tab>查詢紀錄</v-tab>
            </v-tabs>
            <div class="action-container">
                <v-tabs-items>
                    <v-tabs-item>
                        <div class="action-sub-title">請選擇疫苗類型：</div>
                        <div class="action-content d-flex flex-row justify-space-around">
                            <div class="action d-flex flex-column justify-center align-center">
                                <div>
                                    <img src="/regist/regist_logo.png">
                                </div>
                                <div>肺鏈、流感</div>
                            </div>
                            <div class="action d-flex flex-column justify-center align-center">
                                <div>
                                    <img src="/regist/regist_logo.png">
                                </div>
                                <div>新冠肺炎</div>
                            </div>
                        </div>
                    </v-tabs-item>
                </v-tabs-items>
            </div>
        </template>
    </app-layout>
</template>

<script>
    import appLayout from 'components/regist/regist_layout'
    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
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
    .action img {
        width: 72px;
        height: 60px;
    }
    .action {
        font-size: 20px;
        color:white;
        background-color:#736DB9;
        width: 150px !important;
        height: 150px;
        border-radius: 10px;
    }
    .action-content {
        padding-top: 20px;
    }
    .action-sub-title {
        padding-top:40px!important;
    }
    .action-container {
        padding-left: 24px;
        padding-right: 24px;
    }
    .action-sub-title {
        font-size: 20px !important;
    }
</style>
