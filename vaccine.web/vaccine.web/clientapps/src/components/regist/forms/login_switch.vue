<template>
    <v-dialog v-model="isShow">
        <v-card class="login-switch">
            <v-card-title class="login-header">請確認您的身份以查詢記錄<v-spacer></v-spacer><v-icon>close</v-icon></v-card-title>
            <v-card-text class="login-container d-flex justify-space-between">
                <div class="login-logo d-flex justify-center align-center">
                    <img src="/regist/tp_pass_alert.svg" />
                </div>
                <div class="login-descript d-flex justify-center align-center">
                    本服務將利用您的台北通帳號進行身份確認
                </div>
            </v-card-text>
            <v-card-actions class="login-actions d-flex justify-space-between">
                <v-btn class="cancel-action" color="#626781" width="40%" @click.stop="isShow=false">取消</v-btn>
                <v-btn class="next-action" color="#77CCDB" width="40%" @click="login">台北通登入</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

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

        }),
        computed: {
            ...mapGetters('regist', ['getUserInfo']),
            birth: function () {
                if (!this.year || !this.month || !this.day) return;
                return new Date(this.year + 1911, this.month, this.day);
            }
        },
        props: ['loginDone'],
        created: function () {

        },
        methods: {
            ...mapActions('regist', ['saveUserInfo']),
            create: function () {
                var comp = this;
                if (comp.getUserInfo) {
                    comp.loginDone(comp.getUserInfo); 
                    return;
                }
                comp.isShow = true;
            },
            login: function () {
                var comp = this;
                comp.close();
                comp.loginDone(comp.getUserInfo);
            },
            close: function () {
                var comp = this;
                comp.isShow = false;
            }
        },
        components: {

        }
    }
</script>

<style scoped>
    .v-btn--contained {
        box-shadow: none !important;
    }

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
        min-width: 130px !important;
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
