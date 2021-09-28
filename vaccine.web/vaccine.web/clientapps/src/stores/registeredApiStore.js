import siteConfig from "project/site.config"
import axios from 'axios'
import { Promise } from "core-js";

export default {
    namespaced: true,
    actions: {
        loadRegistData: function ({ state, rootGetters, dispatch }, params) {
            return new Promise((resolve, reject) => {

                var results = { datas: [], state: '', totalCount: 0 };
                if (params.keyWord == "") {
                    return false;
                }
                var apiUrl = `${state.apiRoot}api/ApplyLog/` + params.keyWord;
                axios.get(apiUrl, {
                    params: {
                    },
                    headers: {
                        'x-token': rootGetters['user/getToken']
                    }
                }).then(res => {

                    var datas = [];
                    res.data.forEach((data) => {
                        datas.push({
                            date: data.signUpTime,
                            name: data.uName,
                            identity: data.uId,
                            vaccination: data.activityName,
                            way: data.applyText,
                            result: (data.logType==1) ? "合格" : "不合格",
                            number: data.applyNo,
                            distName: data.region.distName
                        });
                    });

                    results.datas = datas;
                    console.log(datas);
                    results.totalCount = datas.length;
                    resolve(results);
                }).catch((error) => {
                    results.datas = error;
                    dispatch('user/notLoginAdmin', error, { root: true });
                    reject(results);
                });

            });
        },

    },
    state: {
        ...siteConfig,

        desserts: [
            {
                date: '2021/04/01 09:30',
                name: '袁吉吉2',
                identity: 'B128541236',
                vaccination: '110年4月份新冠疫苗施打預先報名',
                way: '事先里辦',
                result: '合格',
                number: '0045',
            },
            {
                date: '2021/07/11 12:30',
                name: '柯安安2',
                identity: 'B125463987',
                vaccination: '110年3月份新冠疫苗施打預先報名',
                way: '事先網路',
                result: '-',
                number: '0012',
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
        institutions: [{ id: 'wang', name: '王慶森診所' }, { id: 'wang2', name: '王慶森2診所' }, { id: 'wang3', name: '王慶森3診所' }],

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
