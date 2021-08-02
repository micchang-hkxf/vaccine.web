import userStore from "stores/userStore"
import siteConfig from "project/site.config"
import axios from 'axios'
import { Promise } from "core-js";

export default {
    namespaced: true,
    actions: {
        loacVaccineGroups: function ({  commit }) {
            return new Promise((resolve) => {
                var results = {
                    datas: [
                        { groupName: '肺鏈、流感', groupId: 'influenza' },
                        { groupName: '新冠肺炎', groupId: 'covid' },
                    ], state: ''
                };
                commit('saveVaccineGroups', results.datas);
                resolve(results);
            });
        },
        loacVaccineSessions: function ({ state }, params) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity`;
                var results = { datas: [], state: '', totalCount: 0 };

                var medicalOrgIdFilter = 'all';
                var distIdFilter = 'all';
                var villageIdFilter ='all';
                var vaccineGroupId = null;
                if (params.groupId === 'influenza') {
                    vaccineGroupId = 0;
                } else if (params.groupId === 'covid') {
                    vaccineGroupId = 1;
                }
                var keyword = params.keyword === '' ? null : params.keyword;
                //  TODO: params.brandId 搜尋廠牌目前不支援
                
                axios.get(apiUrl, {
                    params: {
                        medicalOrgIdFilter: medicalOrgIdFilter, // 醫療院所過濾
                        page: 1,                                // 頁數
                        rows: 50,                               // 每頁筆數
                        distIdFilter: distIdFilter,             // 行政區過濾
                        villageIdFilter: villageIdFilter,       // 村里過濾
                        keyword: keyword,                       // 關鍵字
                        vaccineGroupId: vaccineGroupId,         // 疫苗種類
                        token: ''
                    }
                }).then(res => {
                    results.totalCount = res.data.totalRows;

                    var datas = [];
                    res.data.data.forEach((data) => {

                        datas.push({
                            sessionName: data.activityTitle,
                            sessionId: data.activityId,
                            zoneName: data.region.distName,
                            zoneId: data.region.distId,
                            villageName: data.region.villageName,
                            villageId: data.region.villageId,
                            sessionStart: data.implementStartTime,
                            sessionEnd: data.implementEndTime,
                            registStart: data.startApplyDate,
                            registEnd: data.endApplyDate,
                            maxLimit: data.amount,
                            totalCount: data.amount - data.leftAmount,
                            brandId: (data.vaccines[0] != undefined) ? data.vaccines[0].itemId : "",
                            brandName: (data.vaccines[0] != undefined) ? data.vaccines[0].itemName : "",
                            implementAddr: data.implementAddr,
                            groupName: data.vaccineGroupName,
                            signUp: new Date().getTime() < new Date(data.endApplyDate).getTime(),
                        });
                    });

                    results.datas = datas;
                    resolve(results);
                }).catch(ex => {
                    results.datas = ex;
                    reject(results);
                });
            });

            /*
            return new Promise((resolve) => {
                console.log(param);
                console.log(state);
                var results = {
                    datas: [
                        { sessionName: '五月份新冠肺炎疫苗接種', sessionId: '001', zoneName: '內湖區', zoneId: 'A011', villageName: '紫雲里', villageId: '', sessionStart: '2021/5/25 09:00:00', sessionEnd: '2021/5/25 11:00:00', registStart: '2021/5/10 09:00:00', registEnd: '2021/5/22 09:00:00', maxLimit: 300, totalCount: 245, brandId: 'mdn', brandName: '莫德納', implementAddr: '台北市內湖區西康里西康路30號', groupName: '新冠肺炎', signUp: true },
                        { sessionName: '四月份新冠肺炎疫苗接種', sessionId: '002', zoneName: '內湖區', zoneId: 'A011', villageName: '紫雲里', villageId: '', sessionStart: '2021/4/25 09:00:00', sessionEnd: '2021/4/25 11:00:00', registStart: '2021/4/10 09:00:00', registEnd: '2021/4/22 09:00:00', maxLimit: 300, totalCount: 300, brandId: 'az', brandName: 'AstraZeneca(AZ)', implementAddr: '台北市內湖區西康里西康路30號', groupName: '新冠肺炎', signUp: false },                        
                    ], state: ''
                };
                resolve(results);
            });
            */
        },
        loacVaccineBrands: function ({ commit }, group) {
            return new Promise((resolve) => {
                console.log(group);
                var results = {
                    datas: [
                        { brandId: 'mdn', brandName: '莫德納' },
                        { brandId: 'az', brandName: 'AstraZeneca(AZ)' },

                    ], state: ''
                };
                commit('saveVaccineBrands', results.datas);
                resolve(results);
            });
        },
        setUserInfo: function ({ commit }, userInfo) {
            return new Promise((resolve) => {
                var results = {
                    datas: userInfo , state: ''
                };
                commit('saveUserInfo', { ...userInfo, uName:'使用者' });
                resolve(results);
            });
        },
        setActivityApply: function ({ commit }, activityApply) {
            commit('user/setActivityApply', activityApply);
        },
        checkApply: function ({state}, datas) {
            return new Promise((resolve) => {
                console.log(state);
                var results = {
                    datas: datas, state: ''
                };
                resolve(results);
            });
        },
        getBeforeApply: function ({ state }) {
            return new Promise((resolve) => {
                console.log(state);
                var results = { datas: [], state: '' };
                /*
                // 是否已報名其他場次
                var results = {
                    datas: [
                        { activityName: '四月份新冠肺炎疫苗接種' },
                    ], state: ''
                };
                */
                resolve(results);
            });
        }
    },
    state: {
        ...siteConfig,
        vaccineGroups: [],
        vaccineBrands: [],
        userInfo: null
    },
    getters: {
        getVaccineGroups: (state) => state.vaccineGroups,
        getVaccineBrands: (state) => state.vaccineBrands,
        getUserInfo: (state) => state.userInfo, 
    },
    mutations: {
        saveVaccineGroups: (state, groups) => {
            state.vaccineGroups.splice(0);
            groups.forEach(f => state.vaccineGroups.push(f));
        },
        saveVaccineBrands: (state, brands) => {
            state.vaccineBrands.splice(0);
            brands.forEach(f => state.vaccineBrands.push(f));
        },
        saveUserInfo: (state, userInfo) => {
            if (!!state.userInfo)
                state.userInfo = Object.assign(state.userInfo, userInfo);
            else 
                state.userInfo = Object.assign({}, userInfo);
        },
    },
    modules: {
        user: userStore
    }
}

