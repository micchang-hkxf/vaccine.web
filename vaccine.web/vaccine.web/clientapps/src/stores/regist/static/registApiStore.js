﻿import userStore from "stores/userStore"
import siteConfig from "project/site.config"
import axios from 'axios'
import Vue from 'vue';

export default {
    namespaced: true,
    actions: {
        notLoginAdmin({ commit }, error) {
            if (error.response.status != 403) return;
            commit('removeAdminLogin');
            window.location.href = "/";
        },
        userLogout({ commit }) {
            commit('removeAdminLogin');
            window.location.href = "/";
        },
        loadAppliedList: function ({ state, dispatch }, params) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/applylog?uid=${params.identify}&bd=${Vue.moment(new Date(params.birthday)).format('YYYY/MM/DD')}&keyword=${params.keyword}`;
                axios.get(apiUrl).then(res => {
                    resolve(res.data);
                }).catch((ex) => {
                    dispatch('notLoginAdmin',ex);
                    reject(ex);
                });
            });
        },
        loacVaccineGroups: function ({state, commit }) {
            return new Promise((resolve) => {
                var results = [];
                var apiUrl = `${state.apiRoot}api/DataItem/Vaccines`;
                axios.get(apiUrl).then(res => {
                    res.data.forEach((data) => {
                        results.push({ groupName: data.groupName, groupId: data.groupId, groupNo: data.groupId });
                    });
                    commit('saveVaccineGroups', results);
                    resolve(results);
                });
            });
        },
        loacVaccineSessions: function ({ state,  }, params) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity`;
                var results = { datas: [], state: '', totalCount: 0 };

                var medicalOrgIdFilter = 'all';
                var distIdFilter = 'all';
                var villageIdFilter = 'all';
                var vaccineGroupId = params.groupId;
                var keyword = params.keyword === '' ? null : params.keyword;
                //  TODO: params.brandId 搜尋廠牌目前不支援

                axios.get(apiUrl, {
                    params: {
                        medicalOrgIdFilter: medicalOrgIdFilter, // 醫療院所過濾
                        page: 1,                                // 頁數
                        rows: 100,                              // 每頁筆數
                        distIdFilter: distIdFilter,             // 行政區過濾
                        villageIdFilter: villageIdFilter,       // 村里過濾
                        keyword: keyword,                       // 關鍵字
                        vaccineGroupId: vaccineGroupId,         // 疫苗種類
                        token: '',
                        orderType: 1,                           // 排序條件
                        activityId: params.sessionId
                    }
                }).then(res => {
                    results.totalCount = res.data.totalRows;

                    var datas = [];
                    res.data.data.forEach((data) => {
                        var brandId = [], brandName = [];
                        data.vaccines.forEach(v => {
                            brandId.push(v.itemId);
                            brandName.push(v.itemName);
                        });

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
                            brandId: brandId.join('、'),
                            brandName: brandName.join('、'),
                            implementAddr: data.implementAddr,
                            groupName: data.vaccineGroupName,
                            signUp: (new Date(data.startApplyDate).getTime() <= new Date().getTime()) && (new Date().getTime() <= new Date(data.endApplyDate).getTime()),
                            actAge: data.actAge,
                            vaccineGroupId: data.vaccineGroupId,
                            vaccineGroupName: data.vaccineGroupName
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
        loadEmbeddedUserInfo: function ({ commit, dispatch, state }, token) {

            var tokenInfo = {
                token: token, //台北通 token
                type: 'tpass-embedded'
            }
            return new Promise((resolve) => {
                var apiUrl = `${state.apiRoot}api/my`;
                var apiHeader = {
                    headers: {
                        'x-token': token
                    }
                }
                axios.get(apiUrl, apiHeader).then(res => {
                    var userInfo = {
                        uName: res.data.uName, //使用者名稱
                        birthday: Vue.moment(res.data.bd).format('YYYY-MM-DD'), //使用者生日
                        identify: res.data.uid, //使用者身分證
                        token: token, //台北通 token
                        type: 'tpass-embedded',
                        sessionId: null, //生日登入 sessionId
                        captcha: null, //生日登入 captcha
                    };
                    dispatch('clearUserInfoLock').then(() => {
                        if (!!userInfo.uName) state.lockUserInfo.lockName = true;
                        if (!!userInfo.identify) state.lockUserInfo.lockIdentify = true;
                        if (!!userInfo.birthday) state.lockUserInfo.lockBirthday = true;
                        commit('saveLockUserInfo', state.lockUserInfo);
                        commit('saveUserInfo', { ...userInfo, ...tokenInfo });
                        resolve(userInfo);
                    })
                });
            });

            //console.log(token);
            //return new Promise((resolve) => {
            //    var passInfo = {
            //        uuid: '123456',
            //        uName: '張閔傑',
            //        acc: 'micchang@g.hkxf.org',
            //        email: 'micchang@g.hkxf.org',
            //        renew: '',
            //        uid: 'A123456789',
            //        bd: '1950-5-5',
            //        mbNo: '0988507536',
            //    };

            //    var results = {
            //        uName: passInfo.uName, //使用者名稱
            //        birthday: Vue.moment(passInfo.bd).format('YYYY-MM-DD'), //使用者生日
            //        //birthday: userInfo.birthday, //使用者生日
            //        identify: passInfo.uid, //使用者身分證
            //        token: null, //台北通 token
            //        type: 'tpass-embedded',
            //        sessionId: null, //生日登入 sessionId
            //        captcha: null, //生日登入 captcha
            //    };

            //    dispatch('clearUserInfoLock').then(() => {
            //        if (!!passInfo.uName) state.lockUserInfo.lockName = true;
            //        if (!!passInfo.identify) state.lockUserInfo.lockIdentify = true;
            //        if (!!passInfo.birthday) state.lockUserInfo.lockBirthday = true;
            //        commit('saveLockUserInfo', state.lockUserInfo);
            //        dispatch('setUserInfo', results).then((user) => {
            //            resolve(user);
            //        });
            //    })

            //    resolve(results);
            //});
        },
        checkUserInfo: function ({ state, commit, dispatch }, userInfo) {
            return new Promise((reslove) => {                
                var results = {
                    uName: '', //使用者名稱
                    birthday: Vue.moment(userInfo.birthday).format('YYYY-MM-DD'), //使用者生日
                    //birthday: userInfo.birthday, //使用者生日
                    identify: userInfo.identify, //使用者身分證
                    sessionId: userInfo.sessionId, //生日登入 sessionId
                    captcha: userInfo.captcha, //生日登入 captcha
                    token: null, //台北通 token
                    type: 'identify'
                };
                dispatch('clearUserInfoLock').then(() => {
                    if (!!userInfo.uName) state.lockUserInfo.lockName = true;
                    if (!!userInfo.identify) state.lockUserInfo.lockIdentify = true;
                    if (!!userInfo.birthday) state.lockUserInfo.lockBirthday = true;
                    commit('saveLockUserInfo', state.lockUserInfo);
                    dispatch('setUserInfo', results).then((user) => {
                        reslove(user);
                    });
                })
            });
        },
        loadUserInfo: function ({ state, commit, dispatch }, token) {
            var tokenInfo = {
                token: token, //台北通 token
                type: 'taipei-pass'
            }
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/my`;
                var apiHeader = {
                    headers: {
                        'x-token': token
                    }
                }
                axios.get(apiUrl, apiHeader).then(res => {
                    var userInfo = {
                        uName: res.data.uName, //使用者名稱
                        birthday: Vue.moment(res.data.bd).format('YYYY-MM-DD'), //使用者生日
                        identify: res.data.uid, //使用者身分證
                        token: token, //台北通 token
                        type: 'taipei-pass',
                        sessionId: null, //生日登入 sessionId
                        captcha: null, //生日登入 captcha
                    };
                    dispatch('clearUserInfoLock').then(() => {
                        if (!!userInfo.uName) state.lockUserInfo.lockName = true;
                        if (!!userInfo.identify) state.lockUserInfo.lockIdentify = true;
                        if (!!userInfo.birthday) state.lockUserInfo.lockBirthday = true;
                        commit('saveLockUserInfo', state.lockUserInfo);
                        commit('saveUserInfo', { ...userInfo, ...tokenInfo });
                        resolve(userInfo);
                    })
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
                    reject();
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
        getBeforeApply: function ({ state, commit }, params) {
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
                    sessionId: params.sessionId,
                    captcha: params.captcha,
                    uId: params.uId,
                    bd: params.bd,
                    sourceType: sourceType,
                    token: params.token
                }).then(res => {
                    results.datas[0] = res.data;
                    if (!!res.data.uName) {
                        state.lockUserInfo.lockName = true;
                        var userInfo = state.userInfo;
                        userInfo.uName = res.data.uName;
                        commit('saveUserInfo', userInfo);
                    }
                    resolve(results);
                }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        deleteApply: function ({ state }, params) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity/Apply/Web/${params.activityId}`;
                var results = { datas: [], state: '' };

                if (params.uid !== null) {
                    axios.delete(apiUrl, {
                        params: params
                    }).then(res => {
                        results.state = 'success';
                        results.datas = res.data;
                        resolve(results);
                    }).catch(ex => {
                        results.state = 'error';
                        results.datas = ex;
                        reject(results);
                    });
                } else {
                    results.state = 'parameter error';
                    resolve(results);
                }
            });
        },
        checkLogTime: function ({ commit }) {
            return new Promise((resolve) => {
                if (!sessionStorage.getItem('logTime')) {
                    resolve();
                    return;
                }
                var logTime = new Date(sessionStorage.getItem('logTime'));
                if (logTime < new Date()) {
                    commit('saveUserInfo', null);
                    window.location.href = "/";
                    resolve();
                    return;
                }
                resolve();
            });
        },
        loadDists: function ({ state }) {
            var zones = JSON.parse(window.sessionStorage.getItem('zoneMap'));
            var dists = [];
            if (zones !== null) {
                zones.forEach((zone) => {
                    zone.data.forEach((dist) => {
                        dists.push({
                            id: dist.distId,
                            name: dist.distName
                        });
                    });
                });

                state.districts = dists;
                return;
            }

            axios({
                method: 'get',
                url: `${state.apiRoot}api/DataItem/ZoneMap?api-version=1.0`,
                data: {},
                responseType: 'json',
            }).then(function (res) {
                window.sessionStorage.setItem('zoneMap', JSON.stringify(res.data));

                res.data.forEach((zone) => {
                    zone.data.forEach((dist) => {
                        dists.push({
                            id: dist.distId,
                            name: dist.distName
                        });
                    });
                });

                state.districts = dists;
            });
        },
        loadVillages: function ({ state }, params) {
            var zones = JSON.parse(window.sessionStorage.getItem('zoneMap'));
            var villages = [];
            zones.forEach((zone) => {
                zone.data.forEach((dist) => {
                    if (dist.distId === params.id) {
                        dist.data.forEach((village) => {
                            villages.push({
                                id: village.villageId,
                                name: village.villageName
                            });
                        });
                    }
                });
            });

            state.villages = villages;
        } ,
        clearUserInfoLock: function ({ commit, getters }) {
            new Promise((reslove) => {
                var lock = getters.getLockUserInfo;
                lock.lockName = false;
                lock.lockIdentify = false;
                lock.lockBirthday = false;
                lock.lockMobile = false;
                commit('saveLockUserInfo', lock);
                reslove();
            });
        },
        loadFakeEmbeddedUserInfo: function ({ commit, dispatch, state }, token) {
            console.log(token);
            return new Promise((resolve) => {
                var passInfo = {
                    uuid: '123456',
                    uName: '張閔傑',
                    acc: 'micchang@g.hkxf.org',
                    email: 'micchang@g.hkxf.org',
                    renew: '',
                    uid: 'A123456789',
                    bd: '1945-5-5',
                    mbNo: '0988507536',
                };

                var results = {
                    uName: passInfo.uName, //使用者名稱
                    birthday: Vue.moment(passInfo.bd).format('YYYY-MM-DD'), //使用者生日
                    //birthday: userInfo.birthday, //使用者生日
                    identify: passInfo.uid, //使用者身分證
                    token: null, //台北通 token
                    type: 'tpass-embedded',
                    sessionId: null, //生日登入 sessionId
                    captcha: null, //生日登入 captcha
                };

                dispatch('clearUserInfoLock').then(() => {
                    if (!!passInfo.uName) state.lockUserInfo.lockName = true;
                    if (!!passInfo.identify) state.lockUserInfo.lockIdentify = true;
                    if (!!passInfo.birthday) state.lockUserInfo.lockBirthday = true;
                    commit('saveLockUserInfo', state.lockUserInfo);
                    dispatch('setUserInfo', results).then((user) => {
                        resolve(user);
                    });
                })

                resolve(results);
            });
        },
    },
    state: {
        ...siteConfig,
        vaccineGroups: [],
        vaccineBrands: [],
        districts: [],
        villages: [],
        userInfo: null,
        lockUserInfo: {
            lockName: false,
            lockIdentify: false,
            lockBirthday: false,
            lockMobile: false,
        }
    },
    getters: {
        getLockUserInfo: (state) => {
            return state.lockUserInfo;
        },
        getVaccineGroups: (state) => state.vaccineGroups,
        getVaccineBrands: (state) => state.vaccineBrands,
        getUserInfo: (state) => {
            if (!state.userInfo && sessionStorage.getItem("userInfo") != null)
                state.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            return state.userInfo;
        },
        getApiRoot: function () { return siteConfig.apiRoot; },
        getDistricts: (state) => {
            return state.districts;
        },
        getVillages: (state) => {
            return state.villages;
        },
        findVaccineGroup: (state) => (groupId) => {
            try {
                var group = state.vaccineGroups.find(f => f.groupId == groupId);
                return group;
            } catch (e) {
                return null;
            }
        },
    },
    mutations: {
        removeAdminLogin(state) {
            state.userInfo = null;
            window.sessionStorage.removeItem('userInfo');
            Vue.$cookies.remove('userInfo');
        },
        saveVaccineGroups: (state, groups) => {
            state.vaccineGroups.splice(0);
            groups.forEach(f => state.vaccineGroups.push(f));
        },
        saveVaccineBrands: (state, brands) => {
            state.vaccineBrands.splice(0);
            brands.forEach(f => state.vaccineBrands.push(f));
        },
        saveLockUserInfo: (state, lock) => {
            state.lockUserInfo = lock;
            sessionStorage.setItem('lockUserInfo', lock);
        },
        saveUserInfo: (state, userInfo) => {
            if (userInfo == null) {
                state.userInfo = null;
                sessionStorage.removeItem("userInfo");
                sessionStorage.removeItem('logTime');
                return;
            }
            var logTime = new Date();
            logTime = logTime.setDate(logTime.getDate() + 1);
            //logTime = logTime.setSeconds(logTime.getSeconds() + 30);
            sessionStorage.setItem('logTime', Vue.moment(logTime).format('YYYY/MM/DD HH:mm:ss'));
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
            state.userInfo = userInfo;
        },
    },
    modules: {
        user: userStore
    }
}

