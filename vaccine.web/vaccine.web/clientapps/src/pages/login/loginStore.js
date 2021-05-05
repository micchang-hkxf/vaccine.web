import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import userStore from "stores/userStore"
//import configStore from "stores/configStore"


export default new Vuex.Store({
    actions: {
        checkLogin: function ({ state },account) {
            return new Promise(function (resolve, reject) {
                var result = { uid: account.uid, status: '' };
                try {
                    var exist = state.loginFake.accounts.find(f => f.uid == account.uid);
                    if (!exist) {
                        result.status = 'notfound'
                        resolve(result);
                        return;
                    }
                    if (exist.status == 'network') {
                        result.status = 'network';
                        throw result;
                    }
                    if (exist.upd != account.upd) {
                        result.status = 'password'
                        resolve(result);
                        return;
                    }
                    result.status = exist.status;
                    resolve(result);
                } catch (e) {
                    result.status = 'network';
                    reject(result);
                }
            });
        }
    },
    state: {
        loginFake : {
            accounts: [
                { uid: "micchang", upd: '***', status: 'pass' },
                { uid: "micchang01", upd: '***', status: 'network' }
            ]
        }
    },
    getters: {
    },
    mutations: {
    },
    modules: {
        user: userStore,
        //config: configStore
    }
})