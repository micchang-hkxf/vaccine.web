<template>
    <com-dialog ref="dialogPanel" ref-key="two" :width="width" >
        <template v-slot:toolbar>
            {{title}}
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="close" :ripple="false">
                <v-icon color="white">fas fa-times</v-icon>
            </v-btn>
        </template>
        <template v-slot:content>
            <v-form>
                    <v-row>
                        <v-col cols="3">

                            <div><span class="regist-title">接種類型</span> <span class="red--text">*</span></div>
                            <v-select v-model="defaultItem.regist_district"
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
                    <v-row>
                        <v-col cols="3">

                            <div><span class="regist-title">新冠肺炎疫苗廠牌</span> <span class="red--text">*</span></div>
                            <v-select v-model="defaultItem.regist_district"
                                      :items="options"
                                      item-text="state"
                                      item-value="state"
                                      placeholder="請選擇新冠肺炎疫苗廠牌"
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
                            <div><span class="regist-title">場次標題</span><span class="red--text">*</span></div>

                            <v-text-field v-model="defaultItem.regist_title"
                                          placeholder="請輸入場次標題 ( 30字內 )"
                                          required
                                          outlined
                                          dense>
                            </v-text-field>


                        </v-col>

                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="12">
                            <div style="margin-top:15px;"><span class="regist-title">設站行政區里</span> <span class="red--text">*</span></div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">

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
                        <v-col cols="1"><div></div></v-col>
                        <v-col cols="3">
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
                
                    <v-row>
                        <v-col cols="12">
                            <div><span class="regist-title">設站地點</span><span class="red--text">*</span></div>
                            <v-text-field v-model="defaultItem.regist_title"
                                          placeholder="請輸入設站地點"
                                          required
                                          outlined
                                          dense>
                            </v-text-field>


                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col cols="3">

                            <div> <span class="regist-title">醫療院所</span><span class="red--text">*</span></div>
                            <v-select v-model="defaultItem.regist_district"
                                      :items="options"
                                      item-text="state"
                                      item-value="state"
                                      placeholder="請選擇醫療院所"
                                      :menu-props="{ bottom: true, offsetY: true }"
                                      outlined
                                      dense
                                      class="search-filter"
                                      return-object>
                            </v-select>
                            <div><span class="regist-title">機構代碼：3501110115</span> </div>
                            <div style="margin-bottom: 15px;"><span class="regist-title">機構所在行政區：內湖區</span></div>
                        </v-col>

                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="3">
                            <div style="margin-top:15px;"> <span class="regist-title">設站日期</span><span class="red--text">*</span></div>
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
                                           :ripple="false"
                                           color="primary"
                                           @click="menu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text
                                           :ripple="false"
                                           color="primary"
                                           @click="$refs.menu.save(date)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <div>  <span class="regist-title">設站時段設定</span><span class="red--text">*</span></div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">                        
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
                                           :ripple="false"
                                           color="primary"
                                           @click="menu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text
                                           :ripple="false"
                                           color="primary"
                                           @click="$refs.menu.save(date)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="1"><span style="display:flex;justify-content:center;color:#626781">-</span></v-col>
                        <v-col cols="3">                           
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
                                           :ripple="false"
                                           color="primary"
                                           @click="menu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text
                                           :ripple="false"
                                           color="primary"
                                           @click="$refs.menu.save(date)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col cols="6">

                            <div> <span class="regist-title">醫療院所</span><span class="red--text">*</span></div>
                            <v-select v-model="defaultItem.regist_district"
                                      :items="options"
                                      item-text="state"
                                      item-value="state"
                                      placeholder="請選擇醫療院所"
                                      :menu-props="{ bottom: true, offsetY: true }"
                                      outlined
                                      dense
                                      class="search-filter"
                                      return-object>
                            </v-select>
                            <div><span class="regist-title">事先報名結束時間：2021/05/05，23:59</span>  </div>
                            <div style="margin-bottom:15px;"><span class="regist-title">報名者接種資格複檢時間：2021/05/07</span> </div>
                        </v-col>

                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="6">

                            <div style="margin-top:15px;"><span class="regist-title">報名名額上限設定</span></div>
                            <v-text-field v-model="defaultItem.regist_title"
                                          placeholder="請輸入報名名額上限設定(預設無限制)"
                                          required
                                          outlined
                                          dense>
                            </v-text-field>                        
                        </v-col>

                    </v-row>
                <v-divider></v-divider>
            </v-form>

        </template>

        <template v-slot:action>

            <v-spacer></v-spacer>
            <v-btn @click="cancel" outlined :ripple="false"><span style="color:#626781;">取消</span></v-btn>
            <v-btn color="primary" @click="save" :ripple="false"><span>建立報名表</span></v-btn>

        </template>     
    </com-dialog>

</template>
<style>
    .v-btn--outlined {
        border: thin solid rgba(98 ,103, 129 ,0.2) !important;
    }
    .regist-title {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
    }
  

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
                this.mode = 'edit';
                Object.assign(this.model, model);
               
                this.$refs.dialogPanel.open();
            },

            create: function (model) {
                this.mode = 'new';
                Object.assign(this.model, model);

                this.$refs.dialogPanel.open();
            },
            save: function () {
               
                this.action({ mode: this.mode, action: 'save', model: this.model });

                this.$refs.dialogPanel.close();                
            },
            show: function () {
                this.$refs.dialogPanel.open();
            },
            close: function () {
                this.$refs.dialogPanel.close();
            },
            cancel: function () {
                this.action({ mode: this.mode, action: 'cancel', model: this.model });
                this.$refs.dialogPanel.close();
            },
            closeDialog: function () {
                this.$refs.dialogPanel.open();
            },
          
        },
        components: {
            comDialog
        }
    }
</script>