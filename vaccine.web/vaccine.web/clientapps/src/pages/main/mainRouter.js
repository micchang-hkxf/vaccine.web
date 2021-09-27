﻿import VueRouter from 'vue-router'

//import content_main from 'components/main/main.vue'
//import content_dialog from 'components/main/contents/dialog_content.vue'
//import content_confirm from 'components/main/contents/confirm_content.vue'
//import content_loading from 'components/main/contents/loading_content.vue'
//import content_steps from 'components/main/contents/steps_content.vue'
//import content_table from 'components/main/contents/table_content.vue'
//import content_form from 'components/main/contents/form_content.vue'
//import content_api from 'components/main/contents/api_content.vue'
//import content_timepicker from 'components/main/contents/timepicker_content.vue'

const content_main = () => import(/* webpackChunkName: "mainMain" */'components/main/main.vue')
const content_dialog = () => import(/* webpackChunkName: "mainDialog" */'components/main/contents/dialog_content.vue')
const content_confirm = () => import(/* webpackChunkName: "mainConfirm" */'components/main/contents/confirm_content.vue')
const content_loading = () => import(/* webpackChunkName: "mainLoading" */'components/main/contents/loading_content.vue')
const content_steps = () => import(/* webpackChunkName: "mainSteps" */ 'components/main/contents/steps_content.vue')
const content_table = () => import(/* webpackChunkName: "mainTable" */ 'components/main/contents/table_content.vue')
const content_form = () => import(/* webpackChunkName: "mainForm" */ 'components/main/contents/form_content.vue')
const content_api = () => import(/* webpackChunkName: "mainApi" */'components/main/contents/api_content.vue')
const content_timepicker = () => import(/* webpackChunkName: "mainTimepicker" */'components/main/contents/timepicker_content.vue')




export default new VueRouter({
    routes: [
        { name: 'api', path: '/compoments/api', component: content_api },
        { name: 'form', path: '/compoments/form', component: content_form },
        { name: 'table', path: '/compoments/table', component: content_table },
        { name: 'steps', path: '/compoments/steps', component: content_steps },
        { name: 'confirm', path: '/compoments/confirm', component: content_confirm },
        { name: 'dialog', path: '/compoments/dialog', component: content_dialog },
        { name: 'loading', path: '/compoments/loading', component: content_loading },
        { name: 'timepicker', path: '/compoments/timepicker', component: content_timepicker },
        { name: 'main', path: '/main', component: content_main },
        { name: '*', path: '/', component: content_main }
    ]
})