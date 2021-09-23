<template>
    <v-app class="rectangle">
        <v-main>
            <v-form lazy-validation ref="loginForm" autocomplete="off">
                <div class="logo"></div>
                <div class="title">【測試】預約尚未開始</div>
                <div class="title">里辦疫苗接種便民服務</div>
                <div class="sub-title">-管理後台-</div>
                <div class="content">
                    <div>
                        <v-text-field id="uid" placeholder="帳號" v-model="uid" :rules="[rules.required]" ref="uid" solo @keyup.enter="sendLoginForm"></v-text-field>
                    </div>
                    <div>
                        <v-text-field id="upd" placeholder="密碼" v-model="upd" :rules="[rules.required]" ref="upd" solo @keyup.enter="sendLoginForm"
                                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                      :type="show1 ? 'text' : 'password'"
                                      @click:append="show1 = !show1"></v-text-field>
                    </div>
                    <div>
                        <v-btn block height="48px" @click="sendLoginForm" :ripple="false" :class="uid === '' || upd === '' ? 'btn-disabled' : 'btn-login'">登入</v-btn>
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
            <!--共用 loading -->
            <com-loading ref-key="loading"></com-loading>
            <!---->
            <v-dialog v-model="authenticationDialog" persistent max-width="304px" max-height="392px" content-class="dialog">
                <v-card>
                    <v-card-title>
                        <span>身份驗證（{{authenticationSec}}s）</span>
                        <v-spacer></v-spacer>
                        <v-btn icon @click.stop="reload" :ripple="false">
                            <v-icon color="white">fas fa-times</v-icon>
                        </v-btn>
                    </v-card-title>
                    <div class="dialog-content">
                        <v-row>
                            <v-col cols="12">
                                <div class="dialog-sub-title">
                                    請輸入６位數驗證碼以完成身份確認
                                </div>
                                <div>
                                    <v-label>驗證碼 <span class="red--text">*</span></v-label>
                                    <v-text-field placeholder="請輸入驗證碼" v-model="verificationCode" ref="verificationCode" solo @keyup.enter="checkAuthenticationVerificationCode" autocomplete="off" maxlength="6"></v-text-field>
                                </div>
                                <div class="error-message">{{verificationCodeMessage}}</div>
                                <div>
                                    <v-btn icon @click="resendVerificationCode" ref="resendBtn" :class="sending ? 'disabled' : ''" :ripple="false">
                                        <v-icon>mdi-reload</v-icon>
                                    </v-btn>
                                    <span class="resend-message" :class="sending ? 'disabled' : ''" ref="resendMessage" @click="resendVerificationCode">重新傳送驗證碼（{{verificationCodeSec}}s）</span>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                    <hr />
                    <v-card-actions>
                        <v-btn @click="reload" :ripple="false" outlined color="rgba(50,65,80,0.2)">
                            取消
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn @click="checkAuthenticationVerificationCode" :ripple="false" color="primary">
                            確定送出
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
            <com-dialog ref="dialogResetPw" ref-key="dialogResetPw" width="440px">
                <template v-slot:toolbar>
                    修改密碼
                </template>
                <template v-slot:content>
                    <v-form lazy-validation ref="resetPwForm">
                        <div>
                            <v-label>舊密碼 <span class="red--text">*</span></v-label>
                            <v-text-field placeholder="請輸入目前密碼" v-model="oldUpd" ref="oldUpd" solo
                                          :rules="[rules.required, alertPwOldUpdCheck]"
                                          :append-icon="oldUpdShow ? 'mdi-eye' : 'mdi-eye-off'"
                                          :type="oldUpdShow ? 'text' : 'password'"
                                          @click:append="oldUpdShow = !oldUpdShow"
                                          @keyup.enter="sendResetPwForm"></v-text-field>
                        </div>
                        <div>
                            <v-label>新密碼 <span class="red--text">*</span></v-label>
                            <v-text-field placeholder="請輸入新密碼（請輸入8位以上包含半形英文+數字）" v-model="newUpd" ref="newUpd" solo
                                          :rules="[rules.required, alertPwNewUpdCheck]"
                                          :append-icon="newUpdShow ? 'mdi-eye' : 'mdi-eye-off'"
                                          :type="newUpdShow ? 'text' : 'password'"
                                          @click:append="newUpdShow = !newUpdShow"
                                          @keyup.enter="sendResetPwForm"></v-text-field>
                        </div>
                        <div>
                            <v-label>確認密碼 <span class="red--text">*</span></v-label>
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
                    <v-btn @click="sendResetPwForm" :ripple="false">送出</v-btn>
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
            <!---->
            <com-dialog ref="dialogForget" ref-key="dialogForget" width="472px">
                <template v-slot:toolbar>
                    忘記密碼
                </template>
                <template v-slot:content>
                    <com-steps ref-key="dialogForgetSteps"
                               :steps="forgetSteps"
                               stepType="circle">
                        <template v-slot:step-1="{next}">
                            <v-card height="250px">
                                <v-form lazy-validation ref="forgetAuthenticationForm">
                                    <div class="dialog-sub-title forget">
                                        請輸入您的帳號以確認身份，系統將會傳送一組驗證碼至您的手機以進行重設密碼
                                    </div>
                                    <div>
                                        <v-label>帳號 <span class="red--text">*</span></v-label>
                                        <v-text-field v-model="forgetUid"
                                                      placeholder="請輸入帳號"
                                                      solo
                                                      ref="forgetUid"
                                                      :rules="[rules.required]"
                                                      @keyup.enter="checkForgetUid(next)"
                                                      autocomplete="off"></v-text-field>
                                    </div>
                                    <div class="error-message">{{forgetUidMessage}}</div>
                                </v-form>
                            </v-card>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="toLoginPage" :ripple="false" outlined color="rgba(50,65,80,0.2)">
                                    <span style="color:#626781;">取消</span>
                                </v-btn>
                                <v-btn @click="checkForgetUid(next)" :ripple="false">下一步</v-btn>
                            </v-card-actions>
                        </template>
                        <template v-slot:step-2="{next}">
                            <v-card height="250px">
                                <div class="dialog-sub-title forget">
                                    請輸入６位數驗證碼以完成身份確認（{{forgetAuthenticationSec}}s）
                                </div>
                                <div>
                                    <v-label>驗證碼 <span class="red--text">*</span></v-label>
                                    <v-text-field v-model="forgetVerificationCode"
                                                  placeholder="請輸入驗證碼"
                                                  maxlength="6"
                                                  solo
                                                  ref="forgetVerificationCode"
                                                  @keyup.enter="checkForgetVerificationCode(next)"
                                                  autocomplete="off"></v-text-field>
                                </div>
                                <div class="error-message">{{forgetVerificationCodeMessage}}</div>
                                <div>
                                    <v-btn icon @click="forgetResendVerificationCode" ref="forgetResendBtn" :class="forgetSending ? 'disabled' : ''" :ripple="false">
                                        <v-icon>mdi-reload</v-icon>
                                    </v-btn>
                                    <span class="resend-message" :class="forgetSending ? 'disabled' : ''" ref="forgetResendMessage" @click="forgetResendVerificationCode">重新傳送驗證碼（{{forgetVerificationCodeSec}}s）</span>
                                </div>
                            </v-card>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="toLoginPage" :ripple="false" outlined color="rgba(50,65,80,0.2)">
                                    <span style="color:#626781;">取消</span>
                                </v-btn>
                                <v-btn @click="checkForgetVerificationCode(next)" :ripple="false">下一步</v-btn>
                            </v-card-actions>
                        </template>
                        <template v-slot:step-3="{next}">
                            <v-card height="250px">
                                <v-form lazy-validation ref="forgetResetPwForm">
                                    <div class="dialog-sub-title forget">
                                        請重新輸入8位以上包含半形英文+數字作為新密碼
                                    </div>
                                    <div>
                                        <v-label>新密碼 <span class="red--text">*</span></v-label>
                                        <v-text-field v-model="forgetNewUpd"
                                                      placeholder="請輸入新密碼"
                                                      solo
                                                      ref="forgetNewUpd"
                                                      :rules="[rules.required, forgetPwNewUpdCheck]"
                                                      :append-icon="forgetNewUpdShow ? 'mdi-eye' : 'mdi-eye-off'"
                                                      :type="forgetNewUpdShow ? 'text' : 'password'"
                                                      @click:append="forgetNewUpdShow = !forgetNewUpdShow"
                                                      @keyup.enter="checkForgetResetPw(next)"
                                                      autocomplete="off"></v-text-field>
                                    </div>
                                    <div>
                                        <v-label>確認新密碼 <span class="red--text">*</span></v-label>
                                        <v-text-field v-model="forgetConfirmNewUpd"
                                                      placeholder="請再次輸入新密碼"
                                                      solo
                                                      ref="forgetConfirmNewUpd"
                                                      :rules="[rules.required, forgetPwConfirmNewUpdCheck]"
                                                      :append-icon="forgetConfirmNewUpdShow ? 'mdi-eye' : 'mdi-eye-off'"
                                                      :type="forgetConfirmNewUpdShow ? 'text' : 'password'"
                                                      @click:append="forgetConfirmNewUpdShow = !forgetConfirmNewUpdShow"
                                                      @keyup.enter="checkForgetResetPw(next)"
                                                      autocomplete="off"></v-text-field>
                                    </div>
                                </v-form>
                            </v-card>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="toLoginPage" :ripple="false" outlined color="rgba(50,65,80,0.2)">
                                    <span style="color:#626781;">取消</span>
                                </v-btn>
                                <v-btn @click="checkForgetResetPw(next)" :ripple="false">送出</v-btn>
                            </v-card-actions>
                        </template>
                    </com-steps>
                </template>
            </com-dialog>
        </v-main>
    </v-app>
