export default {
    namespaced: true,
    actions: {
        filterData ({ state }, data) {
            return new Promise(function (resolve, reject) {
         
                var result = {acc: data.acc };
                try {
                    var exist = state.items.acc.find(f => f.acc == data.acc);

                    if (!exist) {
                        result.state = 'not found';
                        resolve(result);
                        return;
                    }


                    if (exist.state === 'network abnormal') {
                        result.state = exist.state;
                        throw result;
                    }

                    result.state = exist.state;
                    resolve(result);
                } catch (e) {
                    reject(result);
                }

            });
        },
    },
    state: {
        arealist: [
            {
                id: 1,
                state: "A區"
            },{
                id: 2,
                state: "B區"
         
            }
        ],
        rolelist: [
            {
                id: 'admin',
                state: "系統管理員"
            }, {
                id: 'areaadmin',
                state: "轄區管理員"

            }
        ],
        userlist: [
            {
                id: 1,
                state: "UserA/001"
            }, {
                id: 2,
                state: "UserB/002"

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
                zones: ['11', '22'],
                isEnable:true,
            },
            {
                //checked: false,
                acc: 'u002',
                uName: '姓名2',
                email: 'u002@gmail.com',
                mbNo: '0900000002',
                unitName: 'XX單位2',
                userType: 2,
                zones: ['33', '44'],
                isEnable: true,
            },
            {
                //checked: false,
                acc: 'u003',
                uName: '姓名3',
                email: 'u003@gmail.com',
                mbNo: '0900000003',
                unitName: 'XX單位3',
                userType: 2,
                zones: ['11', '33'],
                isEnable: true,
            },
            {
                //checked: false,
                acc: 'u004',
                uName: '姓名(test disable)',
                email: 'u004@gmail.com',
                mbNo: '0900000004',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['11', '22'],
                isEnable: false,
            },
            {
                //checked: false,
                acc: 'u005',
                uName: '姓名5',
                email: 'u005@gmail.com',
                mbNo: '0900000005',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['11', '22'],
                isEnable: true,
            },
            {
                //checked: false,
                acc: 'u006',
                uName: '姓名6',
                email: 'u0061@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['11', '22'],
                isEnable: true,
            },
            {
                //checked: false,
                acc: 'u007',
                uName: '姓名7',
                email: 'u007@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['11', '22'],
                isEnable: true,
            },
            {
                //checked: false,
                acc: 'u008',
                uName: '姓名8',
                email: 'u008@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['11', '22'],
                isEnable: true,
            },
            {
                //checked: false,
                acc: 'u009',
                uName: '姓名1',
                email: 'u009@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['11', '22'],
                isEnable: true,
            },
            {
                //checked: false,
                acc: 'u010',
                uName: '姓名10',
                email: 'u001@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['11', '22'],
                isEnable: true,
            },
            {
                //checked: false,
                acc: 'u011',
                uName: '姓名11',
                email: 'u001@gmail.com',
                mbNo: '0900000001',
                unitName: 'XX單位1',
                userType: 1,
                zones: ['11', '22'],
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
                zones: ['11', '22'],
                isEnable: true,
            },
        ],
    },
    getters: {
        getTableItems: state => state.items,
        getAreaItems: state => state.arealist,
        getRoleItems: state => state.rolelist,
        getUserItems: state => state.userlist,

    
    },
    mutations: {
    },
    modules: {

    }
}

