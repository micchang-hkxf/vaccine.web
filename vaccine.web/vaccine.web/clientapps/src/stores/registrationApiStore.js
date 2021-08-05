﻿import userStore from "stores/userStore"
import siteConfig from "project/site.config"
import axios from 'axios'
import { Promise } from "core-js";

export default {
    namespaced: true,
    actions: {
        loadVaccines: function ({ state, commit, rootGetters }, params) {
            var datas = [],brands=[];
            var vaccines = rootGetters['user/getVaccines'];
            if (vaccines !== null) {
                vaccines.forEach((data) => {
                    datas.push({
                        id: data.groupId,
                        name: data.groupName
                    });

                    if (params && (data.groupId === params.id)) {
                        data.vaccines.forEach((subdata) => {
                            //console.log(data.groupName + ":" + subdata.itemId + "@" + subdata.itemName);
                            brands.push({
                                id: subdata.itemId,
                                name: subdata.itemName
                            });
                        });
                    }
                });
                state.vaccines = datas;
                state.brands = brands;
                return;
            }
                
            var apiUrl = `${state.apiRoot}api/DataItem/Vaccines`;

            axios.get(apiUrl,
                rootGetters['user/getApiHeader']
            ).then(res => {
                res.data.forEach((data) => {
                    datas.push({
                        id: data.groupId,
                        name: data.groupName
                    });
                });
                state.vaccines = datas;
                    
                commit('user/setVaccines', res.data);
            });
        },
        loadDists: function ({ state, rootGetters }) {
            var zones = rootGetters['user/getZones'];
            var dists = [];
            zones.forEach((zone) => {
                zone.data.forEach((dist) => {
                    dists.push({
                        id: dist.distId,
                        name: dist.distName
                    });
                });
            });

            state.districts = dists;
        },
        loadVillages: function ({ state, rootGetters }, params) {
            
            var zones = rootGetters['user/getZones'];
            var villages = [];
            zones.forEach((zone) => {
                zone.data.forEach((dist) => {
                    if (dist.distId === params.id) {
                        dist.data.forEach((village) => {
                            villages.push({
                                id: village.villageId,
                                name: village.villageName
                            });
                        });
                    }
                });
            });
            state.villages = villages;
            state.institutions = [];
        },
        loadMedicals: function ({ state, commit, rootGetters }) {
            var medicals = rootGetters['user/getMedicals'];
            if (medicals !== null) return;

            var apiUrl = `${state.apiRoot}api/DataItem/Medical`;

            axios.get(apiUrl,
                rootGetters['user/getApiHeader']
            ).then(res => {
                commit('user/setMedicals', res.data);
            });
        },
        loadMedicalsByVillage: function ({ state, rootGetters }, params) {
            var medicals = rootGetters['user/getMedicals'];
            if (medicals === null) return;
            var datas = [];
 
            medicals.forEach((medical) => {
                if (medical.villageName === params.name) {
                    datas.push({
                        id: medical.id,
                        name: medical.uName,
                        from: medical.distName + "/" + medical.villageName
                    });
                }
            });
            state.institutions = datas;
        },
   

        loadRegistForm: function ({ state, rootGetters }, params) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity`;
                var results = { datas: [], state: '', totalCount: 0 };

                var medicalOrgIdFilter = (typeof params.institution === 'undefined' || params.institution === '' || params.institution.id === '') ? 'all' : params.institution.id;
                var distIdFilter       = (typeof params.district    === 'undefined' || params.district    === '' || params.district.id    === '') ? 'all' : params.district.id;
                var villageIdFilter    = (typeof params.village     === 'undefined' || params.village     === '' || params.village.id     === '') ? 'all' : params.village.id;
                var vaccineGroupId     = (typeof params.vaccine     === 'undefined' || params.vaccine     === '' || params.vaccine.id     === '') ?  null : params.vaccine.id;
                var keyword            =                                                                            params.keyWord        === ''  ?  null : params.keyWord;
                
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
                    results.totalCount = res.data.totalRows;
                    
                    var datas = [];
                    res.data.data.forEach((data) => {
                        
                        datas.push({
                            regist_id: data.activityId,
                            regist_create_date: data.createDate.substr(0, 10).replace(/-/g, '/'),
                            regist_title: data.activityTitle,
                            regist_type: data.vaccineGroupId,
                            regist_type_name: data.vaccineGroupName,
                            regist_brand: (data.vaccines[0] != undefined) ? data.vaccines[0].itemId : "",
                            regist_brand_name: (data.vaccines[0] != undefined) ? data.vaccines[0].itemName : "",
                            regist_district: data.region.distId,
                            regist_district_name: data.region.distName,
                            regist_village: data.region.villageId,
                            regist_village_name: data.region.villageName,
                            regist_place: data.implementAddr,
                            regist_institution: data.medicalInfo.length > 0 ? data.medicalInfo[0].medicalId : '',
                            regist_institution_name: data.medicalInfo.length > 0 ? data.medicalInfo[0].medicalName : '',
                            regist_institution_code: data.medicalInfo.length > 0 ? data.medicalInfo[0].medicalId : '',
                            regist_instution_district: data.medicalInfo.length > 0 ? data.medicalInfo[0].distId : '',
                            regist_instution_district_name: data.medicalInfo.length > 0 ? data.medicalInfo[0].distName + '/' + data.region.villageName : '',
                            regist_station_date: data.implementDate.substr(0, 10),
                            regist_station_start_time: data.implementStartTime.substr(11, 5),
                            regist_station_end_time: data.implementEndTime.substr(11, 5),
                            regist_apply_start_date: data.startApplyDate.substr(0, 10),
                            regist_apply_end_date: data.endApplyDate.substr(0, 10),
                            regist_review_date: '',
                            regist_qualified: '',
                            regist_quota: data.amount,
                            regist_age_limit: (parseInt(data.actAge) > 0) ? parseInt(data.actAge) :"",
                            regist_unpassed: data.amount - data.leftAmount
                        });
                    });

                    results.datas = datas;
                    resolve(results);
                }).catch(ex => {
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        loadDetailForm: function ({ state, rootGetters }, params) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity/Detail/` + params.id;
                var results = { datas: [], state: '', totalCount: 0 };

                var keyword = params.keyWord === '' ? null : params.keyWord;

                axios.get(apiUrl, {
                    params: {
                        page: params.page,                      // 頁數
                        rows: params.pageSize,                  // 每頁筆數
                        keyword: keyword,                       // 關鍵字
                    },
                    headers: {
                        'x-token': rootGetters['user/getToken']
                    }
                }).then(res => {
                    results.totalCount = res.data.totlaCount;

                    var datas = [];
                    res.data.data.forEach((data) => {
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
                            remark: data.memo
                        });
                    });

                    results.datas = datas;
                    resolve(results);
                }).catch(ex => {
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        
        getCompleteFile: function ({ state, rootGetters }, params) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity/Export/Agreement?activityId=` + params.id;
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
                    const filename = '完整接種同意書.xlsx';
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
                })).catch(ex => {
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        getSignUpFile: function ({ state, rootGetters }, params) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity/Export/ApplyList?activityId=` + params.id;
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
                    const filename = '報名清冊.xlsx';
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
                })).catch(ex => {
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        getVaccinationFile: function ({ state, rootGetters }, params) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity/Export/VaccinationList?activityId=` + params.id;
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
                    const filename = '施打清冊.xlsx';
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
                })).catch(ex => {
                    results.datas = ex;
                    reject(results);
                });
            });
        },
        getAgreeFile: function ({ state, rootGetters }, params) {
            return new Promise((resolve, reject) => {
                var apiUrl = `${state.apiRoot}api/Activity/Export/Agreement/` + params.id;
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
                    const filename = params.name + '_接種同意書_' + new Date().toISOString().substr(0, 10) + '.pdf';
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
                })).catch(ex => {
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
            return new Promise((resolve, reject) => {
                console.log('new', data);

                var result = { data: [], state: state }
  
                var setData = [{
                    vaccineGroupId: data.model.regist_type.id,
                    vaccineIds: [data.model.regist_brand.id],
                    title: data.model.regist_title,
                    implementDate: data.model.regist_station_date,
                    implementStartDate: data.model.regist_station_date + "T" + data.model.regist_station_start_time,
                    implementEndDate: data.model.regist_station_date + "T" + data.model.regist_station_end_time,
                    stationAddr: data.model.regist_place,
                    distId: data.model.regist_district.id,
                    villageId: data.model.regist_village.id,
                    startApplyDate: data.model.regist_apply_start_date,
                    endApplyDate: data.model.regist_apply_end_date,
                    amount: parseInt(data.model.regist_quota),
                    medicalIds: [data.model.regist_institution.id],
                    actAge: parseInt(data.model.regist_age_limit),
                    //remarks: [data.model.remarks],
                }];
                console.log("setData", setData);
            
                axios({
                    method: 'post',
                    url: `${state.apiRoot}api/Activity?api-version=1.0`,
                    data: setData,
                    responseType:'json',
                    headers: {
                        'x-token': rootGetters['user/getToken']
                    }
                }).then(res => {
                    result.datas = res.data;
                    resolve(result);
                }).catch(ex => {
                    result.datas = ex;
                    reject(result);
                });

            })
         

        },
        importRegistForm: function ({ state, rootGetters }, importData) {
            var setData = [];
            importData.forEach((d) => {
          
                if (d[2]!="") {
                    setData.push({
                        vaccineGroupId: d[0],
                        vaccineIds: [d[1]],
                        title: d[2],
                        distId: d[3],
                        villageId: d[4],
                        stationAddr: d[5],
                        medicalIds: [d[6]],
                        implementDate: d[7],
                        implementStartDate: d[7] + "T" + d[8] + ":00",
                        implementEndDate: d[7] + "T" + d[9] + ":00",
                        startApplyDate: d[10],
                        endApplyDate: d[11],
                        amount: parseInt(d[12]),
                        actAge: parseInt(d[13]),
                        //remarks: parseInt(d[14]),
                    });
                }
            });
         

            return new Promise((reslove, reject) => {
                console.log('import', setData);
                var result = { data: [], state: state }
                axios({
                    method: 'post',
                    url: `${state.apiRoot}api/Activity?api-version=1.0`,
                    data: setData,
                    responseType: 'json',
                    headers: {
                        'x-token': rootGetters['user/getToken']
                    }
                }).then(res => {
                    result.datas = res.data;
                    reslove(result);
                }).catch(ex => {
                    result.datas = ex;
                    reject(result);
                });

            })
        },
        updateRegist: function ({ state, rootGetters }, data) {
            return new Promise((resolve, reject) => {
                var result = { data:[] ,state: state };
                console.log('update',data)
                var setData = {
                    vaccineGroupId: data.model.regist_type.id,
                    vaccineIds: data.model.regist_brand.id ? [data.model.regist_brand.id]:[data.model.regist_brand],
                    title: data.model.regist_title,
                    implementDate: data.model.regist_station_date.replace(/\//g, '-'),
                    implementStartDate: data.model.regist_station_date.replace(/\//g, '-') + "T" + data.model.regist_station_start_time + ":00",
                    implementEndDate: data.model.regist_station_date.replace(/\//g, '-') + "T" + data.model.regist_station_end_time + ":00",
                    stationAddr: data.model.regist_place,
                    distId: data.model.regist_district,
                    villageId: (typeof data.model.regist_village == "object") ? data.model.regist_village.id : data.model.regist_village,
                    startApplyDate: data.model.regist_apply_start_date.replace(/\//g, '-'),
                    endApplyDate: data.model.regist_apply_end_date.replace(/\//g, '-'),
                    amount: parseInt(data.model.regist_quota),
                    medicalIds: [data.model.regist_institution_code],
                    actAge: parseInt(data.model.regist_age_limit),
                      //remarks: [data.model.remarks],
                };
         
                console.log('setData', setData);
                axios({
                    method: 'put',
                    url: `${state.apiRoot}api/Activity/Detail/` + data.model.regist_id+'?api-version=1.0',
                    data: setData,
                    responseType: 'json',
                    headers: {
                        'x-token': rootGetters['user/getToken']
                    }
                }).then(res => {
                    result.datas = res.status;
                    resolve(result);
                }).catch(ex => {
                    console.log('ex', ex);
                    result.datas = ex;
                    reject(result);
                });
            })
        },
        removeRegist: function ({ state, rootGetters }, data) {
            return new Promise((resolve, reject) => {
                var result = { state: state }, actIdLists="";
                data.forEach((d) => {
                    actIdLists+='&actIdList='+d.regist_id;
                });
               
                console.log('remove', data);
                axios({
                    method: 'delete',
                    url: `${state.apiRoot}api/Activity?api-version=1.0` + actIdLists,
                    responseType: 'json',
                    headers: {
                        'x-token': rootGetters['user/getToken']
                    }
                }).then(res => {
                    result.datas = res.data;
                    resolve(result);
                }).catch(ex => {
                    result.datas = ex;
                    reject(result);
                });
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
            { id: 'AZ', name: 'AstraZeneca' },
            { id: 'bnt', name: 'Pfizer-BioNTech' },
        ], 
        vaccines: [],
        districts: [],
        villages: [],
        institutions: [],
        registrationHeaders: [
            { text: '報名日期', value: 'date', align: 'start', sortable: true, flex: 6 },
            { text: '姓名', value: 'name', sortable: false, flex: 6 },
            { text: '序號', value: 'serialNumber', sortable: false, flex: 6 },
            { text: '性別', value: 'gender', sortable: false, flex: 6 },
            { text: '生日', value: 'birthday', sortable: false, flex: 6 },
            { text: '身分證', value: 'identity', sortable: false, flex: 6 },
            { text: '手機', value: 'phone', sortable: false, flex: 6 },
            { text: '戶籍地（北市/非北市）', value: 'censusRegister', sortable: false, flex: 6 },
            { text: '報名方式', value: 'type', sortable: false, flex: 6 },
            { text: '複檢結果', value: 'result', sortable: false, flex: 6 },
            { text: '備註', value: 'remark', sortable: false, flex: 6 },
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
        getBrands: state => {
            return state.brands;
        },
    },
    mutations: {
    },
    modules: {
        user: userStore
    }
}