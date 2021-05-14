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
    .v-stepper, .v-stepper__header {
        box-shadow: none !important;
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
        margin-top: 50px !important;
    }

    .grid .step-arrow::after {
        position: relative;
        content: '\25BA';
        top: 39px !important;
    }

    .grid.v-stepper--alt-labels .step-arrow::after {
        top: 32px;
    }

    .grid.v-stepper--alt-labels .v-stepper__step {
        flex-basis: 130px;
    }

    .v-stepper .v-sheet.v-card:not(.v-sheet--outlined) {
        box-shadow: none;
    }

    .v-stepper__items {
        margin-top: 10px;
    }

    .v-stepper__content {
        padding: 0;
    }

    /* Extra small devices (portrait phones, less than 576px) */
    @media (max-width: 575.98px) {
        .grid.v-stepper--alt-labels .v-stepper__step {
            flex-basis: 23%;
        }

        .grid.v-stepper:not(.v-stepper--vertical) .v-stepper__label {
            display: flex;
            font-size: 12px;
        }

        .grid .step-arrow::after {
            content: '';
        }

        .grid .v-stepper__step {
            padding: 24px 0;
        }
    }

    /* Small devices (landscape phones, 576px and up) */
    @media (min-width: 576px) and (max-width: 767.98px) {
        .grid.v-stepper--alt-labels .v-stepper__step {
            flex-basis: 105px;
        }

        .grid.v-stepper:not(.v-stepper--vertical) .v-stepper__label {
            display: flex;
        }

        .grid .v-stepper__step {
            padding: 24px 10px;
        }
    }

    /** Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) and (max-width: 991.98px) {
        .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
            display: flex;
        }
    }

    /* Large devices (desktops, 992px and up) */
    @media (min-width: 992px) and (max-width: 1199.98px) {
    }

    /* Extra large devices (large desktops, 1200px and up) */
    @media (min-width: 1200px) {
    }
</style>
