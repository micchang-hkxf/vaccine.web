<template>
    <app-layout :app-bar="appBar" class="regist-content">
        <template v-slot:regist-title>
            我要報名
        </template>
        <template v-slot:regist-content>
            <v-tabs color="black" slider-color="#736DB9" grow v-model="tab">
                <v-tab key="regist">我要報名</v-tab>
                <v-tab key="applied">查詢紀錄</v-tab>
            </v-tabs>
            <div class="action-container">
                <v-tabs-items v-model="tab">
                    <v-tab-item key="regist" class="regist-container">
                        <div class="action-sub-title">請選擇疫苗類型：</div>
                        <div class="action-content d-flex flex-row justify-space-around">
                            <div class="action d-flex flex-column justify-center align-center" @click.stop="toRegist('influenza')">
                                <div>
                                    <img src="/regist/regist_logo.png">
                                </div>
                                <div>肺鏈、流感</div>
                            </div>
                            <div class="action d-flex flex-column justify-center align-center" @click.stop="toRegist('covid')">
                                <div>
                                    <img src="/regist/regist_logo.png">
                                </div>
                                <div>新冠肺炎</div>
                            </div>
                        </div>
                    </v-tab-item>
                    <v-tab-item key="applied" class="applied-container">
                        <applied-list></applied-list>
                    </v-tab-item>
                </v-tabs-items>
            </div>
        </template>
    </app-layout>
</template>

<script>
    import appLayout from 'components/regist/regist_layout'
    import appliedList from 'components/regist/forms/applied_list'
    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
            },
            tab:null,
        }),
        computed: {
        },
        props: {

        },
        created: function () {

        },
        methods: {
            toRegist: function (type) {
                console.log('regist type', type);
                this.$router.push({ name: 'agree' });
            }
        },
        components: {
            appLayout, appliedList
        }
    }
</script>
<style scoped>
    .regist-content .regist-container {
        padding-left: 24px !important;
        padding-right: 24px !important;
    }
    .regist-content .action img {
        width: 72px;
        height: 60px;
    }
    .regist-content .action {
        font-size: 20px;
        color: white;
        background-color: #736DB9;
        width: 150px !important;
        height: 150px;
        border-radius: 10px;
    }
    .regist-content .action-content {
        padding-top: 20px;
    }
    .regist-content .action-sub-title {
        padding-top: 40px !important;
    }
    .regist-content .action-container {

    }
    .regist-content .action-sub-title {
        font-size: 20px !important;
    }

</style>
