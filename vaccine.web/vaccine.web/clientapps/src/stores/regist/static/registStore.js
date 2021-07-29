﻿
export default {
    namespaced: true,
    actions: {
        loacVaccineGroups: function ({ commit }) {
            return new Promise((reslove) => {
                var results = {
                    datas: [
                        { groupName: '肺鏈、流感', groupId: 'influenza' },
                        { groupName: '新冠肺炎', groupId: 'covid' },
                    ], state: ''
                };
                commit('saveVaccineGroups', results.datas);
                reslove(results);
            });
        },
        loacVaccineSessions: function ({ state }, param) {
            return new Promise((reslove) => {
                console.log(param);
                console.log(state);
                var results = {
                    datas: [
                        { sessionName: '五月份新冠肺炎疫苗接種', sessionId: '001', zoneName: '內湖區', zoneId: 'A011', villageName: '紫雲里', villageId: '', sessionStart: '2021/5/25 09:00:00', sessionEnd: '2021/5/25 11:00:00', registStart: '2021/5/10 09:00:00', registEnd: '2021/5/22 09:00:00', maxLimit: 300, totalCount: 245, brandId: 'mdn', brandName: '莫德納' },
                        { sessionName: '六月份新冠肺炎疫苗接種', sessionId: '002', zoneName: '內湖區', zoneId: 'A011', villageName: '紫雲里', villageId: '', sessionStart: '2021/6/25 09:00:00', sessionEnd: '2021/6/25 11:00:00', registStart: '2021/6/10 09:00:00', registEnd: '2021/6/22 09:00:00', maxLimit: 300, totalCount: 300, brandId: 'az', brandName: 'AstraZeneca(AZ)' },
                    ], state: ''
                };
                reslove(results);
            });
        },
        loacVaccineBrands: function ({ commit }, group) {
            return new Promise((reslove) => {
                console.log(group);
                var results = {
                    datas: [
                        { brandId: 'mdn', brandName: '莫德納' },
                        { brandId: 'az', brandName: 'AstraZeneca(AZ)' },

                    ], state: ''
                };
                commit('saveVaccineBrands', results.datas);
                reslove(results);
            });
        },
        setUserInfo: function ({ commit }, userInfo) {
            return new Promise((reslove) => {
                var results = {
                    datas: userInfo, state: ''
                };
                commit('saveUserInfo', { ...userInfo, uName: '使用者' });
                reslove(results);
            });
        },
        checkUserInfo: function ({ commit }, userInfo) {
            return new Promise((reslove) => {
                var results = {
                    uName: '張閔傑', //使用者名稱
                    birthday: userInfo.birthday, //使用者生日
                    identify: userInfo.identify, //使用者身分證
                    sessionId: userInfo.sessionId, //生日登入 sessionId
                    captcha: userInfo.captcha, //生日登入 captcha
                    type: 'identify'
                };
                commit('saveUserInfo', results);
                reslove(results);
            });
        },
        loadUserInfo: function ({ commit }, token) {
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
                commit('saveUserInfo', results);
                reslove(results);
            });
        },
    },
    state: {
        vaccineGroups: [],
        vaccineBrands: [],
        userInfo: null
    },
    getters: {
        getVaccineGroups: (state) => state.vaccineGroups,
        getVaccineBrands: (state) => state.vaccineBrands,
        getUserInfo: () => {
            if (!sessionStorage.getItem("userInfo")) return null;
            return JSON.parse(sessionStorage.getItem("userInfo"));
        },
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
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
            //if (!!state.userInfo)
            //    state.userInfo = Object.assign(state.userInfo, userInfo);
            //else
            //    state.userInfo = Object.assign({}, userInfo);
        },
    },
    modules: {

    }
}

