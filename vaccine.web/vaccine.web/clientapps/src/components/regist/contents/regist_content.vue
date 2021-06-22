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
                    <v-tab-item key="0" value="regist" class="regist-container">
                        <div class="action-sub-title">請選擇疫苗類型：</div>
                        <div class="action-content d-flex flex-row justify-space-around">
                            <div class="action d-flex flex-column justify-center align-center" @click.stop="toRegist(group)" v-for="(group,index) in getVaccineGroups" :key="`group_${index}`">
                                <div>
                                    <img src="/regist/regist_logo.png">
                                </div>
                                <div>{{group.groupName}}</div>
                            </div>
                        </div>
                    </v-tab-item>
                    <v-tab-item key="1" value="applied" class="applied-container">
                        <applied-list v-if="isTpPass"></applied-list>
                    </v-tab-item>
                </v-tabs-items>
                <login-switch ref="switch" :login-done="toLogin"></login-switch>
            </div>
        </template>
    </app-layout>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import appLayout from 'components/regist/regist_layout'
    import appliedList from 'components/regist/forms/applied_list'
    import loginSwitch from 'components/regist/forms/login_switch'
    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
            },
            tab: null,
            loginInfo: {
                identify: '' ,
                birth: ''
            }
        }),
        computed: {
            ...mapGetters('regist', ['getVaccineGroups','getUserInfo']),
            isTpPass: function () {
                if (!this.getUserInfo) return false;
                if (this.getUserInfo.type != 'taipei-pass') return false; 
                return true;
            },
        },
        props: {

        },
        created: function () {
            this.loacVaccineGroups();
        },
        watch: {
            tab: function (newValue) {
                console.log(newValue)
                if (newValue != 'applied') return; 
                if (this.isTpPass) return;
                this.$refs.switch.create();            }
        },
        methods: {
            ...mapActions('regist', ['loacVaccineGroups','setUserInfo']),
            toRegist: function (group) {
                console.log('regist type', group.groupId);
                this.$router.push({ name: 'unapply', query: { groupId: group.groupId } });
            },
            toLogin: function () {
                this.setUserInfo({ uid:'A123456789', birth: '2021/6/9', type: 'taipei-pass' });
                this.$refs.switch.close();
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
    .regist-content .regist-container {
        padding-left: 24px !important;
        padding-right: 24px !important;
    }
    .regist-content .action img {
        width: 72px;
        height: 60px;
    }
    .regist-content .action {
        font-size: 20px;
        color: white;
        background-color: #736DB9;
        width: 150px !important;
        height: 150px;
        border-radius: 10px;
    }
    .regist-content .action-content {
        padding-top: 20px;
    }
    .regist-content .action-sub-title {
        padding-top: 40px !important;
    }
    .regist-content .action-container {

    }
    .regist-content .action-sub-title {
        font-size: 20px !important;
    }

</style>
