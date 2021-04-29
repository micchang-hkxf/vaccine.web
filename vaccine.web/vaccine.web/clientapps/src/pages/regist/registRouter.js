import VueRouter from 'vue-router'

import content_regist from 'components/regist/regist.vue'

export default new VueRouter({
    routes: [
        { name: 'regist', path: '/regist', component: content_regist },
        { name: '*', path: '/', component: content_regist }
    ]
})