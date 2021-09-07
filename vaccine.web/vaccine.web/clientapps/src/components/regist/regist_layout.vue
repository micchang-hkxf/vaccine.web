<template>
    <app-layout :app-bar="appBar">
        <template v-slot:extension v-if="$slots['regist-extension']">
            <slot name="regist-extension"></slot>
        </template>
        <template v-slot:app-bar>
            <div class="regist-header d-flex flex-column">
                <div class="logo-title d-flex flex-row justify-center">
                    <div class="regist-icon">
                        <img src="/regist/logo.svg">
                    </div>
                    <div>
                        <div>里辦疫苗接種便民服務 </div>
                        <div>-網路報名系統-</div>

                    </div>
                </div>
                <div class="action-title" style="display:flex;justify-content:center;">
                    <img src="../../../public/login/home.svg" @click.stop="goWelcome" />
                    <v-spacer></v-spacer>
                    <slot name="regist-title"></slot>
                    <v-spacer></v-spacer>
                    <img src="../../../public/login/logout_logo.svg" @click.stop="confirmLogOut" v-show="user!=null" />
                </div>
            </div>

            <com-confirm ref="logoutAlert" ref-key="confirm" :left-click="logoutLeftClick" :right-click="logoutRightClick" right-color="#736DB9" left-color="#626781" key="logout-alert-confirm">
                <template v-slot:confirm-image>
                    <v-img src="/alert_warning.svg"></v-img>
                </template>

                <template v-slot:confirm-text>
                    <span> 確定登出？</span>
                </template>
                <template v-slot:confirm-left-btn-text>
                    取消
                </template>
                <template v-slot:confirm-right-btn-text>
                    確定
                </template>

            </com-confirm>

            <com-confirm ref="logoutAutoAlert" ref-key="confirm" :right-click="logoutAutoRightClick" right-color="#626781" key="logoutAuto-alert-confirm">
                <template v-slot:confirm-image>
                    <v-img src="/alert_warning.svg"></v-img>
                </template>
                <template v-slot:confirm-title>
                    <span> 自動登出</span>
                </template>
                <template v-slot:confirm-text>
                    <span> 由於系統閒置過久已將您登出</span>
                </template>
                            
                <template v-slot:confirm-right-btn-text>
                    返回首頁
                </template>

            </com-confirm>




        </template>
        <template v-slot:app-content>
            <slot name="regist-content"></slot>
        </template>
    </app-layout>
</template>

<script>
    import appLayout from 'components/app_layout'
    import comConfirm from 'components/confirm'
    import { mapActions } from 'vuex'
    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px',
                fixed:true
            },
            user:null
        }),
        computed: {
        },
        props: {

        },
        created: function () {
            this.user = sessionStorage.getItem('userInfo');          
        },
        methods: {
            ...mapActions('regist', ['setUserInfo']),
            goWelcome: function () {                          
                this.$router.push({ name: 'welcome' });
            },
            confirmLogOut: function () {              
                this.$refs.logoutAlert.open();
            },
            logoutLeftClick: function () {
                this.$refs.logoutAlert.close();
            },
            logoutRightClick: function () {
                this.setUserInfo(null).then(() => {
                    sessionStorage.removeItem('activityApply');
                    this.$router.push({ name: 'welcome' });
                });
            },
            logoutAutoRightClick: function () {
                this.$router.push({ name: 'welcome' });
            }
        },
        components: {
            appLayout,
            comConfirm
        }
    }
</script>
<style>
    .regist-icon {
        padding-right:8px!important;
    }
    .action-title {
        text-align: center;
        font: normal normal bold 16px/24px Noto Sans T Chinese;
        height: 50px;
        line-height: 50px;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
    }
    .action-title > img {
        position: relative;
        top: 10px;
        cursor: pointer;
    }
    .logo-title {
        max-width: 200%;
        height: 64px;
    }
    .app-bar {
        width: calc(100vw - 32px) !important;
        display:flex;
        justify-content:center;
    }
    .regist-header {
        width: calc(100vw - 32px) !important;
        font-size:20px!important;
        max-width:992px!important;
    }
    .v-tab.v-tab--active {
        text-align: center;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        opacity: 1;
    }
    .v-tab {
        color: gray;
        font-size: 16px !important;
        border-bottom-style: solid;
        border-bottom-color: lightgray;
        border-bottom-width: 1px;
    }
    .v-toolbar__content {
        background-color: #736DB9;
        color: #ffffff;
    }
    .app {
    }
</style>
