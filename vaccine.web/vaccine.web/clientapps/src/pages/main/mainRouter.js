import VueRouter from 'vue-router'

import content_main from 'components/main/main.vue'

export default new VueRouter({
    routes: [
        { name: 'main', path: '/main', component: content_main },
        { name: '*', path: '/', component: content_main }
    ]
})