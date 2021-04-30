import VueRouter from 'vue-router'

import content_main from 'components/main/main.vue'
import content_dialog from 'components/main/contents/dialog_content.vue'
import content_steps from 'components/main/contents/steps_content.vue'

export default new VueRouter({
    routes: [
        { name: 'steps', path: '/compoments/steps', component: content_steps },
        { name: 'dialog', path: '/compoments/dialog', component: content_dialog },
        { name: 'main', path: '/main', component: content_main },
        { name: '*', path: '/', component: content_main }
    ]
})