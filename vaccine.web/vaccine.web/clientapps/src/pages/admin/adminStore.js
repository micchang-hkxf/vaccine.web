import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import userStore from "stores/userStore"
import usersStore from "stores/admin/usersStore"
import registeredStore from "stores/registeredStore"
//import configStore from "stores/configStore"
import registrationStore from "stores/registrationStore"

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
        registration: registrationStore,
        users: usersStore,
        registered: registeredStore
        //config: configStore
    }
})