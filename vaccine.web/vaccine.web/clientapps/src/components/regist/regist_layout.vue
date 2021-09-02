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
                <!--<div class="action-title d-flex flex-row justify-center">v-show="user!=null"-->
                <!--<div style="display:flex;justify-content:center;">-->
                    <div class="action-title" >
                        <img src="../../../public/login/home.svg" @click.stop="goWelcome" />
                        <slot name="regist-title"></slot>
                        <img src="../../../public/login/logout_logo.svg" @click.stop="logout" />
                    </div>
                <!--</div>-->

            </div>
        </template>
        <template v-slot:app-content>
            <slot name="regist-content"></slot>
        </template>
    </app-layout>
</template>

<script>
    import appLayout from 'components/app_layout'
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
            goWelcome: function () {
                this.$router.push('welcome');               
            },
            logout: function () {
                sessionStorage.removeItem('userInfo');
                sessionStorage.removeItem('activityApply');
                this.$router.push('welcome');
            }
        },
        components: {
            appLayout
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
    }
    .regist-header {
        width: calc(100vw - 32px) !important;
        font-size:20px!important;
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
