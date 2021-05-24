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
                                   color="primary"
                                   icon>
                                <v-icon>mdi-account-outline</v-icon>
                                {{(user)?user.name:''}}
                            </v-btn>
                        </template>

                        <v-list>
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
    </v-app>
</template>

<script>
    export default {
        // router,
        data: () => ({
            drawer: true,
            user: { name: '王小明 ' },
            menus: [],
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
                        console.log('profile')
                    }
                },
                {
                    title: '修改密碼',
                    icon: 'mdi-lock-outline',
                    click() {
                        console.log('modify password')
                    }
                },
                {
                    title: '登出',
                    icon: 'mdi-logout',
                    click() {
                        console.log('logout')
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
            }
        }
    }
</script>
<style>
    .app-content-card {
        margin: 20px !important;
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
    .v-list  .v-list-item__title {
        color: black !important;
    }
    .usertitle .v-btn__content {
        color: white !important;
    }
</style>
