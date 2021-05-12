import VueRouter from 'vue-router'

import content_main from 'components/main/main.vue'
import content_dialog from 'components/main/contents/dialog_content.vue'
import content_confirm from 'components/main/contents/confirm_content.vue'
import content_loading from 'components/main/contents/loading_content.vue'
import content_steps from 'components/main/contents/steps_content.vue'
import content_table from 'components/main/contents/table_content.vue'


export default new VueRouter({
    routes: [
        { name: 'table', path: '/compoments/table', component: content_table },
        { name: 'steps', path: '/compoments/steps', component: content_steps },
        { name: 'confirm', path: '/compoments/confirm', component: content_confirm },
        { name: 'dialog', path: '/compoments/dialog', component: content_dialog },
        { name: 'loading', path: '/compoments/loading', component: content_loading },
        { name: 'main', path: '/main', component: content_main },
        { name: '*', path: '/', component: content_main }
    ]
})