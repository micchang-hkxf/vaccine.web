<template>
    <com-dialog ref="auditEditor" ref-key="auditEditor" :width="width">
        <template v-slot:toolbar>
            {{title}}
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="cancel" :ripple="false">
                <v-icon color="white">fas fa-times</v-icon>
            </v-btn>
        </template>
        <template v-slot:content>
            <v-form lazy-validation ref="auditEditorForm">
                <div class="description">
                    請填寫下載事由與設定查詢條件後執行「下載報表」以下載相關檔案，本檔案將進行加密，系統會自動寄送解鎖密碼至您提供的email信箱。
                </div>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <div>查詢時間（民國年） <span class="red--text">*</span></div>
                            <v-select v-model="defaultItem.audit_year"
                                      :rules="[rules.required]"
                                      :items="year"
                                      item-text="state"
                                      item-value="state"
                                      placeholder="年（yyy）"
                                      :menu-props="{ bottom: true, offsetY: true }"
                                      outlined
                                      dense
                                      class="search-filter"
                                      return-object>
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <div>查詢時間（月） <span class="red--text">*</span></div>
                            <v-select v-model="defaultItem.audit_month"
                                      :rules="[rules.required]"
                                      :items="month"
                                      item-text="state"
                                      item-value="state"
                                      placeholder="月（mm）"
                                      :menu-props="{ bottom: true, offsetY: true }"
                                      outlined
                                      dense
                                      class="search-filter"
                                      return-object>
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <div>抽查類型 <span class="red--text">*</span></div>
                            <v-select v-model="defaultItem.audit_type"
                                      :rules="[rules.required]"
                                      :items="options"
                                      item-text="state"
                                      item-value="state"
                                      placeholder="請選擇抽查類型"
                                      :menu-props="{ bottom: true, offsetY: true }"
                                      outlined
                                      dense
                                      class="search-filter"
                                      return-object>
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <div>下載事由 <span class="red--text">*</span></div>
                            <!--
                            <v-text-field v-model="defaultItem.audit_reason"
                                          :rules="[rules.required]"
                                          placeholder="請輸入下載事由（限30字內）"
                                          required
                                          outlined
                                          dense
                                          maxlength="30">
                            </v-text-field>
                            -->
                            <v-textarea v-model="defaultItem.audit_reason"
                                        :rules="[rules.required, rules.maxlength30]"
                                        placeholder="請輸入下載事由（限30字內）"
                                        required
                                        outlined
                                        dense
                                        rows="2"
                                        counter="30">
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <div class="audit-description">
                                抽樣說明：
                                <li>抽樣查詢件數500件以下：抽查6%(最少抽查20件)</li>
                                <li>抽樣查詢件數501件至2000件：抽查5%(最少抽查30件、最多抽查80件)</li>
                                <li>抽樣查詢件數2001件以上：抽查4%(最多抽查150件)</li>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
            </v-form>

        </template>

        <template v-slot:action>
            <v-spacer></v-spacer>
            <v-btn @click="cancel" outlined :ripple="false"><span style="color:#626781;">取消</span></v-btn>
            <v-btn color="primary" @click="save" :ripple="false"><span>下載報表</span></v-btn>
        </template>     
    </com-dialog>

</template>
<style>
    .v-btn--outlined {
        border: thin solid rgba(98 ,103, 129 ,0.2) !important;
    }

    .description {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: left;
        opacity: 1;
        margin-bottom: 10px;
    }

    .audit-description {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #62678166;
        text-align: left;
        opacity: 1;
    }
</style>

<script>
    import comDialog from 'components/dialog'
 
    export default {
       
        data: () => ({
            mode:'',
            options: [
                { state: '完整', id: 0 },
                { state: '抽樣', id: 1 },
            ],
            model: {},
            year: [],
            month: [],
            rules: {
                required: v => !!v || '必填',
                maxlength30: v => (v || '').length <= 30 || '超過限制'
            }
        }),
        computed: {
            defaultItem: function () {
                return this.model;
            }
        },
        props: ['width','title','action'],
        created: function () {
            var currentY = new Date().getFullYear();
            for (var y = currentY; y > currentY - 10; y--) {
                var _y = y - 1911;
                _y = _y < 100 ? '0' + _y : _y;
                this.year.push(_y);
            }
            
            for (var m = 1; m <= 12; m++) {
                var _m = m < 10 ? '0' + m : m;
                this.month.push(_m);
            }
        },
        methods: {
            open: function (model) {
                if (!model) this.mode = 'new';
                else this.mode = 'edit';
                Object.assign(this.model, model);

                this.$refs.auditEditor.open();
            },
            save: function () {
                var isvaild = this.$refs.auditEditorForm.validate();
                if (!isvaild) return;

                this.action({ mode: this.mode, action: 'save', model: this.model });
                this.$refs.auditEditor.close();                
            },
            show: function () {
                this.$refs.auditEditor.open();
            },
            close: function () {
                this.$refs.auditEditor.close();
            },
            cancel: function () {
                var comp = this;
                comp.close();
                setTimeout(function () {
                    comp.$refs.auditEditorForm.reset();
                }, 0);
            },
            closeDialog: function () {
                this.$refs.auditEditor.open();
            },
          
        },
        components: {
            comDialog
        }
    }
</script>