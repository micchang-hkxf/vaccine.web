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
    actions: {
        checkLogin: function ({ state }, params) {
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
                    results.datas = res.data;
                    reslove(results);
                }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        checkVerificationCode: function ({ state }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/User/Login`;
                var results = { datas: [], state: '' };

                axios.get(apiUrl, {
                    acc: params.uid,
                    otp: params.verificationCode,
                    sessionId: '',
                    requestSystem: state.requestSystem,
                    deviceKey: navigator.userAgent
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
        checkResetPw: function ({ state }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/User/Login`;
                var results = { datas: [], state: '' };

                var oriPd = Base64.stringify(sha256(params.uid.toLowerCase() + params.upd));
                //console.log(oriPd);
                var newPd = Base64.stringify(sha256(params.uid.toLowerCase() + params.newUpd));
                //console.log(newPd);

                axios.put(apiUrl, {
                    headers: {
                        'x-token': ''
                    },
                    data: {
                        acc: params.uid,
                        oriPd: oriPd,
                        newPd: newPd
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
        checkForgetPdUid: function ({ state }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/User/Login/ForgetPd`;
                var results = { datas: [], state: '' };

                axios.get(apiUrl, {
                    acc: params.uid
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
        checkForgetPdVerificationCode: function ({ state }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/User/Login/ForgetPd`;
                var results = { datas: [], state: '' };

                axios.post(apiUrl, {
                    acc: params.uid,
                    sessionId: '',
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
        modifyPw: function ({ state }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/User/Login/ForgetPd`;
                var results = { datas: [], state: '' };

                var newUpd = Base64.stringify(sha256(params.uid.toLowerCase() + params.newUpd));
                //console.log(newUpd);

                axios.put(apiUrl, {
                    acc: params.uid,
                    sessionId: '',
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
        logout: function ({ state }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/User/Login`;
                var results = { uid: params.uid, state: '', datas: [] };

                // token 存在則登出
                axios.delete(apiUrl, {
                    headers: {
                        'x-token': ''
                    },
                    data: {
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

                results.state = 'success';
                reslove(results);
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