import axios from 'axios';
import siteConfig from "project/site.config"

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
        moduleEnabled: 'vuex module 已啟用'
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
        clear: () => {
            return window.sessionStorage.clear();
        }
    },
    mutations: {
        setSessionId: (state, sessionId) => {
            window.sessionStorage.setItem('sessionId', sessionId);
        },
        setToken: (state, token) => {
            window.sessionStorage.setItem('x_token', token);
        },
        setZones: (state, zones) => {
            window.sessionStorage.setItem('zones', JSON.stringify(zones));
        },
        setVaccines: (state, vaccines) => {
            window.sessionStorage.setItem('vaccines', JSON.stringify(vaccines));
        },
        setMedicals: (state, medicals) => {
            window.sessionStorage.setItem('medicals', JSON.stringify(medicals));
        }
    },
    modules: {
    }
}