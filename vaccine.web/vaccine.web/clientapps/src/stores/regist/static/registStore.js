import siteConfig from "project/site.config"
//import userStore from "stores/userStore"

export default {
    namespaced: true,
    actions: {
        loadAppliedList: function ({ state }, userInfo) {
            return new Promise((reslove) => {
                console.log(state);
                var results = [
                    { groupName: '肺鏈、流感', groupId: 'influenza' },
                    { groupName: '新冠肺炎', groupId: 'covid' },
                ];

                if (userInfo)
                    reslove(results);
                else
                    reslove([]);
            });
        },
        loacVaccineGroups: function ({ commit }) {
            return new Promise((reslove) => {
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
        loacVaccineSessions: function ({ state }, param) {
            return new Promise((reslove) => {
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
        checkUserInfo: function ({ dispatch, rootGetters }, userInfo) {
            return new Promise((reslove) => {
                var results = {
                    uName: '張閔傑', //使用者名稱
                    birthday: userInfo.birthday, //使用者生日
                    identify: userInfo.identify, //使用者身分證
                    sessionId: userInfo.sessionId, //生日登入 sessionId
                    captcha: userInfo.captcha, //生日登入 captcha
                    type: 'identify'
                };
                dispatch('loadAppliedList', userInfo).then(() => {
                    dispatch('setUserInfo', results).then(() => {
                        console.log('return userInfo', rootGetters);
                        reslove(rootGetters.getUserInfo);
                    });
                });
            });
        },
        loadUserInfo: function ({ dispatch, rootGetters }, token) {
            return new Promise((reslove) => {
                console.log(token);
                var results = {
                    uName: '張閔傑', //使用者名稱
                    birthday: '1982/11/10', //使用者生日
                    identify: 'A00000000', //使用者身分證
                    token: token, //台北通 token
                    sessionId: '', //生日登入 sessionId
                    captcha: '', //生日登入 captcha
                    type: 'taipei-pass'
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

