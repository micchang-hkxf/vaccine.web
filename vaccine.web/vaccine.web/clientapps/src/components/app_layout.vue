<template>
    <!-- App.vue -->
    <v-app class="app-container" light>
        <v-navigation-drawer app v-model="showNavi" v-if="$slots['navigation']">
            <div class="app-navigation" v-if="$slots['navigation']">
                <slot name="navigation" />
            </div>
            <!-- -->
        </v-navigation-drawer>


        <v-app-bar app v-if="$slots['app-bar']" v-bind="barOption">
            <template v-slot:extension v-if="$slots['extension']">
                <slot name="extension" />
            </template>
            <div class="app-bar" v-if="$slots['app-bar']">
                <slot name="app-bar" />
            </div>
            <!-- -->
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main class="app-content" v-if="$slots['app-content']">
            <div class="app-content" v-if="$slots['app-content']">
                <slot name="app-content" />
            </div>
        </v-main>

        <v-footer app v-if="$slots['app-footer']">
            <div class="app-footer" v-if="$slots['app-footer']">
                <slot name="app-footer" />
            </div>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        // router,
        data: () => ({
            drawer:true ,
        }),
        computed: {
            showNavi: {
                get: function () {
                    if (!this.enabledDrawer) return false;
                    return this.drawer && this.$slots['navigation'];
                },
                set: function () {
                    null;
                }
            } ,
            barOption: function () {
                return this.appBar || {};
            }
        },
        props: ['appBar','enabledDrawer'],
        created: function () {
        },
        methods: {
           
        }
    }
</script>
<style>
</style>
