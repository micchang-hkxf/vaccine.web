<template>
    <app-layout>
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <!--<v-btn @click="switch('one')">one</v-btn>
    <sys-dialog ref-key="one"></sys-dialog>-->
                <v-btn color="primary" @click="show('two')">two</v-btn>
                <com-dialog ref-key="two" width="60%">
                    <template v-slot:toolbar>
                        公文管理環境檢測
                    </template>
                    <template v-slot:content>

                    </template>
                    <template v-slot:action>
                        <v-btn>取消</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn>儲存草稿</v-btn>
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
            }
        },
        components: {
            appLayout, appMenu, comDialog
        }
    }
</script>
<style>
</style>
