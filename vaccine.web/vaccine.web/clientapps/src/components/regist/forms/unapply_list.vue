
<template>
    <div class="unapply-list">
        <div class="action-bar">
            <div class="action-bar-filter">
                <!--<v-select placeholder="全部新冠肺炎疫苗廠牌" v-model="filterBrandId" :items="getVaccineBrands" item-text="brandName" item-value="brandId" hide-details height="48px" v-if="groupId=='covid'" @change="search">
    </v-select>-->
                <v-text-field placeholder="查詢場次標題" v-model="filterKeyword" hide-details dense height="48px" @change="search" @input="search" autocomplete="off">
                    <template v-slot:append>
                        <div class="d-flex align-center text-controll">
                            <img src="/regist/search.svg" />
                        </div>
                    </template>
                </v-text-field>
                <div class="action-bar-select justify-space-between">
                    <v-select v-model="selectDistrict"
                              :items="getDistricts"
                              item-text="name"
                              item-value="id"
                              placeholder="查詢行政區"
                              :menu-props="{ bottom: true, offsetY: true }"
                              dense
                              height="48px"
                              class="search-filter fs"
                              return-object
                              @change="loadVillages">
                    </v-select>
                    <v-select v-model="selectVillage"
                              :items="getVillages"
                              item-text="name"
                              item-value="id"
                              placeholder="查詢村里"
                              :menu-props="{ bottom: true, offsetY: true }"
                              dense
                              height="48px"
                              class="search-filter fs"
                              return-object>
                    </v-select>
                </div>
            </div>
            <div class="action-bar-bottons d-flex justify-space-between">
                <v-btn class="clear-action" @click="clear">清除條件</v-btn>
                <v-btn class="search-action" @click="search">查詢</v-btn>
            </div>
        </div>
        <div class="action-container">
            <v-row v-if="sessions.length !== 0">
                <v-col v-for="(session,index) in sessions"
                       :key="`session_${index}`" cols="6">
                    <v-card class="action d-flex flex-row" elevation="0">
                        <div class="action-info d-flex flex-column justify-center" @click="toSession(session)">
                            <div class="action-info-header d-flex flex-column">
                                <div class="action-info-subject" :tip="session.sessionName">
                                    {{session.sessionName}}
                                </div>
                                <div class="action-info-sec-subject">
                                    {{session.zoneName}}-{{session.villageName}}│{{session.groupName}}
                                </div>
                            </div>
                            <div class="action-info-detail d-flex flex-column justify-center">
                                <!--<div  class="d-flex flex-row justify-space-between" v-if="groupId!='influenza'" >
                                    <div class="action-info-title text-left">疫苗廠牌：</div>
                                    <div class="action-info-data text-right">{{session.brandName}}</div>
                                </div>-->
                                <div class="d-flex flex-row justify-space-between">
                                    <div class="action-info-title text-left">接種日期：</div>
                                    <div class="action-info-data text-right">{{$moment(session.sessionStart).format('YYYY/MM/DD')}},{{$moment(session.sessionStart).format('HH:mm')}}-{{$moment(session.sessionEnd).format('HH:mm')}}</div>
                                </div>
                                <div class="d-flex flex-row justify-space-between">
                                    <div class="action-info-title text-left">事先報名：</div>
                                    <div class="action-info-data text-right">
                                        {{$moment(session.registStart).format('YYYY/MM/DD')}}<br /> - {{$moment(session.registEnd).format('YYYY/MM/DD')}}
                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-space-between">
                                    <div class="action-info-title text-left">開放名額：</div>
                                    <div class="action-info-data text-right" v-if="session.totalCount === session.maxLimit">
                                        <span class="full">名額已滿</span>
                                    </div>
                                    <div class="action-info-data text-right" v-else>
                                        <span style="font: normal normal normal 16px/24px Noto Sans T Chinese;"> {{session.totalCount}}</span>  / <span class="disabled">{{session.maxLimit}}</span>
                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-space-between" v-if="session.actAge !== null">
                                    <div class="action-info-title text-left">年齡限制：</div>
                                    <div class="action-info-data text-right">
                                        <span v-if="session.actAge==0"><span tyle="color:#626781">配合疫苗規定</span></span>
                                        <span v-if="session.actAge!=0">{{session.actAge}}<span tyle="color:#626781">歲以上</span></span>                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="action-button d-flex justify-center align-center">
                            <v-btn color="#736DB9" height="100%" width="100%" @click="toSession(session)" v-if="session.signUp && session.totalCount < session.maxLimit">
                                報名
                            </v-btn>
                            <v-btn color="#626781" height="100%" width="100%" @click="toSession(session)" v-else>
                                查看
                            </v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <div class="null-list" v-if="sessions.length === 0">
                <div class="null-content">
                    <img src="/regist/null_list.svg" />
                    <div>尚無相關場次</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        // router,
        data: () => ({
            //appBar: {
            //    elevation: 0,
            //    height: '160px'
            //},
            sessions: [],
            filterBrandId: '',
            filterKeyword: '',
            selectDistrict: '',
            selectVillage: '',
        }),
        computed: {
            ...mapGetters('regist', ['getVaccineBrands', 'getDistricts', 'getVillages']),
        },
        props: ['groupId'],
        created: function () {
            this.loacVaccineBrands();
            this.loadDists();
            this.search();
        },
        methods: {
            ...mapActions('regist', ['loacVaccineSessions', 'loacVaccineBrands', 'setActivityApply', 'loadDists', 'loadVillages']),
            search: function () {
                var keyword = '';

                if (typeof this.selectDistrict.name === 'string') {
                    keyword = this.selectDistrict.name;
                }

                if (typeof this.selectVillage.name === 'string') {
                    keyword = this.selectVillage.name;
                }

                if (this.filterKeyword !== '') {
                    keyword = this.filterKeyword;
                }

                this.loacVaccineSessions({
                    groupId: this.groupId,
                    brandId: this.filterBrandId,
                    keyword: keyword,
                }).then(r => {
                    this.sessions.splice(0);
                    r.datas.forEach(f => this.sessions.push(f));
                })
            },
            toSession: function (session) {
                this.setActivityApply(session).then(() => {
                    this.$router.push({ path: 'agree/' + session.sessionId, params: session });
                });
            },
            clear: function () {
                this.filterBrandId = '';
                this.filterKeyword = '';
                this.selectDistrict = '';
                this.selectVillage = '';
                this.loadVillages('');
                this.search();
            }
        },
        components: {
        }
    }

