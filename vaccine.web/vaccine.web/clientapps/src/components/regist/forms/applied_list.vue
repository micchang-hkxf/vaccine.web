<template>
    <div class="applied-list">
        <div class="action-bar">
            <v-text-field placeholder="請輸入行政區、村里或場次標題" hide-details dense height="48px"
                          outlined>
                <template v-slot:append>
                    <img src="/regist/common_search-24px.svg" />
                </template>
            </v-text-field>
        </div>
        <div class="action-container">
            <v-card class="action d-flex flex-row" elevation="0">
                <div class="action-info d-flex flex-column justify-center">
                    <div class="action-info-header d-flex flex-column">
                        <div class="action-info-subject">
                            五月份新冠肺炎疫苗接種
                        </div>
                        <div class="action-info-sec-subject">
                            內湖區-西康里
                        </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="action-info-detail d-flex flex-column justify-center">
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">接種日期：</div>
                            <div class="action-info-data text-right">2021/04/10, 08:30-11:30</div>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">事先報名：</div>
                            <div class="action-info-data text-right">
                                2021/04/01,08:00<br />- 2021/04/07,20:00
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">開放名額：</div>
                            <div class="action-info-data text-right">240 / 300</div>
                        </div>
                    </div>
                </div>
                <div class="action-button d-flex justify-center align-center">
                    <v-btn color="rgba(119,204,219,0.5)" height="100%" width="100%" elevation="0">
                        報名
                    </v-btn>
                </div>
            </v-card>

            <v-card class="action d-flex flex-row" elevation="0">
                <div class="action-info d-flex flex-column justify-center">
                    <div class="action-info-header d-flex flex-column">
                        <div class="action-info-subject">
                            五月份新冠肺炎疫苗接種
                        </div>
                        <div class="action-info-sec-subject">
                            內湖區-西康里
                        </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="action-info-detail d-flex flex-column justify-center">
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">接種日期：</div>
                            <div class="action-info-data text-right">2021/04/10, 08:30-11:30</div>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">事先報名：</div>
                            <div class="action-info-data text-right">
                                2021/04/01,08:00<br />- 2021/04/07,20:00
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">開放名額：</div>
                            <div class="action-info-data text-right">240 / 300</div>
                        </div>
                    </div>
                </div>
                <div class="action-button d-flex justify-center align-center">
                    <v-btn  color="#77CCDB" height="100%" width="100%" elevation="0">
                        報名
                    </v-btn>
                </div>
            </v-card>
            
            <v-card class="action d-flex flex-row" elevation="0">
                <div class="action-info d-flex flex-column justify-center">
                    <div class="action-info-header d-flex flex-column">
                        <div class="action-info-subject">
                            五月份新冠肺炎疫苗接種
                        </div>
                        <div class="action-info-sec-subject">
                            內湖區-西康里
                        </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="action-info-detail d-flex flex-column justify-center">
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">接種日期：</div>
                            <div class="action-info-data text-right">2021/04/10, 08:30-11:30</div>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">事先報名：</div>
                            <div class="action-info-data text-right">
                                2021/04/01,08:00<br />- 2021/04/07,20:00
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">開放名額：</div>
                            <div class="action-info-data text-right">240 / 300</div>
                        </div>
                    </div>
                </div>
                <div class="action-button d-flex justify-center align-center">
                    <v-btn color="rgba(67,73,105,0.1)" height="100%" width="100%" elevation="0">
                        報名
                    </v-btn>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
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
</style>
