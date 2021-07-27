<template>
    <timepicker v-model="time"></timepicker>
</template>

<script>
    import timepicker from './vue-timepicker/Timepicker'
    export default {
        data() {
            return {

                time: '13:20'
            };
        },
        created() {
        },
        computed: {
        },
        methods: {

        },
        components: {
            timepicker
        }
    };
</script>

<style lang="scss">
</style>
