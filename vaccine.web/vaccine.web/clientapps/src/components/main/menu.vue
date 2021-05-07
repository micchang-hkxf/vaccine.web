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

        <v-list-item @click="toPages('table')">
            <v-list-item-content>
                <v-list-item-title>Table</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item @click="openPages('/login')">
            <v-list-item-content>
                <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item @click="openPages('/admin')">
            <v-list-item-content>
                <v-list-item-title>Layout</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>


        <v-list-item @click="openPages('/regist/#/regist')">
            <v-list-item-content>
                <v-list-item-title>報名</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item @click="openPages('/regist/#/unapply')">
            <v-list-item-content>
                <v-list-item-title>未登記清單</v-list-item-title>
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
            },
            openPages: function (url) {
                window.open(url)
            }
        },
        components: {
        }
    }
</script>
<style>
</style>
