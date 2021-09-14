<template>
    <div class="apply-viewer">

        <div class="activity-name">{{session.sessionName}}</div>
        <div class="activity-name-descript">{{session.zoneName}}-{{session.villageName}}│{{session.groupName}}</div>
        <!--<template v-if="session.brandName !== ''">
            <div class="activity-detail-title">疫苗廠牌</div>
            <div class="activity-detail-descript">{{session.brandName}}</div>
        </template>-->

        <div class="activity-detail-title">接種日期</div>
        <div class="activity-detail-descript">{{$moment(session.sessionStart).format('YYYY/MM/DD')}},{{$moment(session.sessionStart).format('HH:mm')}}-{{$moment(session.sessionEnd).format('HH:mm')}}</div>

        <div class="activity-detail-title">事先報名</div>
        <div class="activity-detail-descript">{{$moment(session.registStart).format('YYYY/MM/DD,HH:mm')}} - {{$moment(session.registEnd).format('YYYY/MM/DD,HH:mm')}}</div>

        <div class="activity-detail-title">設站地點</div>
        <div class="activity-detail-descript">{{session.implementAddr}}</div>

        <template v-if="typeof session.applyNo === 'undefined'">
            <div class="activity-detail-title">開放名額</div>
            <div class="activity-detail-descript" v-if="session.totalCount === session.maxLimit"><span class="full">名額已滿</span></div>
            <div class="activity-detail-descript" v-else><span>{{session.totalCount}}</span> / <span class="disabled">{{session.maxLimit}}</span></div>

            <template v-if="session.actAge !== null">
                <div class="activity-detail-title">年齡限制</div>
                <div class="activity-detail-descript">
                    <template v-if="session.actAge > 0">
                        {{session.actAge}}歲<span class="disabled">以上</span>
                    </template>
                    <template v-else>
                        <span class="disabled">無限制</span>
                    </template>
                </div>
            </template>
        </template>
        <template v-else>
            <div class="activity-detail-title">序號</div>
            <div class="activity-detail-descript">{{session.applyNo}}</div>
        </template>
        <template v-if="session.vaccines!=null">

            <div class="activity-detail-title">接種疫苗</div>
            <template v-if="session.vaccines.length > 0">
                <div class="activity-detail-descript" v-for="(vaccine , idx) in session.vaccines" :key="`vaccine_${idx}`">
                    <div class="apply-field-type-icon d-flex justify-start align-center">
                        <img src="/regist/select_vaccine.svg" />
                    </div>
                    <div class="apply-field-type-text d-flex justify-start align-center">
                        {{vaccine.itemName}}
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="activity-detail-descript">
                    <div class="apply-field-type-icon d-flex justify-start align-center">
                        <img src="/regist/select_vaccine.svg" />
                    </div>
                    <div class="apply-field-type-text d-flex justify-start align-center">
                        {{session.brandName}}
                    </div>
                </div>
            </template>
        </template>
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
        color: #626781 !important;
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
        display: flex;
    }
    .apply-viewer/deep/ .activity-detail-descript .disabled {
        font-size: 16px !important;
        color: rgba(67,73,105,0.5) !important;
    }

    .apply-viewer/deep/ .activity-detail-descript .full {
        text-align: right;
        font: normal normal normal 12px/20px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #F4A95F;
    }

   
</style>
