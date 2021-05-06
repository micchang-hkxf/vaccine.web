<template>
    <v-app class="rectangle">
        <v-main>
            <v-form ref="loginForm">
                <div class="logo"></div>
                <div class="title">里辦疫苗接種便民系統</div>
                <div class="content">
                    <div>
                        <v-label>帳號</v-label>
                        <v-text-field id="uid" placeholder="請輸入帳號" v-model="uid" :rules="[rules.required]" ref="uid" solo @keyup.enter="check"></v-text-field>
                    </div>
                    <div>
                        <v-label>密碼</v-label>
                        <v-text-field id="upd" placeholder="請輸入密碼" v-model="upd" ref="upd" solo @keyup.enter="check"
                                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                      :type="show1 ? 'text' : 'password'"
                                      @click:append="show1 = !show1"></v-text-field>
                    </div>
                    <div>
                        <v-btn block height="48px" @click="check">登入</v-btn>
                    </div>
                </div>
                <div class="forgt">
                    <a href="#" @click="forgetUpd">忘記密碼？</a>
                </div>
            </v-form>

            <com-confirm ref="noManagementArea" ref-key="confirm">
                <template v-slot:confirm-image>
                    <v-img src="/alert_success.svg"></v-img>
                </template>
                <template v-slot:confirm-text>
                    很抱歉，您目前沒有所屬的管
                    轄區域權限，所以暫時無法使
                    用本系統，如有需要請聯絡相
                    關人員給予協助
                </template>
                <template v-slot:confirm-right-btn-text>
                    了解
                </template>
            </com-confirm>
        </v-main>

    </v-app>
</template>
<script>
    //import comDialog from 'components/dialog'
    import comConfirm from 'components/confirm'
    import { mapActions } from 'vuex'
    export default {
        // router,
        data: () => ({
            uid: '',
            upd: '',
            show1: false,
            rules: {
                required: v => !!v ||"required"
            }
        }),
        computed: {

        },
        props: {

        },
        created: function () {
            
        },
        methods: {
            ...mapActions(['checkLogin']),
            check: function () {
                var comp = this;
                var isvaild = comp.$refs.loginForm.validate();
                if (!isvaild) return;

                comp.checkLogin({ uid: comp.uid, upd: comp.upd })
                    .then(function (result) {
                        switch (result.state) {
                            case 'no management area':
                                //comp.$refs.noManagementArea.open();
                                comp.$bus.$emit(`confirm_show`, true);
                                //comp.$forceUpdate();
                                //comp.showConfirm('noManagementArea');
                                break;
                            default:
                                break;
                        }
                    })
                    .catch(function (ex) {
                        alert(ex.state);
                    })
            },
            showConfirm: function (refKey) {
                if (typeof refKey !== undefined) {
                    this.$bus.$emit(`${refKey}_switch`);
                }
            },
            forgetUpd: function () {
                alert('忘記密碼');
            }
        },
        components: {
            /*comDialog,*/ comConfirm
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
        background: var(--bk_4) 0% 0% no-repeat padding-box;
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
