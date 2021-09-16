import siteConfig from "project/site.config"
import { Promise } from "core-js";

export default {
    namespaced: true,
    actions: {
        loadRegistForm: function ({ state},params) {
            return new Promise((resolve) => {
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
                resolve(results);
            });
        },
        loadDetailForm: function ({ state }, params) {
            return new Promise((resolve) => {
                var results = { datas: [], state: '', totalCount: 0 };
                var query = state.registrationDesserts;
                if (params.keyWord) {
                    query = query.filter((x) => x.name === params.keyWord || x.identity === params.keyWord);
                }
                results.totalCount = query.length;
                var start = (params.page - 1) * params.pageSize;
                var end = start + params.pageSize;
                query = query.slice(start, end);
                results.datas = query;
                resolve(results);
            });
        },
        getCompleteFile: function ({ state }, data) {
            return new Promise(function (resolve, reject) {
                // TODO:
                var result = { id: data.id, state: state };
                try {
                    resolve(result);
                    alert('下載完成 (' + data.id + ')');
                } catch (e) {
                    reject(result);
                }
            });
        },
        getSignUpFile: function ({ state }, data) {
            return new Promise(function (resolve, reject) {
                // TODO:
                var result = { id: data.id, state: state };
                try {
                    resolve(result);
                    alert('下載完成 (' + data.id + ')');
                } catch (e) {
                    reject(result);
                }
            });
        },
        getVaccinationFile: function ({ state }, data) {
            return new Promise(function (resolve, reject) {
                // TODO:
                var result = { id: data.id, state: state };
                try {
                    resolve(result);
                    alert('下載完成 (' + data.id + ')');
                } catch (e) {
                    reject(result);
                }
            });
        },
        getAgreeFile: function ({ state }, data) {
            return new Promise(function (resolve, reject) {
                // TODO:
                var result = { id: data.id, state: state };
                try {
                    resolve(result);
                    alert('下載完成 (' + data.id + ')');
                } catch (e) {
                    reject(result);
                }
            });
        },
        execCheck: function ({ state }, data) {
            return new Promise(function (resolve, reject) {
                // TODO:
                var result = { id: data.id, state: state, cnt: 2 };
                try {
                    resolve(result);
                    alert('已執行 (' + data.id + ')');
                } catch (e) {
                    reject(result);
                }
            });
        },
        doubleCheck: function ({ state }, data) {
            return new Promise(function (resolve, reject) {
                // TODO:
                var result = { id: data.id, state: state };
                try {
                    console.log(data.result.id);
                    console.log(data.result.state);

                    resolve(result);
                    alert('人工複檢 (' + data.result.state + ')');
                } catch (e) {
                    reject(result);
                }
            });
        },
        registForm: function ({ state }, data) {
            return new Promise((resolve) => {
                var result = { data: [], state: state }
                console.log('new',data);
                resolve(result)

            })
         
            //        model: {
            //regist_title: '',
            //    regist_type: '',
            //    regist_brand: '',
            //    regist_district: '',
            //    regist_village: '',
            //    regist_place: '',
            //    regist_institution: '',
            //    regist_institution_code: '',
            //    regist_institution_district: '',
            //    regist_date: new Date().toISOString().substr(0, 10),
            //    regist_start_time: '08:00',
            //    regist_end_time: '12:00',
            //    regist_review_date:'',
            //    regist_in_advance: '',
            //    regist_quota:'無限制'
            //}

        },
        updateRegist: function ({ state }, data) {
            return new Promise((resolve) => {
                var result = { data:[] ,state: state };
                console.log('update',data)
                resolve(result);
            })
        },
        removeRegist: function ({ state }, data) {
            return new Promise((resolve) => {
                var result = { state: state };
                console.log('remove', data);
                resolve(result);
            })
        }
    },
    state: {
        ...siteConfig,
        headers: [
            { text: '建立日期', value: 'regist_create_date', align: 'start', sortable: true, flex: 6 },
            { text: '場次標題', value: 'regist_title', sortable: false, flex: 6 },
            { text: '疫苗類型', value: 'regist_type_name', sortable: false, flex: 6 },
            //{ text: '疫苗類型代碼', value: 'type_code', sortable: false, flex: 6,disable:true },
            { text: '行政區', value: 'regist_district_name', sortable: false, flex: 6 },
            { text: '村里', value: 'regist_village_name', sortable: false, flex: 6 },
            { text: '醫療院所', value: 'regist_institution_name', sortable: false, flex: 6 },
            { text: '院所行政區', value: 'regist_instution_district_name', sortable: false, flex: 6 },
            { text: '設站時間', value: 'regist_station_date', sortable: false, flex: 6 },
            //{ text: '設站地點', value: 'place', sortable: false, flex: 6 },
            { text: '報名時間', value: 'regist_apply_start_date', sortable: false, flex: 6 },
            { text: '名額', value: 'regist_quota', sortable: false, flex: 6 },
            { text: '復審合格數', value: 'regist_qualified', sortable: false, flex: 6 },
            { text: '', value: 'modify', sortable: false },
        ],
        desserts: [
            {
                regist_id:'1',
                regist_create_date: new Date().toISOString().substr(0, 10).replace(/-/g, '/'),///'2021/04/01',
                regist_title: '110年5月份新冠疫苗 接種',
                regist_type: 'coronavirus',
                regist_type_name: '新冠肺炎',
                regist_brand: 'bnt',
                regist_brand_name:'Pfizer-BioNTech',
                regist_district: 'neihu',
                regist_district_name: '內湖區',
                regist_village: 'xikang',
                regist_village_name: '西康里',
                regist_place:'地點',
                regist_institution: 'wang',
                regist_institution_name: '王慶森診所',
                regist_instution_district: 'neihu',
                regist_instution_district_name: '內湖區',
                regist_station_date: '2021/05/08',
                regist_station_start_time: '08:30',
                regist_station_end_time: '11:30',
                regist_apply_start_date: new Date().toISOString().substr(0, 10).replace(/-/g, '/'),               
                regist_review_date: new Date().toISOString().substr(0, 10).replace(/-/g, '/'),///checkTime              
                regist_qualified: '423',
                regist_quota: '500',
                regist_unpassed: '425',
                regist_abnormalCnt:'0'
                //abnormalCnt: '0',
               
                //checkPassCnt: '0',
                //cntQuota: '425',
                //totalQuota: '500',
                //qualified: '423',
                //abnormalCnt: '0',
                //checkTime: '2021/05/20',
                //checkPassCnt: '224',
            },
            {
                regist_id: '2',
                regist_create_date: new Date().toISOString().substr(0, 10).replace(/-/g, '/'),///'2021/04/01',
                regist_title: '110年10月份新冠疫苗 接種',
                regist_type: 'coronavirus',
                regist_type_name: '新冠肺炎',
                regist_brand: 'bnt',
                regist_brand_name: 'Pfizer-BioNTech',
                regist_district: 'neihu',
                regist_district_name: '內湖區',
                regist_village: 'xikang',
                regist_village_name: '西康里',
                regist_place: '設站地點',
                regist_institution: 'wang',
                regist_institution_name: '王慶森診所',
                regist_instution_district: 'neihu',
                regist_instution_district_name: '內湖區',
                regist_station_date: new Date().toISOString().substr(0, 10).replace(/-/g, '/'),//'2021/05/08',
                regist_station_start_time: '08:30',
                regist_station_end_time: '11:30',
                regist_apply_start_date: new Date().toISOString().substr(0, 10).replace(/-/g, '/'),
                regist_apply_end_date: new Date().toISOString().substr(0, 10).replace(/-/g, '/'),
                regist_review_date: new Date().toISOString().substr(0, 10).replace(/-/g, '/'),///checkTime              
                regist_qualified: '423',
                regist_quota: '500',
                regist_unpassed: '45',
                regist_abnormalCnt: '0'
                //checkPassCnt: '0',
            },
        ],
        brands: [
            { id: 'az', name: 'AstraZeneca' },
            { id: 'bnt', name: 'Pfizer-BioNTech' },
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
        institutions: [
            { id: 'wang', name: '王慶森診所' },
            { id: 'wang2', name: '王慶森2診所' },
            { id: 'wang3', name: '王慶森3診所' }
        ],
        registrationHeaders: [
            { text: '報名日期', value: 'date', align: 'start', sortable: true, flex: 6 },
            { text: '姓名', value: 'name', sortable: false, flex: 6 },
            { text: '序號', value: 'serialNumber', sortable: false, flex: 6 },
            { text: '性別', value: 'gender', sortable: false, flex: 6 },
            { text: '生日', value: 'birthday', sortable: false, flex: 6 },
            { text: '身分證', value: 'identity', sortable: false, flex: 6 },
            { text: '電話', value: 'phone', sortable: false, flex: 6 },
            { text: '戶籍地', value: 'censusRegister', sortable: false, flex: 6 },
            { text: '報名方式', value: 'type', sortable: false, flex: 6 },
            { text: '複檢結果', value: 'result', sortable: false, flex: 6 },
            { text: '', value: 'modify', sortable: false },
        ],
        registrationDesserts: [
            {
                id: '452',
                date: '2021/05/08 09:59',
                name: '袁吉吉',
                serialNumber: '452',
                gender: 'M',
                birthday: '1983/11/08',
                identity: 'B128541236',
                phone: '0910123456',
                censusRegister: '北市',
                type: '現場',
                result: '',
            },
            {
                id: '451',
                date: '2021/05/08 09:50',
                name: '柯安安',
                serialNumber: '451',
                gender: 'F',
                birthday: '1970/05/23',
                identity: 'B125463987',
                phone: '0910123434',
                censusRegister: '非北市',
                type: '現場',
                result: '合格',
            },
            {
                id: '450',
                date: '2021/04/28 23:32',
                name: '張蘭蘭',
                serialNumber: '450',
                gender: 'F',
                birthday: '1995/06/18',
                identity: 'F125463990',
                phone: '0910123490',
                censusRegister: '非北市',
                type: '事先里辦',
                result: '不合格',
            },
            {
                id: '449',
                date: '2021/04/18 01:31',
                name: '李良良',
                serialNumber: '449',
                gender: 'F',
                birthday: '1995/06/18',
                identity: 'F125463990',
                phone: '0910123490',
                censusRegister: '北市',
                type: '事先網路',
                result: '已取消',
            },
            {
                id: '448',
                date: '2021/04/15 18:15',
                name: '趙強強',
                serialNumber: '448',
                gender: 'M',
                birthday: '1973/05/05',
                identity: 'A125463939',
                phone: '0910123455',
                censusRegister: '北市',
                type: '事先里辦',
                result: '合格',
            },
            {
                id: '447',
                date: '2021/04/11 11:15',
                name: '謝昌昌',
                serialNumber: '447',
                gender: 'M',
                birthday: '1973/05/15',
                identity: 'A125463949',
                phone: '0910123457',
                censusRegister: '北市',
                type: '事先里辦',
                result: '系統異常',
            },
            {
                id: '446',
                date: '2021/04/11 11:15',
                name: '阿吉吉',
                serialNumber: '446',
                gender: 'F',
                birthday: '1978/01/12',
                identity: 'A125463882',
                phone: '0910123462',
                censusRegister: '北市',
                type: '事先里辦',
                result: '不合格(人工複檢)',
            },
        ],
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
        getRegistrationHeaders: state => {
            return state.registrationHeaders;
        },
        getRegistrationDesserts: state => {
            return state.registrationDesserts;
        },
    },
    mutations: {
    },
    modules: {
    }
}