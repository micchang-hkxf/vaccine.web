import VueRouter from 'vue-router'

import content_admin from 'components/admin/admin.vue'
import content_registration from 'components/admin/contents/registration_content.vue'

export default new VueRouter({
    routes: [
        { name: 'registration', path: '/registration', component: content_registration },
        { name: 'admin', path: '/admin', component: content_admin },
        { name: '*', path: '/', component: content_admin }
    ]
})