import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import userStore from "stores/userStore"
//import configStore from "stores/configStore"
import siteConfig from "project/site.config"
import axios from 'axios'
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

export default new Vuex.Store({
    namespaced: true,
    actions: {
        checkLogin: function ({ state, commit }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/User/Login`;
                var results = { datas: [], state: '' };

                var upd = Base64.stringify(sha256(params.uid.toLowerCase() + params.upd));
                //console.log(upd);
                
                axios.post(apiUrl, {
                    acc: params.uid,
                    pd: upd,
                    requestSystem: state.requestSystem,
                    deviceKey: navigator.userAgent,
                    isChiefOfVillage: false
                }).then(res => {
                    // 是否允許登入
                    if (!res.data.isAllowLogin) {
                        results.state = 'not allow login';
                        results.datas = res.data;
                        reslove(results);
                        return;
                    }

                    commit('user/setSessionId', res.data.sessionId);
                    results.datas = res.data;
                    reslove(results);
                }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        checkVerificationCode: function ({ state, commit, rootGetters }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/User/Login`;
                var results = { datas: [], state: '', state1: '' };
                
                axios.get(apiUrl, {
                    params: {
                        acc: params.uid,
                        otp: params.verificationCode,
                        sessionId: rootGetters['user/getSessionId'],
                        requestSystem: state.requestSystem,
                        deviceKey: navigator.userAgent
                    }
                }).then(res => {
                    // 無管理區域
                    if (res.data.zones.length == 0) {
                        results.state = 'no management area';
                        reslove(results);
                        return;
                    }
                    
                    // 帳號停用
                    if (!res.data.isEnable) {
                        results.state = 'deactivate';
                        reslove(results);
                        return;
                    }

                    commit('user/setToken', res.data.token);
                    commit('user/setZones', res.data.zones);
                    
                    // 需要修改密碼
                    if (res.data.requirePdChange) {
                        // 密碼未使用超過三個月
                        var d1 = new Date(res.data.pdExpTime);
                        var d2 = new Date();
                        var d3 = (d1 - d2) / 86400000;
                        
                        if (d3 >= 90) {
                            results.state1 = 'first login';
                        } else if (d3 > 0 && d3 < 90) {
                            results.state1 = 'password is about to expire';
                        } else if (d3 <= 0) {
                            results.state1 = 'password has expired';
                        }
                        
                        results.state = 'not yet enabled';
                        reslove(results);
                        return;
                    }
                    
                    results.state = 'pass';
                    results.datas = res.data;
                    reslove(results);
                }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        checkResetPw: function ({ state, rootGetters }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/User/Login`;
                var results = { datas: [], state: '' };
                
                var oriPd = Base64.stringify(sha256(params.uid.toLowerCase() + params.upd));
                //console.log(oriPd);
                var newPd = Base64.stringify(sha256(params.uid.toLowerCase() + params.newUpd));
                //console.log(newPd);

                axios.put(apiUrl, {
                    acc: params.uid,
                    oriPd: oriPd,
                    newPd: newPd
                }, {
                    headers: {
                        'x-token': rootGetters['user/getToken']
                    }
                }).then(res => {
                    results.state = 'pass';
                    results.datas = res.data;
                    reslove(results);
                }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        checkForgetPdUid: function ({ state, commit }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/User/Login/ForgetPd`;
                var results = { datas: [], state: '' };

                axios.get(apiUrl, {
                    params: {
                        acc: params.uid
                    }
                }).then(res => {
                    commit('user/setSessionId', res.data.sessionId);
                    results.state = 'pass';
                    results.datas = res.data;
                    reslove(results);
                }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        checkForgetPdVerificationCode: function ({ state, rootGetters }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/User/Login/ForgetPd`;
                var results = { datas: [], state: '' };

                axios.post(apiUrl, {
                    acc: params.uid,
                    sessionId: rootGetters['user/getSessionId'],
                    otp: params.verificationCode
                }).then(res => {
                    results.state = 'pass';
                    results.datas = res.data;
                    reslove(results);
                }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        modifyPw: function ({ state, rootGetters }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/User/Login/ForgetPd`;
                var results = { datas: [], state: '' };

                var newUpd = Base64.stringify(sha256(params.uid.toLowerCase() + params.newUpd));
                //console.log(newUpd);

                axios.put(apiUrl, {
                    acc: params.uid,
                    sessionId: rootGetters['user/getSessionId'],
                    otp: params.verificationCode,
                    newPd: newUpd
                }).then(res => {
                    results.state = 'pass';
                    results.datas = res.data;
                    reslove(results);
                }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        logout: function ({ state, rootGetters }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/User/Login`;
                var results = { datas: [], state: '' };
                
                var token = rootGetters['user/getToken'];

                // 清除
                rootGetters['user/clear'];

                if (token !== null) {
                    axios.delete(apiUrl, {
                        headers: {
                            'x-token': token
                        },
                        params: {
                            acc: params.uid
                        }
                    }).then(res => {
                        results.state = 'success';
                        results.datas = res.data;
                        reslove(results);
                    }).catch(ex => {
                        results.state = 'error';
                        results.datas = ex;
                        reject(results);
                    });
                } else {
                    results.state = 'success';
                    reslove(results);
                }
            });
        }
    },
    state: {
        ...siteConfig
    },
    getters: {
    },
    mutations: {
    },
    modules: {
        user: userStore,
        //config: configStore
    }
})