</template>
<script>
    import comDialog from 'components/dialog'
    import comConfirm from 'components/confirm'
    import comSteps from 'components/steps'
    import comLoading from 'components/loading'
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
            },
            forgetSteps: [
                { 'stepNum': 1 },
                { 'stepNum': 2 },
                { 'stepNum': 3 }
            ],
            forgetUid: '',
            forgetUidMessage: '',
            forgetAuthenticationSec: 240,
            forgetVerificationCodeSec: 60,
            forgetVerificationCode: '',
            forgetVerificationCodeMessage: '',
            forgetSending: false,
            forgetAuthenticationTiming: null,
            forgetVerificationCodeTiming: null,
            forgetNewUpd: '',
            forgetNewUpdShow: false,
            forgetConfirmNewUpd: '',
            forgetConfirmNewUpdShow: false
        }),
        computed: {

        },
        props: {

        },
        created: function () {
            var comp = this;

            // uid focus
            setTimeout(() => this.$refs.uid.focus(), 0); 

            comp.$bus.$on('authentication_dialog_show', function (isShow) {
                comp.authenticationDialog = isShow;
                
                if (isShow) {
                    setTimeout(() => comp.$refs.verificationCode.focus(), 0);
                    comp.authenticationTimingStart();
                } else {
                    comp.authenticationTimingEnd();
                }
            });
        },
        methods: {
            ...mapActions([
                'checkLogin',
                'checkVerificationCode',
                'checkResetPw',
                'checkForgetPdUid',
                'checkForgetPdVerificationCode',
                'modifyPw',
                'logout'
            ]),
            sendLoginForm: function () {
                var comp = this;
                var isvaild = comp.$refs.loginForm.validate();
                if (!isvaild) return;

                comp.$bus.$emit('loading_show4', '資料處理中...');

                comp.alertMessage = '';
                comp.checkLogin({ uid: comp.uid, upd: comp.upd })
                    .then(function (result) {
                        comp.$bus.$emit('loading_hide4');

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
                            case 'not allow login':
                                comp.alertMessage = result.datas.message;
                                break;
                            default:
                                break;
                        }

                        if (comp.alertMessage !== '') {
                            comp.$bus.$emit('alert_show', true);
                            return;
                        }

                        if (result.state === 'not yet enabled' || result.state === '') {
                            comp.sending = true;
                            comp.$bus.$emit('authentication_dialog_show', true);
                            return;
                        }

                        //location.replace('/admin');
                    })
                    .catch(function () {
                        comp.$bus.$emit('loading_hide4');

                        //comp.alertMessage = '網站異常，請稍後再試';
                        comp.alertMessage = '帳號密碼錯誤';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            alertClick: function () {
                this.$bus.$emit('alert_show', false);
            },
            authenticationTimingStart: function () {
                var comp = this;
                var _verificationCodeSec = comp.verificationCodeSec;

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
            },
            authenticationTimingEnd: function () {
                var comp = this;
                var _authenticationSec = comp.authenticationSec;
                var _verificationCodeSec = comp.verificationCodeSec;

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
            },
            resendVerificationCode: function () {
                if (!this.sending) {
                    this.sendLoginForm();
                    this.$bus.$emit('authentication_dialog_show', true);
                    this.sending = true;
                }
            },
            closeAuthenticationDialog: function () {
                this.$bus.$emit('authentication_dialog_show', false);
            },
            reload: function () {
                var comp = this;
                comp.alertMessage = '';
                comp.logout({ uid: comp.uid })
                    .then(function (result) {
                        switch (result.state) {
                            case 'not found':
                                comp.alertMessage = '帳號不存在';
                                break;
                            default:
                                break;
                        }

                        if (comp.alertMessage !== '') {
                            comp.$bus.$emit('alert_show', true);
                            return;
                        }

                        location.reload();
                    })
                    .catch(function () {
                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            checkAuthenticationVerificationCode: function () {
                var comp = this;
                if (comp.verificationCode.length < 6) {
                    return;
                }

                comp.$bus.$emit('loading_show4', '資料處理中...');

                comp.checkVerificationCode({ uid: comp.uid, verificationCode: comp.verificationCode })
                    .then(function (result) {
                        comp.$bus.$emit('loading_hide4');

                        switch (result.state) {
                            case 'invalid':
                                comp.verificationCodeMessage = '驗證碼無效，請重新輸入！';
                                break;
                            default:
                                comp.verificationCodeMessage = '';
                                break;
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

                        location.replace('/admin');
                    })
                    .catch(function () {
                        comp.$bus.$emit('loading_hide4');

                        comp.alertMessage = '此驗證碼無效或輸入錯誤，請確認後重新嘗試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            alertPwLeftClick: function () {
                if (this.alertPwState === 'password is about to expire') {
                    location.replace('/admin');
                } else {
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

                comp.$bus.$emit('loading_show4', '資料處理中...');

                comp.alertResetPwMessage = '';
                comp.checkResetPw({ uid: comp.uid, upd: comp.upd, newUpd: comp.newUpd })
                    .then(function (result) {
                        comp.$bus.$emit('loading_hide4');

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

                        comp.alertResetPwResetPwState = result.state;
                        comp.$bus.$emit('alertResetPw_show', true);
                    })
                    .catch(function () {
                        comp.$bus.$emit('loading_hide4');

                        comp.alertResetPwMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alertResetPw_show', true);
                    });
            },
            alertResetPwClick: function () {
                if (this.alertResetPwResetPwState === 'pass') {
                    this.reload();
                } else {
                    location.reload();
                }
            },
            forgetUpd: function () {
                this.$bus.$emit('dialogForget_show', true);
                setTimeout(() => this.$refs.forgetUid.focus(), 0); 
            },
            checkForgetUid: function (callback) {
                var comp = this;
                var isvaild = comp.$refs.forgetAuthenticationForm.validate();
                if (!isvaild) return;

                comp.$bus.$emit('loading_show4', '資料處理中...');

                comp.checkForgetPdUid({ uid: comp.forgetUid })
                    .then(function (result) {
                        comp.$bus.$emit('loading_hide4');

                        switch (result.state) {
                            case 'not found':
                                comp.forgetUidMessage = '輸入錯誤或此帳號未註冊！';
                                break;
                            case 'deactivate':
                                comp.forgetUidMessage = '很抱歉，您的帳號已遭停用，所以暫時無法使用本系統，如有需要請聯絡相關人員給予協助';
                                break;
                            default:
                                comp.forgetUidMessage = '';
                                break;
                        }

                        if (result.state !== 'pass') {
                            return;
                        }

                        comp.forgetSending = true;
                        
                        if (typeof callback === 'function') {
                            callback();

                            setTimeout(() => comp.$refs.forgetVerificationCode.focus(), 0);
                            comp.forgetAuthenticationTimingStart();
                        }
                    })
                    .catch(ex => {
                        comp.$bus.$emit('loading_hide4');

                        if (ex.datas.response.status == 405) {
                            comp.forgetUidMessage = '輸入錯誤或此帳號未註冊！';
                            return;
                        }

                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            forgetAuthenticationTimingStart: function () {
                var comp = this;
                var _verificationCodeSec = comp.forgetVerificationCodeSec;

                if (comp.forgetAuthenticationTiming === null) {
                    comp.forgetAuthenticationTiming = setInterval(function () {
                        comp.forgetAuthenticationSec--;
                        if (comp.forgetAuthenticationSec === 0) {
                            comp.reload();
                        }
                    }, 1000);
                }

                if (comp.forgetVerificationCodeTiming === null) {
                    comp.forgetVerificationCodeTiming = setInterval(function () {
                        comp.forgetVerificationCodeSec--;
                        if (comp.forgetVerificationCodeSec === 0) {
                            clearInterval(comp.forgetVerificationCodeTiming);
                            comp.forgetVerificationCodeTiming = null;
                            comp.forgetVerificationCodeSec = _verificationCodeSec;
                            comp.forgetSending = false;
                        }
                    }, 1000);
                }
            },
            forgetAuthenticationTimingEnd: function () {
                var comp = this;
                var _authenticationSec = comp.forgetAuthenticationSec;
                var _verificationCodeSec = comp.forgetVerificationCodeSec;

                setTimeout(function () {
                    if (comp.forgetAuthenticationTiming !== null) {
                        clearInterval(comp.forgetAuthenticationTiming);
                        comp.forgetAuthenticationTiming = null;
                        comp.forgetAuthenticationSec = _authenticationSec;
                    }

                    if (comp.forgetVerificationCodeTiming !== null) {
                        clearInterval(comp.forgetVerificationCodeTiming);
                        comp.forgetVerificationCodeTiming = null;
                        comp.forgetVerificationCodeSec = _verificationCodeSec;
                        comp.forgetSending = false;
                    }
                }, 0);
            },
            forgetResendVerificationCode: function () {
                if (!this.forgetSending) {
                    this.checkForgetUid();
                }
            },
            checkForgetVerificationCode: function (callback) {
                var comp = this;
                if (comp.forgetVerificationCode.length < 6) {
                    return;
                }

                comp.$bus.$emit('loading_show4', '資料處理中...');

                comp.checkForgetPdVerificationCode({ uid: comp.forgetUid, verificationCode: comp.forgetVerificationCode })
                    .then(function (result) {
                        comp.$bus.$emit('loading_hide4');

                        switch (result.state) {
                            case 'invalid':
                                comp.forgetVerificationCodeMessage = '驗證碼無效，請重新輸入！';
                                break;
                            default:
                                comp.forgetVerificationCodeMessage = '';
                                break;
                        }

                        if (result.state !== 'pass') {
                            // verificationCode select
                            comp.$refs.forgetVerificationCode.$el.querySelector('input').select();
                            return;
                        }

                        if (typeof callback === 'function') {
                            callback();

                            comp.forgetAuthenticationTimingEnd();
                            setTimeout(() => comp.$refs.forgetNewUpd.focus(), 0);
                        }
                    })
                    .catch(function () {
                        comp.$bus.$emit('loading_hide4');

                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            forgetPwNewUpdCheck: function () {
                var re = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
                if (!re.test(this.forgetNewUpd)) {
                    return '密碼至少需8位半形英文+數字！';
                }
                return true;
            },
            forgetPwConfirmNewUpdCheck: function () {
                if (this.forgetConfirmNewUpd !== this.forgetNewUpd) {
                    return '密碼不一致，請重新輸入！';
                }
                return true;
            },
            checkForgetResetPw: function () {
                var comp = this;
                var isvaild = comp.$refs.forgetResetPwForm.validate();
                if (!isvaild) return;

                comp.$bus.$emit('loading_show4', '資料處理中...');
                
                comp.modifyPw({ uid: comp.forgetUid, newUpd: comp.forgetNewUpd, verificationCode: comp.forgetVerificationCode })
                    .then(function (result) {
                        comp.$bus.$emit('loading_hide4');

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

                        comp.alertResetPwResetPwState = result.state;
                        comp.$bus.$emit('alertResetPw_show', true);
                    })
                    .catch(function () {
                        comp.$bus.$emit('loading_hide4');

                        comp.alertResetPwMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alertResetPw_show', true);
                    });
            },
            toLoginPage: function () {
                location.href = '/login';
            }
        },
        components: {
            comDialog, comConfirm, comSteps, comLoading
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
        background: transparent url('/login/login_logo.svg') 0% 0% no-repeat padding-box;
        opacity: 1;
    }

    .rectangle .title {
        position: relative;
        top: 40px;
        left: 96px;
        width: 292px;
        height: 40px;
        font: var(--unnamed-font-style-normal) normal bold 28px/36px Futura !important;
        color: var(--bk);
        text-align: center;
        letter-spacing: 1.12px !important;
        opacity: 1;
        white-space: nowrap;
    }

    .rectangle .sub-title {
        position: relative;
        top: 35px;
        left: 172px;
        width: 140px;
        height: 40px;
        font: var(--unnamed-font-style-normal) normal bold 28px/36px Futura !important;
        color: var(--bk);
        text-align: center;
        letter-spacing: 1.12px !important;
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
        background: var(--v-primary-base) 0% 0% no-repeat padding-box;
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-noto-sans-t-chinese);
        letter-spacing: var(--unnamed-character-spacing-0);
        color: var(--w);
        text-align: center;
        opacity: 1;
    }

    .rectangle .btn-disabled, .rectangle .btn-login {
        border-radius: 8px;
    }

    .rectangle .btn-disabled {
        cursor: not-allowed;
        pointer-events: none;
        background: var(--bk_4) 0% 0% no-repeat padding-box !important;
        border-radius: 8px !important;
        opacity: 1 !important;
        box-shadow: none !important;
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
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-noto-sans-t-chinese);
        letter-spacing: var(--unnamed-character-spacing-0);
        color: var(--bk_4);
        text-align: left;
        opacity: 1;
        margin-bottom: 24px;
    }

    .dialog-sub-title.forget{
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/28px var(--unnamed-font-family-noto-sans-t-chinese);
        color: var(--bk);
    }

    .v-dialog.dialog .v-card__title {
        background: var(--pri) 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) 20px/var(--unnamed-line-spacing-24) var(--unnamed-font-family-noto-sans-t-chinese);
        letter-spacing: var(--unnamed-character-spacing-0);
        color: var(--w);
        text-align: left;
        opacity: 1;
    }

    .v-dialog .mdi-close::before {
        color: var(--w);
        opacity: 1;
    }

    .v-dialog .dialog-content {
        padding: 24px;
    }

    .v-dialog .mdi-reload::before {
        width: 23px;
        height: 19px;
        margin-top: -14px;
        transform: scale(.7);
    }

    .v-dialog .mdi-reload::before {
        content: url('/login/login_reverse.svg');
    }

    .v-dialog .v-btn.v-btn--icon.disabled .mdi-reload::before {
        content: url('/login/login_reverse_disabled.svg');
    }

    .v-dialog hr {
        margin: 0 24px;
        border: 1px solid #DDDFE2;
        opacity: 1;
    }

    .v-dialog .v-card__actions {
        padding: 24px;
    }

    .v-dialog .v-text-field .v-input__slot {
        width: 100%;
    }

    .v-dialog .v-text-field .v-input__slot:before,
    .v-dialog .v-text-field .v-input__slot:after {
        width: 0 !important;
    }

    .v-dialog .v-text-field .primary--text {
        color: var(--bk) !important;
    }

    .v-dialog .error-message {
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/28px var(--unnamed-font-family-noto-sans-t-chinese);
        letter-spacing: var(--unnamed-character-spacing-0);
        color: var(--dangerous);
        text-align: left;
        opacity: 1;
        min-height: 28px;
        margin-top: -25px;
    }

    .v-dialog .resend-message {
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/28px var(--unnamed-font-family-noto-sans-t-chinese);
        letter-spacing: var(--unnamed-character-spacing-0);
        color: var(--bk_6);
        text-align: left;
        opacity: 1;
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

    .v-dialog.dialog .v-card__actions > .v-btn:first-child {
        margin-left: 40px;
        width: 96px;
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/23px var(--unnamed-font-family-noto-sans-t-chinese);
        letter-spacing: var(--unnamed-character-spacing-0);
        color: var(--bk) !important;
        text-align: center;
        background: var(--w) 0% 0% no-repeat padding-box;
        border: 1px solid #62678133;
        border-radius: 4px;
        opacity: 1;
    }

    .dialogForgetSteps .v-stepper__step {
        padding: 0;
    }

    .dialogForgetSteps .v-card__actions {
        padding: 0;
    }

    .dialogForgetSteps .v-stepper__step__step {
        background: #9D99CE 0% 0% no-repeat padding-box !important;
        opacity: 1 !important;
    }
    /* Extra small devices (portrait phones, less than 576px) */
    @media (max-width: 575.98px) {
        body {
            background: var(--w);
        }

        .rectangle {
            top: 0;
            width: 376px;
            height: 800px;
            margin: 0 0 0 -188px;
        }

        .rectangle .logo {
            top: 78px;
            margin-left: 139px;
        }

        .rectangle .title {
            top: 80px;
            left: 55px;
        }

        .rectangle .sub-title {
            top: 75px;
            left: 130px;
        }

        .rectangle .content {
            position: relative;
            top: 127px;
            margin: 0 24px;
        }

        .v-text-field .v-input__slot {
            width: 328px;
        }

        .rectangle .forgt {
            top: 200px;
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
