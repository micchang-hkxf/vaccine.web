<template>
    <v-stepper v-model="e1" :alt-labels="altLabels">
        <v-stepper-header>
            <template v-for="(step,index) in steps">
                <v-stepper-step :complete="e1 > step.stepNum" :step="step.stepNum" :key="index">
                    {{step.title}}
                </v-stepper-step>
                <v-divider v-if="index !== steps.length - 1" :key="index"></v-divider>
            </template>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content :step="step.stepNum" v-for="(step,index) in steps" :key="index">
                <slot :name="`step-${step.stepNum}`"></slot>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
    export default {
        data: () => ({
            e1: 1
        }),
        computed: {
            
        },
        props: ["refKey","steps","altLabels"],
        created: function () {
            var comp = this;
            comp.$bus.$on(`${comp.refKey}_gotoStep`, function (stepNum) {
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
