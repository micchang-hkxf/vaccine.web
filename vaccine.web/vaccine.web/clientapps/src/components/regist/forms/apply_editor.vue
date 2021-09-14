<template>
    <div class="apply-viewer">

        <div class="activity-name">五月份新冠肺炎疫苗接種</div>
        <div class="activity-name-descript">內湖區西康里 | COVID-19疫苗(AZ) | 王慶森診所</div>

        <div class="activity-detail-title">設站起訖時間</div>
        <div class="activity-detail-descript">2021/05/08, 08:30 - 11:30</div>

        <div class="activity-detail-title">報名開放起迄時間</div>
        <div class="activity-detail-descript"> 2021/04/10,08:00 - 2021/05/05,20:00</div>

        <div class="activity-detail-title">設站地點</div>
        <div class="activity-detail-descript">台北市內湖區西康里西康路30號</div>

        <div class="activity-detail-title">開放名額</div>
        <div class="activity-detail-descript"><span>240</span> / <span class="disabled">300</span></div>

    </div>
</template>

<script>
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

        },
        methods: {

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
        font-size: 16px !important;
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

</style>
