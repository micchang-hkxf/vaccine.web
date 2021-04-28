<template>
    <app-layout>
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:app-content>
            <div id="app">
                <label>範例一</label>
                <com-steps ref-key="one"
                           :steps="steps"
                           :alt-labels="false">
                    <template v-slot:step-1>
                        <v-card class="mb-12" color="grey lighten-1" height="100px">內文 1</v-card>
                        <v-btn color="primary" @click="gotoStep('one',2)">Continue</v-btn>
                        <v-btn text @click="stepsCancel('one')">Cancel</v-btn>
                    </template>
                    <template v-slot:step-2>
                        <v-card class="mb-12" color="grey lighten-1" height="100px">內文 2</v-card>
                        <v-btn color="primary" @click="gotoStep('one',3)">Continue</v-btn>
                        <v-btn text @click="stepsCancel('one')">Cancel</v-btn>
                    </template>
                    <template v-slot:step-3>
                        <v-card class="mb-12" color="grey lighten-1" height="100px">內文 3</v-card>
                        <v-btn color="primary" @click="stepsFinish('one')">Finish</v-btn>
                        <v-btn text @click="stepsCancel('one')">Cancel</v-btn>
                    </template>
                </com-steps>

                <label>範例二</label>
                <com-steps ref-key="two"
                           :steps="steps"
                           :alt-labels="true">
                    <template v-slot:step-1>
                        <v-card class="mb-12" color="grey lighten-1" height="100px">內文 1</v-card>
                        <v-btn color="primary" @click="gotoStep('two',2)">Continue</v-btn>
                        <v-btn text @click="stepsCancel('two')">Cancel</v-btn>
                    </template>
                    <template v-slot:step-2>
                        <v-card class="mb-12" color="grey lighten-1" height="100px">內文 2</v-card>
                        <v-btn color="primary" @click="gotoStep('two',3)">Continue</v-btn>
                        <v-btn text @click="stepsCancel('two')">Cancel</v-btn>
                    </template>
                    <template v-slot:step-3>
                        <v-card class="mb-12" color="grey lighten-1" height="100px">內文 3</v-card>
                        <v-btn color="primary" @click="stepsFinish('two')">Finish</v-btn>
                        <v-btn text @click="stepsCancel('two')">Cancel</v-btn>
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
            ], // stepNum: 標籤編號, title: 標籤文
        }),
        computed: {
        },
        props: [],
        created: function () {
        },
        methods: {
            gotoStep: function (refKey, stepNum) {
                this.$bus.$emit(`${refKey}_gotoStep`, stepNum);
            },
            stepsFinish: function (refKey) {
                alert(refKey + ' finish');
                this.gotoStep(refKey, 1);
            },
            stepsCancel: function (refKey) {
                alert(refKey + ' cancel');
                this.gotoStep(refKey,1);
            }
        },
        components: {
            appLayout, appMenu, comSteps
        }
    }
</script>
<style>
</style>
