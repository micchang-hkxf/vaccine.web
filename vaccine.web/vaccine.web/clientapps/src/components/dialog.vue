<template>
    <v-dialog v-model="isShow" :width="width" scrollable>
        <v-card :class="refClass">
            <v-card-title color="primary" class="dialog-toolbar">
                <slot name="toolbar" :close="close"></slot>
            </v-card-title>

            <v-card-text class="dialog-content">
                <slot name="content" :close="close"></slot>
            </v-card-text>
            <v-card-actions v-if="hasSlot('action')">
                <slot name="action" :close="close"></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
    .v-dialog {
        border-radius: 0px 0px 8px 8px !important;
        box-shadow: none !important;
        overflow-y: hidden !important;
        overflow-x: hidden !important;
    }
    .dialog-content {
        padding: 16px;
    }
    .dialog-toolbar {
        font-size: 20px !important;
        color: white !important;
        height: 56px;
        background: #736DB9 0% 0% no-repeat padding-box !important;
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
            refClass: function () {
                var result = {};
                result[this.refKey] = true;
                return result;
            }
        },
        props: ["refKey", "width"],
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
            hasSlot: function (templateName) {
                return this.$slots[templateName] != null || this.$scopedSlots[templateName] != null;
            },
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
