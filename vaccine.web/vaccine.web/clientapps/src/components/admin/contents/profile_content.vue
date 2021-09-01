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
            open: function () {
                this.$refs.dialogPanel.open();
            },
            create: function (data) {
                console.log(data);
                this.$refs.dialogPanel.open();

                //get inform from api(todo)
                this.$set(this, "uName", data.uName);
                this.$set(this, "acc", data.acc);
                this.$set(this, "mbNo", data.mbNo);
                this.$set(this, "unit", data.unit);
                this.$set(this, "perm", data.userTypeDesc);
                this.$set(this, "passModifyTime", this.$moment(data.lastAccessTime).format('YYYY/MM/DD HH:mm'));
                this.$set(this, "zones", data.zones[0].cityName);//todo
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