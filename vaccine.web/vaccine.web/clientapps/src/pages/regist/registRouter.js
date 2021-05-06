import VueRouter from 'vue-router'

import content_regist from 'components/regist/contents/regist.vue'
import content_list from 'components/regist/contents/list.vue'

export default new VueRouter({
    routes: [
        { name: 'regist', path: '/regist', component: content_regist },
        { name: 'list', path: '/list', component: content_list },
        { name: '*', path: '/', component: content_regist }
    ]
})