import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import userStore from "stores/userStore"
//import configStore from "stores/configStore"
import registeredStore from "stores/registeredStore"

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
        user: userStore,
        registered: registeredStore
        //config: configStore
    }
})