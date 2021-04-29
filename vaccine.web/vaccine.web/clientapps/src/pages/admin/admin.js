import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

//Vuex 
import Vuex from 'vuex'
Vue.use(Vuex)

//Emit
Vue.prototype.$bus = new Vue();

//vue router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false

//vue i18n
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

//vue moment
import moment from "moment";
import VueMomentJS from "vue-momentjs";
Vue.use(VueMomentJS, moment);


//page setting
import i18n from 'pages/admin/adminLanguage'
import router from 'pages/admin/adminRouter'
import store from 'pages/admin/adminStore'
import app from 'pages/admin/admin.vue'

new Vue({
    i18n,
    router, 
    store ,
    render: h => h(app),
}).$mount('#app')
