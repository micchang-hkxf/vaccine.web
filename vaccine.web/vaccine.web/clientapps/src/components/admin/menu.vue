<template>
    <v-list class="menu-list">
        <v-list-item v-for="(menu,index) in menus" :class="menuItemActive(menu)" :key="index" @click="menuActive(menu)">
            <v-list-item-content>
                <v-list-item-title :class="menuTitleActive(menu)">{{menu.text}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
    //import { mapState } from 'vuex'

    export default {
        // router,
        data: () => ({
            menus: [
                { text: "aaa", active: true, key: "meetings", target: null },
                { text: "bbb", active: false, key: "parameters", target: null },
                { text: "ccc", active: false, key: "managers", target: null },
                { text: "ddd", active: false, key: "rents", target: null },
                { text: "eee", active: false, key: "webex", target: "https://admin.webex.com/login" }
            ],
            currentContent: { text: "我的會議", active: true, key: "meetings" },

        }),
        computed: {

        },
        props: {
        },

        created: function () {
        },
        methods: {

            menuActive: function (menu) {
                if (menu.target != null) {
                    window.open(menu.target, menu.text);
                    return;
                }
                window.location.hash = "";
                this.currentContent = menu;
            },
            menuItemActive: function (menu) {
                return {
                    "menu-active": menu.key == this.currentContent.key,
                };
            },
            menuTitleActive: function (menu) {
                return {
                    "menu-active": menu.key == this.currentContent.key,
                };
            },

        },
        components: {
        }
    }
</script>
<style>
   
</style>
