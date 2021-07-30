<template>
    <app-layout :app-bar="appBar" class="apply-content">
        <template v-slot:regist-title>
            報名資訊確認
        </template>
        <template v-slot:regist-content>
            <!--<div class="apply-header">
        <v-stepper alt-labels class="elevation-0">
            <v-stepper-header>
                <v-stepper-step step="1" class="step-one disable-step"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" class="step-two active-step"> </v-stepper-step>
            </v-stepper-header>
        </v-stepper>
    </div>-->
            <div class="apply-container">
                <v-form lazy-validation ref="applyForm" autocomplete="off">
                    <div class="activity-name">{{session.sessionName}}</div>
                    <div class="activity-name-descript">{{session.zoneName}}-{{session.villageName}}│{{session.groupName}}</div>

                    <div class="apply-field">
                        <div class="apply-field-label">姓名<span class="red--text">*</span></div>
                        <div class="apply-field-container">
                            <v-text-field class="apply-field-text" placeholder="請輸入您的姓名" v-model="uName" :rules="[rules.required]"></v-text-field>
                        </div>
                    </div>
                    <div class="apply-field">
                        <div class="apply-field-label">身份證字號<span class="red--text">*</span></div>
                        <div class="apply-field-container">
                            <v-text-field class="apply-field-text" placeholder="請輸入您的身分證字號" v-model="uId" :rules="[rules.required]"></v-text-field>
                        </div>
                    </div>
                    <div class="apply-field">
                        <div class="apply-field-label">生日<span class="red--text">*</span></div>
                        <div class="apply-field-container d-flex justify-space-between">
                            <v-select :items="years" placeholder="yyyy" v-model="year" :rules="[rules.required]">

                            </v-select>
                            <v-select :items="months" placeholder="mm" v-model="month" :rules="[rules.required]">
                                <template v-slot:prepend>
                                    <div class="splid-date d-flex justify-center">
                                        /
                                    </div>
                                </template>
                            </v-select>
                            <v-select :items="days" placeholder="dd" v-model="day" :rules="[rules.required]">
                                <template v-slot:prepend>
                                    <div class="splid-date d-flex justify-center">
                                        /
                                    </div>
                                </template>
                            </v-select>
                        </div>
                    </div>
                    <div class="apply-field">
                        <div class="apply-field-label">手機（簡訊通知）</div>
                        <div class="apply-field-container">
                            <v-text-field class="apply-field-text" placeholder="請輸入手機號碼" v-model="mbNo"></v-text-field>
                        </div>
                    </div>
                    <div class="apply-field">
                        <div class="apply-field-label">戶籍</div>
                        <div class="apply-field-container">
                            <v-text-field class="apply-field-text" placeholder="台北市（原）" v-model="census"></v-text-field>
                        </div>
                    </div>
                    <div class="apply-field display type">
                        <div class="apply-field-label">接種疫苗</div>
                        <div class="apply-field-container">
                            <div class="apply-field-type d-flex justify-space-between">
                                <div class="apply-field-type-icon d-flex justify-start align-center">
                                    <img src="/regist/select_vaccine.svg" />
                                </div>
                                <div class="apply-field-type-text d-flex justify-start align-center">
                                    {{session.brandName}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <v-divider></v-divider>

                    <div class="apply-field display descript">
                        <div class="apply-field-label">活動申明</div>
                        <div class="apply-field-container descript-area">
                            為避免重複接種，報名後請勿再自行前往院所接種或跨里報名，接種當日，將再次檢核接種資格，屆時依現場判讀可接種之疫苗別為準。
                        </div>
                    </div>

                    <div class="apply-field display">
                        <v-checkbox :rules="[rules.required]">
                            <template v-slot:label>
                                我同意以上申明
                                <span class="red--text">*</span>
                            </template>
                        </v-checkbox>
                    </div>
                </v-form>
            </div>
            <div class="apply-actions d-flex justify-space-between" v-if="isNeedLogin">
                <v-btn color="#626781" :to="{ name:'regist' }">取消</v-btn>
                <v-btn color="#736DB9" :to="{ name:'agree', params: session }">上一步</v-btn>
                <v-btn color="#736DB9" @click.stop="sendApply()">確定報名</v-btn>
            </div>
            <apply-done ref="done"></apply-done>
            <!--共用 loading -->
            <com-loading ref-key="loading"></com-loading>
            <!---->
            <com-confirm ref="alert" ref-key="alert" :right-click="alertClick">
                <template v-slot:confirm-image>
                    <v-img src="/alert_warning.svg"></v-img>
                </template>
                <template v-slot:confirm-text>
                    <div class="sub-title">名額已滿</div>
                    <div class="sub-content">請選擇其他場次報名登記</div>
                </template>
                <template v-slot:confirm-right-btn-text>
                    了解
                </template>
            </com-confirm>
            <!---->
            <com-confirm ref="alertRegistered" ref-key="alertRegistered" :left-click="alertRegisteredLeftClick" :right-click="alertRegisteredRightClick" right-color="rgba(240,82,75,1) !important">
                <template v-slot:confirm-image>
                    <v-img src="/alert_warning.svg"></v-img>
                </template>
                <template v-slot:confirm-text>
                    <div class="sub-title">您已報名其他場次</div>
                    <div class="sub-title-name">{{beforeActivityName}}</div>
                    <div class="sub-content">是否取消前次登記改為報名本次活動？</div>
                </template>
                <template v-slot:confirm-left-btn-text>
                    保留前次
                </template>
                <template v-slot:confirm-right-btn-text>
                    報名本次
                </template>
            </com-confirm>
        </template>
    </app-layout>
</template>

<script>
    import appLayout from 'components/regist/regist_layout'
    import applyDone from 'components/regist/forms/apply_done'
    import comLoading from 'components/loading'
    import comConfirm from 'components/confirm'
    import { mapActions } from 'vuex'

    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
            }, isNeedLogin: true,
            //years: [108],
            years: Array.from({ length: new Date().getFullYear() - 1910 }, (value, index) => new Date().getFullYear() - index),
            months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            days: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            rules: {
                required: v => !!v || '必填'
            },
            uName: '',
            uId: '',
            mbNo: '',
            census: '',
            year: '',
            month: '',
            day: '',
            beforeActivityName: '',
        }),
        computed: {
        },
        props: {

        },
        created: function () {
            this.session = this.$store.getters['regist/user/getActivityApply'];
            window.scrollTo(0, 0);
            this.checkBeforeApply();
        },
        methods: {
            ...mapActions('regist', ['checkApply', 'getBeforeApply']),
            sendApply: function () {
                var comp = this;
                var isvaild = comp.$refs.applyForm.validate();
                if (!isvaild) return;

                comp.$bus.$emit('loading_show4', '資料處理中...');

                var data = {
                    uName: comp.uName,
                    uId: comp.uId,
                    bd: comp.year + '-' + comp.month + '-' + comp.day + 'T00:00:00',
                    mbNo: comp.mbNo,
                    census: comp.census,
                };

                comp.checkApply(data)
                    .then(function (result) {
                        console.log(result);

                        comp.$bus.$emit('loading_hide4');

                        // 登記完成
                        var info = {
                            checkJobId: '01'
                        };

                        comp.$refs.done.create(info);

                        // 名額已滿
                        //comp.$bus.$emit('alert_show', true);
                    })
                    .catch(function () {
                        comp.$bus.$emit('loading_hide4');
                    });
            },
            checkBeforeApply: function () {
                var comp = this;
                setTimeout(() => {
                    comp.getBeforeApply()
                        .then(function (result) {
                            if (result.datas.length > 0) {
                                comp.beforeActivityName = result.datas[0].activityName;
                                comp.$bus.$emit('alertRegistered_show', true);
                            }
                        })
                        .catch(ex => {
                            console.log(ex);
                        });
                }, 0);
            },
            alertClick: function () {
                this.$bus.$emit('alert_show', false);
            },
            alertRegisteredLeftClick: function () {
                this.$router.push({ name: 'regist' });
            },
            alertRegisteredRightClick: function () {
                this.$bus.$emit('alertRegistered_show', false);
            }
        },
        components: {
            appLayout, applyDone, comLoading, comConfirm
        }
    }
