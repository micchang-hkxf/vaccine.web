import siteConfig from "project/site.config"
import axios from 'axios'
//import { Promise } from "core-js";
export default {
    namespaced: true,
    actions: {
        login: function ({ state, commit, getters }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/user/login`;
                var results = { datas: [], state: '', totalCount: 0 };
                axios.post(apiUrl, {
                    acc: params.uid,
                    pd: params.upd,
                    requestSystem: state.requestSystem,
                    deviceKey: navigator.userAgent,
                    isChiefOfVillage: true
                }, {
                        headers: {
                            'x-token': getters.getToken
                        }
                    }).then(res => {
                        commit('sample/saveToken', '123456');
                        results.datas = res.data;
                        reslove(results);
                    }).catch(ex => {
                        //狀態處理
                        commit('sample/saveToken', '123456');
                        results.state = 'error';
                        results.datas = ex;
                        reject(results);
                    });
            });
        },
        getUsers: function ({ state }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/user`;
                var results = { datas: [], state: '', totalCount: 0, page: 0, rows: 0 };
                axios.get(apiUrl, {
                    page: params.page,
                    rows: params.rows,
                    userTypeFilter: params.userTypeFilter,
                    statusFilter: params.statusFilter,
                    keyword: params.keyword
                }).then(res => {
                    results.datas = res.data.data;
                    results.totalCount = res.totalRows;
                    results.page = res.page;
                    results.page = res.rows;
                    reslove(results);
                }).catch(ex => {
                    //狀態處理
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });
            });
        },
    },
    state: {
        ...siteConfig,
    },
    getters: {
        getToken: () => {
            return window.sessionStorage.getItem('x_token');
        }
    },
    mutations: {
        saveToken: (state,token) => {
            window.sessionStorage.setItem('x_token', token);
        }
    },
    modules: {
    }
}