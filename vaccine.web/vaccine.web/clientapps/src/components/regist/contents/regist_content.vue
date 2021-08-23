<template>
    <app-layout :app-bar="appBar" class="regist-content">
        <template v-slot:regist-title>
            我要報名
        </template>
        <template v-slot:regist-content>
            <v-tabs color="black" slider-color="#736DB9" grow v-model="tab">
                <v-tab key="0" href="#regist">我要報名</v-tab>
                <v-tab key="1" href="#applied">查詢紀錄</v-tab>
            </v-tabs>
            <div class="action-container">
                <v-tabs-items v-model="tab">
                    <v-tab-item key="0" value="regist" class="regist-container" eager>
                        <div class="action-sub-title">請選擇疫苗類型：</div>
                        <div class="action-content d-flex flex-row justify-space-around">
                            <div class="action d-flex flex-column justify-center align-center" @click.stop="toRegist(group)" v-for="(group,index) in getVaccineGroups" :key="`group_${index}`">
                                <div>
                                    <img src="/regist/regist_logo.svg">
                                </div>
                                <div>{{group.groupName}}</div>
                            </div>
                        </div>
                    </v-tab-item>
                    <v-tab-item key="1" value="applied" eager class="applied-container">
                        <applied-list ref="applieds" v-show="isLogin"></applied-list>
                    </v-tab-item>
                </v-tabs-items>
                <login-switch ref="switch" :login-done="toLogin" :login-cancel="loginCancel"></login-switch>
            </div>
        </template>
    </app-layout>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import appLayout from 'components/regist/regist_layout'
    import appliedList from 'components/regist/forms/applied_list'
    import loginSwitch from 'components/regist/forms/login_switcher'
    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
            },
            tab: null,
            loginInfo: {
                identify: '',
                birth: ''
            }
        }),
        computed: {
            ...mapGetters('regist', ['getVaccineGroups', 'getUserInfo']),
            isLogin: function () {
                if (!this.getUserInfo) return false;
                return true;
            },
            isRecords: function () {
                return this.tab == 'applied';
            },
        },
        props: [],
        created: function () {
            var comp = this;
            if (comp.$route.params.mode)
                this.$nextTick(() => {
                        comp.$set(comp, 'tab', comp.$route.params.mode);
                })

            if (comp.$route.query.mode)
                this.$nextTick(() => {
                    comp.$set(comp, 'tab', comp.$route.query.mode);
                })
            this.loacVaccineGroups();
        },
        watch: {
            tab: function (newValue) {
                if (newValue != 'applied') return;
                if (!this.getUserInfo) {
                    this.$refs.switch.create();
                    return;
                }
                this.$refs.applieds.reload();
            }
        },
        methods: {
            ...mapActions('regist', ['loacVaccineGroups', 'setUserInfo']),
            toRegist: function (group) {
                console.log('regist type', group.groupId);
                this.$router.push({ name: 'unapply', query: { groupId: group.groupId } });
            },
            toLogin: function () {
                this.$refs.switch.close();
                this.$refs.applieds.reload();
                //this.$nextTick(() => {
                //    //window.location.href = '/regist/#/regist?mode=applied';
                //    this.$router.go()
                //    //this.$router.push({ name: 'regist', query: { mode: 'applied' } });
                //});
                //window.location.reload();
                
            },
            loginCancel: function () {
                this.tab = 'regist';
            },
            loginUser: function () {

            }
        },
        components: {
            appLayout, appliedList, loginSwitch
        }
    }
</script>
<style scoped>
    .regist-content .action img {
        width: 80px;
        height: 80px;
    }

    .regist-content .action {
        background-color: #736DB9;
        width: 150px !important;
        height: 150px;
        border-radius: 10px;
        text-align: center;
        font: normal normal normal 20px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
    }

    .regist-content .action-sub-title {
        position: relative;
        top: 22px;
        text-align: left;
        font: normal normal normal 20px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        opacity: 1;
        margin: 0 28px;
    }

    .regist-content .action-content {
        position: relative;
        top: 44px;
    }

    .regist-content .action-container {
    }
</style>
