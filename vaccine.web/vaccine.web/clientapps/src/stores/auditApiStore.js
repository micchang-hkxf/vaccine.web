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
        loadAudit: function ({ state }, params) {
            return new Promise((resolve) => {
                var results = { datas: [], state: '', totalCount: 0 };
                var query = state.desserts;
                if (params.keyWord) {
                    query = query.filter((x) => x.affiliation == params.keyWord);
                }
                results.totalCount = query.length;
                
                var start = (params.page - 1) * params.pageSize;
                var end = start + params.pageSize;
                query = query.slice(start, end);
                results.datas = query;
                resolve(results);

            });
        },
        saveAudit: function ({ state, rootGetters }, data) {
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
                }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        downloadAudit: function ({ state }, data) {
            return new Promise(function (resolve, reject) {
                // TODO:
                var result = { id: data.id, state: '' };
                try {
                    var exist = state.desserts.find(f => f.id == data.id);

                    if (!exist) {
                        result.state = 'not found';
                        resolve(result);
                        return;
                    }

                    resolve(result);
                    alert('下載完成 (' + data.id + ')');
                } catch (e) {
                    reject(result);
                }
            });
        }
    },
    state: {
        ...siteConfig,
       
        desserts: [
            {
                id: 1,
                date: '2021/04/01 09:30',
                name: '袁吉吉',
                affiliation:'衛生局',
                type: '案件抽查表',
                title: '110年5月份－案件抽查表（完整）',
                count: '5000',
                download: '（..事由文字..）',                      
            },
            {
                id: 2,
                date: '2021/04/01 09:30',
                name: '廖廷廷',
                affiliation: '健康中心',
                type: '報名清冊',
                title:'204－110年5月份肺鏈及流感疫苗接種－個人接種同 意書',
                count: '30',
                download: '（..事由文字..）',
            },
            {
                id: 3,
                date: '2021/04/01 09:30',
                name: '劉任任',
                affiliation: '健康中心',
                type: 'B1285案件抽查表41236',
                title: '110年4月份新冠疫苗施打預先報名',
                count: '50',
                download: '（..事由文字..）', 
            },
            {
                id: 4,
                date: '2021/04/01 09:30',
                name: '柯安安',
                affiliation: 'XXXX單位',
                type: '接種清冊',
                title: '110年5月份肺鏈及流感疫苗接種－接種清冊',
                count: '100',
                download: '（..事由文字..）',   
            },
            {
                id: 5,
                date: '2021/04/01 09:30',
                name: '許動動',
                affiliation: 'XXXX單位',
                type: 'B128541236',
                title: '110年5月份肺鏈及流感疫苗接種－接種同意書',
                count: '100',
                download: '（..事由文字..）', 
            },
        ],
        types: [],
    },
    getters: {
        getTypes: state => {
            return state.types;
        },
       
    },
    mutations: {
    },
    modules: {
        user: userStore
    }
}
