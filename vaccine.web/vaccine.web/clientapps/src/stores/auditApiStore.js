import userStore from "stores/userStore"
import siteConfig from "project/site.config"
import axios from 'axios'
import { Promise } from "core-js";

export default {
    namespaced: true,
    actions: {
        loadAuditTypes: function ({ state, commit, rootGetters }) {
            var datas = [];
            var auditTypes = rootGetters['user/getAuditTypes'];
            if (auditTypes !== null) {
                auditTypes.forEach((data) => {
                    datas.push({
                        id: data.auditType,
                        name: data.auditTypeName
                    });
                });
                state.types = datas;
                return;
            }

            var apiUrl = `${state.apiRoot}api/DataItem/AuditType`;

            axios.get(apiUrl,
                rootGetters['user/getApiHeader']
            ).then(res => {
                res.data.forEach((data) => {
                    datas.push({
                        id: data.auditType,
                        name: data.auditTypeName
                    });
                });
                state.types = datas;

                commit('user/setAuditTypes', res.data);
            });
        },
        loadAudit: function ({ state, rootGetters, dispatch }, params) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/AuditLog`;
                var results = { datas: [], state: '', totalCount: 0 };

                var auditTypeFilter = (typeof params.type === 'undefined' || params.type === '' || params.type.id === '') ? null : params.type.id;
                var keyword         =                                                              params.keyWord === ''  ? null : params.keyWord;
                
                axios.get(apiUrl, {
                    params: {
                        auditTypeFilter: auditTypeFilter,       // 報表類別
                        page: params.page,                      // 頁數
                        rows: params.pageSize,                  // 每頁筆數
                        keyword: keyword                        // 關鍵字
                    },
                    headers: {
                        'x-token': rootGetters['user/getToken']
                    }
                }).then(res => {
                    results.totalCount = res.data.totalCount;

                    var datas = [];
                    res.data.data.forEach((data) => {
                        datas.push({
                            id: data.seq,
                            date: data.createTime.substr(0, 16).replace('T', ' ').replace(/-/g, '/'),
                            name: data.uName,
                            affiliation: data.unit,
                            type: data.typeName,
                            title: data.fileName,
                            count: data.dataCount,
                            download: data.desc,
                            fileId: data.fileId
                        });
                    });

                    results.datas = datas;
                    resolve(results);
                 }).catch((error) => {
                    dispatch('user/notLoginAdmin', error, { root: true });
                    results.datas = error;
                    reject(results);
                });
            });
        },
        saveAudit: function ({ state, rootGetters, dispatch }, data) {
            return new Promise(function (resolve, reject) {
                var apiUrl = `${state.apiRoot}api/AuditLog`;
                var results = { datas: [], state: '' };

                axios.post(apiUrl, {
                        actionType: data.audit_type.id,
                        auditYear: parseInt(data.audit_year, 10) + 1911,
                        auditMonth: parseInt(data.audit_month, 10),
                        reason: data.audit_reason
                    },
                    rootGetters['user/getApiHeader']
                ).then(res => {
                    results.datas = res.data;
                    resolve(results);
                }).catch((error) => {
                    dispatch('user/notLoginAdmin', error, { root: true });
                    results.state = 'error';
                    results.datas = error;
                    reject(results);
                });
            });
        },
        downloadAudit: function ({ state, rootGetters, dispatch }, data) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/AuditLog/dl/` + data.fileId;
                var results = { datas: [], state: '' };

                fetch(apiUrl, {
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'x-token': rootGetters['user/getToken']
                    },
                    method: 'GET'
                })
                .then(res => res.blob().then(blob => {
                    const filename = data.title;
                    if (window.navigator.msSaveOrOpenBlob) {
                        navigator.msSaveBlob(blob, filename); // 兼容IE10
                    } else {
                        const a = document.createElement('a');
                        document.body.appendChild(a);
                        a.href = window.URL.createObjectURL(blob);
                        a.download = filename;
                        a.target = '_blank';
                        a.click();
                        a.remove();
                        window.URL.revokeObjectURL(apiUrl);
                    }
                    
                    resolve(results);
                })).catch((error) => {
                    dispatch('user/notLoginAdmin', error, { root: true });
                    results.datas = error;
                    reject(results);
                });
            });
        }
    },
    state: {
        ...siteConfig,
        types: [],
    },
    getters: {
        getTypes: state => {
            return state.types;
        }
    },
    mutations: {
    },
    modules: {
        user: userStore
    }
}
