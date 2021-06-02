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
            <v-form class="edit-form">
                <v-row>
                    <v-col cols="4">
                        <div><span class="regist-title">接種類型</span> <span class="red--text">*</span></div>
                        <v-select v-model="defaultItem.regist_type"
                                  :items="vaccines"
                                  item-text="name"
                                  item-value="id"
                                  placeholder="請選擇接種類型"
                                  :menu-props="{ bottom: true, offsetY: true }"
                                  :rules="[rules.required]"
                                  outlined
                                  dense
                                  class="search-filter"
                                  append-icon="mdi-chevron-down"
                                  return-object>
                        </v-select>
                    </v-col>

                </v-row>
                <v-row>
                    <v-col cols="4">
                        <div><span class="regist-title">新冠肺炎疫苗廠牌</span> <span class="red--text">*</span></div>
                        <v-select v-model="defaultItem.regist_brand"
                                  :items="brands"
                                  item-text="name"
                                  item-value="id"
                                  placeholder="請選擇新冠肺炎疫苗廠牌"
                                  :menu-props="{ bottom: true, offsetY: true }"
                                  :rules="[rules.required]"
                                  outlined
                                  dense
                                  class="search-filter"
                                  append-icon="mdi-chevron-down"
                                  return-object>
                        </v-select>
                    </v-col>

                </v-row>
                <v-row>
                    <v-col cols="12">
                        <div><span class="regist-title">場次標題</span><span class="red--text">*</span></div>
                        <v-text-field v-model="defaultItem.regist_title"
                                      placeholder="請輸入場次標題 ( 30字內 )"
                                      :rules="[rules.required]"
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
                                  :items="districts"
                                  item-text="name"
                                  item-value="id"
                                  placeholder="請選擇行政區"
                                  :menu-props="{ bottom: true, offsetY: true }"
                                  :rules="[rules.required]"
                                  outlined
                                  dense
                                  class="search-filter"
                                  append-icon="mdi-chevron-down"
                                  return-object>
                        </v-select>
                    </v-col>
                    <v-col cols="1"><div></div></v-col>
                    <v-col cols="3">
                        <v-select v-model="defaultItem.regist_village"
                                  :items="villages"
                                  item-text="name"
                                  item-value="id"
                                  placeholder="請選擇村里"
                                  :menu-props="{ bottom: true, offsetY: true }"
                                  :rules="[rules.required]"
                                  outlined
                                  dense
                                  class="search-filter"
                                  append-icon="mdi-chevron-down"
                                  return-object>
                        </v-select>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <div><span class="regist-title">設站地點</span><span class="red--text">*</span></div>
                        <v-text-field v-model="defaultItem.regist_place"
                                      placeholder="請輸入設站地點"
                                      :rules="[rules.required]"
                                      required
                                      outlined
                                      dense>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <div> <span class="regist-title">醫療院所</span><span class="red--text">*</span></div>
                        <v-select v-model="defaultItem.regist_institution"
                                  :items="institutions"
                                  item-text="name"
                                  item-value="id"
                                  placeholder="請選擇醫療院所"
                                  :menu-props="{ bottom: true, offsetY: true }"
                                  outlined
                                  dense
                                  class="search-filter"
                                  append-icon="mdi-chevron-down"
                                  return-object>
                        </v-select>                      
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
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
                                              :rules="[rules.required]"
                                              readonly
                                              v-bind="attrs"
                                              v-on="on"
                                              outlined
                                              dense></v-text-field>
                            </template>
                            <v-date-picker v-model="defaultItem.regist_date"
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
                                       @click="$refs.menu.save(defaultItem.regist_date)">
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
                        <v-menu 
                                v-model="start"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="defaultItem.regist_start_time"
                                              append-icon="mdi-clock-outline"
                                              :rules="[rules.required]"
                                              readonly
                                              v-bind="attrs"
                                              v-on="on"
                                              outlined
                                              dense></v-text-field>
                            </template>
                            <v-time-picker v-model="defaultItem.regist_start_time"
                                           :max="defaultItem.regist_end_time"
                                           no-title
                                           scrollable>
                                <v-spacer></v-spacer>
                                <!--<v-btn text
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
                                </v-btn>-->
                            </v-time-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="1"><span style="display:flex;justify-content:center;color:#626781">-</span></v-col>
                    <v-col cols="3">
                        <v-menu v-model="end"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="defaultItem.regist_end_time"
                                              append-icon="mdi-clock-outline"
                                              readonly
                                              v-bind="attrs"
                                              v-on="on"
                                              outlined
                                              dense></v-text-field>
                            </template>
                            <v-time-picker v-model="defaultItem.regist_end_time"
                                           :min="defaultItem.regist_start_time"
                                           no-title
                                           scrollable>
                                <v-spacer></v-spacer>
                                <!--<v-btn text
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
                                </v-btn>-->
                            </v-time-picker>
                        </v-menu>
                    </v-col>

                </v-row>

                <v-row>
                    <v-col cols="6">
                        <div> <span class="regist-title">事先報名開始時間</span><span class="red--text">*</span></div>
                        <v-text-field v-model="defaultItem.regist_in_advance"
                                      placeholder="請輸入事先報名開始時間"
                                       append-icon="mdi-calendar"
                                      :rules="[rules.required]"
                                      required
                                      outlined
                                      dense>
                        </v-text-field>
                        <div><span class="regist-title">事先報名結束時間：2021/05/05，23:59</span>  </div>
                        <div style="margin-bottom:15px;"><span class="regist-title">報名者接種資格複檢時間：2021/05/07</span> </div>
                    </v-col>

                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="6">
                        <div style="margin-top:15px;"><span class="regist-title">報名名額上限設定</span></div>
                        <v-text-field v-model="defaultItem.regist_quota"
                                      placeholder="請輸入報名名額上限設定(預設無限制)"
                                      required
                                      outlined
                                      dense>
                        </v-text-field>
                    </v-col>

                </v-row>
                <v-divider></v-divider>
            </v-form>
            <!--<v-divider></v-divider>-->
        </template>

        <template v-slot:action>
            <v-spacer></v-spacer>
            <v-btn @click="cancel" outlined :ripple="false"><span style="color:#626781;">取消</span></v-btn>
            <v-btn color="primary" @click="save" :ripple="false"><span>建立報名表</span></v-btn>

        </template>     
    </com-dialog>

