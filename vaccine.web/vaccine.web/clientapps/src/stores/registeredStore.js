import siteConfig from "project/site.config"

export default {
    namespaced: true,
    actions: {
        loadRegistForm: function ({ state }, params) {
            return new Promise((reslove) => {
                var results = { datas: [], state: '', totalCount: 0 };
                var query = state.desserts;
                if (params.district) {
                    query = query.filter((x) => x.district == params.district.name);
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
        headers: [
            { text: '報名時間', value: 'date', align: 'start', sortable: true, flex: 6 },
            { text: '姓名', value: 'name', sortable: false, flex: 6 },
            { text: '身分證', value: 'identity', sortable: false, flex: 6 },
            { text: '接種活動', value: 'vaccination', sortable: false, flex: 6 },
            { text: '報名方式', value: 'way', sortable: false, flex: 6 },
            { text: '複審結果', value: 'result', sortable: false, flex: 6 },
            { text: '序號', value: 'number', sortable: false, flex: 6 },          
        ],
        desserts: [
            {
                date: '2021/04/01 09:30',
                name: '袁吉吉',
                identity: 'B●●●●●8660',
                vaccination: '110年4月份新冠疫苗施打預先報名',
                way: '事先里辦',
                result: '合格',
                number: '0045',              
            },
            {
                date: '2021/07/11 12:30',
                name: '柯安安',
                identity: 'B●●●●●8660',
                vaccination: '110年3月份新冠疫苗施打預先報名',
                way: '事先網路',
                result: '-',
                number: '0012',
            },
            {
                date: '2020/06/08 13:30',
                name: '劉任任',
                identity: 'B●●●●●8660',
                vaccination: '110年3月份新冠疫苗施打預先報名',
                way: '現場',
                result: '已取消',
                number: '0011',
            },
            {
                date: '2021/04/01 09:30',
                name: '袁吉吉',
                identity: 'B●●●●●8660',
                vaccination: '110年4月份新冠疫苗施打預先報名',
                way: '事先里辦',
                result: '合格',
                number: '0045',
            },
            {
                date: '2021/04/01 09:30',
                name: '袁吉吉',
                identity: 'B●●●●●8660',
                vaccination: '110年4月份新冠疫苗施打預先報名',
                way: '事先里辦',
                result: '合格',
                number: '0045',
            },
        ],
        vaccines: [
            { id: 'influenza', name: '肺鏈流感' },
            { id: 'coronavirus', name: '新冠肺炎' },

        ],
        districts: [
            { id: 'neihu', name: '內湖區' },
            { id: 'nangang', name: '南港區' },

        ],
        villages: [
            { id: 'xikang', name: '西康里' }
        ],
        institutions: [{ id: 'wang', name: '王慶森診所' }, { id: 'wang2', name: '王慶森2診所' }, { id: 'wang3', name: '王慶森3診所' }]
    },
    getters: {
        getHeaders: state => {
            return state.headers;
        },
        getDesserts: state => {
            return state.desserts;
        },
        getVaccines: state => {
            return state.vaccines;
        },
        getDistricts: state => {
            return state.districts;
        },
        getVillages: state => {
            return state.villages;
        },
        getInstitutions: state => {
            return state.institutions;
        },
    },
    mutations: {
    },
    modules: {
    }
}
