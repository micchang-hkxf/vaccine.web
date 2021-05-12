import VueRouter from 'vue-router'

import content_admin from 'components/admin/admin.vue'
import content_registed from 'components/admin/contents/registed_content.vue'

export default new VueRouter({
    routes: [
        { name: 'registed', path: '/registed', component: content_registed },
        { name: 'admin', path: '/admin', component: content_admin },
        { name: '*', path: '/', component: content_admin }
    ]
})