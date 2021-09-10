<template>
    <v-footer>
        <v-col cols="12">
            <div class="footer-content">
                <img src="/regist/Emblem_of_Taipei_City.png">
                <div>
                    <div>免付費電話：臺北市民當家熱線 1999(公共電話及預付卡除外)</div>
                    <div>Copyright {{ new Date().getFullYear() }} 版權所有 © 台北市政府</div>
                </div>
            </div>
        </v-col>
    </v-footer>
</template>

<script>
    export default {
        // router,
        data: () => ({

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
    .v-footer {
        background: #43496926 0% 0% no-repeat padding-box;
    }

    .footer-content {
        margin: 13px auto;
        max-width: 500px;
        display: flex;
    }

    .footer-content img {
        margin-right: 24px;
        width: 38px;
        height: 43px;
    }

    .footer-content div {
        text-align: left;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
    }

    /* Extra small devices (portrait phones, less than 576px) */
    @media (max-width: 575.98px) {
        .footer-content {
            display: block;
            text-align: center;
            max-width: 432px;
        }

        .footer-content img {
            margin-right: 0;
        }
    }

    /* Small devices (landscape phones, 576px and up) */
    @media (min-width: 576px) and (max-width: 767.98px) {
    }

    /** Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) and (max-width: 991.98px) {
    }

    /* Large devices (desktops, 992px and up) */
    @media (min-width: 992px) and (max-width: 1199.98px) {
    }

    /* Extra large devices (large desktops, 1200px and up) */
    @media (min-width: 1200px) {
    }
</style>
