<template>
    <app-layout>
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <v-btn @click="gotoStep(3)">gotoStep</v-btn>
                <com-steps start-step="1" :steps="steps">
                    <template v-slot:step-content>
                        <v-stepper-content step="1">
                            <v-card class="mb-12"
                                    color="grey lighten-1"
                                    height="200px"></v-card>

                            <v-btn color="primary"
                                   @click="e1 = 2">
                                Continue
                            </v-btn>

                            <v-btn text>
                                Cancel
                            </v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="2">
                            <v-card class="mb-12"
                                    color="grey lighten-1"
                                    height="200px"></v-card>

                            <v-btn color="primary"
                                   @click="e1 = 3">
                                Continue
                            </v-btn>

                            <v-btn text>
                                Cancel
                            </v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <v-card class="mb-12"
                                    color="grey lighten-1"
                                    height="200px"></v-card>

                            <v-btn color="primary"
                                   @click="e1 = 1">
                                Continue
                            </v-btn>

                            <v-btn text>
                                Cancel
                            </v-btn>
                        </v-stepper-content>
                    </template>
                </com-steps>
            </div>
        </template>
    </app-layout>
</template>

<script>
    import comSteps from 'components/steps'
    import appMenu from 'components/main/menu'
    import appLayout from 'components/app_layout'
    export default {
        // router,
        data: () => ({
            steps: [
                { 'stepNum': 1, 'title': '步驟 1' },
                { 'stepNum': 2, 'title': '步驟 2' },
                { 'stepNum': 3, 'title': '步驟 3' }
            ]
        }),
        computed: {
        },
        props: ["startStep"],
        created: function () {

        },
        methods: {
            gotoStep: function (stepNum) {
                this.$bus.$emit('gotoStep', stepNum);
            }
        },
        components: {
            appLayout, appMenu, comSteps
        }
    }
</script>
<style>
</style>
