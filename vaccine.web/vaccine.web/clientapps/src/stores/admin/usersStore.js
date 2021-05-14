export default {
    namespaced: true,
    actions: {
        searchUser ({ state }, data) {
            return new Promise(function (resolve, reject) {

                var result = {datas:[],totalCount:0,state:null };
                try {
                    var exists = state.items;
                    
                    if (data.userType) {
                        exists = exists.filter(f => f.userType == data.userType);
                    }
                    if (data.zones) {
                        var even = (element) => element == data.zones ;
                        exists = exists.filter(f=>f.zones.some(even));
                    }
                    if (data.isEnable) {
                        exists = exists.filter(f => f.isEnable == data.isEnable);
                    }
                    if (data.uName) {
                        exists = exists.filter(f => (f.uName == data.uName || f.acc == data.uName));
                    }

                    if (exists.length==0) {
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
                } catch (e) {
                    reject(result);
                }

            });
        },
        changeUser ({ state }, data) {
            return new Promise(function (resolve, reject) {
                var result = true;//todo
                try {
      
                    if (data.editMode) {
                        var index = state.items.findIndex(f => f.acc == data.acc);
              
                        state.items[index] = {
                            acc: data.acc,
                            uName: data.uName,
                            email: data.email,
                            mbNo: data.mbNo,
                            unitName: data.unitName,
                            userType:data.userType,
                            zones:data.zones,
                            isEnable: data.isEnable,
                        };
            
                        console.log(state.items[index]);
                    } else { 
                        state.items.push(data);
                    }
         
                    resolve(result);
                } catch (e) {
                    reject(result);
                }
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

        }
    },

    state: {
        arealist: [
            {
                id: 1,
                state: "A區"
            }, {
                id: 2,
                state: "B區"
            }, {
                id: 3,
                state: "C區"
            }, {
                id: 4,
                state: "D區"
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
                zones: ['1'],
                isEnable:'true',
            },
            {
                //checked: false,
                acc: 'u002',
                uName: '姓名2',
                email: 'u002@gmail.com',
                mbNo: '0900000002',
                unitName: 'XX單位2',
                userType: 2,
                zones: ['2', '3'],
                isEnable: 'true',
            },
            {
                //checked: false,
                acc: 'u003',
                uName: '姓名3',
                email: 'u003@gmail.com',
                mbNo: '0900000003',
                unitName: 'XX單位3',
                userType: 2,
                zones: ['3','4' ],
                isEnable: 'true',
            },
            {
                //checked: false,
                acc: 'u004',
                uName: '姓名(test disable)',
                email: 'u004@gmail.com',
                mbNo: '0900000004',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['2'],
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
                zones: ['2'],
                isEnable:'true',
            },
            {
                //checked: false,
                acc: 'u006',
                uName: '姓名6',
                email: 'u0061@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['3'],
                isEnable: 'true',
            },
            {
                //checked: false,
                acc: 'u007',
                uName: '姓名7',
                email: 'u007@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['4'],
                isEnable: 'true',
            },
            {
                //checked: false,
                acc: 'u008',
                uName: '姓名8',
                email: 'u008@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['3'],
                isEnable: 'true',
            },
            {
                //checked: false,
                acc: 'u009',
                uName: '姓名09',
                email: 'u009@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                zones: [ '3','4'],
                isEnable: 'false',
            },
            {
                //checked: false,
                acc: 'u010',
                uName: '姓名10',
                email: 'u001@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['3', '4'],
                isEnable: 'false',
            },
            {
                //checked: false,
                acc: 'u011',
                uName: '姓名11',
                email: 'u001@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['2', '4'],
                isEnable: true,
            },
            {
                //checked: false,
                acc: 'u012',
                uName: '姓名1',
                email: 'u012@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['3'],
                isEnable: true,
            },
        ],
    },
    getters: {
        getTableItems: state => state.items,
        getAreaItems: state => state.arealist,
        getRoleItems: state => state.rolelist,

    },
    mutations: {
      
    },
    modules: {

    }
}

