import VueRouter from 'vue-router'

import content_login from 'components/login/login.vue'

export default new VueRouter({
    routes: [
        { name: 'login', path: '/login', component: content_login ,alias:'*' }
    ]
})