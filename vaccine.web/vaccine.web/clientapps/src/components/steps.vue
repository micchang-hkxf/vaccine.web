<template>
    <v-stepper v-model="e1">
        <v-stepper-header>
            <template v-for="(step,index) in steps">
                <v-stepper-step :complete="e1 > step.stepNum"
                                :step="step.stepNum" :key="index">
                    {{step.title}}
                </v-stepper-step>

                <v-divider v-if="index !== steps.length - 1"></v-divider>
            </template>

                    <!--<v-stepper-step :complete="e1 > 2"
                        step="2">
            Name of step 2
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
            Name of step 3
        </v-stepper-step>-->
</v-stepper-header>

        <v-stepper-items>
            <slot name="step-content"></slot>
            <!--<v-stepper-content step="1">
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
            </v-stepper-content>-->

            <!--<v-stepper-content step="2">
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
            </v-stepper-content>-->
        </v-stepper-items>
    </v-stepper>
</template>

<script>
    export default {
        data: () => ({
            e1: 1,
            //steps: [
            //    ['Step 1', 'Content 1'],
            //    ['Step 2', 'Content 2'],
            //    ['Step 3', 'Content 3']
            //]
        }),
        computed: {

        },
        props: ["startStep", "steps"],
        created: function () {
            var comp = this;
            comp.$bus.$on('gotoStep', function (stepNum) {
                comp.e1 = stepNum;
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
