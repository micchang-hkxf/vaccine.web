<template>
    <!-- App.vue -->
    <v-app>
        <v-navigation-drawer app clipped v-model="showNavi" hide-overlay fixed stateless>
            <div class="app-navigation" v-if="$slots['navigation']">
                <slot name="navigation" />
            </div>
        </v-navigation-drawer>
        <v-app-bar app
                   color="#736DB9"
                   dark
                   height="65px"
                   :fixed="toolbar.fixed"
                   :clipped-left="toolbar.clippedLeft">

            <v-app-bar-nav-icon class="d-md-none" @click.stop="toggleDrawer"></v-app-bar-nav-icon>

            <v-toolbar-title class="system-title">疫苗管理系統</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs"
                           v-on="on"
                           class="usertitle"
                           icon>
                        <v-icon>mdi-account-outline</v-icon>
                        {{(user)?user.uName:''}}
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </template>

                <v-list class="layoutmenu">
                    <v-list-item v-for="(item, index) in menulist"
                                 :key="index"
                                 @click="handleClick(index)">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-card :tile="true">

            </v-card>

        </v-app-bar>
        <v-main class="app-content" v-if="$slots['app-content']">
            <v-toolbar elevation="0" height="72px">
                <v-toolbar-title>
                    <slot name="content-title" v-if="$slots['content-title']"></slot>
                </v-toolbar-title>
            </v-toolbar>
            <div class="app-content-container" v-if="$slots['app-content']">
                <v-card class="app-content-card" rounded="0px">
                    <slot name="app-content" />
                </v-card>
            </div>
        </v-main>

        <v-footer app v-if="$slots['app-footer']">
            <div class="app-footer" v-if="$slots['app-footer']">
                <slot name="app-footer" />
            </div>
        </v-footer>
        <modify ref="passwordEditor" ref-key="pwd" width="40%" :title="title" :action="formAction"></modify>
        <profile ref="profileViewer" ref-key="pf" width="40%" :title="title2"></profile>
        <com-dialog ref="modifyViewer" ref-key="pwd" width="60%">
            <template v-slot:toolbar>
                {{modifyTitle}}
                <v-spacer></v-spacer>
            </template>
            <template v-slot:content>
                點選「確定」後新密碼立即生效。
                <v-divider></v-divider>
                {{result}}
            </template>
            <template v-slot:action>
                <v-spacer></v-spacer>
                <v-btn outlined :ripple="false" @click="backToEdit"><span style="color:#626781;">修改</span></v-btn>
                <v-btn @click="save" color="primary" :ripple="false">確定</v-btn>
            </template>
        </com-dialog>

        <com-confirm ref="changeAlert" ref-key="confirm" :right-click="alertRightClick">
            <template v-slot:confirm-image>
                <v-img v-bind:src="alertImgSrc"></v-img>
            </template>
            <template v-slot:confirm-title>
                {{alertTitle}}
            </template>
            <template v-slot:confirm-text>
                {{alertText}}
            </template>
            <template v-slot:confirm-right-btn-text>
                確認
            </template>
        </com-confirm>
        <com-confirm ref="changeErrorAlert" ref-key="confirm" :right-click="alertRightClick" right-color="#626781">
            <template v-slot:confirm-image>
                <v-img v-bind:src="errorImgSrc"></v-img>
            </template>
            <template v-slot:confirm-title>
                {{errorTitle}}
            </template>
            <template v-slot:confirm-text>
                {{errorText}}
            </template>
            <template v-slot:confirm-right-btn-text>
                確認
            </template>
        </com-confirm>


    </v-app>
</template>

