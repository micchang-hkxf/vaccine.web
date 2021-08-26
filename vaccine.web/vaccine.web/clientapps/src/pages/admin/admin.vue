<template>
    <router-view></router-view>
</template>

<script>
    import vuetify from '@/plugins/vuetify'
    export default {
        vuetify: vuetify,
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
           
        }
    }
</script>
<style>
 

    html {
        height: 650px;
        overflow: scroll;
        overflow-x: hidden;
        padding-left: 10px;
        padding-right: 15px;
    }

        /*-------滾動條整體樣式----*/
    html::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

        /*滾動條裡面小方塊樣式*/
    html::-webkit-scrollbar-thumb {
        border-radius: 100px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #736DB9;
    }

        /*滾動條裡面軌道樣式*/
        html::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 20px;
            background: rgba(0,0,0,0.1);
        }

    .content-search-button {
        margin-left:4px!important;
    }
</style>
