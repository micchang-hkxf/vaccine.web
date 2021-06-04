
<template>
    <app-layout enabled-drawer="true">
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <v-btn @click="show('confirm')">confirm</v-btn>
                <v-btn @click="show('confirm2')">confirm2</v-btn>
                <com-confirm left-color="#2EB6C7" left-outlined="on" right-color="green" right-outlined="" ref-key="confirm" :left-click="confirmLeftClick" :right-click="confirmRightClick">
                    <template v-slot:confirm-image>
                        <v-img src="/alert_success.svg"></v-img>
                    </template>
                    <template v-slot:confirm-title>
                        打卡成功
                    </template>
                    <template v-slot:confirm-text>
                        08:16:19
                    </template>
                    <template v-slot:confirm-sub-title>
                        1F大廳北側花圃上方
                    </template>
                    <template v-slot:confirm-left-btn-text>
                        取消
                    </template>
                    <template v-slot:confirm-right-btn-text>
                        確認
                    </template>

                </com-confirm>

                <com-confirm  right-color="yellow" right-outlined="" ref-key="confirm2" :right-click="confirmRightClick2">
                    <template v-slot:confirm-image>
                        <v-img src="/alert_success.svg"></v-img>
                    </template>
                    <template v-slot:confirm-title>
                        打卡成功
                    </template>
                    <template v-slot:confirm-text>
                        08:16:19
                    </template>
                    <template v-slot:confirm-sub-title>
                        1F大廳北側花圃上方
                    </template>
 
                    <template v-slot:confirm-right-btn-text>
                        <font color="black">確認</font>
                    </template>

                </com-confirm>


            </div>
        </template>
    </app-layout>
</template>

<style>

</style>


<script>
    import appMenu from 'components/main/menu'
    import appLayout from 'components/app_layout'
    import comConfirm from 'components/confirm'
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
            confirmRightClick: function () {
                this.$bus.$emit(`confirm_show`,false);
            },
            confirmLeftClick: function () {
                this.$bus.$emit(`confirm_show`, false);
            },
            confirmRightClick2: function () {
                this.$bus.$emit(`confirm2_show`, false);
            },
        },
        components: {
            appLayout, appMenu, comConfirm
        }
    }
</script>