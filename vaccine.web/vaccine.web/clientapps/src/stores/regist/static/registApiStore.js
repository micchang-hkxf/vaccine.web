﻿import userStore from "stores/userStore"
import siteConfig from "project/site.config"
import axios from 'axios'
import Vue from 'vue';

export default {
    namespaced: true,
    actions: {
        loadAppliedList: function ({ state }, params) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/applylog?uid=${params.identify}&bd=${Vue.moment(new Date(params.birthday)).format('YYYY/MM/DD')}&keyword=${params.keyword}`;
                axios.get(apiUrl).then(res => {
                    resolve(res.data);
                }).catch((ex) => {
                    reject(ex);
                });
            });
        },
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
        setUserInfo: function ({ commit, getters }, userInfo) {
            return new Promise((reslove) => {
                commit('saveUserInfo', userInfo);
                reslove(getters.getUserInfo);
            });
        },
        checkUserInfo: function ({ dispatch }, userInfo) {
            return new Promise((reslove) => {
                var results = {
                    uName: '張閔傑', //使用者名稱
                    birthday: userInfo.birthday, //使用者生日
                    identify: userInfo.identify, //使用者身分證
                    sessionId: userInfo.sessionId, //生日登入 sessionId
                    captcha: userInfo.captcha, //生日登入 captcha
                    token: null, //台北通 token
                    type: 'identify'
                };
                dispatch('setUserInfo', results).then((user) => {
                    reslove(user);
                });
            });
        },
        loadUserInfo: function ({ state,commit }, token) {
            var tokenInfo = {
                token: token, //台北通 token
                type: 'taipei-pass'
            }
            return new Promise((resolve/*, reject*/) => {
                var apiUrl = `${state.apiRoot}api/my`;
                var apiHeader = {
                    headers: {
                        'x-token' : token 
                    }
                }
                axios.get(apiUrl, apiHeader).then(res => {
                    var userInfo = {
                        uName: res.data.uName, //使用者名稱
                        birthday: res.data.bd, //使用者生日
                        identify: res.data.uid, //使用者身分證
                        token: token, //台北通 token
                        type: 'taipei-pass',
                        sessionId: null, //生日登入 sessionId
                        captcha: null, //生日登入 captcha
                    };
                    commit('saveUserInfo', { ...userInfo, ...tokenInfo });
                    resolve(userInfo);
                }).catch(() => {
                    var userInfo = {
                        uName: '', //使用者名稱
                        birthday: '', //使用者生日
                        identify: '', //使用者身分證
                        token: token, //台北通 token
                        sessionId: null, //生日登入 sessionId
                        captcha: null, //生日登入 captcha
                        type: 'taipei-pass'
                    };
                    commit('saveUserInfo', { ...userInfo, ...tokenInfo });
                    resolve(userInfo);
                });
            });

        },
        setActivityApply: function ({ commit }, activityApply) {
            commit('user/setActivityApply', activityApply);
        },
        checkApply: function ({ state }, params) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity/Apply/Web/${params.activityId}`;
                var results = { datas: [], state: '' };

                axios.post(apiUrl, {
                    uId: params.uId,
                    bd: params.bd,
                    mbNo: params.mbNo,
                    uName: params.uName,
                    checkJobId: params.checkJobId
                }).then(res => {
                    results.datas[0] = res.data;
                    resolve(results);
                }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        getBeforeApply: function ({ state }, params) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity/Apply/Web/${params.activityId}/Check`;
                var results = { datas: [], state: '' };

                var sourceType = 0;
                if (params.type === 'taipei-pass') {
                    sourceType = 1;
                } else if (params.type === 'identify') {
                    sourceType = 2;
                }

                axios.post(apiUrl, {
                    sessionId: params.sessionId.toString(),
                    captcha: params.captcha,
                    uId: params.uId,
                    bd: params.bd,
                    sourceType: sourceType,
                    token: params.token
                }).then(res => {
                    results.datas[0] = res.data;
                    resolve(results);
                }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });
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
        getUserInfo: (state) => {
            if (!state.userInfo && sessionStorage.getItem("userInfo") != null)
                state.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            return state.userInfo;
        },
        getApiRoot: function () { return siteConfig.apiRoot; }
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
            state.userInfo = userInfo;
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        },
    },
    modules: {
        user: userStore
    }
}

