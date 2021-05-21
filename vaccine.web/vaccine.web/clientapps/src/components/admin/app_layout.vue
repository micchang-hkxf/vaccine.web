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

            <v-menu open-on-hover offset-y bottom min-width="70" nudge-width="100" max-height="600" nudge-bottom="23" nudge-right="50">
                <template v-slot:activator="{ on }">
                    <v-toolbar-title class="user-title" v-on="on">
                        {{(user)?user.name:''}}
                    </v-toolbar-title>
                </template>
                <v-card :tile="true">
                    <v-card-title><span class="personal_fontcolor">個人資訊&nbsp;:</span></v-card-title>
                    <v-list>
                        <v-list-item @click.stop="toPersonal(item)">
                            <v-list-item-action-text>
                                <v-btn icon dense>
                                    <v-icon small>far fa-edit</v-icon>
                                </v-btn>個人資訊
                            </v-list-item-action-text>
                        </v-list-item>
                        <v-list-item @click.stop="toModifyPwd(item)">
                            <v-list-item-action-text>
                                <v-btn icon dense>
                                    <v-icon small>far fa-trash-alt</v-icon>
                                </v-btn>修改密碼
                            </v-list-item-action-text>
                        </v-list-item>
                        <v-list-item @click.stop="toLogout(item)">
                            <v-list-item-action-text>
                                <v-btn icon dense>
                                    <v-icon small>far fa-edit</v-icon>
                                </v-btn>登出
                            </v-list-item-action-text>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
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
    </v-app>
</template>

<script>
    export default {
        // router,
        data: () => ({
            drawer: true,
            user: { name: 'todo' },
            menus: [],
            toolbar: {
                //
                fixed: true,
                // sets if the toolbar contents is leaving space for drawer (false) or not (true)
                clippedLeft: true,
            },
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
            toPersonal: function () {

            },
            toModifyPwd: function () {

            },
            toLogout: function () {

            },
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

</style>
