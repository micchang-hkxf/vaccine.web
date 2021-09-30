<template>
    <app-layout enabled-drawer="true">
        <template v-slot:regist-content>
            <div class="welcome-panel">
                <div class="welcome-image-container">
                    <img src="/regist/login_logo.svg" style="background-color:#736DB9;" />
                </div>
                <div class="welcome-button-container">
                    <div class="content-one">【測試】預約尚未開始</div>
                    <div class="content-one">配合北市府數位里辦服務，即日起各類疫苗接種活動已陸續開放可在網路上自行報名，只要憑「台北通」登入或者手動輸入身份資料即可線上確認接種資格並完成報名登記作業，請點選「我要報名」跟著指引進行操作</div>
                    <div class="content-two">適用疫苗：肺炎鏈球菌疫苗、流感</div>
                </div>
                <div class="welcome-actions-container">
                    <v-btn color="#171D3CCC" height="48px" :to="{ name:'regist' }">我要報名</v-btn>
                    <v-btn color="#171D3CCC" height="48px" :to="{ name:'regist' , params:{ mode:'applied' } }">查詢紀錄</v-btn>
                </div>
            </div>
        </template>
        <template v-slot:regist-footer>
            <app-footer></app-footer>
        </template>
    </app-layout>
</template>

<style>
    body {
        background: #736DB9 0% 0% no-repeat padding-box;
        opacity: 1;
    }

    .content-two {
        position: relative;
        top: 23px;
    }

    .welcome-panel {
        height: 100vh;
        background-color: #736DB9;
    }

    .welcome-image-container {
        position: relative;
        top: 68px;
        width: 180px;
        margin: 0 auto;
        min-height: 201px;
        display: flex;
        justify-content: center;
    }

    .welcome-button-container {
        position: relative;
        top: 105px;
        justify-content: center;
        margin: 0 32px;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        text-align: center;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 0.6;
    }

    .content-one, .content-two {
        max-width: 520px;
        margin: 0 auto;
    }

    .welcome-actions-container {
        position: relative;
        top: 190px;
        min-height: 50px;
        display: flex !important;
        justify-content: space-around !important;
        max-width: 580px;
        margin: 0 auto;
    }

        .welcome-actions-container .v-btn {
            width: 40%;
            color: #FFFFFF;
        }

        .welcome-actions-container .v-btn__content {
            text-align: center;
            font: normal normal normal 16px/24px Noto Sans T Chinese;
            letter-spacing: 0px;
            color: #FFFFFF;
            opacity: 1;
        }

    .v-btn--contained {
        box-shadow: none !important;
    }
</style>

<script>
    import appLayout from 'components/regist/regist_layout'
    import appFooter from 'components/regist/regist_footer'
    import clientHelper from 'stores/clientHelper'
    import { mapActions } from 'vuex'

    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
            }
        }),
        computed: {
            groupId: function () {
                if (this.$route.query)
                    return this.$route.query.groupId;
                return null;
            }
        },
        created: function () {
            var tpassToken = clientHelper.getCookie('access_token');
            if (tpassToken) {
                this.loadEmbeddedUserInfo(tpassToken);
            }
        },
        methods: {
            ...mapActions('regist', ['loadEmbeddedUserInfo']),
            
        },
        components: {
            appLayout, appFooter
        }
    }
</script>

