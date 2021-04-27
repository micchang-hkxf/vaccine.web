<template>
    <v-dialog v-model="isShow" full-screen>
        11111
    </v-dialog>
</template>

<script>
    export default {
        data: () => ({
            isShow: false
        }),
        computed: {
        },
        props: ["refKey"],
        created: function () {
            var comp = this;
            this.$bus.$on(`${comp.refKey}_show`, function (isShow) {
                comp.$set(comp, "isShow", isShow);
            });
            this.$bus.$on(`${comp.refKey}_switch`, function () {
                comp.$set(comp, "isShow", !comp.isShow);
            });
        },
        methods: {
           
        },
        components: {
        }
    }
</script>
<style>
</style>
