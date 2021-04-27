<template>
    <v-dialog v-model="isShow">
        <v-card class="mx-auto">
            <v-toolbar :color="primary" height="56px">
                <slot name="toolbar"></slot>
            </v-toolbar>
            <slot name="content"></slot>
            <v-card-actions>
                <slot name="action"></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>

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
