<template>
    <v-dialog v-model="isShow">
        <v-card class="login-editor">
            <v-card-title class="login-header">請輸入您的資料以驗證身份</v-card-title>
            <v-card-text class="login-container">
                <div class="login-field">
                    <div class="login-field-label">身份證字號<span class="red--text">*</span></div>
                    <div class="login-field-container">
                        <v-text-field class="login-field-text" v-model="uid" placeholder="請輸入您的身分證字號"></v-text-field>
                    </div>
                </div>
                <div class="login-field">
                    <div class="login-field-label">生日<span class="red--text">*</span></div>
                    <div class="login-field-container d-flex justify-space-between">
                        <v-select :items="years" placeholder="yyy" v-model="year">

                        </v-select>
                        <v-select :items="months" placeholder="mm" v-model="month">
                            <template v-slot:prepend>
                                /
                            </template>
                        </v-select>
                        <v-select :items="days" placeholder="dd" v-model="day">
                            <template v-slot:prepend>
                                /
                            </template>
                        </v-select>
                    </div>
                </div>
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
            ...mapActions('regist', ['setUserInfo']),
            create: function () {
                if (this.getUserInfo) {
                    this.loginDone(this.getUserInfo); 
                    return;
                }
                this.isShow = true;
            },
            login: function () {
                if (!this.uid || !this.birth) return;
                this.setUserInfo({ uid: this.uid, birth: this.birth , type: 'identity' })
                .then(() => {
                    this.$router.push({ name:'apply' });
                    this.close();
                }).catch(() => {
                    alert('無法登入');
                });
            },
            close: function () {
                this.isShow = false;
            }
        },
        components: {

        }
    }
</script>

<style scoped>

    .login-editor/deep/ .v-btn {
        min-width:130px!important;
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
