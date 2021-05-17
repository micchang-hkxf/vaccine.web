﻿import siteConfig from "project/site.config"

export default {
    namespaced: true,
    actions: {
        loadAudit: function ({ state }, params) {
            return new Promise((reslove) => {
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
                reslove(results);

            });
        }
    },
    state: {
        ...siteConfig,
       
        desserts: [
            {
                date: '2021/04/01 09:30',
                name: '袁吉吉',
                affiliation:'衛生局',
                type: '案件抽查表',
                title: '110年5月份－案件抽查表（完整）',
                count: '5000',
                download: '（..事由文字..）',                      
            },
            {
                date: '2021/04/01 09:30',
                name: '廖廷廷',
                affiliation: '健康中心',
                type: '報名清冊',
                title:'204－110年5月份肺鏈及流感疫苗接種－個人接種同 意書',
                count: '30',
                download: '（..事由文字..）',
            },
            {
                date: '2021/04/01 09:30',
                name: '劉任任',
                affiliation: '健康中心',
                type: 'B1285案件抽查表41236',
                title: '110年4月份新冠疫苗施打預先報名',
                count: '50',
                download: '（..事由文字..）', 
            },
            {
                date: '2021/04/01 09:30',
                name: '柯安安',
                affiliation: 'XXXX單位',
                type: '接種清冊',
                title: '110年5月份肺鏈及流感疫苗接種－接種清冊',
                count: '100',
                download: '（..事由文字..）',   
            },
            {
                date: '2021/04/01 09:30',
                name: '許動動',
                affiliation: 'XXXX單位',
                type: 'B128541236',
                title: '110年5月份肺鏈及流感疫苗接種－接種同意書',
                count: '100',
                download: '（..事由文字..）', 
            },
        ],
        types: [                     
            { id: 'regist', name: '報名清冊' },
            { id: 'agree', name: '接種同意書' },
            { id: 'list', name: '接種清冊' },
            { id: 'file', name: '案件抽查表' },
           
        ],
    },
    getters: {
        getTypes: state => {
            return state.types;
        },
       
    },
    mutations: {
    },
    modules: {
    }
}