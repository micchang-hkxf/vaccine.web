<template>
    <v-list>
        <v-list-item @click="toPages('dialog')">
            <v-list-item-content>
                <v-list-item-title>Dialog</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item @click="toPages('steps')">
            <v-list-item-content>
                <v-list-item-title>Steps</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item @click="toPages('loading')">
            <v-list-item-content>
                <v-list-item-title>Loading</v-list-item-title>
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
