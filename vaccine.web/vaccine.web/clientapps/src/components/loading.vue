<template>
    <div class="text-center">

        <v-progress-circular indeterminate :color="setColor" v-show="isLoading"></v-progress-circular>
        <v-progress-circular :rotate="360"
                             :size="100"
                             :width="15"
                             :value="value"
                             :color="setColor"
                             v-show="isLoading2">
            {{ value }}
        </v-progress-circular>
        <div class="w3-modal" v-show="isLoading3" style="display:block">
            <div class="w3-modal-content">
                <img :src="picPath" />
                <div>{{ loadingText }}</div>
            </div>
        </div>




        <div class="w3-modal" v-show="isLoading4" style="display:block">
            <div class="w3-modal-content">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block; shape-rendering: auto" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" fill="none" stroke="#77ccdb30" stroke-width="2" r="24">
                    </circle>
                    <circle cx="50" cy="50" fill="none" stroke="#77ccdb" stroke-width="2" r="24" stroke-dasharray="30 180">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.5s" values="0 50 50;180 50 50;360 50 50" keyTimes="0;0.2;1" style="animation-play-state: running; animation-delay: 0s;"></animateTransform>
                    </circle>
                </svg>
                <div>{{ loadingText2 }}</div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data: () => ({
            isLoading: false,
            isLoading2: false,
            isLoading3: false,
            isLoading4: false,
            setColor: 'green',
            setColor2: 'red',
            value: 30,
            loadingText: "",
            loadingText2: "",
            picPath: "/images/loading.gif"
        }),
        computed: {
        },
        props: ["refKey"],
        created: function () {
            var comp = this;
 
            this.$bus.$on(`${comp.refKey}_show`, function () {
                console.log('show it');
                comp.$set(comp, "isLoading", true);
                //comp.$set(comp, "setColor", "red");
            });
            this.$bus.$on(`${comp.refKey}_hide`, function () {
                console.log('hide it');
                comp.$set(comp, "isLoading", false);
            });
            this.$bus.$on(`${comp.refKey}_show2`, function () {
                console.log('show2 it');
                comp.$set(comp, "isLoading2", true);
                //comp.$set(comp, "setColor2", "red");
            });
            this.$bus.$on(`${comp.refKey}_hide2`, function () {
                console.log('hide2 it');
                comp.$set(comp, "isLoading2", false);
            });
            this.$bus.$on(`${comp.refKey}_setrate`, function (v) {
                console.log('set:'+v);
                comp.$set(comp, "value",v);
            });
            this.$bus.$on(`${comp.refKey}_show3`, function (v) {
                console.log('show3 it');
                comp.$set(comp, "loadingText", v);
                comp.$set(comp, "isLoading3", true);
            });
            this.$bus.$on(`${comp.refKey}_hide3`, function () {
                console.log('hide3 it');
                comp.$set(comp, "isLoading3", false);
            });
            this.$bus.$on(`${comp.refKey}_picpath`, function (v) {
                comp.$set(comp, "picPath", v);
            });
            this.$bus.$on(`${comp.refKey}_show4`, function (v) {
                console.log('show4 it');
                comp.$set(comp, "loadingText2", v);
                comp.$set(comp, "isLoading4", true);
            });
            this.$bus.$on(`${comp.refKey}_hide4`, function () {
                console.log('hide4 it');
                comp.$set(comp, "isLoading4", false);
            });

        },
        methods: {
           
        },
        components: {
        }
    }
</script>
<style>
    .v-progress-circular {
        margin: 1rem;
    }
    .w3-modal {
        height: 100%;
        width: 100%;
        display: none;
        position: fixed;
        z-index: 99999999999999999;
        top: 0;
        left: 0;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0, 0.5);

    }
    .w3-modal-content {
        position: relative;
        top: 25%;
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }

   

</style>
