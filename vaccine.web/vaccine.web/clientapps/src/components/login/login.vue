<template>
    <v-app class="rectangle">
        <v-main>
            <v-form lazy-validation ref="loginForm">
                <div class="logo"></div>
                <div class="title">里辦疫苗接種便民系統</div>
                <div class="content">
                    <div>
                        <v-label>帳號</v-label>
                        <v-text-field id="uid" placeholder="請輸入帳號" v-model="uid" :rules="[rules.required]" ref="uid" solo @keyup.enter="sendLoginForm" autocomplete="off"></v-text-field>
                    </div>
                    <div>
                        <v-label>密碼</v-label>
                        <v-text-field id="upd" placeholder="請輸入密碼" v-model="upd" :rules="[rules.required]" ref="upd" solo @keyup.enter="sendLoginForm"
                                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                      :type="show1 ? 'text' : 'password'"
                                      @click:append="show1 = !show1"></v-text-field>
                    </div>
                    <div>
                        <v-btn block height="48px" @click="sendLoginForm">登入</v-btn>
                    </div>
                </div>
                <div class="forgt">
                    <a href="#" @click="forgetUpd">忘記密碼？</a>
                </div>
            </v-form>
            <!--共用 alert -->
            <com-confirm ref="alert" ref-key="alert" :right-click="alertClick">
                <template v-slot:confirm-image>
                    <v-img src="/alert_warning.svg"></v-img>
                </template>
                <template v-slot:confirm-text>
                    {{alertMessage}}
                </template>
                <template v-slot:confirm-right-btn-text>
                    了解
                </template>
            </com-confirm>
            <!---->
            <v-dialog v-model="authenticationDialog" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        <span>身份驗證（{{authenticationSec}}s）</span>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="reload">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                    <div class="dialog-content">
                        <v-row>
                            <v-col cols="12">
                                <div class="dialog-sub-title">
                                    請輸入６位數驗證碼以完成身份確認
                                </div>
                                <v-text-field v-model="verificationCode"
                                              label="驗證碼＊"
                                              placeholder="請輸入驗證碼"
                                              maxlength="6"
                                              filled
                                              ref="verificationCode"
                                              @keyup.enter="checkAuthenticationVerificationCode"
                                              autocomplete="off"></v-text-field>
                                <div class="verification-code-message">{{verificationCodeMessage}}</div>
                            </v-col>
                        </v-row>
                    </div>
                    <v-card-actions>
                        <v-btn icon @click="reSendVerificationCode" ref="resendBtn" :class="sending ? 'disabled' : ''">
                            <v-icon>mdi-reload</v-icon>
                        </v-btn>
                        <span class="resend-message" :class="sending ? 'disabled' : ''" ref="resendMessage" @click="reSendVerificationCode">重新傳送驗證碼（{{verificationCodeSec}}s）</span>
                        <v-spacer></v-spacer>
                        <v-btn @click="checkAuthenticationVerificationCode">
                            送出
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!---->
            <com-confirm ref="alertPw" ref-key="alertPw" :left-click="alertPwLeftClick" :right-click="alertPwRightClick">
                <template v-slot:confirm-image>
                    <v-img :src="alertPwImg"></v-img>
                </template>
                <template v-slot:confirm-text>
                    {{alertPwMessage}}
                </template>
                <template v-slot:confirm-left-btn-text>
                    {{alertPwCancel}}
                </template>
                <template v-slot:confirm-right-btn-text>
                    修改密碼
                </template>
            </com-confirm>
            <!---->
            <com-dialog ref="dialogResetPw" ref-key="dialogResetPw" width="60%">
                <template v-slot:toolbar>
                    重設密碼
                </template>
                <template v-slot:content>
                    <v-form lazy-validation ref="resetPwForm">
                        <div>
                            <v-label>舊密碼＊</v-label>
                            <v-text-field placeholder="請輸入目前密碼" v-model="oldUpd" ref="oldUpd" solo
                                          :rules="[rules.required, alertPwOldUpdCheck]"
                                          :append-icon="oldUpdShow ? 'mdi-eye' : 'mdi-eye-off'"
                                          :type="oldUpdShow ? 'text' : 'password'"
                                          @click:append="oldUpdShow = !oldUpdShow"
                                          @keyup.enter="sendResetPwForm"></v-text-field>
                        </div>
                        <div>
                            <v-label>新密碼＊（請輸入8位以上包含半形英文+數字）</v-label>
                            <v-text-field placeholder="請輸入新密碼" v-model="newUpd" ref="newUpd" solo
                                          :rules="[rules.required, alertPwNewUpdCheck]"
                                          :append-icon="newUpdShow ? 'mdi-eye' : 'mdi-eye-off'"
                                          :type="newUpdShow ? 'text' : 'password'"
                                          @click:append="newUpdShow = !newUpdShow"
                                          @keyup.enter="sendResetPwForm"></v-text-field>
                        </div>
                        <div>
                            <v-label>確認新密碼＊</v-label>
                            <v-text-field placeholder="請再次輸入新密碼" v-model="confirmNewUpd" ref="confirmNewUpd" solo
                                          :rules="[rules.required, alertPwConfirmNewUpdCheck]"
                                          :append-icon="confirmNewUpdShow ? 'mdi-eye' : 'mdi-eye-off'"
                                          :type="confirmNewUpdShow ? 'text' : 'password'"
                                          @click:append="confirmNewUpdShow = !confirmNewUpdShow"
                                          @keyup.enter="sendResetPwForm"></v-text-field>
                        </div>
                    </v-form>
                </template>
                <template v-slot:action>
                    <v-spacer></v-spacer>
                    <v-btn @click="sendResetPwForm">送出</v-btn>
                </template>
            </com-dialog>
            <!---->
            <com-confirm ref="alertResetPw" ref-key="alertResetPw" :right-click="alertResetPwClick">
                <template v-slot:confirm-text>
                    {{alertResetPwMessage}}
                </template>
                <template v-slot:confirm-right-btn-text>
                    確定
                </template>
            </com-confirm>
        </v-main>
    </v-app>
