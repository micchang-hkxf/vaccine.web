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
                { text: "報名表管理", active: false, key: "registration", target: null },
                { text: "人員管理", active: false, key: "users", target: null },
                { text: "稽核管理", active: false, key: "audit", target: null},
                { text: "報名查詢", active: false, key: "registed", target: null },
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

                    window.location = menu.target;
                    //window.open(menu.target, menu.text);
                    return;
                }
                window.location.hash = "";
                this.currentContent = menu;
                this.$router.push({ name: menu.key });
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

    .menu-list {
        background: #626781 !important;
        height: 100vh !important;
    }

</style>
