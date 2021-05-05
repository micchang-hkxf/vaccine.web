<template>
    <section id="app" class="rectangle">
        <div class="logo"></div>
        <div class="title">里辦疫苗接種便民系統</div>
        <v-form ref="loginForm" method="post">
            <div>
                <label>帳號</label><p />              
                <!--<v-text-field placeholder="請輸入帳號" :rules="[rules.required]" v-model="username" filled></v-text-field>-->  
                <input type="text" id="username" placeholder="請輸入帳號" :rules="[rules.required]" v-model="username" ref="username" autocomplete="off" />
            </div>
            <div>
                <label>密碼</label><p />
                <input type="password" id="password" placeholder="請輸入密碼" :rules="[rules.required]" v-model="password" ref="password" />
            </div>
            <div>
                <input type="submit" value="登入" @click="check" />
            </div>
        </v-form>
        <div class="forgt">
            <a href="#" @click="forgetPassword">忘記密碼？</a>
        </div>
    </section>
</template>

<script>
    //import comDialog from 'components/dialog'
    import axios from 'axios'
    import { mapActions } from 'vuex'
    export default {
        // router,
        data: () => ({
            username: '',
            password: '',
            rules: {
                required: v => v || '必須填寫欄位!',
                english: v => v.match(/[a-z]+/) || '必須輸入英文!',
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
                var isValid = this.$refs.loginForm.validate();
                if (!isValid) return;
                this.checkLogin({ uid: this.username, upd: this.password })
                    .then(function (result) {
                        alert(result.status);
                    })
                    .catch(function (ex) {
                        alert(ex.status);
                    })
            },
            forgetPassword: function () {
                alert('忘記密碼');
            },
            checkForm: function (e) {
                e.preventDefault();

                if (this.username === '') {
                    alert('請輸入帳號');
                    this.$refs.username.focus();
                    return;
                }

                if (this.password === '') {
                    alert('請輸入密碼');
                    this.$refs.password.focus();
                    return;
                }

                axios.post('/api/state', {
                    username: this.username,
                    password: this.password
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        components: {
            //comDialog
        }
    }

    window.history.replaceState(null, null, window.location.href);
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

    section.rectangle {
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

    section.rectangle .logo {
        position: relative;
        top: 32px;
        margin-left: 180px;
        width: 120px;
        height: 120px;
        background: var(--pri) 0% 0% no-repeat padding-box;
        opacity: 1;
    }

    section.rectangle .title {
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

    section.rectangle form {
        position: relative;
        top: 72px;
    }

    section.rectangle form div {
        margin-left: 64px;
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-noto-sans-t-chinese);
        letter-spacing: var(--unnamed-character-spacing-0);
        color: var(--bk);
        text-align: left;
        opacity: 1;
    }

    section.rectangle input {
        width: 352px;
        height: 48px;
        background: var(--bk_06) 0% 0% no-repeat padding-box;
        border-radius: 8px;
        opacity: 1;
        margin-bottom: 24px;
    }

    section.rectangle input[placeholder] {
        padding: 16px;
    }

    section.rectangle input[type="submit"] {
        width: 352px;
        height: 48px;
        background: var(--bk_4) 0% 0% no-repeat padding-box;
        border-radius: 8px;
        font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-noto-sans-t-chinese);
        letter-spacing: var(--unnamed-character-spacing-0);
        color: var(--w);
        text-align: center;
        opacity: 1;
    }

    section.rectangle .forgt {
        position: relative;
        top: 140px;
        height: 16px;
        text-align: center;
    }

    section.rectangle .forgt a {
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