</script>
<style scoped>

    .col {
        padding: 0px !important;
        margin: 0px !important;
    }

    /*.col-6 {
        flex: 0 0 37% !important;
        max-width: 50%;
    }*/

    .row {
        /*display: flex;
        justify-content: space-between;*/
        width:50%;
        flex-wrap: wrap !important;
        flex: none !important;
        margin-right: 0px !important;
        margin-left: 0px !important;
        align-content: start;
    }


    .v-btn--contained {
        box-shadow: none !important;
    }

   

    .unapply-list/deep/ .v-btn:not(.v-btn--disabled) {
        color: white !important;
    }

    .unapply-list/deep/ .clear-action {
        background-color: #626781 !important;
        width: 20% !important
    }

    .unapply-list/deep/ .search-action {
        background-color: #736DB9 !important;
        width: 20% !important
    }


    .unapply-list/deep/ .action-bar-bottons {
        padding-top: 25px !important;
    }

    .unapply-list/deep/ .v-input {
        padding-top: 0px !important;
        margin-top: 0px !important;
    }

    .unapply-list/deep/ .text-controll {
        height: 48px !important;
    }

    .v-application .primary--text {
        color: #736DB9 !important;
        caret-color: #736DB9 !important;
    }

    .unapply-list/deep/ {
        /*background-color: #F4F4F4 !important;*/
        margin: 0 auto;
    }

    .unapply-list/deep/ .action-info-data {
        font-size: 16px;
        color: #434969;
    }

    .unapply-list/deep/ .action-info-title {
        font-size: 16px;
        color: #434969;
        white-space: nowrap;
    }

        .unapply-list/deep/ .action-info-subject {
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 20px;
            font-weight: bold;
            color: #434969;
            white-space: nowrap;
        }

        .unapply-list/deep/ .action-info-sec-subject {
            font-size: 16px;
            color: #434969 !important;
            padding-bottom: 8px !important;
            white-space: nowrap;
        }

    .unapply-list/deep/ .action-info-title {
        width: 30%;
        color: rgba(98,103,129,0.5) !important;
    }

    .unapply-list/deep/ .action-info-data {
        width: 70%;
    }

    .unapply-list/deep/ .action-info {
        padding-right: 16px;
    }

    .unapply-list/deep/ .action {
        height: 214px;
        /*height: 100%;*/
        padding: 16px;
        border-radius: 8px !important;
        width: 100%;
        margin: 6px 0;
    }

    .unapply-list/deep/ .action-button {
        width: 58px;
        height: 100%;
    }

    .v-btn:not(.v-btn--round).v-size--default {
        min-width: 58px !important;
    }

    .unapply-list/deep/ .action-button .v-btn {
        font-size: 16px;
        color: #ffffff;
        width: 64px;
        margin: 0px;
    }

    .unapply-list/deep/ .action-info {
        width: calc(100% - 64px);
        height: 100%;
    }

    .unapply-list/deep/ .action-bar {
        /*padding-right: 16px !important;
        padding-left: 16px !important;
        padding-bottom: 16px !important;*/
        padding: 16px !important;
        background-color: #FFFFFF;
        width: 50%;
        margin: 0 auto;
        /*height: 150px;*/
    }

    .unapply-list/deep/ .action-bar .v-text-field .transparent {
        border-color: rgba(54,66,80,0.2) !important;
    }

    .unapply-list/deep/ .action-bar .v-text-field__details {
        display: none !important;
    }

    .unapply-list/deep/ .action-bar .v-text-field > .v-input__control > .v-input__slot:before {
        border-color: #4349691A;
    }

    .unapply-list/deep/ .action-bar .action-bar-filter img {
        opacity: 0.4;
    }

        .unapply-list/deep/ .action-container {
            padding-left: 8px;
            padding-right: 8px;
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom: 78px;
            display: flex;
            justify-content: center;
            background-color: #f4f4f4;
            margin: 0 auto;
            max-height: 100%;
            /*height: 100vh;*/
        }
        /*
    .unapply-list/deep/ .action-info-detail {
        padding-top: 16px!important;
    }
    */
    .unapply-list/deep/ .v-text-field__details {
        display: none;
    }

    .unapply-list/deep/ .app-content {
        background-color: #F4F4F4;
        height: 100% !important;
    }

    /*.unapply-list/deep/ .action:not(:first-child) {
        margin-top: 16px;
    }*/

    .unapply-list/deep/ .action-info-detail .disabled {
        color: rgba(67,73,105,0.5) !important;
    }

    .unapply-list/deep/ .action-info-detail .full {
        color: #F4A95F;
    }

    .unapply-list/deep/ .null-list {
        text-align: center;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #43496980;
        min-height: calc(100vh - 256px);
    }

    .unapply-list/deep/ .null-content {
        position: relative;
        top: 112px;
    }

    /* Extra small devices (portrait phones, less than 576px) */
    @media (max-width: 575.98px) {
        .unapply-list/deep/ .action-container {
            padding-left: 8px;
            padding-right: 8px;
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom: 78px;
            display: block;
            justify-content: center;
            background-color: #f4f4f4;
            margin: 0 auto;
            max-height: 100%;
            width: 100%;
        }

        .unapply-list .action-bar {
            width: 100%;
        }

        .row {
            width: 100%;
        }

        .col-6 {
            flex: 0 0 100%;
            max-width: 100%;
        }
    }


    @media (min-width: 200px) and (max-width: 375px) {
        .unapply-list/deep/ .action-info-data {
            font-size: 10px;
        }

        .unapply-list/deep/ .action-info-title {
            font-size: 10px;
        }

        .unapply-list/deep/ .action-info-subject {
            font-size: 14px;
        }

        .unapply-list/deep/ .action-info-sec-subject {
            font-size: 10px;
        }

        .unapply-list/deep/ .action {
            height: 198px;
        }
    }

    @media (min-width: 375px) and (max-width: 382px) {
        .unapply-list/deep/ .action-info-data {
            font-size: 12px;
        }

        .unapply-list/deep/ .action-info-title {
            font-size: 12px;
        }

        .unapply-list/deep/ .action-info-subject {
            font-size: 16px;
        }

        .unapply-list/deep/ .action-info-sec-subject {
            font-size: 12px;
        }

        .unapply-list/deep/ .action {
            height: 198px;
        }
    }

    @media (min-width: 383px) and (max-width: 450px) {
        .unapply-list/deep/ .action-info-data {
            font-size: 14px;
        }

        .unapply-list/deep/ .action-info-title {
            font-size: 14px;
        }

        .unapply-list/deep/ .action-info-subject {
            font-size: 18px;
        }

        .unapply-list/deep/ .action-info-sec-subject {
            font-size: 14px;
        }

        .unapply-list/deep/ .action {
            height: 198px;
        }
    }




    /* Small devices (landscape phones, 576px and up) */
    @media (min-width: 576px) and (max-width: 767.98px) {
        .unapply-list/deep/ .action-container {
            padding-left: 8px;
            padding-right: 8px;
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom: 78px;
            display: block;
            justify-content: center;
            background-color: #f4f4f4;
            /*#f4f4f4;*/
            margin: 0 auto;
            max-height: 100%;
            width: 100%;
        }

        .unapply-list .action-bar {
            width: 100%;
        }

        .row {
            width: 100%;
        }

        .col-6 {
            flex: 0 0 100%;
            max-width: 100%;
        }
    }

    /** Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) and (max-width: 991.98px) {
        .unapply-list/deep/ .action-container {
            padding-left: 8px;
            padding-right: 8px;
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom: 78px;
            display: block;
            justify-content: center;
            background-color: #f4f4f4;
            margin: 0 auto;
            max-height: 100%;
            width: 100%;
        }

        .unapply-list .action-bar {
            width: 98%;
            max-width: 800px;
        }

        .row {
            width: 100%;
            max-width: 800px;
            margin: 0 auto !important;
        }

        .col-6 {
            flex: 0 0 100%;
            max-width: 50%;
        }

        .action-bar-filter .action-bar-select {
            display: flex;
        }

        .action-bar-filter .action-bar-select .v-select {
            max-width: 49%;
        }

        .unapply-list/deep/ .action {
            width: 97%;
            margin: 6px;
        }
    }


    /* Large devices (desktops, 992px and up) */
    @media (min-width: 992px) and (max-width: 1199.98px) {
        .unapply-list/deep/ .action-container {
            padding-left: 8px;
            padding-right: 8px;
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom: 78px;
            display: block;
            justify-content: center;
            background-color: #f4f4f4;
            margin: 0 auto;
            max-height: 100%;
            width: 100%;
        }

        .unapply-list .action-bar {
            width: 98%;
            max-width: 800px;
        }

        .row {
            width: 100%;
            max-width: 800px;
            margin: 0 auto !important;
        }

        .col-6 {
            flex: 0 0 100%;
            max-width: 50%;
        }

        .action-bar-filter .action-bar-select {
            display: flex;
        }

        .action-bar-filter .action-bar-select .v-select {
            max-width: 49%;
        }

        .unapply-list/deep/ .action {
            width: 97%;
            margin: 6px;
        }
    }

    /* Extra large devices (large desktops, 1200px and up) */
    @media (min-width: 1200px) {
        .unapply-list/deep/ .action-container {
            padding-left: 8px;
            padding-right: 8px;
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom: 78px;
            display: block;
            justify-content: center;
            background-color: #f4f4f4;
            margin: 0 auto;
            max-height: 100%;
            width: 100%;
        }

        .unapply-list .action-bar {
            width: 98%;
            max-width: 800px;
        }

        .row {
            width: 100%;
            max-width: 800px;
            margin: 0 auto !important;
        }

        .col-6 {
            flex: 0 0 100%;
            max-width: 50%;
        }


        .action-bar-filter .action-bar-select {
            display: flex;
        }

        .action-bar-filter .action-bar-select .v-select {
            max-width: 49%;
        }

        .unapply-list/deep/ .action {
            width: 97%;
            margin: 6px;
        }
    }
</style>
