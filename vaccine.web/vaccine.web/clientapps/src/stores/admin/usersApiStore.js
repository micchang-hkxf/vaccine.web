import axios from 'axios';
import siteConfig from "project/site.config"
export default {
    namespaced: true,
    actions: {
        searchUser({ state }, params) {
            console.log(state);
            return new Promise(function (resolve, reject) {
                var datas, testmode = false;
      
                try {

                    var apiUrl = (testmode) ? '/testUserList.json' : `${state.apiRoot}api/User?api-version=1.0`,
                        result = { datas: [], state: '', totalCount: 0, page: 0, rows: 0 };
                    axios({
                        method: 'get',
                        url: apiUrl,
                        responseType: 'json',
                        headers: {
                            "X-Token": "AP115a8b8790fbe415a973aa385fec9a770",
                        },
                        params: {
                            page: params.page,
                            rows: params.rows,
                            userTypeFilter: params.userType,
                            statusFilter: params.isEnable,
                            keyword: params.uName,
                        },
                    }).then(response => {
                        datas = response.data;

                        var exists = [];

                        if (testmode) {
                            exists = state.items;
                            if (params.userType) {
                                exists = exists.filter(f => f.userType == params.userType);
                            }
                            //if (data.zones) {
                            //    var even = (element) => element == data.zones;
                            //    exists = exists.filter(f => f.zones.some(even));
                            //}
                            if (params.zones) {
                                const containsDeep = (text) => (value) => {
                                    if (!value) return false;
                                    const valueType = typeof value;

                                    if (valueType === 'string') {
                                        return value.toLowerCase().indexOf(text.toLowerCase()) > -1;
                                    }
                                    if (Array.isArray(value)) {
                                        return value.some(containsDeep(text));
                                    }
                                    if (valueType === 'object') {
                                        return Object.values(value).some(containsDeep(text));
                                    }
                                    return false;
                                };
                                exists = exists.filter(containsDeep(params.zones));

                            }
                            if (params.isEnable) {
                                exists = exists.filter(f => f.isEnable == params.isEnable);
                            }
                            if (params.uName) {
                                exists = exists.filter(f => (f.uName == params.uName || f.acc == params.uName));
                            }

                            if (exists.length == 0) {
                                result.state = 'not_found';
                                resolve(result);
                                return;
                            }
                            if (exists.state === 'network_abnormal') {
                                result.state = exists.state;
                                throw result;
                            }
                            result.totalCount = exists.length;
                        } else {
                            exists = datas.data;
                            exists.forEach(function (obj) {
                                obj.unitName = obj.unit;
                                delete obj.unit;
                            });
                            result.totalCount = datas.totalRows;

                        }

                        result.datas = exists;
                        result.state = exists.state
                       
                        resolve(result);
                   
                    })
                    .catch(error => {
                        console.log(error);
                        })
                } catch (e) {
                    reject(result);
                }

            });
        },

        modifyPassword({ state }, setdata) {
            return new Promise(function (resolve, reject) {
                var results = { datas: [], state: '' };
                var apiUrl = `${state.apiRoot}api/User/Login`;
                alert(apiUrl);
                console.log(state);
                axios({
                    method: 'put',
                    url: `${state.apiRoot}api/User/Login?api-version=1.0`,
                    data: setdata,
                    responseType: 'json',
                    headers: {
                        "X-Token": "AP115a8b8790fbe415a973aa385fec9a770",
                    }
                }).then(res => {
                    results.datas = res;
                    resolve(results);
                 }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                 });


            });

        },
        changeUser({ state }, data) {
            return new Promise(function (resolve,reject) {
                var results = { datas: [], state: '' };
                console.log(state);
                //var setdata = {
                //    "acc": "012",
                //    "uName": "test012",
                //    "email": "012@gmail.com",
                //    "mbNo": "0900000012",
                //    "unitName": "衛生局",
                //    "userType": 0,
                //    "zones": [
                //        "200", "2004"
                //    ]
                //};

                var setdata = {
                    "acc": data.acc,
                    "uName": data.uName,
                    "email": "test@gmail.com",//todo
                    "mbNo": data.mbNo,
                    "unitName": data.unitName,
                    "userType": data.userType,
                    "isEnable": data.isEnable=="true",
                    "zones": data.zones
                };
                var method = "post";//new user
                if (data.editMode) {
                    method = "put";//update user
                }
                 
                axios({
                    method: method,
                    url: `${state.apiRoot}api/User?api-version=1.0`,
                    data: setdata,
                    responseType: 'json',
                    headers: {
                        "X-Token": "AP115a8b8790fbe415a973aa385fec9a770",
                    }
                }).then(res => {
                    results.datas = res;
                    resolve(results);
                }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });
        
          
            });

        },
        removeUser({ state }, delKey) {
            console.log(state);
            return new Promise(function (resolve, reject) {
                var results = { datas: [], state: '' };
                axios({
                    method: 'delete',
                    url: `${state.apiRoot}api/User?api-version=1.0&acc=` + delKey,
                    responseType: 'json',
                    headers: {
                        "X-Token": "AP115a8b8790fbe415a973aa385fec9a770",
                    }
                }).then(res => {
                    results.datas = res;
                    resolve(results);
                }).catch(ex => {
                    results.state = 'error';
                    results.datas = ex;
                    reject(results);
                });

            });

        },
        getAreaList: function ({ state ,commit }) {

            axios({
                method: 'get',
                url: `${state.apiRoot}api/DataItem/ZoneMap?api-version=1.0`,
                data: {},
                headers: {
                    "X-Token": "AP115a8b8790fbe415a973aa385fec9a770",
                },
                responseType: 'json',
            }).then(function (res) {
                commit('getAreaList', res.data)
            });

        },
    },

    state: {
        ...siteConfig,
        arealist: [
            {
                id: 2001,
                state: "A區"
            }, {
                id: 2002,
                state: "B區"
            }, {
                id: 2003,
                state: "C區"
            }, {
                id: 2004,
                state: "D區"
            }, {
                id: 2005,
                state: "E區"
            }
        ],
        rolelist: [
            {
                id: 0,
                state: "系統管理員"
            }, {
                id: 1,
                state: "轄區管理員"
            }
        ],

        items: [
            {
                //checked: false,
                acc: 'u001',
                uName: '姓名1',
                email: 'u001@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                userTypeDesc: "系統管理員",
                lastAccessTime: "2021-05-20 08:26:43",
                pdExpTime: "2021-05-20 08:26:43",
                zones: [
                    {
                        "cityId": "1",
                        "cityName": "台北市",
                        "hasAuth": true,
                        "data": [
                            {
                                "distId": "1",
                                "distName": "A區",
                                "hasAuth": true,
                                "data": [
                                    {
                                        "villageId": "string",
                                        "villageName": "string",
                                        "hasAuth": true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                isEnable: 'true',
            },
            {
                //checked: false,
                acc: 'u002',
                uName: '姓名2',
                email: 'u002@gmail.com',
                mbNo: '0900000002',
                unitName: 'XX單位2',
                userType: 2,
                userTypeDesc: "轄區管理員",
                lastAccessTime: "2021-05-20 08:26:43",
                pdExpTime: "2021-05-20 08:26:43",
                //zones: [2,3],
                zones: [
                    {
                        "cityId": "1",
                        "cityName": "台北市",
                        "hasAuth": true,
                        "data": [
                            {
                                "distId": "2",
                                "distName": "B區",
                                "hasAuth": true,
                                "data": [
                                    {
                                        "villageId": "string",
                                        "villageName": "string",
                                        "hasAuth": true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                isEnable: 'false',
            },
            {
                //checked: false,
                acc: 'u003',
                uName: '姓名3',
                email: 'u003@gmail.com',
                mbNo: '0900000003',
                unitName: 'XX單位3',
                userType: 2,
                userTypeDesc: "轄區管理員",
                lastAccessTime: "2021-05-20 08:26:43",
                pdExpTime: "2021-05-20 08:26:43",
                //zones: [3,4],
                zones: [
                    {
                        "cityId": "1",
                        "cityName": "台北市",
                        "hasAuth": true,
                        "data": [
                            {
                                "distId": "3",
                                "distName": "C區",
                                "hasAuth": true,
                                "data": [
                                    {
                                        "villageId": "string",
                                        "villageName": "string",
                                        "hasAuth": true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                isEnable: 'true',
            },
            {
                //checked: false,
                acc: 'u004',
                uName: '姓名(test disable)',
                email: 'u004@gmail.com',
                mbNo: '0900000004',
                unitName: 'XX單位1',
                userType: 2,
                userTypeDesc: "轄區管理員",
                lastAccessTime: "2021-05-20 08:26:43",
                pdExpTime: "2021-05-20 08:26:43",
                //zones: [2],
                zones: [
                    {
                        "cityId": "1",
                        "cityName": "台北市",
                        "hasAuth": true,
                        "data": [
                            {
                                "distId": "1",
                                "distName": "A區",
                                "hasAuth": true,
                                "data": [
                                    {
                                        "villageId": "string",
                                        "villageName": "string",
                                        "hasAuth": true
                                    }
                                ]
                            },
                            {
                                "distId": "2",
                                "distName": "B區",
                                "hasAuth": true,
                                "data": [
                                    {
                                        "villageId": "string",
                                        "villageName": "string",
                                        "hasAuth": true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                isEnable: 'false',
            },
            {
                //checked: false,
                acc: 'u005',
                uName: '姓名5',
                email: 'u005@gmail.com',
                mbNo: '0900000005',
                unitName: 'XX單位1',
                userType: 1,
                userTypeDesc: "系統管理員",
                lastAccessTime: "2021-05-20 08:26:43",
                pdExpTime: "2021-05-20 08:26:43",
                //zones: [2],
                zones: [
                    {
                        "cityId": "1",
                        "cityName": "台北市",
                        "hasAuth": true,
                        "data": [
                            {
                                "distId": "4",
                                "distName": "D區",
                                "hasAuth": true,
                                "data": [
                                    {
                                        "villageId": "string",
                                        "villageName": "string",
                                        "hasAuth": true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                isEnable: 'true',
            },
            {
                //checked: false,
                acc: 'u006',
                uName: '姓名6',
                email: 'u0061@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                userTypeDesc: "系統管理員",
                lastAccessTime: "2021-05-20 08:26:43",
                pdExpTime: "2021-05-20 08:26:43",
                //zones: [3],
                zones: [
                    {
                        "cityId": "1",
                        "cityName": "台北市",
                        "hasAuth": true,
                        "data": [
                            {
                                "distId": "2",
                                "distName": "B區",
                                "hasAuth": true,
                                "data": [
                                    {
                                        "villageId": "string",
                                        "villageName": "string",
                                        "hasAuth": true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                isEnable: 'true',
            },
            {
                //checked: false,
                acc: 'u007',
                uName: '姓名7',
                email: 'u007@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 2,
                userTypeDesc: "轄區管理員",
                lastAccessTime: "2021-05-20 08:26:43",
                pdExpTime: "2021-05-20 08:26:43",
                //zones: [4],
                zones: [
                    {
                        "cityId": "1",
                        "cityName": "台北市",
                        "hasAuth": true,
                        "data": [
                            {
                                "distId": "1",
                                "distName": "A區",
                                "hasAuth": true,
                                "data": [
                                    {
                                        "villageId": "string",
                                        "villageName": "string",
                                        "hasAuth": true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                isEnable: 'true',
            },
            {
                //checked: false,
                acc: 'u008',
                uName: '姓名8',
                email: 'u008@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 2,
                userTypeDesc: "轄區管理員",
                lastAccessTime: "2021-05-20 08:26:43",
                pdExpTime: "2021-05-20 08:26:43",
                //zones: [3],
                zones: [
                    {
                        "cityId": "1",
                        "cityName": "台北市",
                        "hasAuth": true,
                        "data": [
                            {
                                "distId": "1",
                                "distName": "A區",
                                "hasAuth": true,
                                "data": [
                                    {
                                        "villageId": "string",
                                        "villageName": "string",
                                        "hasAuth": true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                isEnable: 'true',
            },
            {
                //checked: false,
                acc: 'u009',
                uName: '姓名09',
                email: 'u009@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 2,
                userTypeDesc: "轄區管理員",
                lastAccessTime: "2021-05-20 08:26:43",
                pdExpTime: "2021-05-20 08:26:43",
                //zones: [3,4],
                zones: [
                    {
                        "cityId": "1",
                        "cityName": "台北市",
                        "hasAuth": true,
                        "data": [
                            {
                                "distId": "1",
                                "distName": "A區",
                                "hasAuth": true,
                                "data": [
                                    {
                                        "villageId": "string",
                                        "villageName": "string",
                                        "hasAuth": true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                isEnable: 'false',
            },
            {
                //checked: false,
                acc: 'u010',
                uName: '姓名10',
                email: 'u001@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 2,
                //zones: [3, 4],
                zones: [
                    {
                        "cityId": "1",
                        "cityName": "台北市",
                        "hasAuth": true,
                        "data": [
                            {
                                "distId": "1",
                                "distName": "A區",
                                "hasAuth": true,
                                "data": [
                                    {
                                        "villageId": "string",
                                        "villageName": "string",
                                        "hasAuth": true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                userTypeDesc: "轄區管理員",
                lastAccessTime: "2021-05-20 08:26:43",
                pdExpTime: "2021-05-20 08:26:43",
                isEnable: 'false',
            },
            {
                //checked: false,
                acc: 'u011',
                uName: '姓名11',
                email: 'u001@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 2,
                userTypeDesc: "轄區管理員",
                lastAccessTime: "2021-05-20 08:26:43",
                pdExpTime: "2021-05-20 08:26:43",
                //zones: [2, 4],
                zones: [
                    {
                        "cityId": "1",
                        "cityName": "台北市",
                        "hasAuth": true,
                        "data": [
                            {
                                "distId": "1",
                                "distName": "A區",
                                "hasAuth": true,
                                "data": [
                                    {
                                        "villageId": "string",
                                        "villageName": "string",
                                        "hasAuth": true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                isEnable: true,
            },
            {
                //checked: false,
                acc: 'u012',
                uName: '姓名1',
                email: 'u012@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 2,
                userTypeDesc: "轄區管理員",
                lastAccessTime: "2021-05-20 08:26:43",
                pdExpTime: "2021-05-20 08:26:43",
                //zones: [3],
                zones: [
                    {
                        "cityId": "1",
                        "cityName": "台北市",
                        "hasAuth": true,
                        "data": [
                            {
                                "distId": "1",
                                "distName": "A區",
                                "hasAuth": true,
                                "data": [
                                    {
                                        "villageId": "string",
                                        "villageName": "string",
                                        "hasAuth": true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                isEnable: true,
            },
        ],
    },
    getters: {
        getTableItems: state => state.items,
        getAreaItems: state => state.arealist,

        
        getRoleItems: state => state.rolelist,
        getRoleListById: state => (id) => {
            return state.rolelist.find(f => f.id === id)
        },
        getAreaListById: state => (id) => {
            return state.arealist.find(f => f.id === id)
        }
    },
    mutations: {
        //getAreaList: function (state, data) {
        //    var result = [];
        //    data[0].data.forEach(function (item) {
        //       result.push({ id: item.distId, state: item.distName });
        //    });
        //    state.arealist = result;
        //}
    },
    modules: {

    }
}


