<template>
    <v-stepper v-model="e1" :alt-labels="altLabels" :class="refClass">
        <v-stepper-header>
            <template v-for="(step,index) in steps">
                <v-stepper-step :step="step.stepNum" :key="'step' + index">
                    {{step.title}}
                </v-stepper-step>
                <v-divider v-if="index !== steps.length - 1" :key="'divider' + index"></v-divider>
                <div class="step-arrow" v-if="arrow && index !== steps.length - 1" :key="'arrow' + index"></div>
            </template>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content :step="step.stepNum" v-for="(step,index) in steps" :key="'content'+ index">
                <slot :name="`step-${step.stepNum}`" :next="next" :previous="previous"></slot>
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
            refClass: function () {
                var result = {};
                result[this.refKey] = true;
                result[this.stepType] = true;
                return result;
            }
        },
        props: ["refKey", "steps", "altLabels", "arrow", "stepType"],
        created: function () {
            var comp = this;
            comp.$bus.$on(`${comp.refKey}_gotoStep`, function (stepNum) {
                comp.e1 = stepNum;
            });
        },
        methods: {
            next: function () {
                if (this.e1 < this.steps.length) {
                    this.e1 += 1;
                }
            },
            previous: function () {
                if (this.e1 > 1) {
                    this.e1 -= 1;
                }
            }
        },
        components: {
        }
    }
</script>
<style>
    .grid .v-stepper, .v-stepper__header {
        box-shadow: none !important;
        margin: 0 24px;
    }

    .grid .v-stepper__step {
        background-color: #00A794;
    }

    .grid .v-stepper__step__step {
        background-color: #00A794 !important;
        color: #000 !important;
    }

    .grid .v-stepper__step--active .v-stepper__step__step {
        background-color: #00A794 !important;
    }

    .grid .v-stepper__step--inactive .v-stepper__step__step {
        background-color: #FFF !important;
    }

    .grid .v-stepper__step__step {
        color: #000 !important;
    }

    .grid .v-stepper__step {
        border: 1px #CCC solid !important;
    }

    .grid .v-stepper__step--active {
        background-color: #00A794;
    }

    .grid .v-stepper__step--inactive {
        background-color: #FFF;
    }

    .grid .v-stepper__label {
        color: #000 !important;
        text-shadow: none !important;
    }

    .grid .v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
        background: none !important;
    }

    .grid.v-stepper--alt-labels .v-stepper__header .v-divider {
        margin-top: 44px !important;
    }

    .grid .step-arrow::after {
        position: relative;
        content: '\25BA';
        top: 26px;
    }

    .grid.v-stepper--alt-labels .step-arrow::after {
        top: 32px;
    }
</style>
