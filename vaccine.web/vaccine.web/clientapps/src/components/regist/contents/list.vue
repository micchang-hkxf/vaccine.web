<template>
    <app-layout :app-bar="appBar" class="list-content">
        <template v-slot:regist-title>
            「新冠肺炎疫苗」選擇種接場次
        </template>
        <template v-slot:regist-content>
            <div class="action-bar">
                <v-text-field placeholder="請輸入行政區、村里或場次標題"
                              outlined>
                    <template v-slot:append>
                        123
                    </template>
                </v-text-field>
            </div>
            <div class="action-container">

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
