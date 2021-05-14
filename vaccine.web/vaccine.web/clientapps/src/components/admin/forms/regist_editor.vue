

<template>                
                <com-dialog ref="dialogPanel" ref-key="two" :width="width">
                    <template v-slot:toolbar>
                       {{title}} 
                    </template>
                    <template v-slot:content>                       
                            <v-form>
                                <v-card-text>
                                    <v-row style="display:contents;">
                                        <v-col cols="12">
                                            <div>會議標題 <span class="red--text">*</span></div>
                                            <v-text-field v-model="defaultItem.regist_title"
                                                          placeholder="請輸入場次標題 ( 30字內 )"
                                                          required
                                                          outlined
                                                          dense>
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <div>接種類型 <span class="red--text">*</span></div>
                                            <v-select v-model="defaultItem.regist_type"
                                                      :items="options"
                                                      item-text="state"
                                                      item-value="state"
                                                      placeholder="請選擇接種類型"
                                                      :menu-props="{ bottom: true, offsetY: true }"
                                                      outlined
                                                      dense
                                                      class="search-filter"
                                                      return-object>
                                            </v-select>
                                        </v-col>
                                     
                                    </v-row>
                                    <v-divider></v-divider>
                                    <v-row>
                                        <v-col cols="12"> <div>設站行政區里<span class="red--text">*</span></div></v-col>

                                    </v-row>
                                    <v-row>
                                        <v-col cols="5">

                                            <v-select v-model="defaultItem.regist_district"
                                                      :items="options"
                                                      item-text="state"
                                                      item-value="state"
                                                      placeholder="請選擇行政區"
                                                      :menu-props="{ bottom: true, offsetY: true }"
                                                      outlined
                                                      dense
                                                      class="search-filter"
                                                      return-object>
                                            </v-select>

                                        </v-col>
                                    <v-spacer></v-spacer>
                                        <v-col cols="5">
                                            <v-select v-model="defaultItem.regist_village"
                                                      :items="options"
                                                      item-text="state"
                                                      item-value="state"
                                                      placeholder="請選擇村里"
                                                      :menu-props="{ bottom: true, offsetY: true }"
                                                      outlined
                                                      dense
                                                      class="search-filter"
                                                      return-object>
                                            </v-select>
                                        </v-col>

                                    </v-row>
                                    <v-divider></v-divider>
                                    <v-row>
                                        <v-col cols="12">
                                            <div>設站日期 <span class="red--text">*</span></div>
                                            <v-menu ref="menu"
                                                    v-model="menu"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="date"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="auto">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="defaultItem.regist_date"
                                                                  append-icon="mdi-calendar"
                                                                  readonly
                                                                  v-bind="attrs"
                                                                  v-on="on"
                                                                  outlined
                                                                  dense></v-text-field>
                                                </template>
                                                <v-date-picker v-model="date"
                                                               no-title
                                                               scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text
                                                           color="primary"
                                                           @click="menu = false">
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn text
                                                           color="primary"
                                                           @click="$refs.menu.save(date)">
                                                        OK
                                                    </v-btn>
                                                </v-date-picker>
                                            </v-menu>

                                        </v-col>



                                    </v-row>



                                </v-card-text>
                                <v-divider></v-divider>
                            </v-form>
                    
                    </template>
                   
                    <template v-slot:action>

                        <v-spacer></v-spacer>
                        <v-btn @click="cancel">取消</v-btn>
                        <v-btn @click="save">儲存草稿</v-btn>

                    </template>
                </com-dialog>

</template>
<style>
</style>




<script>
    import comDialog from 'components/dialog'
    export default {
       
        data: () => ({
            mode:'',
            options: [
                { state: '進行中', id: 'geton' },
                { state: '即將開始(已預先開放)', id: 'abouttostart' },
                { state: '尚未開始', id: 'notyetstart' },
                { state: '已結束', id: 'history' },
            ],
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            model: {},
            //defaultItem: {
            //    regist_title: '',               
            //    regist_type: '',
            //    regist_district: '',
            //    regist_village: '',
            //    regist_date: new Date().toISOString().substr(0, 10),
            //},
        }),
        computed: {
            defaultItem: function () {
                return this.model;
            }
        },
        props: ['width','title','action'],
        created: function () {
        },
        methods: {
            open: function (model) {
                if (!model) this.mode = 'new';
                else this.mode = 'edit';
                Object.assign(this.model, model);
               
                this.$refs.dialogPanel.open();
            },
            save: function () {
                this.action({ mode: this.mode, action: 'save', model: this.model });
                this.$refs.dialogPanel.close();
            },

            cancel: function () {
                this.action({ mode: this.mode, action: 'cancel', model: this.model });
                this.$refs.dialogPanel.close();
            },
            closeDialog: function () {
                this.$refs.dialogPanel.open();
            }
        },
        components: {
            comDialog
        }
    }
</script>