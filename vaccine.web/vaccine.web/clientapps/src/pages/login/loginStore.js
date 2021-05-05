import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import userStore from "stores/userStore"
//import configStore from "stores/configStore"


export default new Vuex.Store({
    actions: {
        checkLogin: function ({ state },account) {
            return new Promise(function (resolve, reject) {
                var result = { uid: account.uid, state: '' };
                try {
                    var exist = state.loginFake.accounts.find(f => f.uid == account.uid);
                    if (!exist) {
                        result.state = 'notfound'
                        resolve(result);
                        return;
                    }
                    if (exist.state == 'network') {
                        throw result;
                        return;
                    }
                    if (exist.upd != account.upd) {
                        result.state = 'password'
                        resolve(result);
                        return;
                    }
                    result.state = exist.state;
                    resolve(result);
                } catch (e) {
                    result.state = 'network';
                    reject(result);
                }
            });
        }
    },
    state: {
        loginFake : {
            accounts: [
                { uid: "micchang", upd: '***', state: 'pass' },
                { uid: "micchang01", upd: '***', state: 'network' }
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