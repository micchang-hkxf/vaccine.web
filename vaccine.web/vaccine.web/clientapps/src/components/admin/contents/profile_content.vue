<template>
    <com-dialog ref="dialogPanel" ref-key="pf" class="profile" :width="width">
        <template v-slot:toolbar>
            {{title}}
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="close" :ripple="false">
                <v-icon color="white">fas fa-times</v-icon>
            </v-btn>
        </template>
        <template v-slot:content>
            <div class="profileShow">姓名</div>
            {{ uName }}
            <div class="profileShow">帳號</div>
            {{ acc }}
            <div class="profileShow">手機</div>
            {{ mbNo }}
            <div class="profileShow">服務單位</div>
            {{ unit }}
            <div class="profileShow">權限</div>
            {{ perm }}
            <div class="profileShow">密碼最後更新時間</div>
            {{ passModifyTime }}
            <div class="profileShow">管理區域</div>
            {{ zones }}

        </template>
   
    </com-dialog>

</template>
<style>
    .profileShow {
        color: #62678166 !important;
        padding-top: 15px !important;
    }
</style>




<script>
    import comDialog from 'components/dialog'
 
    export default {
       
        data: () => ({
            model: {},
            uName: "",
            acc: "",
            mbNo: "",
            unit: "",
            perm: "",
            passModifyTime: "",
            zones:"",
        }),

        computed: {
           
        },
        props: ['width','title'],
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

                //get inform from api(todo)
                this.$set(this, "uName", 'myname');
                this.$set(this, "acc", 'myacc');
                this.$set(this, "mbNo", '0900000000');
                this.$set(this, "unit", '衛生局');
                this.$set(this, "perm", '轄區管理員');
                this.$set(this, "passModifyTime", '2021/5/25 12:00:00');
                this.$set(this, "zones", '信義區');
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