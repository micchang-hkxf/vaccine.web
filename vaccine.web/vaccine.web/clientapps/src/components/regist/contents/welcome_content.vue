<template>
    <div class="welcome-panel">
        <div class="welcome-image-container">
            <img src="/regist/login_logo.svg" style="background-color:#736DB9;" />
        </div>
        <div class="welcome-button-container">
            <div class="content-one">配合北市府數位里辦服務，即日起各類疫苗接種活動已陸續開放可在網路上自行報名，只要憑「台北通」登入或者手動輸入身份資料即可線上確認接種資格並完成報名登記作業，請點選「開始報名」跟著指引進行操作</div>
            <div class="content-two">適用疫苗：肺結核鏈球菌、流感、新冠肺炎</div>
        </div>
        <div class="welcome-actions-container">
            <v-btn color="#171D3CCC" height="48px" :to="{ name:'regist' }">我要報名</v-btn>
            <v-btn color="#171D3CCC" height="48px" :to="{ name:'regist' , params:{ mode:'applied' } }">查詢紀錄</v-btn>
        </div>
    </div>
</template>
<style scoped>

    .content-one,.content-two {
        width:100%;
    }

    .content-two {
        margin-top:24px;
    }

    .welcome-panel {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: #736DB9;
    }

    .welcome-image-container {
        margin-top:68px;        
        width:100vw;
        display:flex;
        justify-content:center;
    }

    .welcome-button-container {
        margin-top: 40px;
        justify-content: center;
        margin-left: 32px;
        margin-right: 32px;
        width: calc(100vw - 64px);
        color: #FFFFFF;
        opacity: 0.6;
        font-size: 16px/24px;
    }

    .welcome-actions-container {
        width: 100%;
        position: absolute;
        top: calc(100vh - 64px);
        margin-top: 8px;
        display: flex!important;
        justify-content: space-around!important;
    }

    .welcome-actions-container .v-btn {
        width:40%;
        color:#FFFFFF;
    }
</style>

<script>
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

        },
        methods: {

        },
        components: {
        }
    }
</script>

