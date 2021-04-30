import VueRouter from 'vue-router'

import content_main from 'components/main/main.vue'
import content_dialog from 'components/main/contents/dialog_content.vue'
import content_confirm from 'components/main/contents/confirm_content.vue'
import content_loading from 'components/main/contents/loading_content.vue'

export default new VueRouter({
    routes: [
        { name: 'confirm', path: '/compoments/confirm', component: content_confirm },
        { name: 'dialog', path: '/compoments/dialog', component: content_dialog },
        { name: 'loading', path: '/compoments/loading', component: content_loading },
        { name: 'main', path: '/main', component: content_main },
        { name: '*', path: '/', component: content_main }
    ]
})