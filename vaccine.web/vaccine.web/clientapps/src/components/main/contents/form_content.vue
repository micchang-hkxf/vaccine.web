<template>
    <app-layout enabled-drawer="true">
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <v-btn color="primary" @click="create">create</v-btn>
                <v-btn color="primary" @click="open">open</v-btn>
                <editor ref="editor" ref-key="two" width="40%" :title="title" :action="formAction"></editor>
            </div>
            <com-dialog ref="viewer" ref-key="two" width="60%">
                <template v-slot:toolbar>
                    {{viewerTitle}}
                    <v-spacer></v-spacer>
                    <v-btn icon @click.stop="colse" :ripple="false">
                        <v-icon color="white">fas fa-times</v-icon>
                    </v-btn>
                </template>
                <template v-slot:content>
                    點選「確定」後本報名表將立即生效，請再次確認內容無誤。
                    <v-divider></v-divider>
                    {{result}}
                </template>
                <template v-slot:action>
                   
                    <v-spacer></v-spacer>
                    <v-btn @click="backToEdit">修改</v-btn> 
                    <v-btn @click="save">確定</v-btn>
                </template>
            </com-dialog>

            <com-confirm ref="alert" ref-key="confirm"  :right-click="alertRightClick">
                <template v-slot:confirm-image>
                    <v-img src="/alert_success.svg"></v-img>
                </template>
                <template v-slot:confirm-title>
                    {{alertTitle}}
                    
                </template>
                <template v-slot:confirm-text>                  
                    {{alertText}}
                </template>
                               
                <template v-slot:confirm-right-btn-text>
                    確認
                </template>


            </com-confirm>
        </template>
    </app-layout>
</template>

<script>
    import editor from 'components/admin/forms/regist_editor'
    import comConfirm from 'components/confirm'
    import comDialog from 'components/dialog'
    import appMenu from 'components/main/menu'
    import appLayout from 'components/app_layout'
import { Object } from 'core-js';
    export default {
        // router,
        data: () => ({
            title:'',
            model: {
                regist_title: '',
                regist_type: '',
                regist_district: '',
                regist_village: '',
                regist_date: new Date().toISOString().substr(0, 10),
            },
            result: {},
            viewerTitle: '',
            alertTitle: '',
            alertText:'',
        }),
        computed: {
        },
        props: {

        },
        created: function () {
        },
        methods: {
            create: function () {
                this.$refs.editor.open();
                this.title = '建立報名表';
                this.viewerTitle = '確認新增報名資訊';
            },
            open: function () {
                this.$refs.editor.open(this.model);
                this.title = '編輯報名表';
                this.viewerTitle = '編輯報名資訊確認';
            },
            formAction: function (result) {
                Object.assign(this.result, result);
                switch (result.action) {
                    case 'save':
                        this.$refs.viewer.open();
                        console.log('save',result)
                        break;

                    case 'cancel':
                        console.log('cancel', result)
                        break;
                }
            },
            colse: function () {
                this.$refs.editor.close();
            },
            backToEdit: function () {

                this.$refs.viewer.close();
                this.$refs.editor.show();
            },
            save: function () {
                console.log('result', this.result)
                switch (this.result.mode) {
                    case 'new':
                        this.alertTitle = '110年五月份新冠疫苗施打預先報名';
                        this.alertText = '成功建立報名表';
                        break;

                    case 'edit':
                        this.alertTitle = '110年五月份新冠疫苗施打預先報名';
                        this.alertText ='已成功變更報名表'
                }
                
                this.$refs.viewer.close();
                this.$refs.alert.open();
            },
            alertRightClick: function () {
                this.$bus.$emit(`confirm_show`, false);
            },
           
        },
        components: {
            appLayout, appMenu, editor, comConfirm, comDialog
        }
    }
</script>
<style>
</style>