<script>
    import modify from 'components/admin/forms/password_modify'
    import profile from 'components/admin/contents/profile_content'
    import comConfirm from 'components/confirm'
    import comDialog from 'components/dialog'
    import crypto from "crypto"
    import { mapActions } from 'vuex'
    //import appMenu from 'components/main/menu'
    //import appLayout from 'components/app_layout'
    //import { Object } from 'core-js';

    export default {
        // router,
        data: () => ({
            drawer: true,
            user: null,
            menus: [],
            modifyTitle: '',
            profileTitle: '',
            alertTitle:'',
            alertText: '',
            alertImgSrc: '',
            errorTitle: '',
            errorText: '',
            errorImgSrc: '',
            successIcon: '/alert_success.svg',
            warningIcon: '/alert_warning.svg',
            title: '修改密碼',
            title2: '個人資訊',
            result:'',
            toolbar: {
                //
                fixed: true,
                // sets if the toolbar contents is leaving space for drawer (false) or not (true)
                clippedLeft: true,
            },
            menulist: [
                {
                    title: '個人資訊',
                    icon: 'mdi-account-outline',
                    click() {
                       
                        this.profileTitle = '個人資訊';
                        this.$refs.profileViewer.create(this.user);
                    }
                },
                {
                    title: '修改密碼',
                    icon: 'mdi-lock-outline',
                    click() {
                        this.modifyTitle = '修改密碼';
                        this.$refs.passwordEditor.create();
                    }
                },
                {
                    title: '登出',
                    icon: 'mdi-logout',
                    click() {
                        this.clickLogout();
                    }
                }
            ],
        }),
        computed: {
            showNavi: {
                get: function () {
                    return this.drawer && this.$slots['navigation'];
                },
                set: function () {
                    null;
                }
            },
            isNotMobile: function () {
                return !(this.mobileClass["mobile-ios"] || this.mobileClass["mobile-android"]);
            },
            mobileClass: function () {
                return {
                    "mobile-ios": navigator.userAgent.indexOf('Mobile') != -1 && navigator.userAgent.indexOf('iPhone OS') != -1,
                    "mobile-android": navigator.userAgent.indexOf('Mobile') != -1 && navigator.userAgent.indexOf('Linux') != -1,
                    "lang-tw": this.getLangType == 'tw',
                    "lang-en": this.getLangType == 'en',
                };
            }
        },
        props: {

        },
        created: function () {
            this.getUserInfo();
        },
        methods: {
            ...mapActions('users', ['modifyPassword']),
            ...mapActions('user', ['getUserInfoData','userLogout']),

            handleClick(index) {
                this.menulist[index].click.call(this)
            },
            formAction: function (result) {
                Object.assign(this.result, result);
                switch (result.action) {
                    case 'save':
                        this.$refs.modifyViewer.open();
                        //console.log('save', result)
                        break;

                    case 'cancel':
                        //console.log('cancel', result)
                        break;
                }
            },
            colse: function () {
                this.$refs.modifyViewer.close();
            },
            backToEdit: function () {
                this.$refs.modifyViewer.close();
                this.$refs.passwordEditor.show();
            },
            save: function () {
          
                //todo
                var loginAccount = this.user.acc,
                    accMobile = this.$refs.passwordEditor.newPassword,
                    accMobileSrc = this.$refs.passwordEditor.oldPassword;
                
                var oriPd = crypto.createHash('sha256').update(loginAccount + accMobileSrc).digest('base64'),
                    newPd = crypto.createHash('sha256').update(loginAccount + accMobile).digest('base64');

                var setdata = {
                    "acc": loginAccount,
                    "oriPd": oriPd,
                    "newPd": newPd
                };
             
                var comp = this;
                comp.modifyPassword(setdata).then(function (result) {
                    console.log(result);
                    comp.alertImgSrc = comp.successIcon;
                    comp.alertText = '您的密碼已更新，請重新登入';
                    comp.$refs.modifyViewer.close();
                    comp.$refs.changeAlert.open();
                }).catch(function () {
                    comp.errorImgSrc = comp.warningIcon;
                    comp.errorText = '處理錯誤，請重新嘗試';
                    comp.$refs.modifyViewer.close();
                    comp.$refs.changeErrorAlert.open();
                });

                
            },
            alertRightClick: function () {
                this.$bus.$emit(`confirm_show`, false);
            },
            getUserInfo() {
                var comp = this;
                comp.getUserInfoData().then(function (result) {
                    comp.user = result.datas;
                }).catch(function () {
                    window.location.href = "/login";
                });
            },
            clickLogout() {
                var comp = this;
                comp.userLogout().then(function (result) {
                    console.log(result);
                    window.location.href = "/login";
                }).catch(function () {

                });
            }
        },
        components: {
            modify, comDialog, comConfirm, profile
        }
    }
</script>
<style>
    .app-content-card {
        margin: 20px !important;
        padding: 20px !important;
    }

    .app-content-container {
        height: calc(100% - 72px);
    }
    .v-application--wrap {
        min-width: calc(100% + 15px) !important;
    }
    .app-content {
        background-color: #F2F3F7;
    }

    .v-navigation-drawer__content {
        overflow-y: hidden !important;
    }
    /*.user-title:hover {
        color: white !important;
    }*/
    .menu-list .v-list-item__content .v-list-item__title {
        color: white !important;
    }
    .layoutmenu .v-list-item__title{
        color: black !important;
    }
    .v-main__wrap >.v-toolbar {
        background: #FFFFFF80 0% 0% no-repeat padding-box !important;
    }


</style>
