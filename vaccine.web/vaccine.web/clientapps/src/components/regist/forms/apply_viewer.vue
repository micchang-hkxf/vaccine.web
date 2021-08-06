<template>
    <div class="apply-viewer">

        <div class="activity-name">{{session.sessionName}}</div>
        <div class="activity-name-descript">{{session.zoneName}}-{{session.villageName}}│{{session.groupName}}</div>

        <div class="activity-detail-title">疫苗廠牌</div>
        <div class="activity-detail-descript">{{session.brandName}}</div>

        <div class="activity-detail-title">接種日期</div>
        <div class="activity-detail-descript">{{$moment(session.sessionStart).format('YYYY/MM/DD')}},{{$moment(session.sessionStart).format('HH:mm')}}-{{$moment(session.sessionEnd).format('HH:mm')}}</div>

        <div class="activity-detail-title">事先報名</div>
        <div class="activity-detail-descript">{{$moment(session.registStart).format('YYYY/MM/DD,HH:mm')}} - {{$moment(session.registEnd).format('YYYY/MM/DD,HH:mm')}}</div>

        <div class="activity-detail-title">設站地點</div>
        <div class="activity-detail-descript">{{session.implementAddr}}</div>

        <div v-if="typeof session.applyNo === 'undefined'">
            <div class="activity-detail-title">開放名額</div>
            <div class="activity-detail-descript" v-if="session.totalCount === session.maxLimit"><span class="full">名額已滿</span></div>
            <div class="activity-detail-descript" v-else><span>{{session.totalCount}}</span> / <span class="disabled">{{session.maxLimit}}</span></div>
        </div>
        <div v-else>
            <div class="activity-detail-title">序號</div>
            <div class="activity-detail-descript">{{session.applyNo}}</div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
            }
        }),
        computed: {
        },
        props: {

        },
        created: function () {
            this.session = this.$store.getters['regist/user/getActivityApply'];
            this.setActivityApply(this.session);
        },
        methods: {
            ...mapActions('regist', ['setActivityApply']),
        },
        components: {
        }
    }
</script>
<style scoped>

    .apply-viewer/deep/ .activity-name {
        font-size: 20px !important;
        color: #626781!important;
    }
    .apply-viewer/deep/ .activity-name-descript {
        font-size: 12px !important;
        color: rgba(98,103,129,0.5)!important;
    }
    .apply-viewer/deep/ .activity-detail-title {
        margin-top:24px!important;
        font-size: 16px !important;
        color: rgba(67,73,105,0.5) !important;
    }
    .apply-viewer/deep/ .activity-detail-descript {
        font-size: 16px !important;
        color: #434969 !important;
    }
    .apply-viewer/deep/ .activity-detail-descript .disabled {
        font-size: 16px !important;
        color: rgba(67,73,105,0.5) !important;
    }

    .apply-viewer/deep/ .activity-detail-descript .full {
        color: #F4A95F;
    }
</style>
