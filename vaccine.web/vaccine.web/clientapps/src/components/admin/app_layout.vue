<template>
    <!-- App.vue -->
    <v-app>
        <v-navigation-drawer app clipped v-model="showNavi">
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
                        {{(user)?user.name:''}}
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
        <profile ref="profileViewer" ref-key="pf" width="40%" :title="title2" ></profile>
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
                <v-img src="/alert_success.svg"></v-img>
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



    </v-app>
</template>

<script>
    import modify from 'components/admin/forms/password_modify'
    import profile from 'components/admin/contents/profile_content'
    import comConfirm from 'components/confirm'
    import comDialog from 'components/dialog'
    //import appMenu from 'components/main/menu'
    //import appLayout from 'components/app_layout'
    //import { Object } from 'core-js';

    export default {
        // router,
        data: () => ({
            drawer: true,
            user: { name: '王小明 ' },
            menus: [],
            modifyTitle: '',
            profileTitle: '',
            alertTitle:'',
            alertText:'',
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
                        this.$refs.profileViewer.create();
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
                        alert('logout');
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
            }
        },
        props: {

        },
        created: function () {
        },
        methods: {
            handleClick(index) {
                this.menulist[index].click.call(this)
            },
            formAction: function (result) {
                Object.assign(this.result, result);
                switch (result.action) {
                    case 'save':
                        this.$refs.modifyViewer.open();
                        console.log('save', result)
                        break;

                    case 'cancel':
                        console.log('cancel', result)
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

                this.alertText = '您的密碼已更新，請重新登入';
                this.$refs.modifyViewer.close();
                this.$refs.changeAlert.open();
            },
            alertRightClick: function () {
                this.$bus.$emit(`confirm_show`, false);
            },
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
</style>
