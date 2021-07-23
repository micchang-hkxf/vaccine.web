<template>
    <div style="position:absolute;top:50%;left:50%;">
        {{time}}
        <timepicker v-model="time"></timepicker>
    </div>
    
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
