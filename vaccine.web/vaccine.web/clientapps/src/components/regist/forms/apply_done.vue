<template>
    <v-dialog v-model="isShow">
        <v-card class="done-dialog">
            <v-card-title class="done-header">
                <div class="done-header-icon d-flex justify-center align-center">
                    <img src="/alert_success.svg" />
                </div>                
                <div class="done-header-title d-flex justify-center align-center">
                    完成報名！
                </div>
            </v-card-title>
            <v-card-text class="done-container">
                <div class="field-container">
                    <div class="title full-width">
                        五月份新冠肺炎疫苗接種
                    </div>
                    <div class="datetime full-width">
                        2021/05/08, 08:30 - 11:30 
                    </div>
                    <div class="address full-width">
                        台北市內湖區西康里西康路30號
                    </div>
                    <div class="order-tip full-width">
                        序號：
                    </div>
                    <div class="order">
                        012
                    </div>
                </div>
            </v-card-text>
            <v-card-actions class="done-actions d-flex justify-space-between full-width">
                <div class="descript">
                    為避免重複接種，報名後請勿再自行前往院所接種或跨里報名，接種當日，將再次檢核接種資格，屆時依現場判讀可接種之疫苗別為準。
                </div>
                <v-btn class="done-action full-width" color="#626781" width="100%" @click.stop="isShow=false">了解</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
            }, isShow: false,
            years: [108],
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        }),
        computed: {
        },
        props: {

        },
        created: function () {

        },
        methods: {
            create: function () {
                this.isShow = true;
            }
        },
        components: {
        }
    }
</script>

<style scoped>

    .done-dialog/deep/ .full-width {
        width: 100% !important;
    }

    .done-dialog/deep/ .done-header-icon,
    .done-dialog/deep/ .done-header-title {
    }

    .done-dialog/deep/ .v-btn {
        min-width: 130px !important;
    }

    .done-dialog/deep/ .v-input {
        padding-top: 0px !important;
        margin-top: 0px !important;
    }

    .v-application .primary--text {
        color: #736DB9 !important;
        caret-color: #736DB9 !important;
    }

    .done-dialog/deep/ .done-action {
        background-color: #626781 !important;
    }

    .done-dialog/deep/ .v-btn:not(.v-btn--disabled) {
        color: white !important;
    }

    .done-dialog/deep/ {
    }

        .done-dialog/deep/ .v-overlay__scrim {
        }


        .done-dialog/deep/ .done-header {
            font-size: 16px !important;
            color: #626781 !important;
        }

        .done-dialog/deep/ .done-container {
        }


        .done-dialog/deep/ .done-actions {
        }

            .done-dialog/deep/ .done-actions .v-btn {
                width: 60px !important;
            }

</style>
