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
               <img  :src="picPath"  />
               <div>{{ loadingText }}</div>
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
            setColor: 'green',
            setColor2: 'red',
            value: 30,
            loadingText:"",
            picPath: "http://localhost/loading.gif"
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
        z-index: 3;
        display: none;
        padding-top: 100px;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4)
    }
    .w3-modal-content {
        margin: auto;
        position: relative;
        padding: 0;
        outline: 0;
    }

   

</style>
