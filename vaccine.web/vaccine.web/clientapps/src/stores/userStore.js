import axios from 'axios';
import siteConfig from "project/site.config"
import vueCookies from 'vue-cookies'

import Vue from 'vue'
Vue.use(vueCookies)
Vue.$cookies.config('1d')

export default {
    namespaced: true,
    actions: {
        getUserInfoData({ state, rootGetters }) {
  
            return new Promise(function (resolve, reject) {
                var results = { datas: [], state: '' };
                //console.log(state);
                axios({
                    method: 'get',
                    url: `${state.apiRoot}api/User/ReGetInfo?api-version=1.0`,
                    responseType: 'json',
                    headers: {
                        "X-Token": rootGetters['user/getToken'],
                    }
                }).then(res => {
                    results.datas = res;
                    resolve(results);
                }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        userLogout({ state, rootGetters }) {
         
            return new Promise(function (resolve, reject) {
                var results = { datas: [], state: '' };
                console.log(state);

                // 清除
                rootGetters['user/clear'];

                axios({
                    method: 'delete',
                    url: `${state.apiRoot}api/User/Login?api-version=1.0`,
                    responseType: 'json',
                    headers: {
                        "X-Token": rootGetters['user/getToken'],
                    }
                }).then(res => {
                  
                    results.datas = res;
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
        moduleEnabled: 'vuex module 已啟用',
        activityApply: null,
    },
    getters: {
        getSessionId: () => {
            return window.sessionStorage.getItem('sessionId');
        },
        getToken: () => {
            return window.sessionStorage.getItem('x_token');
        },
        getApiHeader: () => {
            return {
                headers: {
                    'x-token': window.sessionStorage.getItem('x_token')
                }
            } ;
        },
        getZones: () => {
            return JSON.parse(window.sessionStorage.getItem('zones'));
        },
        getVaccines: () => {
            return JSON.parse(window.sessionStorage.getItem('vaccines'));
        },
        getMedicals: () => {
            return JSON.parse(window.sessionStorage.getItem('medicals'));
        },
        getAuditTypes: () => {
            return JSON.parse(window.sessionStorage.getItem('auditTypes'));
        },
        getActivityApply: (state) => {
            var data = window.sessionStorage.getItem('activityApply');
            if (!state.activityApply && data !== null)
                state.activityApply = data;
            return JSON.parse(state.activityApply);
        },
        removeItem: () => (key) => {
            return window.sessionStorage.removeItem(key);
        },
        clear: () => {
            Vue.$cookies.remove("x-token");
            //document.cookie = 'x-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            return window.sessionStorage.clear();
        }
    },
    mutations: {
        setSessionId: (state, sessionId) => {
            window.sessionStorage.setItem('sessionId', sessionId);
            
        },
        setToken: (state, token) => {
            window.sessionStorage.setItem('x_token', token);
            Vue.$cookies.set('x-token', token);
            //document.cookie = 'x-token=' + token;
        },
        setZones: (state, zones) => {
            window.sessionStorage.setItem('zones', JSON.stringify(zones));
        },
        setVaccines: (state, vaccines) => {
            window.sessionStorage.setItem('vaccines', JSON.stringify(vaccines));
        },
        setMedicals: (state, medicals) => {
            window.sessionStorage.setItem('medicals', JSON.stringify(medicals));
        },
        setAuditTypes: (state, auditTypes) => {
            window.sessionStorage.setItem('auditTypes', JSON.stringify(auditTypes));
        },
        setActivityApply: (state, activityApply) => {
            state.activityApply = JSON.stringify(activityApply);
            window.sessionStorage.setItem('activityApply', state.activityApply);
        }
    },
    modules: {
    }
}