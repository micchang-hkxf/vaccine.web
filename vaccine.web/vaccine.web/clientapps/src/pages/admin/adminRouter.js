import VueRouter from 'vue-router'

//import content_admin from 'components/admin/admin.vue'
//import content_users from 'components/admin/contents/users_content.vue'
//import content_registration from 'components/admin/contents/registration_content.vue'
//import content_registed from 'components/admin/contents/registed_content.vue'
//import content_audit from 'components/admin/contents/audit_content.vue'

const content_users = () => import(/* webpackChunkName: "adminUsers" */'components/admin/contents/users_content.vue')
const content_registration = () => import(/* webpackChunkName: "adminRegistration" */'components/admin/contents/registration_content.vue')
const content_registed = () => import(/* webpackChunkName: "adminRegisted" */'components/admin/contents/registed_content.vue')
const content_audit = () => import(/* webpackChunkName: "adminAudit" */'components/admin/contents/audit_content.vue')

export default new VueRouter({
    routes: [
        { name: 'audit', path: '/audit', component: content_audit },
        { name: 'registed', path: '/registed', component: content_registed },
        { name: 'registration', path: '/registration', component: content_registration },
        { name: 'admin', path: '/admin', component: content_registration },
        { name: 'users', path: '/users', component: content_users },
        { name: '*', path: '/', component: content_registration }
    ]
})