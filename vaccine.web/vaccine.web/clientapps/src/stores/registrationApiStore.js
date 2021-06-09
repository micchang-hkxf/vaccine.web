import userStore from "stores/userStore"
import siteConfig from "project/site.config"
import axios from 'axios'
import { Promise } from "core-js";

export default {
    namespaced: true,
    actions: {
        loadRegistForm: function ({ state, rootGetters }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity`;
                var results = { datas: [], state: '', totalCount: 0 };

                var medicalOrgIdFilter = params.institution.id === '' ? 'all' : params.institution.id;
                var distIdFilter       = params.district.id    === '' ? 'all' : params.district.id;
                var villageIdFilter    = params.village.id     === '' ? 'all' : params.village.id;
                var vaccineGroupId     = params.vaccine.id     === '' ?  null : params.vaccine.id;
                var keyword            = params.keyWord        === '' ?  null : params.keyWord;
                
                axios.get(apiUrl, {
                    params: {
                        medicalOrgIdFilter: medicalOrgIdFilter, // 醫療院所過濾
                        page: params.page,                      // 頁數
                        rows: params.pageSize,                  // 每頁筆數
                        distIdFilter: distIdFilter,             // 行政區過濾
                        villageIdFilter: villageIdFilter,       // 村里過濾
                        keyword: keyword,                       // 關鍵字
                        vaccineGroupId: vaccineGroupId,         // 疫苗種類
                        token: rootGetters['user/getToken']
                    }
                }).then(res => {
                    results.totalCount = res.totalRows;
                    // TODO: 測試資料，之後移除
                    res.data = [{
                        vaccineGroupId: '0', // 疫苗種類Id
                        vaccineGroupName: '肺鏈流感', // 疫苗種類名稱
                        isReChecked: false, // 是否已經覆核過
                        activityId: '1', // 活動編號
                        activityTitle: '110年5月份新冠疫苗 接種', // 活動名稱
                        implementDate: '2021-05-07T00:00:00.000Z', // 實際施打日期
                        implementStartTime: '2021-05-07T09:00:00.000Z', // 開始施打時間
                        implementEndTime: '2021-05-07T18:00:00.000Z', // 結束施打時間
                        implementAddr: '', // 施打地點
                        endApplyDate: '2021-05-07T18:00:00.000Z', // 結束接受事前報名時間
                        startApplyDate: '2021-05-07T09:00:00.000Z' , // 開始接受事前報名時間
                        amount: 500, // 施打數量配額上限
                        leftAmount: 30, // 剩餘數量
                        createDate: '2021-05-07T01:49:24.585Z', // 活動建立時間
                        region: {
                            cityId: '200', // 城市代碼
                            cityName: '臺北市', // 城市名稱
                            distId: '2001', // 行政區代碼
                            distName: '松山區', // 行政區名稱
                            villageId: '2001-001', // 村、里代碼
                            villageName: '莊敬里' // 村、里名稱
                        },
                        medicalInfo: [{
                            medicalId: 'A123456789', // 醫事機構代碼
                            medicalName: '王慶森診所', // 醫事機構名稱
                            distId: '2001', // 所屬行政區代碼
                            distName: '松山區', // 所屬行政區名稱
                        }]
                    }, {
                        vaccineGroupId: '1', // 疫苗種類Id
                        vaccineGroupName: '新冠肺炎', // 疫苗種類名稱
                        isReChecked: false, // 是否已經覆核過
                        activityId: '2', // 活動編號
                        activityTitle: '110年6月份新冠疫苗 接種', // 活動名稱
                        implementDate: '2021-06-07T00:00:00.000Z', // 實際施打日期
                        implementStartTime: '2021-06-07T09:00:00.000Z', // 開始施打時間
                        implementEndTime: '2021-06-07T18:00:00.000Z', // 結束施打時間
                        implementAddr: '', // 施打地點
                        endApplyDate: '2021-06-07T18:00:00.000Z', // 結束接受事前報名時間
                        startApplyDate: '2021-06-07T09:00:00.000Z', // 開始接受事前報名時間
                        amount: 500, // 施打數量配額上限
                        leftAmount: 30, // 剩餘數量
                        createDate: '2021-06-07T01:49:24.585Z', // 活動建立時間
                        region: {
                            cityId: '200', // 城市代碼
                            cityName: '臺北市', // 城市名稱
                            distId: '2001', // 行政區代碼
                            distName: '松山區', // 行政區名稱
                            villageId: '2001-001', // 村、里代碼
                            villageName: '莊敬里' // 村、里名稱
                        },
                        medicalInfo: [{
                            medicalId: 'A123456789', // 醫事機構代碼
                            medicalName: '王慶森診所', // 醫事機構名稱
                            distId: '2001', // 所屬行政區代碼
                            distName: '松山區', // 所屬行政區名稱
                        }]
                    }];

                    var datas = [];
                    res.data.forEach((data) => {
                        datas.push({
                            regist_id: data.activityId,
                            regist_create_date: data.createDate.substr(0, 10).replace(/-/g, '/'),
                            regist_title: data.activityTitle,
                            regist_type: data.vaccineGroupId,
                            regist_type_name: data.vaccineGroupName,
                            regist_brand: '',
                            regist_brand_name: '',
                            regist_district: data.region.distId,
                            regist_district_name: data.region.distName,
                            regist_village: data.region.villageId,
                            regist_village_name: data.region.villageName,
                            regist_place: '',
                            regist_institution: data.medicalInfo[0].medicalId,
                            regist_institution_name: data.medicalInfo[0].medicalName,
                            regist_instution_district: data.medicalInfo[0].distId,
                            regist_instution_district_name: data.medicalInfo[0].distName,
                            regist_station_date: data.implementDate.substr(0, 10).replace(/-/g, '/'),
                            regist_station_start_time: data.implementStartTime.substr(11, 5),
                            regist_station_end_time: data.implementEndTime.substr(11, 5),
                            regist_apply_start_date: data.startApplyDate.substr(0, 16).replace(/-/g, '/').replace('T', ' '),
                            regist_apply_end_date: data.endApplyDate.substr(0, 16).replace(/-/g, '/').replace('T', ' '),
                            regist_review_date: '',              
                            regist_qualified: '',
                            regist_quota: data.amount,
                            regist_unpassed: data.amount - data.leftAmount
                        });
                    });

                    results.datas = datas;
                    reslove(results);
                }).catch(ex => {
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        loadDetailForm: function ({ state }, params) {
            return new Promise((reslove) => {
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
                reslove(results);
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
        registForm: function ({ state, rootGetters}, data) {
            return new Promise((reslove, reject) => {
                console.log('new', data);
                var result = { data: [], state: state }
                var url = `${state.apiRoot}api/Activity`;
                var header = rootGetters['user/getToken'];
                var info = {
                    vaccineGroupId: 0,
                    vaccineIds: ["string"],
                    title: "string",
                    implementDate: "2021-06-04T09:28:07.117Z",
                    implementStartDate: "2021-06-04T09:28:07.117Z",
                    implementEndDate: "2021-06-04T09:28:07.117Z",
                    stationAddr: "string",
                    distId: "string",
                    villageId: "string",
                    startApplyDate: "2021-06-04T09:28:07.117Z",
                    endApplyDate: "2021-06-04T09:28:07.117Z",
                    amount: 0,
                    medicalIds: ["string" ]
                }


                axios.post(url, info, header).then((r) => {
                    reslove(r)
                }).catch((e) => {
                    reject(e);
                })



                console.log('new',data);
                reslove(result)

            })
         

        },
        updateRegist: function ({ state }, data) {
            return new Promise((resolve) => {
                var result = { data:[] ,state: state };
                console.log('update',data)
                resolve(result);
            })
        },
        removeRegist: function ({ state }, data) {
            return new Promise((reslove) => {
                var result = { state: state };
                console.log('remove', data);
                reslove(result);
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
                regist_apply_start_date: new Date().toISOString().substr(0, 16).replace(/-/g, '/').replace('T', ' '),
                regist_apply_end_date: new Date().toISOString().substr(0, 16).replace(/-/g, '/').replace('T', ' '),
                regist_review_date: new Date().toISOString().substr(0, 10).replace(/-/g, '/'),///checkTime              
                regist_qualified: 423,
                regist_quota: 500,
                regist_unpassed: 45,
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
                regist_apply_start_date: new Date().toISOString().substr(0, 10).replace(/-/g, '/').replace('T', ' '),
                regist_apply_end_date: new Date().toISOString().substr(0, 10).replace(/-/g, '/').replace('T', ' '),
                regist_review_date: new Date().toISOString().substr(0, 10).replace(/-/g, '/'),///checkTime              
                regist_qualified: '423',
                regist_quota: 500,
                regist_unpassed: 45,

                //checkPassCnt: '0',
            },
        ],
        brands: [
            { id: 'az', name: 'AstraZeneca' },
            { id: 'bnt', name: 'Pfizer-BioNTech' },
        ], 
        vaccines: [
            { id: '0', name: '肺鏈流感' },
            { id: '1', name: '新冠肺炎' },

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
            { text: '戶籍地（北市/非北市）', value: 'censusRegister', sortable: false, flex: 6 },
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
        user: userStore
    }
}