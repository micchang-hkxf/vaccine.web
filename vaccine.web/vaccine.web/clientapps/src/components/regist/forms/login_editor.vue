<template>
    <v-dialog v-model="isShow">
        <v-card class="login-editor">
            <v-card-title class="login-header">請輸入您的資料以驗證身份</v-card-title>
            <v-card-text class="login-container">
                <v-form ref="loginForm">
                    <div class="login-field">
                        <div class="login-field-label">身份證字號<span class="red--text">*</span></div>
                        <div class="login-field-container">
                            <v-text-field class="login-field-text" v-model="uid" placeholder="請輸入您的身分證字號" :rules="[v=>!!v||'請輸入您的身分證字號']"></v-text-field>
                        </div>
                    </div>
                    <div class="login-field">
                        <div class="login-field-label">生日<span class="red--text">*</span></div>
                        <div class="login-field-container d-flex justify-space-between">
                            <v-select :items="years" placeholder="yyy" v-model="year" :rules="[v=>!!v||'請輸入生日年分']">

                            </v-select>
                            <v-select :items="months" placeholder="mm" v-model="month" :rules="[v=>!!v||'請輸入生日月分']">
                                <template v-slot:prepend>
                                    /
                                </template>
                            </v-select>
                            <v-select :items="days" placeholder="dd" v-model="day" :rules="[v=>!!v||'請輸入生日日期']">
                                <template v-slot:prepend>
                                    /
                                </template>
                            </v-select>
                        </div>
                    </div>
                    <div class="login-field">
                        <div class="login-field-label">驗證碼 <span class="red--text">*</span></div>
                        <div class="login-field-container d-flex justify-space-between">
                            <v-text-field v-model="captcha" class="captcha-field" :rules="[v=>!!v||'請輸入驗證碼']" placeholder="請輸入驗證碼">
                                <template v-slot:append-outer>
                                    <span @click.stop="resetSessionId" style="display:flex;">
                                        <img :src="getCaptchaUrl" />
                                        <v-icon style="color: #736DB9 !important;">sync</v-icon>
                                    </span>
                                    
                                </template>
                            </v-text-field>
                        </div>
                    </div>

                </v-form>
            </v-card-text>
            <v-card-actions class="login-actions d-flex justify-space-between">
                <v-btn class="cancel-action" color="#626781" width="130px" @click.stop="isShow=false">取消</v-btn>
                <v-btn class="next-action" color="#736DB9" width="130px" @click="login">下一步</v-btn>
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
            },
            isShow: false,
            years: [],
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            largeMonth:[1,3,5,7,8,10,12],
            uid: null,
            year: 108,
            month: 1,
            day: 1,
            sessionId: '',
            captcha: ''
        }),
        computed: {
            ...mapGetters('regist', ['getUserInfo', 'getApiRoot']),
            birth: function () {
                if (!this.year || !this.month || !this.day) return;
                return new Date(this.year + 1911, this.month, this.day);
            },
            getCaptchaUrl: function () {
                return `${this.getApiRoot}api/captcha?sessionId=${this.sessionId}`;
            },

        },
        props: ['loginDone'],
        created: function () {
            var today = new Date();
            this.year = today.getFullYear() - 1911;
            for (var i = this.year; i > this.year - 201; i--)
                this.years.push(i);
        },
        methods: {
            ...mapActions('regist', ['setUserInfo', 'checkUserInfo']),
            resetSessionId: function () {
                this.sessionId = parseInt(Math.random(0, 1)*900000 + 100000);
            },
            create: function () {
                if (this.getUserInfo) {
                    this.loginDone(this.getUserInfo);
                    return;
                }
                this.isShow = true;
                this.resetSessionId();
            },
            login: function () {
                if (!this.$refs.loginForm.validate()) return;
                if (!this.uid || !this.birth) {
                    //alert('請輸入正確的生日及身分證號');
                    return;
                }

                if (!this.sessionId || !this.captcha) {
                    //alert('請輸入正確的驗證碼');
                    return;
                }

                var comp = this;

                this.checkUserInfo({
                    identify: this.uid,
                    birthday: this.birth,
                    sessionId: this.sessionId,
                    captcha: this.captcha,
                    type: 'identity'
                }).then((user) => {
                    comp.loginDone(user);
                    comp.close();
                }).catch(() => {
                    alert('無法登入');
                });
            },
            close: function () {
                this.isShow = false;
            }
        },
        watch: {
            month: function (val) {
                this.days.splice(0);
                if (this.largeMonth.indexOf(val) == -1)
                {
                    for (var s = 1; s <= 30; s++) this.days.push(s);
                    return;
                }
                for (var l = 1; l <= 31; l++) this.days.push(l);

            },
        },
        components: {

        }
    }
</script>

<style scoped>
    .captcha-field .v-input__slot {
        border-style: none;
    }

    .login-editor/deep/ .v-btn {
        min-width: 130px !important;
    }

    .login-editor/deep/ .v-input {
        padding-top: 0px !important;
        margin-top: 0px !important;
    }

    .v-application .primary--text {
        color: #736DB9 !important;
        caret-color: #736DB9 !important;
    }

    .login-editor/deep/ .cancel-action {
        background-color: #626781 !important;
    }

    .login-editor/deep/ .next-action {
        background-color: #736DB9 !important;
    }

    .login-editor/deep/ .v-btn:not(.v-btn--disabled) {
        color: white !important;
    }

    .login-editor/deep/ {
    }

        .login-editor/deep/ .v-overlay__scrim {
        }


        .login-editor/deep/ .login-header {
            font-size: 16px !important;
            color: #626781 !important;
        }

        .login-editor/deep/ .login-container {
        }

            .login-editor/deep/ .login-container .login-field-label {
                color: #434969 !important;
                font-size: 16px !important;
            }

            .login-editor/deep/ .login-container .login-field-container {
            }

        .login-editor/deep/ .login-actions {
        }

            .login-editor/deep/ .login-actions .v-btn {
                width: 60px !important;
            }
</style>
