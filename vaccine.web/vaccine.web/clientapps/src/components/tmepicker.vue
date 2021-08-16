<template>
    <timepicker v-model="time"></timepicker>
</template>

<script>
    import timepicker from './vue-timepicker/timepicker'
    export default {
        data() {
            return {
                time: '12:00'
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
