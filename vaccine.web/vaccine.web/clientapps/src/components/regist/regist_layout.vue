<template>
    <app-layout :app-bar="appBar">
        <template v-slot:extension v-if="$slots['regist-extension']">
            <slot name="regist-extension"></slot>
        </template>
        <template v-slot:app-bar>
            <div class="regist-header d-flex flex-column">
                <div class="logo-title d-flex flex-row justify-center">
                    <div class="regist-icon">
                        <img src="/regist/regist_logo.png">
                    </div>
                    <div>
                        <div>里辦疫苗接種便民服務 </div>
                        <div>-網路報名系統-</div>
                    </div>
                </div>
                <div class="action-title d-flex flex-row justify-center">
                    <slot name="regist-title"></slot>
                </div>
            </div>
        </template>
        <template v-slot:app-content>
            <slot name="regist-content"></slot>
        </template>
    </app-layout>
</template>

<script>
    import appLayout from 'components/app_layout'
    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px',
                fixed:true
            }
        }),
        computed: {
        },
        props: {

        },
        created: function () {

        },
        methods: {

        },
        components: {
            appLayout
        }
    }
</script>
<style>
    .regist-icon {
        padding-right:8px!important;
    }
    .action-title {
        padding-top: 5px !important;
        max-width: 200%;
        font-size: 16px !important;
        font-weight: bold !important;
    }
    .logo-title {
        max-width: 200%;
    }
    .app-bar {
        width: calc(100vw - 32px) !important;
    }
    .regist-header {
        width: calc(100vw - 32px) !important;
        font-size:20px!important;
    }
    .v-tab.v-tab--active::before {
        color: black;
    }
    .v-tab {
        color: gray;
        font-size: 16px !important;
        border-bottom-style: solid;
        border-bottom-color: lightgray;
        border-bottom-width: 1px;
    }
    .v-toolbar__content {
        background-color: #736DB9;
        color: #ffffff;
    }
    .app {
    }
</style>
