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
                        result.state = 'not found';
                        resolve(result);
                        return;
                    }

                    if (exist.upd !== account.upd) {
                        result.state = 'password incorrect';
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
        checkVerificationCode: function ({ state }, account) {
            return new Promise(function (resolve, reject) {
                var result = { uid: account.uid, state: '', state1: '' };
                try {
                    var exist = state.loginFake.accounts.find(f => f.uid == account.uid);

                    if (!exist) {
                        result.state = 'not found';
                        throw result;
                    }

                    if (exist.verificationCode !== account.verificationCode) {
                        result.state = 'invalid';
                        resolve(result);
                        return;
                    }

                    result.state = 'pass';
                    result.state1 = exist.state1;
                    resolve(result);
                } catch (e) {
                    reject(result);
                }
            });
        }
    },
    state: {
        loginFake : {
            accounts: [
                { uid: "yea"  , upd: '123', state: 'pass'              , state1: ''                           ,  verificationCode: '123456'},
                { uid: "yea01", upd: '123', state: 'no management area', state1: ''                           ,  verificationCode: '123456' },
                { uid: "yea02", upd: '123', state: 'not member'        , state1: ''                           ,  verificationCode: '123456' },
                { uid: "yea03", upd: '123', state: 'not yet enabled'   , state1: 'first login'                ,  verificationCode: '123456' },
                { uid: "yea04", upd: '123', state: 'not yet enabled'   , state1: 'password is about to expire',  verificationCode: '123456' },
                { uid: "yea05", upd: '123', state: 'not yet enabled'   , state1: 'password has expired'       ,  verificationCode: '123456' },
                { uid: "yea06", upd: '123', state: 'deactivate'        , state1: ''                           ,  verificationCode: '123456' },
                { uid: "yea07", upd: '123', state: 'network abnormal'  , state1: ''                           ,  verificationCode: '123456' },
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