<template>
    <v-dialog v-model="isShow" :width="width">
        <v-card class="mx-auto" >
            <v-toolbar :color="primary" class="dialog-toolbar">
                <slot name="toolbar" :close="close"></slot>
            </v-toolbar>
            <div class="dialog-content">
                <slot name="content" :close="close"></slot>
            </div>
            <v-card-actions>
                <slot name="action" :close="close"></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
    .v-dialog {
        border-radius: 0px 0px 8px 8px !important;
        box-shadow: none !important;
    }
    .dialog-content {
        padding: 16px;
    }
    .dialog-toolbar {
        font-size:20px!important;
        color:white!important;
        height: 56px;
        background: #2EB6C7 0% 0% no-repeat padding-box !important;
        border-radius: 8px 8px 0px 0px;
        opacity: 1;
    }
</style>

<script>
    export default {
        data: () => ({
            isShow: false
        }),
        computed: {

        },
        props: ["refKey","width"],
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
            close: function () {
                this.$set(this, 'isShow', false);
            },
            open: function () {
                this.$set(this, 'isShow', true);
            }
        },
        components: {
        }
    }
</script>
