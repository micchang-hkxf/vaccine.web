<template>
    <v-dialog v-model="isShow">
        <v-card class="done-dialog">
            <v-card-title class="done-header">
                <div class="done-header-icon d-flex justify-center align-center">
                    <img src="/alert_success.svg" />
                </div>                
                <div class="done-header-title d-flex justify-center align-center">
                    完成報名！
                </div>
            </v-card-title>
            <v-card-text class="done-container" v-if="isShow">
                <div class="field-container">
                    <div class="title full-width">
                        {{session.sessionName}}
                    </div>
                    <div class="datetime full-width">
                        {{$moment(session.sessionStart).format('YYYY/MM/DD')}},{{$moment(session.sessionStart).format('HH:mm')}}-{{$moment(session.sessionEnd).format('HH:mm')}}
                    </div>
                    <div class="address full-width">
                        {{session.implementAddr}}
                    </div>
                    <div class="order-tip full-width">
                        序號：
                    </div>
                    <div class="order">
                        {{session.checkJobId}}
                    </div>
                </div>
            </v-card-text>
            <v-card-actions class="done-actions d-flex justify-space-between full-width">
                <div class="descript">
                    為避免重複接種，報名後請勿再自行前往院所接種或跨里報名，接種當日，將再次檢核接種資格，屆時依現場判讀可接種之疫苗別為準。
                </div>
                <v-btn class="done-action full-width" color="#626781" width="100%" @click.stop="finish">了解</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        // router,
        data: () => ({
            //appBar: {
            //    elevation: 0,
            //    height: '160px'
            //},
            isShow: false,
            years: [108],
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        }),
        computed: {
        },
        props: {

        },
        created: function () {

        },
        methods: {
            create: function (info) {
                this.isShow = true;
                this.session = this.$store.getters['regist/user/getActivityApply'];
                this.session.checkJobId = info.checkJobId;
                //
                this.$store.getters['regist/user/removeItem']('activityApply');
            },
            finish: function () {
                this.isShow = false;
                //location.replace('/regist');
                //var groupId = '';
                //if (this.session.vaccineGroupId === 0)
                //    groupId = 'influenza';
                //else if (this.session.vaccineGroupId === 1)
                //    groupId = 'covid';
                this.$router.push({ name: 'unapply', query: { groupId: this.session.vaccineGroupId } });
            }
        },
        components: {
        }
    }
</script>

<style scoped>
    /deep/ .v-dialog {
        width: 350px !important;
        /*width: 30% !important;*/
        box-shadow: none !important;
        border-radius: 8px !important;
    }


    .done-dialog/deep/ .full-width {
        width: 100% !important;
    }

    .done-dialog/deep/ .done-header-icon,
    .done-dialog/deep/ .done-header-title {
    }

    .done-dialog/deep/ .v-btn {
        min-width: 130px !important;
    }

    .done-dialog/deep/ .v-input {
        padding-top: 0px !important;
        margin-top: 0px !important;
    }

    .v-application .primary--text {
        color: #736DB9 !important;
        caret-color: #736DB9 !important;
    }

    .done-dialog/deep/ .done-action {
        background-color: #626781 !important;
    }

    .done-dialog/deep/ .v-btn:not(.v-btn--disabled) {
        color: white !important;
    }

    .done-dialog/deep/ {
    }

    .done-dialog/deep/ .v-overlay__scrim {
    }

    .done-dialog/deep/ .done-header {
        font-size: 16px !important;
        color: #626781 !important;
        display: block;
    }

    .done-dialog/deep/ .done-header .done-header-title {
        text-align: center;
        font: normal normal normal 20px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        margin: 16px 0 10px 0;
    }

    .done-dialog/deep/ .done-container {
    }

    .done-dialog/deep/ .done-container .field-container {
        background: #F4F4F6 0% 0% no-repeat padding-box;
        color: #626781;
        text-align: center;
        padding: 16px;
        opacity: 1;
    }

    .done-dialog/deep/ .done-container .field-container .title {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0;
    }

    .done-dialog/deep/ .done-container .field-container .datetime{
        font: normal normal normal 12px/16px Noto Sans T Chinese;
        letter-spacing: 0;
        color: #43496980;
    }

    .done-dialog/deep/ .done-container .field-container .address{
        font: normal normal normal 12px/16px Noto Sans T Chinese;
        letter-spacing: 0;
        color: #43496980;
    }

    .done-dialog/deep/ .done-container .field-container .order-tip {
        font: normal normal normal 12px/16px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #43496980;
        margin-top: 10px;
    }

    .done-dialog/deep/ .done-container .field-container .order{
        font: normal normal bold 32px/16px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        margin: 10px 0;
    }

    .done-dialog/deep/ .done-actions {
        display: block !important;
        padding: 0 20px;
        /*margin-bottom: 20px;*/ 
    }

    .done-dialog/deep/ .done-actions .descript {
        font: normal normal normal 12px/16px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        opacity: 1;
        margin-bottom: 20px;
    }

    .done-dialog/deep/ .done-actions .v-btn {
        margin-bottom: 24px;
    }

</style>
