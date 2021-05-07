import VueRouter from 'vue-router'

import content_regist from 'components/regist/contents/regist_content.vue'
import content_unapply from 'components/regist/contents/unapply_content.vue'

export default new VueRouter({
    routes: [
        { name: 'regist', path: '/regist', component: content_regist },
        { name: 'unapply', path: '/unapply', component: content_unapply },
        { name: '*', path: '/', component: content_regist }
    ]
})