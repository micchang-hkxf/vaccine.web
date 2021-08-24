import axios from 'axios';
export default {
    namespaced: true,
    actions: {
        searchUser({ state }, data) {
            return new Promise(function (resolve, reject) {
                var datas;
                try {
                    var result = { datas: [], totalCount: 0, state: null };
                    axios.get('/testUserList.json')
                        .then(response => {
                            datas = response.data;

                            var testmode = true;
                            var exists = (testmode) ? state.items : datas.data;

                            if (data.userType) {
                                exists = exists.filter(f => f.userType == data.userType);
                            }
                            //if (data.zones) {
                            //    var even = (element) => element == data.zones;
                            //    exists = exists.filter(f => f.zones.some(even));
                            //}


                            if (data.zones) {
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
                                exists = exists.filter(containsDeep(data.zones));

                            }
                            if (data.isEnable) {
                                exists = exists.filter(f => f.isEnable == data.isEnable);
                            }
                            if (data.uName) {
                                exists = exists.filter(f => (f.uName == data.uName || f.acc == data.uName));
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
                            result.datas = exists;

                            result.totalCount = exists.length;
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
        changeUser({ state }, data) {
            return new Promise(function (resolve, reject) {
                var result = {}
                try {
                    var index = state.items.findIndex(f => f.acc == data.acc);

                    if (data.editMode) {
                        state.items[index] = data;
                    } else {
                        if (index == -1) {
                           state.items.push(data); //寫入資料到測試store
                        } else {
                            result.state ='error';
                        }
                    }
                    resolve(result);
                } catch (e) {
                    reject(result);
                }
                //try {
                //    console.log(state)
                //    if (data.editMode) {
                //        //todo
                //    } else {
                //        var setdata = {
                //            "acc": "012",
                //            "uName": "test012",
                //            "email": "012@gmail.com",
                //            "mbNo": "0900000012",
                //            "unitName": "衛生局",
                //            "userType": 0,
                //            "zones": [
                //                "200", "2004"
                //            ]
                //        };
                           
                //        axios({
                //            method: 'post',
                //            url: 'https://vaccine.gov.taipei:8080/api/User?api-version=1.0',
                //            data: setdata,
                //            responseType: 'json',
                //            headers: {
                //                "X-Token": "AP18cdecef93d03485d8755735be7f358f7",
                //            }
                //        }).then(function (response) {
                //            console.log(response.status)

                //        });
                         
                    
                //    }

                //    resolve(result);
                //} catch (e) {
                //    reject(result);
                //}
            });

        },
        removeUser({ state }, delKey) {
            return new Promise(function (resolve, reject) {
                var result = true;
                try {
                    console.log(delKey);
                    var index = state.items.findIndex(f => f.acc == delKey);
                    state.items.splice(index, 1);
                    resolve(result);
                } catch (e) {
                    reject(result);
                }
            });

        },
        getAreaList: function ({ commit }) {

            axios({
                method: 'get',
                url: 'https://vaccine.gov.taipei:8080/api/DataItem/ZoneMap?api-version=1.0',
                data: {},
                headers: {
                    "X-Token": "AP18cdecef93d03485d8755735be7f358f7",
                },
                responseType: 'json',
            }).then(function (res) {
                commit('getAreaList', res.data)
  
   
            });

        },
    },

    state: {
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
                id: 1,
                state: "系統管理員"
            }, {
                id: 2,
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
        getAreaList: function (state, data) {
            var result = [];
            data[0].data.forEach(function (item) {
               result.push({ id: item.distId, state: item.distName });
            });
            state.arealist = result;
        }
    },
    modules: {

    }
}

