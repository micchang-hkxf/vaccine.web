<template>
    <v-dialog class="login-editor"  v-model="isShow">
        <v-card>
            <v-card-title class="login-header">請輸入您的資料以驗證身份</v-card-title>
            <v-card-text class="login-container">
                <div class="login-field">
                    <div class="login-field-label">身份證字號<span class="red--text">*</span></div>
                    <div class="login-field-container">
                        <v-text-field class="login-field-text" placeholder="請輸入您的身分證字號"></v-text-field>
                    </div>
                </div>
                <div class="login-field">
                    <div class="login-field-label">生日<span class="red--text">*</span></div>
                    <div class="login-field-container d-flex justify-space-between">
                        <v-select :items="years" placeholder="yyy">

                        </v-select>
                        <v-select :items="months" placeholder="mm">
                            <template v-slot:prepend>
                                /
                            </template>
                        </v-select>
                        <v-select :items="days" placeholder="dd">
                            <template v-slot:prepend>
                                /
                            </template>
                        </v-select>
                    </div>
                </div>
            </v-card-text>
            <v-card-actions class="login-actions d-flex justify-space-around">
                <v-btn color="#626781" @click.stop="isShow=false">取消</v-btn>
                <v-btn color="#736DB9" :to="{ name:'apply' }">下一步</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
            }, isShow: false,
            years: [108],
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        }),
        computed: {
        },
        props: {

        },
        created: function () {

        },
        methods: {
            create: function () {
                this.isShow = true;
            }
        },
        components: {
        }
    }
</script>
<style scoped>


    .login-editor/deep/ {
    }

        .login-editor/deep/ .v-overlay__scrim {
        }

    
    .login-editor/deep/ .login-header {
        font-size: 16px !important;
        color: #626781 !important;
    }

        .login-editor/deep/ .login-container {
        }

            .login-editor/deep/ .login-container .login-field-label {
                color: #434969 !important;
                font-size: 16px !important;
            }

            .login-editor/deep/ .login-container .login-field-container {
            }

        .login-editor/deep/ .login-actions {
        }

            .login-editor/deep/ .login-actions .v-btn {
                width: 60px !important;
            }

        .login-editor/deep/ .v-text-field,
        .login-editor/deep/ .v-select {
            padding-top: 0px !important;
            margin-top: 0px !important;
        }
</style>
