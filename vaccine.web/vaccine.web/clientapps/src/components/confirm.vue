<template> 
        <v-dialog v-model="isShow"  width="264" persistent  >
            <v-card>
                <!--@keydown.enter="isShow = false-->
                <v-card-title>
                    <div class="confirm-image d-flex justify-center">
                        <div>
                            <slot name="confirm-image"></slot>
                        </div>
                    </div>
                    <div class="confirm-text-container justify-center">
                        <div class="confirm-title"><slot name="confirm-title"></slot></div>
                        <div class="confirm-text"><slot name="confirm-text"></slot></div>
                        <div class="confirm-sub-title"><slot name="confirm-sub-title"></slot></div>
                    </div>
                </v-card-title>

                <template v-if="!$slots['confirm-left-btn-text']">
                    <div class="d-flex justify-center">
                        <v-row>
                            <v-col cols="12" class="confirm-btns">
                                <v-btn class="confirm-center-btn"
                                       :color="setRightColor"
                                       :ripple="false"
                                       :outlined="setRightOutlined"
                                       @click="rightBtnAction">
                                    <span class="confirm-right-btns-text"><slot name="confirm-right-btn-text"></slot></span>

                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>
                </template>


                <template v-if="$slots['confirm-left-btn-text']">
                    <div class="d-flex justify-center">
                        <v-row>
                            <v-col cols="6" class="confirm-btns">
                                <v-btn class="confirm-left-btn"
                                       :color="setLeftColor"
                                       :ripple="false"
                                       :outlined="setLeftOutlined"
                                       @click="leftBtnAction">
                                    <span class="confirm-left-btns-text"><slot name="confirm-left-btn-text"></slot></span>
                                </v-btn>
                            </v-col>
                            <v-col cols="6" class="confirm-btns">
                                <v-btn class="confirm-right-btn"
                                       :color="setRightColor"
                                       :ripple="false"
                                       :outlined="setRightOutlined"
                                       @click="rightBtnAction">
                                    <span class="confirm-right-btns-text"><slot name="confirm-right-btn-text"></slot></span>

                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>
                </template>


            </v-card>
        </v-dialog>
</template>


<style>
    .v-dialog {
        box-shadow: none !important;
        border-radius: 8px !important;
    }

    .v-btn--contained {
     box-shadow:none !important;    
    }


    .v-btn:before {
         background-color: white !important; 
    }
    
    .row, .col {
        margin: 0px !important;
        padding: 0px !important;
        flex: none !important;
    }

    .confirm-image {
        width: 100%;
        padding-top:14px;
    }

    .confirm-text-container {
        font-size: 15px;
        width: 100%;
        white-space: pre-wrap !important;
    }

    .confirm-title {
        display: flex;
        justify-content: center;
        font: normal normal normal 20px Noto Sans T Chinese;
        text-align: center;
        opacity: 1;
        padding-top: 14px;
    }

    .confirm-text {
        display: flex;
        justify-content: center;
        font: normal normal normal 16px Noto Sans T Chinese;
        text-align: center;
        opacity: 1;
        padding-top: 4px;
    }

    .confirm-sub-title {
        display: flex;
        justify-content: center;
        color: rgba(50,65,80,0.5);      
        font: normal normal normal 12px Noto Sans T Chinese;
        text-align: center;
        opacity: 1;
        padding-top: 4px;
    }


    .confirm-btns{
       display:flex;
       justify-content:center;
       /*max-width:50% !important;*/
     
    }

    .confirm-left-btns-text {
        color: #324150;
        font: normal normal normal 16px/24px Roboto;
        letter-spacing: 0px;
        text-align: center;
        opacity: 1;
    }

    .confirm-right-btns-text {
        color: #FFFFFF;
        font: normal normal normal 16px/24px Roboto;
        letter-spacing: 0px;
        text-align: center;
        opacity: 1;
    }


    .confirm-center-btn {
        width: 88px;
        margin-bottom: 20px;
    }

    .confirm-left-btn {
        width: 88px;
        /*color: rgba(50,65,80,0.2) !important;*/
        margin-bottom: 20px;
        margin-right: 20px;
    }

    .confirm-right-btn {
        width: 88px;
        margin-bottom: 20px;
        margin-left: 20px;
    }


</style>

<script>
    export default {
    
        props: ['refKey', 'rightClick', 'leftClick', 'leftColor', 'rightColor', 'leftOutlined', 'rightOutlined'],
        data: () => ({
            isShow: false,
            setLeftColor: "rgba(50,65,80,0.2)",
            setRightColor: "#2EB6C7",
            setLeftOutlined: true,
            setRightOutlined: false,

        }),
        computed: {
        },      
        created: function () {
            var comp = this;

            comp.$set(comp, "setLeftColor", comp.leftColor);
            comp.$set(comp, "setRightColor", comp.rightColor);

            comp.$set(comp, "setLeftOutlined", comp.leftOutlined == "on");
            comp.$set(comp, "setRightOutlined", comp.rightOutlined == "on");

            this.$bus.$on(`${comp.refKey}_show`, function (isShow) {
                comp.$set(comp, "isShow", isShow);
            });
            this.$bus.$on(`${comp.refKey}_switch`, function () {
                comp.$set(comp, "isShow", !comp.isShow);
            });
        },
        methods: {
            open: function(){
                this.isShow = true;
            },
            rightBtnAction: function () {
                this.rightClick();
            },
            leftBtnAction: function () {
                this.leftClick();
            },
            close: function () {
                this.$set(this, 'isShow', false);
            },
            hasSlot: function (templateName) {
                return this.$slots[templateName] != null || this.$scopedSlots[templateName] != null;
            },
        },
        //components: {
        //}
    }
</script>