</template>
<style scoped>
    .v-btn--outlined {
        border: thin solid rgba(98 ,103, 129 ,0.2) !important;
    }
    .regist-title {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
    }


    .edit-form {
        height: 650px;
        overflow: scroll;
        overflow-x: hidden;
        padding-left: 10px;
        padding-right: 15px;
    }

    /*-------滾動條整體樣式----*/
    .edit-form::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    /*滾動條裡面小方塊樣式*/
        .edit-form::-webkit-scrollbar-thumb {
            border-radius: 100px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: #736DB9;
        }

    /*滾動條裡面軌道樣式*/
    .edit-form::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 20px
        ;
        background: rgba(0,0,0,0.1);
    }

</style>




<script>
    import comDialog from 'components/dialog'
    export default {     
        data: () => ({
            mode:'',          
            brands: [
                { id: 'az', name: 'AstraZeneca' },
                { id: 'bnt', name: 'Pfizer-BioNTech' },               
            ],            
            vaccines: [
                { id: 'influenza', name: '肺鏈流感' },
                { id: 'coronavirus', name: '新冠肺炎' },

            ],
            districts: [
                { id: 'neihu', name: '內湖區' },
                { id: 'nangang', name: '南港區' },

            ],
            villages: [
                { id: 'xikang', name: '西康里' }
            ],
            institutions: [{ id: 'wang', name: '王慶森診所' }, { id: 'wang2', name: '王慶森2診所' }, { id: 'wang3', name: '王慶森3診所' }],
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            start: false,
            end: false,
            modal: false,
            menu2: false,
            model: {},
            rules: {
                required: v => !!v || '必填',              
            }
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