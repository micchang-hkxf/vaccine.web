<template>
    <app-layout enabled-drawer="true">
        <template v-slot:regist-content>
            <div class="welcome-panel">
                <div class="welcome-image-container">
                    <img src="/regist/login_logo.svg" style="background-color:#736DB9;" />
                </div>
                <div class="welcome-button-container">
                    <!--{{getUserInfo}}-->
                    <!--<div class="content-one">【測試】預約尚未開始</div>-->
                    <div class="content-one">
                        【小叮嚀】<br />

                        1.每人僅能擇一場次進行報名。 <br />
                        2.各項疫苗接種資格，依衛生局公告為主，報名後將進行資格檢核，如檢核後對接種資格有疑義，請向各區健康服務中心或衛生局洽詢。<br />
                        3.接種當日請戴口罩並攜帶「健保卡」、「身分證」，55-64歲原住民欲接種肺炎鏈球菌疫苗請攜帶原住民身分證明，進行身分核對。 <br />
                        4.接種活動現場同步開放現場報名接種疫苗。 <br />
                        5.接種流感疫苗及肺炎鏈球菌疫苗應與COVID-19疫苗間隔至少7天。 <br />

                    </div>
                    <div class="content-two">適用疫苗：肺炎鏈球菌疫苗、季節性流感疫苗</div>
                    <!--<div class="welcome-actions-container">
                        <v-btn color="#171D3CCC" height="48px" :to="{ name:'regist' }">我要報名</v-btn>
                        <v-btn color="#171D3CCC" height="48px" :to="{ name:'regist' , params:{ mode:'applied' } }">查詢紀錄</v-btn>
                    </div>-->
                    
                </div>
                <div class="welcome-actions-container">
                <v-btn color="#171D3CCC" class="welcome-action-btn" :to="{ name:'regist' }">我要報名</v-btn>
                <v-btn color="#171D3CCC"  class="welcome-action-btn"  :to="{ name:'regist' , params:{ mode:'applied' } }">查詢紀錄</v-btn>

            </div>

            </div>
        </template>
        <template v-slot:regist-footer >
         <app-footer></app-footer>
    </template>
    </app-layout>
</template>

<style>
    body {
        background: #736DB9 0% 0% no-repeat padding-box;
        opacity: 1;
    }

    .content-one {
        max-width: 520px;
        margin: 0 auto;
        text-align: left;
    }

    .content-two {
        position: relative;
        top: 23px;
        text-align: center;
    }

    .welcome-panel {
        height: calc(100vh - 110px);
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


    .welcome-action-btn {
        height:48px !important;
    }

    @media (min-width: 100px) and (max-width: 300px) {
        .welcome-panel img {
            width: 160px;
            height: 160px;
        }


        .welcome-panel {
            height: auto;
            background-color: #736DB9;
        }

        .welcome-image-container {
            top: 10px;
        }

        .welcome-button-container {
            top: 10px;
            font: normal normal normal 16px/18px Noto Sans T Chinese;
        }

        .welcome-actions-container {
            top: 50px;
        }
    }



    @media (min-width: 305px) and (max-width: 400px) {
        .welcome-panel img {
            width: 160px;
            height: 160px;
        }
        .welcome-panel {
            height: auto;
            background-color: #736DB9;
        }

        .welcome-image-container {
            top: 10px;
        }

        .welcome-button-container {
            top: -18px;
            font: normal normal normal 16px/18px Noto Sans T Chinese;
        }

        .welcome-actions-container {
            /*top: 50px;*/
            top:15px;
        }

        .welcome-action-btn {
            height: 40px !important;
        }
    }


    @media (min-width: 405px) and (max-width: 500px) {
        .welcome-panel img {
            width: 160px;
            height: 160px;
        }

        .welcome-panel {
            height: auto;
            background-color: #736DB9;
        }

        .welcome-image-container {         
            top: 10px;           
        }

        .welcome-button-container {
            top: -20px;
            font: normal normal normal 16px/22px Noto Sans T Chinese;
        }

        .welcome-actions-container {         
            top: 16px;           
        }

    }


    @media (min-width: 501px) and (max-width: 800px) {
        .welcome-panel img {
            width: 170px;
            height: 170px;
        }

        .welcome-image-container {
            top: 10px;
        }

        .welcome-button-container {
            top: -20px;
            font: normal normal normal 16px/22px Noto Sans T Chinese;
        }

        .welcome-actions-container {
            top: 20px;
        }
    }

</style>

<script>
    import appLayout from 'components/regist/regist_layout'
    import appFooter from 'components/regist/regist_footer'
    import clientHelper from 'stores/clientHelper'
    import { mapActions, mapGetters} from 'vuex'

    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                //height: '160px'
            }
        }),
        computed: {          
            ...mapGetters('regist', ['getUserInfo']),     
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
            //this.loadFakeEmbeddedUserInfo(tpassToken);
            }
            //console.log('tpuser', this.getUserInfo)
        },
        methods: {
            ...mapActions('regist', ['loadEmbeddedUserInfo','loadFakeEmbeddedUserInfo']),
            
        },
        components: {
            appLayout, appFooter
        }
    }
</script>

