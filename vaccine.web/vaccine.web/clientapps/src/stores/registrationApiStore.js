﻿import userStore from "stores/userStore"
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
        loadDetailForm: function ({ state, rootGetters }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity/Detail/` + params.id;
                var results = { datas: [], state: '', totalCount: 0 };
                
                axios.get(apiUrl,
                    rootGetters['user/getApiHeader']
                ).then(res => {
                    // TODO: 測試資料，之後移除
                    res.data = [{
                        signUpTime: '2021-06-09T06:59:08.767Z', // 報名時間
                        uName: '袁●吉', // 去識別的使用者姓名
                        applyNo: 1, // 報名流水號
                        gender: 'M', // 性別
                        bd: '2021-06-09T06:59:08.767Z', // 生日
                        uId: 'B●●●●●●236', // 去識別化身分證號
                        mbNo: '0910123456', // 電話
                        isCitizen: true, // 是否為台北市民
                        signUpChannel: 0, // 報名管道 0:網路自行報名 1: 現場報名
                        eligible: true, // 是否合格
                        canPrintLabel: true,
                        isIndigenous: true // 是否為原住民
                    }];
                    
                    results.totalCount = res.data.length;

                    var datas = [];
                    res.data.forEach((data) => {
                        datas.push({
                            id: data.applyNo,
                            date: data.signUpTime.substr(0, 16).replace(/-/g, '/').replace('T', ' '),
                            name: data.uName,
                            serialNumber: data.applyNo,
                            gender: data.gender,
                            birthday: data.bd.substr(0, 10).replace(/-/g, '/'),
                            identity: data.uId,
                            phone: data.mbNo,
                            censusRegister: data.isCitizen ? '北市' : '非北市',
                            type: data.signUpChannel ? '現場報名' : '網路自行報名',
                            result: data.eligible ? '合格' : '不合格',
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
        getCompleteFile: function ({ state, rootGetters }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity/Export/Agreement`;
                var results = { datas: [], state: '' };

                axios.get(apiUrl, {
                    params: {
                        activityId: params.id
                    },
                    headers: {
                        'x-token': rootGetters['user/getToken']
                    }
                }).then(res => {
                    results.datas = res.data;
                    reslove(results);
                }).catch(ex => {
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        getSignUpFile: function ({ state, rootGetters }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity/Export/ApplyList`;
                var results = { datas: [], state: '' };

                axios.get(apiUrl, {
                    params: {
                        activityId: params.id
                    },
                    headers: {
                        'x-token': rootGetters['user/getToken']
                    }
                }).then(res => {
                    results.datas = res.data;
                    reslove(results);
                }).catch(ex => {
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        getVaccinationFile: function ({ state, rootGetters }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity/Export/VaccinationList`;
                var results = { datas: [], state: '' };

                axios.get(apiUrl, {
                    params: {
                        activityId: params.id
                    },
                    headers: {
                        'x-token': rootGetters['user/getToken']
                    }
                }).then(res => {
                    results.datas = res.data;
                    reslove(results);
                }).catch(ex => {
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        getAgreeFile: function ({ state, rootGetters }, params) {
            return new Promise((reslove, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity/Export/Agreement/` + params.id;
                var results = { datas: [], state: '' };

                axios.get(apiUrl,
                    rootGetters['user/getApiHeader']
                ).then(res => {
                    results.datas = res.data;
                    reslove(results);
                }).catch(ex => {
                    results.datas = ex;
                    reject(results);
                });
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
            { text: '複檢合格數', value: 'regist_qualified', sortable: false, flex: 6 },
            { text: '', value: 'modify', sortable: false },
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
    },
    getters: {
        getHeaders: state => {
            return state.headers;
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
    },
    mutations: {
    },
    modules: {
        user: userStore
    }
}