</script>
<style scoped>

    .apply-content/deep/ .v-btn {
        min-width: 100px !important;
    }

    .v-application .primary--text {
        color: #736DB9 !important;
        caret-color: #736DB9 !important;
    }
    .apply-content/deep/ .apply-actions .v-btn:not(.v-btn--disabled) {
        color: white !important;
    }

    .apply-content/deep/ .v-select .v-icon {
        font-size: 16px !important;
    }

    .apply-content/deep/ .splid-date {
        width:30px!important;
        margin-left:10px!important;
    }


    .apply-content/deep/ .apply-actions .v-btn:not(.v-btn--disabled) {
        color: white !important;
    }

    .apply-content/deep/ .descript-area {
        padding: 16px !important;
        background-color: rgba(67,73,105,0.06) !important;
    }

    .apply-content/deep/ .apply-field-type-icon {
        width: 40px !important;
        color: #626781 !important;
        font-size: 16px !important;
    }

    .apply-content/deep/ .apply-field-type-text {
        font-size: 16px !important;
        color: #626781 !important;
        width: calc(100% - 40px) !important;
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

    .apply-content/deep/ .apply-container {
        padding-top: 24px !important;
        padding-left: 24px !important;
        padding-right: 24px !important;
    }

    .apply-content/deep/ .apply-actions {
        padding: 24px !important;
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

    .apply-content/deep/ .confirm-text {
        display: block;
    }

    .apply-content/deep/ .sub-title {
        text-align: center;
        font: normal normal normal 20px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
    }

    .apply-content/deep/ .sub-title-name {
        text-align: center;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #77CCDB;
        margin-top: 10px;
    }

    .apply-content/deep/ .sub-content {
        text-align: center;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        margin: 8px 0;
    }

    .apply-content/deep/ .v-dialog .v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
        background: #626781 0% 0% no-repeat padding-box !important;
    }

    .apply-content/deep/ .v-dialog .confirm-left-btns-text {
        color: #FFF;
    }
</style>
