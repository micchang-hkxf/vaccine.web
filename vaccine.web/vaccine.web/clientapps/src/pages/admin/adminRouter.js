import VueRouter from 'vue-router'

import content_admin from 'components/admin/admin.vue'

export default new VueRouter({
    routes: [
        { name: 'admin', path: '/admin', component: content_admin },
        { name: '*', path: '/', component: content_admin }
    ]
})