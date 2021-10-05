import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import registStore from "stores/regist/static/registApiStore"

export default new Vuex.Store({
    actions: {
        scrollToZero: function () {
            try {
                window.scroll(0, 0);
                this.$nextTick(function () {
                    document.body.scrollTop = 0;
                });
            } catch (e) {
                null;
            }
        }
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