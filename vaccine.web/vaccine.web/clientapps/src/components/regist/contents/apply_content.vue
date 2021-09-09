<template>
    <app-layout :app-bar="appBar" class="apply-content">
        <template v-slot:regist-title>
            報名資訊確認
        </template>
        <template v-slot:regist-content>
            <!--<div class="apply-header">
        <v-stepper alt-labels class="elevation-0">
            <v-stepper-header>readonly
                <v-stepper-step step="1" class="step-one disable-step"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" class="step-two active-step"> </v-stepper-step>
            </v-stepper-header>
        </v-stepper>
    </div>-->
            <div class="apply-container" v-if="session!=null">
                <!--{{getLockUserInfo}}-->
                <v-form lazy-validation ref="applyForm" autocomplete="off">
                    <div class="activity-name">{{session.sessionName}}</div>
                    <div class="activity-name-descript">{{session.zoneName}}-{{session.villageName}}│{{session.groupName}}</div>

                    <div class="apply-field">
                        <div class="apply-field-label">姓名<span class="red--text">*</span></div>
                        <div class="apply-field-container">
                            <v-text-field class="apply-field-text" placeholder="請輸入您的姓名" v-model="uName" :rules="[rules.required]" :disabled="getLockUserInfo.lockName"></v-text-field>
                        </div>
                    </div>
                    <div class="apply-field">
                        <div class="apply-field-label">身份證字號<span class="red--text">*</span></div>
                        <div class="apply-field-container">
                            <v-text-field class="apply-field-text" placeholder="請輸入您的身分證字號" v-model="uId" :rules="[rules.required]" :disabled="getLockUserInfo.lockIdentify"></v-text-field>
                        </div>
                    </div>
                    <div class="apply-field">
                        <div class="apply-field-label">生日<span class="red--text">*</span></div>
                        <div class="apply-field-container d-flex justify-space-between">
                            <v-select :items="years" placeholder="yyyy" v-model="year" :rules="[rules.required]" :disabled="getLockUserInfo.lockBirthday">

                            </v-select>
                            <v-select :items="months" placeholder="mm" v-model="month" :rules="[rules.required]" :disabled="getLockUserInfo.lockBirthday">
                                <template v-slot:prepend>
                                    <div class="splid-date d-flex justify-center">
                                        /
                                    </div>
                                </template>
                            </v-select>
                            <v-select :items="days" placeholder="dd" v-model="day" :rules="[rules.required]" :disabled="getLockUserInfo.lockBirthday">
                                <template v-slot:prepend>
                                    <div class="splid-date d-flex justify-center">
                                        /
                                    </div>
                                </template>
                            </v-select>
                        </div>
                    </div>
                    <div class="apply-field">
                        <div class="apply-field-label">手機或市話（手機可接收接種通知）<span class="red--text">*</span></div>
                        <div class="apply-field-container">
                            <v-text-field class="apply-field-text" maxlength="10" placeholder="手機範例0912345678，市話範例0227208889" v-model="mbNo" :rules="[rules.required,rules.mobile]"></v-text-field>
                        </div>
                    </div>
                    <!--<div class="apply-field">
                <div class="apply-field-label">戶籍</div>
                <div class="apply-field-container">
                    <v-text-field class="apply-field-text" placeholder="台北市（原）" v-model="census"></v-text-field>
                </div>
            </div>-->
                    <div class="apply-field display type" v-if="vaccines.length > 0 || session.brandName !== ''">
                        <div class="apply-field-label">可接種項目</div>
                        <div class="apply-field-container">
                            <template v-if="vaccines.length > 0">
                                <div class="apply-field-type d-flex justify-space-between" v-for="(vaccine , idx) in vaccines" :key="`vaccine_${idx}`">
                                    <div class="apply-field-type-icon d-flex justify-start align-center">
                                        <img src="/regist/select_vaccine.svg" />
                                    </div>
                                    <div class="apply-field-type-text d-flex justify-start align-center">
                                        {{vaccine.itemName}}
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="apply-field-type d-flex justify-space-between">
                                    <div class="apply-field-type-icon d-flex justify-start align-center">
                                        <img src="/regist/select_vaccine.svg" />
                                    </div>
                                    <div class="apply-field-type-text d-flex justify-start align-center">
                                        {{session.brandName}}
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <v-divider></v-divider>

                    <div class="apply-field display descript">
                        <div class="apply-field-label">活動聲明</div>
                        <div class="apply-field-container descript-area">
                            為避免重複接種，報名後請勿再自行前往院所接種或跨里報名，接種當日，將再次檢核接種資格，屆時依現場判讀可接種之疫苗別為準。
                        </div>
                    </div>

                    <div class="apply-field display">
                        <v-checkbox :rules="[rules.required]">
                            <template v-slot:label>
                                我同意以上聲明
                                <span class="red--text">*</span>
                            </template>
                        </v-checkbox>
                    </div>
                </v-form>
                <div class="apply-actions" v-if="isNeedLogin">

                    <v-btn color="#626781" :to="{ name:'regist' }">取消</v-btn>
                    <v-btn color="#736DB9" :to="{ name:'agree', params: session }" class="btn-agree">上一步</v-btn>
                    <v-btn color="#736DB9" @click.stop="sendApply()">確定報名</v-btn>



                </div>
            </div>


            <apply-done ref="done"></apply-done>

            <!--共用 loading -->
            <com-loading ref-key="loading"></com-loading>
            <!---->
            <com-confirm ref="alert" ref-key="alert" :right-click="alertClick" persistent="false">
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
            <com-confirm ref="alertRegistered" ref-key="alertRegistered" :left-click="alertRegisteredLeftClick" :right-click="alertRegisteredRightClick" right-color="rgba(240,82,75,1) !important" persistent="false">
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
            <!---->
            <com-confirm ref="alertNoConform" ref-key="alertNoConform" :right-click="alertNoConformClick"  persistent="false">
                <template v-slot:confirm-image>
                    <v-img src="/alert_warning.svg"></v-img>
                </template>
                <template v-slot:confirm-text>
                    <div class="sub-content">很抱歉， 您尚未符合接種資格</div>
                </template>
                <template v-slot:confirm-right-btn-text>
                    了解
                </template>
            </com-confirm>
            <!---->
            <com-confirm ref="alertUnknow" ref-key="alertUnknow" :right-click="alertUnknowClick" persistent="false">
                <template v-slot:confirm-image>
                    <v-img src="/alert_warning.svg"></v-img>
                </template>
                <template v-slot:confirm-text>
                    <div class="sub-title">無法識別</div>
                    <div class="sub-content">請重新嘗試或改用其他方式登記</div>
                </template>
                <template v-slot:confirm-right-btn-text>
                    了解
                </template>
            </com-confirm>
            <!---->
            <com-confirm ref="alertApplyNo" ref-key="alertApplyNo" :right-click="alertApplyNoClick" persistent="false">
                <template v-slot:confirm-image>
                    <v-img src="/alert_success.svg"></v-img>
                </template>
                <template v-slot:confirm-text>
                    <div class="sub-title">您已報名本次活動</div>
                    <div class="sub-content">
                        <div class="order-tip full-width">
                            序號：
                        </div>
                        <div class="order">
                            {{applyNo}}
                        </div>
                    </div>
                </template>
                <template v-slot:confirm-right-btn-text>
                    了解
                </template>
            </com-confirm>

            <com-confirm ref="alertTimeout" ref-key="alertTimeout" :right-click="alertTimeoutClick" persistent="false">
                <template v-slot:confirm-image>
                    <v-img src="/alert_warning.svg"></v-img>
                </template>
                <template v-slot:confirm-text>
                    <div class="sub-title">無法識別</div>
                    <div class="sub-content">已超過登入時間效期，請重新登入。</div>
                </template>
                <template v-slot:confirm-right-btn-text>
                    了解
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
    import { mapActions, mapGetters } from 'vuex'
    import moment from "moment";

    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
            }, isNeedLogin: true,
            years: Array.from({ length: new Date().getFullYear() - 1910 }, (value, index) => (new Date().getFullYear() - index).toString()),
            months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            days: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            rules: {
                required: v => !!v || '必填',
                mobile:v=>!v || v.match('0[0-9]{8,9}')|| '輸入格式錯誤'
            },
            uName: '',
            uId: '',
            mbNo: '',
            census: '',
            year: '',
            month: '',
            day: '',
            beforeActivityName: '',
            checkJobId: '',
            applyNo: '',
            vaccines: []
        }),
        computed: {
            ...mapGetters('regist', ['getUserInfo', 'getLockUserInfo']),
        },
        props: {

        },
        created: function () {
            var error = this.$cookies.get('error');
            if (error) {
                this.$cookies.remove('error');
                this.isLoginError = true;
                this.$refs.loginError.open();
                return;
            }
            if (!this.getUserInfo) {
                this.$router.push({ path: `agree/${this.$route.params.vote_no}` })
                return;
            }
            
            this.session = this.$store.getters['regist/user/getActivityApply'];
            window.scrollTo(0, 0);
            this.checkBeforeApply();
        },
        methods: {
            ...mapActions('regist', ['checkApply', 'getBeforeApply','checkLogTime']),
            sendApply: function () {
                var comp = this;
                var isvaild = comp.$refs.applyForm.validate();
                if (!isvaild) return;

                comp.$bus.$emit('loading_show4', '資料處理中...');

                var data = {
                    activityId: comp.session.sessionId,
                    uName: comp.uName,
                    uId: comp.uId,
                    bd: comp.year + '-' + comp.month + '-' + comp.day + 'T00:00:00',
                    mbNo: comp.mbNo,
                    census: comp.census,
                    checkJobId: comp.checkJobId
                };

                comp.checkApply(data)
                    .then(function (result) {
                        console.log(result);

                        comp.$bus.$emit('loading_hide4');

                        if (result.datas.length > 0) {
                            // 登記完成
                            var info = {
                                checkJobId: result.datas[0]['applyNo']
                            };

                            comp.$refs.done.create(info);
                        }
                    })
                    .catch(ex => {
                        console.log(ex);
                        comp.$bus.$emit('loading_hide4');
                    });
            },
            checkBeforeApply: function () {
                var comp = this;
                comp.checkJobId = '';
                comp.vaccines = [];

                var userInfo = comp.getUserInfo;
                if (userInfo !== null) {
                    // default data
                    comp.uName = userInfo.uName;
                    comp.uId = userInfo.identify;
                    comp.year = moment(userInfo.birthday).format('YYYY');
                    comp.month = moment(userInfo.birthday).format('MM');
                    comp.day = moment(userInfo.birthday).format('DD');
                    
                    var data = {
                        activityId: this.$route.params.vote_no,
                        sessionId: userInfo.sessionId,
                        captcha: userInfo.captcha,
                        uId: userInfo.identify,
                        bd: userInfo.birthday,
                        type: userInfo.type,
                        token: userInfo.token
                    };

                    //setTimeout(() => {
                    this.$nextTick(() => {
                        comp.getBeforeApply(data)
                            .then(function (result) {
                                if (result.datas.length > 0) {
                                    comp.checkJobId = result.datas[0]['checkJobId'];
                                    comp.vaccines = result.datas[0]['vaccines'];

                                    // 未符合接種資格
                                    if (!result.datas[0]['canApply']) {
                                        comp.$bus.$emit('alertNoConform_show', true);
                                        return;
                                    }

                                    // 已報名其他場次
                                    if (result.datas[0]['messageCode'] === 3 && result.datas[0]['actName'] !== '') {
                                        comp.beforeActivityName = result.datas[0].actName;
                                        comp.$bus.$emit('alertRegistered_show', true);
                                        return;
                                    }

                                    // 已報名本次活動
                                    if (result.datas[0]['messageCode'] === 1 && result.datas[0]['applyNo'] !== null) {
                                        comp.applyNo = result.datas[0]['applyNo'];
                                        comp.$bus.$emit('alertApplyNo_show', true);
                                        return;
                                    }

                                    // 名額已滿
                                    if (result.datas[0]['messageCode'] === 4) {
                                        comp.$bus.$emit('alert_show', true);
                                        return;
                                    }
                                }
                            })
                            .catch(ex => {
                                // 超過登入時間效期
                                if (ex.datas.response.status == 406) {
                                    comp.$bus.$emit('alertTimeout_show', true);
                                    return;
                                }
                                // 未符合接種資格
                                else if (ex.datas.response.status == 400) {
                                    comp.$bus.$emit('alertNoConform_show', true);
                                    return;
                                }
                                console.log(ex);
                                // 無法識別
                                comp.$bus.$emit('alertUnknow_show', true);
                            });
                    });
                    //}, 0);
                }
            },
            alertClick: function () {
                this.$bus.$emit('alert_show', false);
                this.$router.push({ name: 'regist' });
            },
            alertRegisteredLeftClick: function () {
                this.$bus.$emit('alertRegistered_show', false);
                this.$router.push({ name: 'regist' });
            },
            alertRegisteredRightClick: function () {
                this.$bus.$emit('alertRegistered_show', false);
            },
            alertNoConformClick: function () {
                this.$bus.$emit('alertNoConform_show', false);
                this.$router.push({ name: 'regist' });
            },
            alertTimeoutClick: function () {
                this.$bus.$emit('alertTimeout_show', false);
                sessionStorage.removeItem('userInfo');
                this.$router.push({ name: 'regist' });
            },
            alertUnknowClick: function () {
                this.$bus.$emit('alertUnknow_show', false);
                this.$router.push({ name: 'regist' });
            },
            alertApplyNoClick: function () {
                this.$bus.$emit('alertApplyNo_show', false);
                //this.$router.push({ name: 'regist' });
                var groupId = '';
                if (this.session.vaccineGroupId === 0)
                    groupId = 'influenza';
                else if (this.session.vaccineGroupId === 1)
                    groupId = 'covid';
                this.$router.push({ name: 'unapply', query: { groupId: groupId } });
            },
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.dispatch("regist/checkLogTime").then(() => {});
            });
        },
        components: {
            appLayout, applyDone, comLoading, comConfirm
        }
    }
