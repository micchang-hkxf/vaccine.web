import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

//vue-cookie
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

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
import i18n from 'pages/regist/registLanguage'
import router from 'pages/regist/registRouter'
import store from 'pages/regist/registStore'
import app from 'pages/regist/regist.vue'

new Vue({
    i18n,
    router, 
    store ,
    render: h => h(app),
}).$mount('#app')
