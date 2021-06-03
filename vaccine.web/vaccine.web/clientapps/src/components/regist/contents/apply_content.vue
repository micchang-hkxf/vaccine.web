<template>
    <app-layout :app-bar="appBar" class="apply-content">
        <template v-slot:regist-title>
            報名資訊確認
        </template>
        <template v-slot:regist-content>
            <div class="apply-header">
                <v-stepper alt-labels class="elevation-0">
                    <v-stepper-header>
                        <v-stepper-step step="1" class="step-one disable-step"></v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="2" class="step-two active-step"> </v-stepper-step>
                    </v-stepper-header>
                </v-stepper>
            </div>
            <div class="apply-container">

                <div class="activity-name">五月份新冠肺炎疫苗接種</div>
                <div class="activity-name-descript">內湖區西康里 | COVID-19疫苗(AZ) | 王慶森診所</div>

                <div class="apply-field">
                    <div class="apply-field-label">姓名<span class="red--text">*</span></div>
                    <div class="apply-field-container">
                        <v-text-field class="apply-field-text" placeholder="請輸入您的姓名"></v-text-field>
                    </div>
                </div>
                <div class="apply-field">
                    <div class="apply-field-label">身份證字號<span class="red--text">*</span></div>
                    <div class="apply-field-container">
                        <v-text-field class="apply-field-text" placeholder="請輸入您的身分證字號"></v-text-field>
                    </div>
                </div>
                <div class="apply-field">
                    <div class="apply-field-label">生日<span class="red--text">*</span></div>
                    <div class="apply-field-container d-flex justify-space-between">
                        <v-select :items="years" placeholder="yyy">

                        </v-select>
                        <v-select :items="months" placeholder="mm">
                            <template v-slot:prepend>
                                /
                            </template>
                        </v-select>
                        <v-select :items="days" placeholder="dd">
                            <template v-slot:prepend>
                                /
                            </template>
                        </v-select>
                    </div>
                </div>
                <div class="apply-field">
                    <div class="apply-field-label">電話<span class="red--text">*</span></div>
                    <div class="apply-field-container">
                        <v-text-field class="apply-field-text" placeholder="請輸入手機號碼"></v-text-field>
                    </div>
                </div>
                <div class="apply-field">
                    <div class="apply-field-label">戶籍<span class="red--text">*</span></div>
                    <div class="apply-field-container">
                        <v-text-field class="apply-field-text" placeholder="台北市（原）"></v-text-field>
                    </div>
                </div>
                <div class="apply-field display type">
                    <div class="apply-field-label">接種疫苗<span class="red--text">*</span></div>
                    <div class="apply-field-container">
                        <div class="apply-field-type d-flex justify-space-between">
                            <div class="apply-field-type-icon">
                                &nbsp;
                            </div>
                            <div class="apply-field-type-text d-flex justify-start">
                                公費流感疫苗
                            </div>
                        </div>
                        <div class="apply-field-type d-flex justify-space-between">
                            <div class="apply-field-type-icon">
                                &nbsp;
                            </div>
                            <div class="apply-field-type-text d-flex justify-start">
                                公費肺炎鏈球菌疫苗(中央75歲以上)
                            </div>
                        </div>
                    </div>
                </div>
                <v-divider></v-divider>

                <div class="apply-field display descript">
                    <div class="apply-field-label">活動申明<span class="red--text">*</span></div>
                    <div class="apply-field-container descript-area">
                        為避免重複接種，報名後請勿再自行前往院所接種或跨里報名，接種當日，將再次檢核接種資格，屆時依現場判讀可接種之疫苗別為準。
                    </div>
                </div>

                <div class="apply-field display">
                    <v-checkbox label="我同意以上申明*"></v-checkbox>
                </div>
            </div>
            <div class="apply-actions d-flex justify-space-around" v-if="isNeedLogin">
                <v-btn color="#626781" :to="{ name:'regist' }">取消</v-btn>
                <v-btn color="#736DB9" :to="{ name:'agree' }">上一步</v-btn>
                <v-btn color="#736DB9" @click.stop="sendApply()">確定報名</v-btn>
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
            }, isNeedLogin: true,
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
            sendApply: function () {

            },
        },
        components: {
            appLayout
        }
    }
