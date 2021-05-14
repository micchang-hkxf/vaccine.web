<template>
    <app-layout enabled-drawer="true">
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <v-btn color="primary" @click="create">create</v-btn>
                <v-btn color="primary" @click="open">open</v-btn>
                <editor ref="editor" ref-key="two" width="60%" title="建立報名表" :action="formAction"></editor>
            </div>
        </template>
    </app-layout>
</template>

<script>
    import editor from 'components/admin/forms/regist_editor'
    import appMenu from 'components/main/menu'
    import appLayout from 'components/app_layout'
    export default {
        // router,
        data: () => ({
            model: {
                regist_title: '',
                regist_type: '',
                regist_district: '',
                regist_village: '',
                regist_date: new Date().toISOString().substr(0, 10),
            }
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

            },
            open: function () {
                this.$refs.editor.open(this.model);
            },
            formAction: function (result) {
                switch (result.action) {
                    case 'save':
                        console.log('save',result)
                        break;

                    case 'cancel':
                        console.log('cancel', result)
                        break;
                }
            },
            closeDialog: function () {
                this.$refs.dialogPanel.close();
            }
        },
        components: {
            appLayout, appMenu, editor
        }
    }
</script>
<style>
</style>
