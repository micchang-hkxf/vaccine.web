import siteConfig from "project/site.config"
//import { Promise } from "core-js";
export default {
    namespaced: true,
    actions: {
        loadRegistForm: function ({ state},params) {
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
            { text: '建立日期', value: 'date', align: 'start', sortable: true, flex: 6 },
            { text: '場次標題', value: 'title', sortable: false, flex: 6 },
            { text: '疫苗類型', value: 'type', sortable: false, flex: 6 },
            { text: '行政區', value: 'district', sortable: false, flex: 6 },
            { text: '村里', value: 'village', sortable: false, flex: 6 },
            { text: '醫療院所', value: 'institution', sortable: false, flex: 6 },
            { text: '院所行政區', value: 'instutionDistrict', sortable: false, flex: 6 },
            { text: '設站時間', value: 'stationTime', sortable: false, flex: 6 },
            { text: '報名時間', value: 'registrationTime', sortable: false, flex: 6 },
            { text: '名額', value: 'quota', sortable: false, flex: 6 },
            { text: '復審合格數', value: 'qualified', sortable: false, flex: 6 },
            { text: '', value: 'modify', sortable: false },
        ],
        desserts: [
            {
                date: '2021/04/01',
                title: '110年5月份新冠疫苗 接種',
                type: '新冠肺炎',
                district: '內湖區',
                village: '西康里',
                institution: '王慶森診所',
                instutionDistrict: '內湖區',
                stationTime: '2021/05/08 08:30 - 11:30',
                registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                quota: '425/670',
                qualified: '423',
            },
            {
                date: '2021/04/08',
                title: '110年5月份新冠疫苗 接種',
                type: '新冠肺炎',
                district: '內湖區',
                village: '西康里',
                institution: '王慶森診所',
                instutionDistrict: '內湖區',
                stationTime: '2021/05/08 08:30 - 11:30',
                registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                quota: '425/670',
                qualified: '423',
            },
            {
                date: '2021/04/03',
                title: '110年5月份新冠疫苗 接種',
                type: '新冠肺炎',
                district: '南港區',
                village: '西康里',
                institution: '王慶森診所',
                instutionDistrict: '南港區',
                stationTime: '2021/05/08 08:30 - 11:30',
                registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                quota: '425/670',
                qualified: '423',
            },
            {
                date: '2021/04/04',
                title: '110年5月份新冠疫苗 接種',
                type: '新冠肺炎',
                district: '南港區',
                village: '西康里',
                institution: '王慶森診所',
                instutionDistrict: '南港區',
                stationTime: '2021/05/08 08:30 - 11:30',
                registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                quota: '425/670',
                qualified: '423',
            },
            {
                date: '2021/04/05',
                title: '110年5月份新冠疫苗 接種',
                type: '新冠肺炎',
                district: '南港區',
                village: '西康里',
                institution: '王慶森診所',
                instutionDistrict: '南港區',
                stationTime: '2021/05/08 08:30 - 11:30',
                registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                quota: '425/670',
                qualified: '423',
            },
            {
                date: '2021/04/06',
                title: '110年5月份新冠疫苗 接種',
                type: '新冠肺炎',
                district: '南港區',
                village: '西康里',
                institution: '王慶森診所',
                instutionDistrict: '南港區',
                stationTime: '2021/05/08 08:30 - 11:30',
                registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                quota: '425/670',
                qualified: '423',
            },
            {
                date: '2021/04/10',
                title: '110年5月份新冠疫苗 接種',
                type: '新冠肺炎',
                district: '內湖區',
                village: '西康里',
                institution: '王慶森診所',
                instutionDistrict: '內湖區',
                stationTime: '2021/05/08 08:30 - 11:30',
                registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                quota: '425/670',
                qualified: '423',
            },
            {
                date: '2021/04/22',
                title: '110年5月份新冠疫苗 接種',
                type: '新冠肺炎',
                district: '內湖區',
                village: '西康里',
                institution: '王慶森診所',
                instutionDistrict: '內湖區',
                stationTime: '2021/05/08 08:30 - 11:30',
                registrationTime: '2021/04/10 08:00 - 2021/05/05 19:30',
                quota: '425/670',
                qualified: '423',
            }
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