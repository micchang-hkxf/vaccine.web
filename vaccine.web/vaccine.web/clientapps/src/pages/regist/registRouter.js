import VueRouter from 'vue-router'

//import content_oauth from 'components/regist/contents/oauth_content.vue'
//import content_regist from 'components/regist/contents/regist_content.vue'
//import content_unapply from 'components/regist/contents/unapply_content.vue'
//import content_apply from 'components/regist/contents/apply_content.vue'
//import content_applied from 'components/regist/contents/applied_content.vue'
//import content_agree from 'components/regist/contents/agree_content.vue'
//import content_welcome from 'components/regist/contents/welcome_content.vue'

const content_oauth = () => import(/* webpackChunkName: "regist-Oauth" */ 'components/regist/contents/oauth_content.vue')
const content_regist = () => import(/* webpackChunkName: "regist-Regist" */ 'components/regist/contents/regist_content.vue')
const content_unapply = () => import(/* webpackChunkName: "regist-Unapply" */ 'components/regist/contents/unapply_content.vue')
const content_apply = () => import(/* webpackChunkName: "regist-Apply" */ 'components/regist/contents/apply_content.vue')
const content_applied = () => import(/* webpackChunkName: "regist-Applied" */ 'components/regist/contents/applied_content.vue')
const content_agree = () => import(/* webpackChunkName: "regist-Agree" */ 'components/regist/contents/agree_content.vue')
const content_welcome = () => import(/* webpackChunkName: "regist-Welcome" */ 'components/regist/contents/welcome_content.vue')

export default new VueRouter({
    routes: [
        { name: 'regist', path: '/regist', component: content_regist , props:true },
        { name: 'agree', path: '/agree/:vote_no', component: content_agree },
        { name: 'applied', path: '/applied', component: content_applied },
        { name: 'apply', path: '/apply/:vote_no', component: content_apply },
        { name: 'unapply', path: '/unapply', component: content_unapply },
        { name: 'oauth', path: '/oauth', component: content_oauth, props: true },
        { name: 'welcome', path: '/welcome', component: content_welcome , alias: '*' },
    ]
})