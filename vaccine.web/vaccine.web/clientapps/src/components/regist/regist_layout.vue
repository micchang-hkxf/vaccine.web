<template>
    <app-layout :app-bar="appBar">
        <template v-slot:extension v-if="$slots['regist-extension']">
            <slot name="regist-extension"></slot>
        </template>
        <template v-slot:app-bar v-if="$slots['regist-title'] && getUserInfo.type !='tpass-embedded'" >
            <div class="regist-header d-flex flex-column">
                <div class="d-flex flex-row justify-center">
                    <div>【測試】預約尚未開始</div>
                </div>
                <div class="logo-title d-flex flex-row justify-center">
                    <div class="regist-icon">
                        <img src="/regist/logo.svg">
                    </div>
                    <div>
                        <div>社區疫苗接種便民服務 </div>
                        <div>-網路報名系統-</div>
                    </div>
                </div>
                <div class="action-title" style="display:flex;justify-content:center;">
                    <v-btn color="#736DB9" @click.stop="goWelcome" :ripple="false" width="152">
                        <v-img src="/regist/home.svg"></v-img>
                        <v-spacer></v-spacer>
                        <span>返回首頁</span>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <span class="regist-title"><slot name="regist-title"></slot></span>
                    <v-spacer></v-spacer>
                    <v-btn color="#736DB9" @click.stop="confirmLogOut" :ripple="false" width="152" v-show="user!=null && user.type!=='tpass-embedded'">
                        <v-img src="/regist/log-out.svg" width="25" height="24"></v-img>
                        <v-spacer></v-spacer>
                        <span>改登其他身份</span>
                    </v-btn>
                    <div style="width:152px;" v-show="user==null"></div>
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
                    <span style="color:#FFF;">取消</span>
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
            <slot name="regist-footer"></slot>
        </template>
    </app-layout>
</template>

<script>
    import appLayout from 'components/app_layout'
    import comConfirm from 'components/confirm'
    import { mapActions,mapGetters } from 'vuex'
    import clientHelper from 'stores/clientHelper'
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
            ...mapGetters('regist', ['getUserInfo']),       
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
                    clientHelper.removeCookie('access_token');
                    clientHelper.removeCookie('tpass_token');
                    clientHelper.removeCookie('tpwv_lang');
                    clientHelper.removeCookie('target_page_id');
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
        height: 40px;
        line-height: 40px;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
        position: relative;
        top: 15px;
    }
    .action-title > img {
        position: relative;
        /*top: 10px;*/
        cursor: pointer;
    }

    .action-title .v-btn {
        border: 1px solid #FFF !important;
        border-radius: 4px;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #FFFFFF;
    }

    .action-title .v-responsive__content {
        width: 0 !important;
    }

    .logo-title {
        max-width: 200%;
        height: 64px;
        position: relative;
        top: 15px;
    }
    .app-bar {
        width: calc(100vw - 32px) !important;
        display:flex;
        justify-content:center;
    }
    .regist-header {
        width: calc(100vw - 32px) !important;
        font-size: 20px !important;
        /*max-width:992px!important;*/
        max-width: 800px !important;
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

    /* Extra small devices (portrait phones, less than 576px) */
    @media (max-width: 575.98px) {
        .logo-title {
            top: -15px;
        }

        .action-title .regist-title {
            position: relative;
            top: -38px;
            white-space: nowrap;
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
