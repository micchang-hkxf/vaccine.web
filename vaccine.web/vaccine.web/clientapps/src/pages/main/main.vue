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
            this.$vuetify.theme.light = true;
        },
        methods: {
           
        }
    }
</script>
<style>
</style>