</script>
<style scoped>

    .apply-content/deep/ .descript-area {
        padding: 16px !important;
        background-color: rgba(67,73,105,0.06) !important;
    }

    .apply-content/deep/ .apply-field-type-icon {
        width: 30px !important;
        color: #626781 !important;
        font-size: 16px !important;
    }

    .apply-content/deep/ .apply-field-type-text {
        font-size: 16px !important;
        color: #626781 !important;
        width: calc(100% - 30px) !important;
    }

    .apply-content/deep/ .apply-container .apply-field-label {
        color: #434969 !important;
        font-size: 16px !important;
    }

    .apply-content/deep/ .apply-container .apply-field-container {
    }

    .apply-content/deep/ .apply-container .apply-field {
        margin-top: 24px !important;
    }

        .apply-content/deep/ .apply-container .apply-field.display {
            margin-top: 0px !important;
        }

            .apply-content/deep/ .apply-container .apply-field.display.type .apply-field-label {
                padding-top: 0px !important;
                padding-bottom: 16px !important;
            }

            .apply-content/deep/ .apply-container .apply-field.display.descript .apply-field-label {
                padding-top: 16px !important;
                padding-bottom: 16px !important;
            }

    .apply-content/deep/ .v-text-field .v-input__slot::before {
        border-color: rgba(0, 0, 0, 0.12) !important;
    }


    .apply-content/deep/ .v-text-field,
    .apply-content/deep/ .v-select {
        padding-top: 0px !important;
        margin-top: 0px !important;
    }

    .apply-content/deep/ .activity-name {
        font-size: 20px !important;
        color: #626781 !important;
    }

    .apply-content/deep/ .activity-name-descript {
        font-size: 12px !important;
        color: rgba(98,103,129,0.5) !important;
    }

    .apply-content/deep/ .action-header {
        padding-top: 24px !important;
    }

    .apply-content/deep/ .v-divider {
        margin-top: 24px !important;
    }

    .apply-content/deep/ .apply-container,
    .apply-content/deep/ .apply-actions {
        padding-left: 24px !important;
        padding-right: 24px !important;
    }

    .apply-content/deep/ .apply-actions {
        padding-top: 24px !important;
    }

    .apply-content/deep/ .action {
        font-size: 16px;
        color: white;
        background-color: #736DB9;
        width: 150px !important;
        height: 150px;
        border-radius: 10px;
    }

    .apply-content/deep/ .action-content {
        padding-top: 20px;
    }

    .apply-content/deep/ .action-label {
        margin-top: 16px;
    }


    .apply-content/deep/ .agree-header {
        padding-top: 16px !important;
    }

    .apply-content/deep/ .step-one {
        padding-top: 12px !important;
        padding-bottom: 8px !important;
        padding-left: 0px !important;
    }

    .apply-content/deep/ .step-two {
        padding-top: 12px !important;
        padding-bottom: 8px !important;
        padding-right: 0px !important;
    }

    .apply-content/deep/ .step-one .v-stepper__step__step {
        margin-right: 60px !important;
        height: 32px !important;
        width: 32px !important;
    }

    .apply-content/deep/ .step-two .v-stepper__step__step {
        margin-left: 60px !important;
        height: 32px !important;
        width: 32px !important;
    }

    .apply-content/deep/ .active-step .v-stepper__step__step {
        background-color: #736DB9 !important;
        color: white !important;
    }

    .apply-content/deep/ .disable-step .v-stepper__step__step {
        background-color: rgba(67,73,105,0.1) !important;
        color: rgba(67,73,105,0.5) !important;
    }

    .v-stepper hr {
        margin-top: 26px !important;
        margin-left: -30% !important;
        margin-right: -30% !important;
    }
</style>
