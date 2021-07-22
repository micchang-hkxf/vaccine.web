import VueRouter from 'vue-router'

import content_regist from 'components/regist/contents/regist_content.vue'
import content_unapply from 'components/regist/contents/unapply_content.vue'
import content_apply from 'components/regist/contents/apply_content.vue'
import content_applied from 'components/regist/contents/applied_content.vue'
import content_agree from 'components/regist/contents/agree_content.vue'
import content_welcome from 'components/regist/contents/welcome_content.vue'

export default new VueRouter({
    routes: [
        { name: 'regist', path: '/regist', component: content_regist , props:true },
        { name: 'agree', path: '/agree/:vote_no', component: content_agree },
        { name: 'applied', path: '/applied', component: content_applied },
        { name: 'apply', path: '/apply/:vote_no', component: content_apply },
        { name: 'unapply', path: '/unapply', component: content_unapply },
        { name: 'welcome', path: '/welcome', component: content_welcome , alias: '*' },
    ]
})