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
    </div>
</template>
<script>
    export default {
        data: () => ({
            isLoading: false,
            isLoading2: false,
            setColor: 'green',
            setColor2: 'red',
            value: 30,
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
</style>
