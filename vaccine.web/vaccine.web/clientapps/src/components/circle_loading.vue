<template>
    <div style="position:absolute;top:calc(45% - 100px);left:calc(50% - 100px);" v-if="enabled">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block; shape-rendering: auto; animation-play-state: running; animation-delay: 0s;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#959595" stroke-width="5" r="24"></circle>
            <circle cx="50" cy="50" fill="none" stroke="#2EB6C7" stroke-width="5" r="24" stroke-dasharray="20 200" style="stroke-linecap: round;animation-play-state: running; animation-delay: 0s;">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.5s" values="0 50 50;360 50 50" keyTimes="0;1" style="animation-play-state: running; animation-delay: 0s;"></animateTransform>
            </circle>
        </svg>

        <v-overlay :value="true">
        </v-overlay>
    </div>

</template>

<script>
    export default {
        props:['enabled'],
        data: () => ({
        }),
        computed: {

        },
        created: function () {

        },
        methods: {
            
        },
        components: {
        },
}
</script>