import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import registStore from "stores/regist/static/registStore"

export default new Vuex.Store({
    actions: {
    },
    state: {
    },
    getters: {
    },
    mutations: {
    },
    modules: {
        regist: registStore,
    }
})