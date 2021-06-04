<template>
    <com-dialog ref="dialogPanel" ref-key="two" :width="width">
        <template v-slot:toolbar>
            {{title}}
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="close" :ripple="false">
                <v-icon color="white">fas fa-times</v-icon>
            </v-btn>
        </template>
        <template v-slot:content>
            <v-form  ref="form">
                <v-row>
                    <v-col cols="12">
                        <div><span class="regist-title">舊密碼</span><span class="red--text">*</span></div>
                        <v-text-field v-model="oldPassword"
                                      placeholder="請輸入目前密碼"
                                      :type="show1 ? 'text' : 'password'"
                                      :rules="[rules.code]"
                                      required
                                      outlined
                                      dense>
                        </v-text-field>
                        <div><span class="regist-title">新密碼</span><span class="red--text">*</span></div>
                        <v-text-field v-model="newPassword"
                                      placeholder="請輸入8位以上包含半形英文+數字"
                                      :type="show2 ? 'text' : 'password'"
                                      :rules="[rules.code]"
                                      required
                                      outlined
                                      dense>
                        </v-text-field>

                        <div><span class="regist-title">確認密碼</span><span class="red--text">*</span></div>
                        <v-text-field v-model="newPassword2"
                                      placeholder="請輸入8位以上包含半形英文+數字"
                                      :type="show3 ? 'text' : 'password'"
                                      :rules="[rules.code, passwordConfirmationRule]"
                                      required
                                      outlined
                                      dense>
                        </v-text-field>
                    </v-col>

                </v-row>
                <v-divider></v-divider>

            </v-form>

        </template>
        <template v-slot:action>

            <v-spacer></v-spacer>
            <v-btn @click="cancel" outlined :ripple="false"><span style="color:#626781;">取消</span></v-btn>
            <v-btn color="primary" @click="save" :ripple="false"><span>送出</span></v-btn>

        </template>
    </com-dialog>

</template>
<style>
    .v-btn--outlined {
        border: thin solid rgba(98 ,103, 129 ,0.2) !important;
    }
    .regist-title {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
    }
  

</style>




<script>
    import comDialog from 'components/dialog'
 
    export default {
       
        data: () => ({
            show1: false,
            show2: false,
            show3: false,
            newPassword: '',
            newPassword2: '',
            oldPassword:'',
            rules: {
                code: v => /^[a-zA-Z0-9]{8,}$/.test(v) || '密碼至少需8位半形英文+數字',
            },

            model: {},

            //defaultItem: {
            //    regist_title: '',               
            //    regist_type: '',
            //    regist_district: '',
            //    regist_village: '',
            //    regist_date: new Date().toISOString().substr(0, 10),
            //},
        }),
        computed: {
            defaultItem: function () {
                return this.model;
            },
            passwordConfirmationRule() {
                return () => (this.newPassword === this.newPassword2) ||  '新密碼輸入不一致'
            },
        },
        props: ['width','title','action'],
        created: function () {
        },
        methods: {
            open: function (model) {
                this.mode = 'edit';
                Object.assign(this.model, model);
               
                this.$refs.dialogPanel.open();
            },

            create: function (model) {
                this.mode = 'new';
                Object.assign(this.model, model);

                this.$refs.dialogPanel.open();
            },
            save: function () {
                if (!this.$refs.form.validate()) {
                    return;
                }
                if (this.newPassword != this.newPassword2) {
                    this.$refs.newPassword2.focus();
                    return;
                }
                this.action({ mode: this.mode, action: 'save', model: this.model, pass: this.newPassword});

                this.$refs.dialogPanel.close();                
            },
            show: function () {
                this.$refs.dialogPanel.open();
            },
            close: function () {
                this.$refs.dialogPanel.close();
            },
            cancel: function () {
                this.action({ mode: this.mode, action: 'cancel', model: this.model });
                this.$refs.dialogPanel.close();
            },
            closeDialog: function () {
                this.$refs.dialogPanel.open();
            },
          
        },
        components: {
            comDialog
        }
    }
</script>