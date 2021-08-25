<template>
    <v-list class="menu-list">
        <v-list-item v-for="(menu,index) in menus" :class="menuItemActive(menu)" :key="index" @click="menuActive(menu)">
            <v-list-item-content :class="menu.key">
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
        mounted: function () {
            var k = window.location.hash.substr(1),
                n = (k.substring(1));
            if (n == "") {
                n = "registration";
            }
            var selection = document.querySelector(".v-list-item__content." + n);
        
            if (selection!=null) {
                selection.style.setProperty('background-color', '#FFFFFF0F', 'important');
            }
             
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
                if (this.$route.name == menu.key) {
                    return;
                }
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
    .menu-list > .v-list-item {
            padding: 0px 0px 0px 0px !important;
        }
    .v-list-item__title {
        padding: 0px 10px !important;
        font-size: 20px !important;
        text-align: left !important;
        font: normal normal normal 20px/24px Noto Sans T Chinese !important;
        letter-spacing: 0px !important;
    }
    .v-list {
        padding: 0px 0px !important;
        
    }
    .v-list-item__content {
        height: 56px !important;
    }
    .v-main {
        padding: 65px 0px 0px 249px !important;
    }



</style>
