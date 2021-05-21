import siteConfig from "project/site.config"

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
        },
        saveAudit: function ({ state }, data) {
            return new Promise(function (resolve, reject) {
                // TODO:
                var result = true; 
                try {
                    //data.audit_type.id;
                    state.desserts.push({
                        id: 6,
                        date: new Date().toISOString().substr(0, 16).replace('T', ' ').replace(/-/g, '/'),
                        name: '袁吉吉',
                        affiliation: '衛生局',
                        type: '案件抽查表',
                        title: data.audit_year + '年' + parseInt(data.audit_month, 10) + '月份－案件抽查表（' + data.audit_type.state + '）',
                        count: '5000',
                        download: data.audit_reason,    
                    });
                    resolve(result);
                } catch (e) {
                    reject(result);
                }
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
