<template>
    <div class="login-switch-container">
        <v-dialog v-model="isShow">
            <v-card class="login-switch">
                <v-card-title class="login-header">請確認您的身份以查詢記錄<v-spacer></v-spacer><span @click="cancel"><v-icon>close</v-icon></span></v-card-title>
                <v-card-text class="login-container">
                    <v-btn color="#77CCDB" @click="toTpPassLogin('/regist/#/regist?mode=applied')">利用台北通帳號登入</v-btn>
                    <v-btn color="#77CCDB" @click="toLocalLogin()">手動輸入資料</v-btn>
                    <v-btn color="#626781" @click="cancel">取消</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

        <login ref="login" :login-done="userSign"></login>


        <com-confirm ref="loginError" right-color="loginErrorButton" right-outlined="" ref-key="confirm2" :right-click="closeAlert">
            <template v-slot:confirm-image>
                <v-img src="/alert_warning.svg"></v-img>
            </template>
            <template v-slot:confirm-title>
                無法登入
            </template>
            <template v-slot:confirm-text>
                請重新嘗試或改用其他方式登入
            </template>

            <template v-slot:confirm-right-btn-text>
                <font color="black">了解</font>
            </template>

        </com-confirm>

    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import login from 'components/regist/forms/login_editor'
    import comConfirm from 'components/confirm'

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
            uid: null,
            year: 108,
            month: 1, 
            day: 1 ,
            isLoginError: false,
            loginType:null,
            redPath: null,
            redParam: null,
            redUrl: null,
        }),
        computed: {
            ...mapGetters('regist', ['getUserInfo']),
            birth: function () {
                if (!this.year || !this.month || !this.day) return;
                return new Date(this.year + 1911, this.month, this.day);
            }
        },
        props: ['loginDone','loginCancel'],
        created: function () {

        },
        methods: {
            ...mapActions('regist', ['setUserInfo']),
            cancel: function () {
                this.isShow = false;
                this.loginCancel();
            },
            create: function () {
                var comp = this;
                var error = this.$cookies.get('error');
                if (error) {
                    this.$cookies.remove('error');
                    this.isLoginError = true;
                    this.$refs.loginError.open();
                    return;
                }
                if (comp.getUserInfo) {
                    comp.loginDone(comp.getUserInfo); 
                    return;
                }
                comp.isShow = true;
            },
            toTpPassLogin: function (redUrl) {
                this.loginType = 'taipei-pass';
                this.claerRed();
                if (this.getUserInfo != null) {
                    if (this.getUserInfo.type == 'taipei-pass') {
                        window.location.href = redUrl;
                        return;
                    }
                }
                this.setUserInfo(null).then(() => {
                    this.redUrl = redUrl;
                    window.location.href = `/tppass?redirect=${encodeURIComponent(redUrl)}`;
                });
            },
            toLocalLogin: function (redPath) {
                this.loginType = 'identify';
                this.claerRed();
                if (this.getUserInfo != null) {
                    if (this.getUserInfo.type == 'identify') {
                        this.$router.push({ path: redPath });
                        return;
                    }
                }
                this.setUserInfo(null).then(() => {
                    this.redPath = redPath;
                    this.$refs.login.create();
                });
            },
            toLocalLoginParam: function (redParam) {
                this.loginType = 'identify';
                this.claerRed();
                if (this.getUserInfo != null) {
                    if (this.getUserInfo.type == 'identify') {
                        this.$router.push(redParam);
                        return;
                    }
                }
                this.setUserInfo(null).then(() => {
                    this.redParam = redParam;
                    this.$refs.login.create();
                });
            },
            claerRed: function () {
                this.redUrl = this.redPath = this.redParam =null;
            },
            userSign: function () {
                var comp = this;
                comp.close();
                if (comp.redPath!=null)
                    comp.$router.push({ path: comp.redPath });
                else
                    comp.$router.push(comp.redParam);
            },
            close: function () {
                var comp = this;
                comp.isShow = false;
            },
            closeAlert: function () {
                this.$refs.loginError.close();
                this.create();
            }

        },
        components: {
            login, comConfirm
        }
    }
</script>

<style>
    .loginErrorButton {
        background-color: #626781 !important;
    }

        .loginErrorButton font {
            color: white !important;
        }

</style>
<style scoped>

    .login-switch/deep/ .login-header {
        font-size: 16px !important;
        color: #626781 !important;
    }

    .login-switch/deep/ .login-descript {
        padding-left: 20px !important;
        padding-right: 20px !important;
        font-size: 16px !important;
        color: rgba(67,73,105,0.5) !important;
    }
    .login-switch/deep/ .login-logo {
        width: 72px !important;
        height: 72px !important;
    }
    .login-switch/deep/ .v-btn {
        width:100%;
        margin-bottom:16px!important;
    }

    .login-switch/deep/ .v-input {
        padding-top: 0px !important;
        margin-top: 0px !important;
    }

    .v-application .primary--text {
        color: #736DB9 !important;
        caret-color: #736DB9 !important;
    }

    .login-switch/deep/ .cancel-action {
        background-color: #626781 !important;
    }

    .login-switch/deep/ .next-action {
        background-color: #77CCDB !important;
    }

    .login-switch/deep/ .v-btn:not(.v-btn--disabled) {
        color: white !important;
    }

    .login-switch/deep/ {
    }

        .login-switch/deep/ .v-overlay__scrim {
        }




        .login-switch/deep/ .login-container {
            padding-right: 24px !important;
            padding-left: 24px !important;
        }


        .login-switch/deep/ .login-actions {
            padding-left: 24px !important;
            padding-right: 24px !important;
            padding-bottom:24px !important;
        }

        .login-switch/deep/ .login-actions .v-btn {
            width: 60px !important;
        }

</style>