</template>
<script>
    import comDialog from 'components/dialog'
    import comConfirm from 'components/confirm'
    import { mapActions } from 'vuex'

    export default {
        // router,
        data: () => ({
            uid: '',
            upd: '',
            show1: false,
            alertMessage: '',
            authenticationDialog: false,
            authenticationSec: 240,
            verificationCodeSec: 60,
            verificationCode: '',
            verificationCodeMessage: '',
            authenticationTiming: null,
            verificationCodeTiming: null,
            sending: false,
            alertPwState: '',
            alertPwImg: '',
            alertPwMessage: '',
            alertPwCancel: '',
            oldUpd: '',
            oldUpdShow: false,
            newUpd: '',
            newUpdShow: false,
            confirmNewUpd: '',
            confirmNewUpdShow: false,
            alertResetPwMessage: '',
            alertResetPwResetPwState: '',
            rules: {
                required: v => !!v || '必填'
            }
        }),
        computed: {

        },
        props: {

        },
        created: function () {
            var comp = this;
            var _authenticationSec   = comp.authenticationSec;
            var _verificationCodeSec = comp.verificationCodeSec;

            // uid focus
            setTimeout(() => this.$refs.uid.focus(), 0); 

            comp.$bus.$on('authentication_dialog_show', function (isShow) {
                comp.authenticationDialog = isShow;
                if (isShow) {
                    setTimeout(() => comp.$refs.verificationCode.focus(), 0);
                    if (comp.authenticationTiming === null) {
                        comp.authenticationTiming = setInterval(function () {
                            comp.authenticationSec--;
                            if (comp.authenticationSec === 0) {
                                comp.reload();
                            }
                        }, 1000);
                    }
                    
                    if (comp.verificationCodeTiming === null) {
                        comp.verificationCodeTiming = setInterval(function () {
                            comp.verificationCodeSec--;
                            if (comp.verificationCodeSec === 0) {
                                clearInterval(comp.verificationCodeTiming);
                                comp.verificationCodeTiming = null;
                                comp.verificationCodeSec = _verificationCodeSec;
                                comp.sending = false;
                            }
                        }, 1000);
                    }
                } else {
                    setTimeout(function () {
                        comp.verificationCode = '';

                        if (comp.authenticationTiming !== null) {
                            clearInterval(comp.authenticationTiming);
                            comp.authenticationTiming = null;
                            comp.authenticationSec = _authenticationSec;
                        }

                        if (comp.verificationCodeTiming !== null) {
                            clearInterval(comp.verificationCodeTiming);
                            comp.verificationCodeTiming = null;
                            comp.verificationCodeSec = _verificationCodeSec;
                            comp.sending = false;
                        }
                    }, 0);
                }
            });
        },
        methods: {
            ...mapActions(['checkLogin', 'checkVerificationCode', 'checkResetPw']),
            sendLoginForm: function () {
                var comp = this;
                var isvaild = comp.$refs.loginForm.validate();
                if (!isvaild) return;

                comp.alertMessage = '';
                comp.checkLogin({ uid: comp.uid, upd: comp.upd })
                    .then(function (result) {
                        switch (result.state) {
                            case 'not found':
                                comp.alertMessage = '帳號不存在';
                                break;
                            case 'password incorrect':
                                comp.alertMessage = '密碼不正確';
                                break;
                            case 'no management area':
                                comp.alertMessage = '很抱歉，您目前沒有所屬的管轄區域權限，所以暫時無法使用本系統，如有需要請聯絡相關人員給予協助';
                                break;
                            case 'not member':
                                comp.alertMessage = '很抱歉，目前Web只開放衛生局與健康服務中心人員使用，其他人員請前往App版進行操作';
                                break;
                            case 'deactivate':
                                comp.alertMessage = '很抱歉，您的帳號已遭停用，所以暫時無法使用本系統，如有需要請聯絡相關人員給予協助';
                                break;
                            default:
                                break;
                        }

                        if (comp.alertMessage !== '') {
                            comp.$bus.$emit('alert_show', true);
                            return;
                        }

                        if (result.state === 'not yet enabled') {
                            // TODO: User/Login

                            comp.sending = true;
                            comp.$bus.$emit('authentication_dialog_show', true);
                            return;
                        }

                        location.replace('/admin');
                    })
                    .catch(function () {
                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    })
            },
            alertClick: function () {
                this.$bus.$emit('alert_show', false);
            },
            reSendVerificationCode: function () {
                if (!this.sending) {
                    this.check();
                    this.$bus.$emit('authentication_dialog_show', true);
                    this.sending = true;
                }
            },
            closeAuthenticationDialog: function () {
                this.$bus.$emit('authentication_dialog_show', false);
            },
            reload: function () {
                location.reload();
            },
            checkAuthenticationVerificationCode: function () {
                var comp = this;
                if (comp.verificationCode.length < 6) {
                    return;
                }
                comp.checkVerificationCode({ uid: comp.uid, verificationCode: comp.verificationCode })
                    .then(function (result) {
                        switch (result.state) {
                            case 'invalid':
                                comp.verificationCodeMessage = '驗證碼無效，請重新輸入！';
                                break;
                            default:
                                comp.verificationCodeMessage = '';
                                break;
                        }
                        
                        if (result.state !== 'pass') {
                            // verificationCode select
                            comp.$refs.verificationCode.$el.querySelector('input').select();
                            return;
                        }

                        comp.closeAuthenticationDialog();

                        if (result.state1 === 'first login') {
                            comp.alertPwState = result.state1;
                            comp.alertPwImg = '';
                            comp.alertPwMessage = '提醒您！為了確保您的資料安全，請更新您的個人密碼。';
                            comp.alertPwCancel = '取消';
                            comp.$bus.$emit('alertPw_show', true);
                            return;
                        }

                        if (result.state1 === 'password is about to expire') {
                            comp.alertPwState = result.state1;
                            comp.alertPwImg = '';
                            comp.alertPwMessage = '提醒您！您的密碼即將到期，請儘快更新您的個人密碼。';
                            comp.alertPwCancel = '下次再說';
                            comp.$bus.$emit('alertPw_show', true);
                            return;
                        }

                        if (result.state1 === 'password has expired') {
                            comp.alertPwState = result.state1;
                            comp.alertPwImg = '/alert_warning.svg';
                            comp.alertPwMessage = '您的密碼已到期！請更新您的個人密碼。';
                            comp.alertPwCancel = '取消';
                            comp.$bus.$emit('alertPw_show', true);
                            return;
                        }

                        if (result.state1 === 'password must change') {
                            comp.alertPwRightClick();
                            return;
                        }
                    })
                    .catch(function () {
                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    })
            },
            alertPwLeftClick: function () {
                if (this.alertPwState === 'password is about to expire') {
                    location.replace('/admin');
                } else {
                    // TODO: 登出

                    this.reload();
                }
            },
            alertPwRightClick: function () {
                this.$bus.$emit('alertPw_show', false);
                this.$bus.$emit('dialogResetPw_show', true);
                setTimeout(() => this.$refs.oldUpd.focus(), 0); 
            },
            alertPwOldUpdCheck: function () {
                if (this.oldUpd !== this.upd) {
                    return '密碼輸入錯誤！';
                }
                return true;
            },
            alertPwNewUpdCheck: function () {
                var re = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
                if (!re.test(this.newUpd)) {
                    return '密碼至少需8位半形英文+數字！';
                }
                return true;
            },
            alertPwConfirmNewUpdCheck: function () {
                if (this.confirmNewUpd !== this.newUpd) {
                    return '密碼不一致，請重新輸入！';
                }
                return true;
            },
            sendResetPwForm: function () {
                var comp = this;
                var isvaild = comp.$refs.resetPwForm.validate();
                if (!isvaild) return;
                
                comp.alertResetPwMessage = '';
                comp.checkResetPw({ uid: comp.uid, upd: comp.upd, newUpd: comp.newUpd })
                    .then(function (result) {
                        switch (result.state) {
                            case 'not found':
                                comp.alertResetPwMessage = '帳號不存在';
                                break;
                            case 'pass':
                                comp.alertResetPwMessage = '您的密碼已更新，請重新登入 !';
                                break;
                            case 'error':
                                comp.alertResetPwMessage = '處理錯誤，請重新嘗試';
                                break;
                            default:
                                break;
                        }

                        // TODO: User/Login

                        comp.alertResetPwResetPwState = result.state;
                        comp.$bus.$emit('alertResetPw_show', true);
                    })
                    .catch(function () {
                        comp.alertResetPwMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alertResetPw_show', true);
                    })
            },
            alertResetPwClick: function () {
                if (this.alertResetPwResetPwState === 'pass') {
                    // TODO: 登出

                    location.reload();
                } else {
                    location.reload();
                }
            },
            forgetUpd: function () {
                // TODO: 忘記密碼
            }
        },
        components: {
            comDialog, comConfirm
        }
    }
