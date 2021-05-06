import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import userStore from "stores/userStore"
//import configStore from "stores/configStore"

export default new Vuex.Store({
    actions: {
        checkLogin: function ({ state }, account) {
            return new Promise(function (resolve, reject) {
                var result = { uid: account.uid, state: '', state1: '' };
                try {
                    var exist = state.loginFake.accounts.find(f => f.uid == account.uid);

                    if (!exist) {
                        result.state = 'not found'
                        resolve(result);
                        return;
                    }

                    if (exist.upd !== account.upd) {
                        result.state = 'password incorrect'
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
                    result.state = 'network abnormal';
                    reject(result);
                }
            });
        }
    },
    state: {
        loginFake : {
            accounts: [
                { uid: "yea01", upd: '123', state: 'no management area', state1: '' },
                { uid: "yea02", upd: '123', state: 'not member'        , state1: ''},
                { uid: "yea03", upd: '123', state: 'not yet enabled'   , state1: 'first login' },
                { uid: "yea04", upd: '123', state: 'not yet enabled'   , state1: 'password is about to expire' },
                { uid: "yea05", upd: '123', state: 'not yet enabled'   , state1: 'password has expired' },
                { uid: "yea06", upd: '123', state: 'deactivate'        , state1: '' },
                { uid: "yea07", upd: '123', state: 'network abnormal'  , state1: '' },
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