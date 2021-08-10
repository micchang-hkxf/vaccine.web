<template>
    <div class="unapply-list">
        <div class="action-bar">
            <div class="action-bar-filter">
                <!--<v-select placeholder="全部新冠肺炎疫苗廠牌" v-model="filterBrandId" :items="getVaccineBrands" item-text="brandName" item-value="brandId" hide-details height="48px" v-if="groupId=='covid'" @change="search">
                </v-select>-->
                <v-text-field placeholder="請輸入行政區、村里或場次標題" v-model="filterKeyword" hide-details dense height="48px" @change="search"  @input="search">
                    <template v-slot:append>
                        <div class="d-flex align-center text-controll">
                            <img src="/regist/common_search-24px.svg" />
                        </div>
                    </template>
                </v-text-field>
            </div>
            <div class="action-bar-bottons d-flex justify-space-between">
                <v-btn class="clear-action" @click="clear">清除條件</v-btn>
                <v-btn class="search-action" @click="search">查詢</v-btn>
            </div>
        </div>
        <div class="action-container">
            <v-card class="action d-flex flex-row" elevation="0" v-for="(session,index) in sessions" :key="`session_${index}`">
                <div class="action-info d-flex flex-column justify-center">
                    <div class="action-info-header d-flex flex-column">
                        <div class="action-info-subject">
                            {{session.sessionName}}
                        </div>
                        <div class="action-info-sec-subject">
                            {{session.zoneName}}-{{session.villageName}}│{{session.groupName}}
                        </div>
                    </div>
                    <div class="action-info-detail d-flex flex-column justify-center">
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">疫苗廠牌：</div>
                            <div class="action-info-data text-right">{{session.brandName}}</div>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">接種日期：</div>
                            <div class="action-info-data text-right">{{$moment(session.sessionStart).format('YYYY/MM/DD')}},{{$moment(session.sessionStart).format('HH:mm')}}-{{$moment(session.sessionEnd).format('HH:mm')}}</div>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">事先報名：</div>
                            <div class="action-info-data text-right">
                                {{$moment(session.registStart).format('YYYY/MM/DD,HH:mm')}}<br /> - {{$moment(session.registEnd).format('YYYY/MM/DD,HH:mm')}}
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-space-between">
                            <div class="action-info-title text-left">開放名額：</div>
                            <div class="action-info-data text-right" v-if="session.totalCount === session.maxLimit">
                                <span class="full">名額已滿</span>
                            </div>
                            <div class="action-info-data text-right" v-else>
                                {{session.totalCount}} / <span class="disabled">{{session.maxLimit}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="action-button d-flex justify-center align-center">
                    <v-btn color="#736DB9" height="100%" width="100%" @click="toSession(session)" v-if="session.signUp">
                        報名
                    </v-btn>
                    <v-btn color="#626781" height="100%" width="100%" @click="toSession(session)" v-else>
                        查看
                    </v-btn>
                </div>
            </v-card>
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
    import { mapActions , mapGetters } from 'vuex'

    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
            }, 
            sessions: [],
            filterBrandId: '', 
            filterKeyword: '',
        }),
        computed: {
            ...mapGetters('regist', ['getVaccineBrands']),
        },
        props: ['groupId'],
        created: function () {
            this.loacVaccineBrands();
            this.search();
        },
        methods: {
            ...mapActions('regist', ['loacVaccineSessions', 'loacVaccineBrands','setActivityApply']),
            search: function () {
                this.loacVaccineSessions({
                    groupId: this.groupId,
                    brandId: this.filterBrandId, 
                    keyword: this.filterKeyword,
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
                this.search();
            }
        },
        components: {
        }
    }

</script>
<style scoped>

    .unapply-list/deep/ .v-btn:not(.v-btn--disabled) {
        color: white !important;
    }

    .unapply-list/deep/ .clear-action {
        background-color: #626781!important;
        width:40%!important
    }
    .unapply-list/deep/ .search-action {
        background-color: #736DB9 !important;
        width:40%!important
    }
    

    .unapply-list/deep/ .action-bar-bottons {
        padding-top: 12px !important;
    }
    .unapply-list/deep/ .v-input {
        padding-top: 0px !important;
        margin-top: 0px !important;
    }

    .unapply-list/deep/ .text-controll{
        height:48px!important;
    }
    .v-application .primary--text {
        color: #736DB9 !important;
        caret-color: #736DB9 !important;
    } 

    .unapply-list/deep/ {
        background-color: #F4F4F4 !important;
    }

    .unapply-list/deep/ .action-info-data {
        font-size: 12px;
        color: #434969;
    }

    .unapply-list/deep/ .action-info-title {
        font-size: 12px;
        color: #434969;
    }

        .unapply-list/deep/ .action-info-subject {
            font-size: 16px;
            font-weight: bold;
            color: #434969;
        }

        .unapply-list/deep/ .action-info-sec-subject {
            font-size: 12px;
            color: rgba(98,103,129,0.5) !important;
            padding-bottom: 8px !important;
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
        height: 168px;
        padding: 16px;
        border-radius:8px!important;
    }

    .unapply-list/deep/ .action-button {
        width: 64px;
        height: 100%;
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
            padding-right: 16px !important;
            padding-left: 16px !important;
            padding-bottom: 16px !important;
            background-color: #FFFFFF;
        }

        .unapply-list/deep/ .action-bar .v-text-field .transparent {
            border-color: rgba(54,66,80,0.2) !important;
        }

    .unapply-list/deep/ .action-bar .v-text-field__details {
        display: none !important;
    }

    .unapply-list/deep/ .action-container {
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 16px;
        padding-bottom: 16px;
        margin-bottom: 78px;
    }

    .unapply-list/deep/ .action-info-detail {
        padding-top: 16px!important;
    }    

    .unapply-list/deep/ .v-text-field__details {
        display: none;
    }

    .unapply-list/deep/ .app-content {
        background-color: #F4F4F4;
        height: 100% !important;
    }

    .unapply-list/deep/ .action:not(:first-child) {
        margin-top: 16px;
    }

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
</style>