</script>
<style>
    :root {
        /* Colors: */
        --pri: #736DB9;
        --pri_7: #736DB9;
        --sec: #77CCDB;
        --bk: #626781;
        --bk_6: #626781;
        --bk_4: #C0C2CD;
        --bk_2: #626781;
        --bk_1: #626781;
        --bk_06: #F6F6F8;
        --dangerous: #F0524B;
        --warning: #FC8E5E;
        --bg_8: #171D3C;
        --gy: #F2F3F7;
        --w: #FFFFFF;
        /* Font/text values */
        --unnamed-font-family-noto-sans-t-chinese: Noto Sans T Chinese;
        --unnamed-font-style-normal: normal;
        --unnamed-font-weight-normal: normal;
        --unnamed-font-size-12: 12px;
        --unnamed-font-size-16: 16px;
        --unnamed-character-spacing-0: 0px;
        --unnamed-line-spacing-24: 24px;
    }

    html.overflow-y-hidden {
        overflow-y: scroll !important;
    }

    body {
        background: var(--pri) 0% 0% no-repeat padding-box;
        opacity: 1;
    }

    .rectangle {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -308px 0 0 -240px;
        width: 480px;
        height: 616px;
        background: var(--w) 0% 0% no-repeat padding-box;
        border-radius: 16px;
        opacity: 1;
    }

    .rectangle .logo {
        position: relative;
        top: 32px;
        margin-left: 180px;
        width: 120px;
        height: 120px;
        background: var(--pri) -25px -15px no-repeat padding-box url("/login/login_logo.svg");
        opacity: 1;
    }

    .rectangle .title {
        position: relative;
        top: 48px;
        margin-left: 96px;
        width: 290px;
        height: 40px;
        font: var(--unnamed-font-style-normal) normal bold 28px/36px Futura;
        color: var(--bk);
        text-align: center;
        letter-spacing: 1.12px;
        opacity: 1;
        white-space: nowrap;
    }

    .rectangle .content {
        position: relative;
        top: 72px;
        margin: 0 64px;
    }

    .rectangle .content > div > label {
        width: 32px;
        height: 16px;
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-noto-sans-t-chinese);
        letter-spacing: var(--unnamed-character-spacing-0);
        color: var(--bk);
        text-align: left;
        opacity: 1;
    }

    .v-text-field .v-input__slot {
        width: 352px;
        height: 48px;
        background: var(--bk_06) 0% 0% no-repeat padding-box !important;
        border-radius: 8px;
        opacity: 1;
        box-shadow: none !important;
    }

    .v-text-field .v-text-field__slot input {
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-noto-sans-t-chinese);
        letter-spacing: var(--unnamed-character-spacing-0);
        color: var(--bk);
        text-align: left;
        opacity: 1;
    }

    .v-text-field .v-text-field__slot input::placeholder {
        color: var(--bk_4);
    }

    .rectangle .v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
        background: var(--bk_4) 0% 0% no-repeat padding-box !important;
        border-radius: 8px;
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-noto-sans-t-chinese);
        letter-spacing: var(--unnamed-character-spacing-0);
        color: var(--w);
        text-align: center;
        opacity: 1;
    }

    .rectangle .forgt {
        position: relative;
        top: 150px;
        height: 16px;
        text-align: center;
    }

    .rectangle .forgt a {
        width: 80px;
        height: 16px;
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-noto-sans-t-chinese);
        letter-spacing: var(--unnamed-character-spacing-0);
        color: var(--bk);
        text-align: left;
        opacity: 1;
        text-decoration: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
    }

    .v-application--wrap {
        min-height: initial;
    }

    .dialog-sub-title {
        display: flex;
        color: var(--bk);
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-noto-sans-t-chinese);
        opacity: 1;
        padding-top: 4px;
        margin: 5px 0;
    }

    .v-dialog .dialog-content {
        margin: 0 10px;
    }

    .v-dialog .v-text-field .v-input__slot {
        width: 100%;
    }

    .v-dialog .v-text-field .v-input__slot:before, .v-dialog .v-text-field .v-input__slot:after {
        width: 0 !important;
    }

    .v-dialog .v-text-field .primary--text {
        color: var(--bk) !important;
    }

    .v-dialog .verification-code-message {
        color: #FF0000;
        min-height: 24px;
    }

    .v-dialog .resend-message {
        -webkit-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
        cursor: pointer;
    }

    .v-dialog .disabled {
        cursor: not-allowed;
        pointer-events: none;
        color: var(--bk_4);
    }

    /* Extra small devices (portrait phones, less than 576px) */
    @media (max-width: 575.98px) {
        body {
            background: var(--w);
        }
    }

    /* Small devices (landscape phones, 576px and up) */
    @media (min-width: 576px) and (max-width: 767.98px) {
    }

    /** Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) and (max-width: 991.98px) {
    }

    /* Large devices (desktops, 992px and up) */
    @media (min-width: 992px) and (max-width: 1199.98px) {
    }

    /* Extra large devices (large desktops, 1200px and up) */
    @media (min-width: 1200px) {
    }
</style>
