<template>
    <app-layout enabled-drawer="true">
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <!--<v-btn @click="switch('one')">one</v-btn>
    <sys-dialog ref-key="one"></sys-dialog>-->
                <v-btn color="primary" @click="show('two')">two</v-btn>
                <com-dialog ref="dialogPanel" ref-key="two" width="60%">
                    <template v-slot:toolbar>
                        新增人員
                    </template>
                    <template v-slot:content>

                    </template>
                    <template v-slot:action="{close}">
                        <v-btn @click="close">取消</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn @click="closeDialog">儲存草稿</v-btn>
                        <v-btn>送出</v-btn>
                    </template>
                </com-dialog>
            </div>
        </template>
    </app-layout>
</template>

<script>
    import comDialog from 'components/dialog'
    import appMenu from 'components/main/menu'
    import appLayout from 'components/app_layout'
    export default {
        // router,
        data: () => ({

        }),
        computed: {
        },
        props: {
            
        },
        created: function () {
        },
        methods: {
            show: function (refKey) {
                this.$bus.$emit(`${refKey}_switch`);
            },
            open: function (refKey) {
                this.$bus.$emit(`${refKey}_show`,true);
            },
            closeDialog: function () {
                this.$refs.dialogPanel.close();
            }
        },
        components: {
            appLayout, appMenu, comDialog
        }
    }
</script>
<style>
</style>
