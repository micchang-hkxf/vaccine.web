<template>
    <v-list>
        <v-list-item @click="toPages('dialog')">
            <v-list-item-content>
                <v-list-item-title>Dialog</v-list-item-title>            
            </v-list-item-content>
        </v-list-item>

        <v-list-item @click="toPages('confirm')">
            <v-list-item-content>               
                <v-list-item-title>Confirm</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

    </v-list>
</template>

<script>
    export default {
        // router,
        data: () => ({
        }),
        computed: {
        },
        props: {
            
        },
        created: function () {
        },
        methods: {
            toPages: function (name) {
                this.$router.push({ name })
            }
        },
        components: {
        }
    }
</script>
<style>
</style>