</script>
<style scoped>
    .v-btn--contained {
        box-shadow:none !important;
    }

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
        background: #4349690F 0% 0% no-repeat padding-box;
        text-align: left;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        opacity: 1;
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
        text-align: left;
        font: normal normal normal 20px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        opacity: 1;
    }

    .apply-content/deep/ .activity-name-descript {
        margin-top: 8px;
        text-align: left;
        font: normal normal normal 12px/16px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #62678180;
        opacity: 1;
    }

    .apply-content/deep/ .action-header {
        padding-top: 24px !important;
    }

    .apply-content/deep/ .v-divider {
        margin-top: 24px !important;
    }

    .apply-content/deep/ .app-content {
       display:flex;
       justify-content:center;
    }



    .apply-content/deep/ .apply-container {
        padding-top: 24px !important;
        max-width:800px;
    }


   

    .apply-content/deep/ .apply-actions {
        padding-top: 24px;
        padding-bottom: 24px;
        display: flex;
        justify-content: space-between;
    }

        .apply-content/deep/ .apply-actions .btn-agree {
            /*left: 330px*/
            margin-left: 400px;
        }


    .btn-agree .apply-content/deep/ .action {
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

    /*.apply-content/deep/ .v-dialog .v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
        background: #626781 0% 0% no-repeat padding-box !important;
    }*/

    .apply-content/deep/ .v-dialog .confirm-left-btns-text {
        color: #FFF;
    }

    .apply-content/deep/ .v-dialog .order-tip {
        font: normal normal normal 12px/16px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #43496980;
        margin-top: 10px;
    }

    .apply-content/deep/ .v-dialog .order {
        font: normal normal bold 32px/16px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        margin: 10px 0;
    }


    @media (min-width: 100px) and (max-width: 350px) {

        .apply-content/deep/ .apply-container {
            padding-top: 24px !important;
            display: grid;
            justify-content: center;
            margin: 10px;
        }


        .apply-content/deep/ .apply-actions .btn-agree {
            margin-left: 0px;
        }
    }

    @media (min-width: 100px) and (max-width: 350px) {

        .apply-content/deep/ .apply-container {
            padding-top: 24px !important;
            display: grid;
            justify-content: center;
            margin: 5px;
        }

        .apply-content/deep/ .apply-actions .btn-agree {
            margin-left: 0px;
        }
    }


    @media (min-width: 351px) and (max-width: 500px) {

        .apply-content/deep/ .apply-container {
            padding-top: 24px !important;
            display: grid;
            justify-content: center;
            margin:10px;
        }

        .apply-content/deep/ .apply-actions .btn-agree {
            margin-left: 60px;
        }

    }

     @media (min-width: 500px) and (max-width: 600px) {

        .apply-content/deep/ .apply-container {
            padding-top: 24px !important;
            display: grid;
            justify-content: center;
            margin:10px;
        }

        .apply-content/deep/ .apply-actions .btn-agree {
            margin-left: 120px;
        }

    }


    @media (min-width: 600px) and (max-width: 750px) {

        .apply-content/deep/ .apply-container {
            padding-top: 24px !important;
            display: grid;
            justify-content: center;
            margin: 10px;
        }

        .apply-content/deep/ .apply-actions .btn-agree {
            margin-left: 280px;
        }
    }


    @media (min-width: 750.5px) and (max-width: 900px) {

        .apply-content/deep/ .apply-container {
            padding-top: 24px !important;
            display: grid;
            justify-content: center;
            margin: 10px;
        }

        .apply-content/deep/ .apply-actions .btn-agree {
            margin-left: 400px;
        }
    }

</style>
