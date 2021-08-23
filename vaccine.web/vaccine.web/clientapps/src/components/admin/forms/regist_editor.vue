<template>
    <com-dialog ref="dialogPanel" ref-key="two" :width="width">
        <template v-slot:toolbar>
            <span class="regist-editor-title">{{title}}</span>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="close" :ripple="false">
                <v-icon color="white">fas fa-times</v-icon>
            </v-btn>
        </template>
        <template v-slot:content>
            <v-form class="edit-form" v-model="valid" ref="form" autocomplete="off" v-if="!!getInstitutions">
                <v-row>
                    <v-col cols="4">
                        <div><span class="regist-title">接種類型</span> <span class="red--text">*</span></div>
                        <v-select v-model="model.regist_type"
                                  :items="getVaccines"
                                  item-text="name"
                                  item-value="id"
                                  placeholder="請選擇接種類型"
                                  :menu-props="{ bottom: true, offsetY: true }"
                                  :rules="[rules.required]"
                                  outlined
                                  dense
                                  class="search-filter"
                                  append-icon="mdi-chevron-down"
                                  return-object
                                  @change="loadVaccines">
                        </v-select>
                    </v-col>

                </v-row>
                <v-row v-if="getShowBrand">
                    <v-col cols="4">
                        <div><span class="regist-title">疫苗廠牌</span> <span class="red--text">*</span></div>
                        <v-select v-model="model.regist_brand"
                                  :items="getBrands"
                                  item-text="name"
                                  item-value="id"
                                  placeholder="請選擇疫苗廠牌"
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
                        <v-text-field v-model="model.regist_title"
                                      placeholder="請輸入場次標題 ( 30字內 )"
                                      :rules="[rules.required]"
                                      required
                                      outlined
                                      dense>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <!--<v-row>
                    <v-col cols="12">
                        <div style="margin-top:15px;"><span class="regist-title">設站行政區里</span> <span class="red--text">*</span></div>
                    </v-col>
                </v-row>-->
                <v-row>
                    <v-col cols="12">
                        <div><span class="regist-title">設站行政區里</span> <span class="red--text">*</span></div>                        
                        <div class="d-flex justify-start">
                            <v-select v-model="model.regist_district"
                                      :items="getDistricts"
                                      item-text="name"
                                      item-value="id"
                                      placeholder="請選擇行政區"
                                      :menu-props="{ bottom: true, offsetY: true }"
                                      :rules="[rules.required]"
                                      outlined
                                      dense
                                      class="search-filter zone-selector"
                                      append-icon="mdi-chevron-down"
                                      return-object
                                      @change="loadVillages">
                            </v-select>
                            <v-select v-model="model.regist_village"
                                      :items="getVillages"
                                      item-text="name"
                                      item-value="id"
                                      placeholder="請選擇村里"
                                      :menu-props="{ bottom: true, offsetY: true }"
                                      :rules="[rules.required]"
                                      outlined
                                      dense
                                      class="search-filter zone-selector"
                                      append-icon="mdi-chevron-down"
                                      return-object
                                      @change="loadMedicalsByVillage">
                            </v-select>
                        </div>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <div><span class="regist-title">設站地點</span><span class="red--text">*</span></div>
                        <v-text-field v-model="model.regist_place"
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
                        <v-select v-model="model.regist_institution"
                                  :items="getInstitutions"
                                  item-text="name"
                                  item-value="id"
                                  placeholder="請選擇醫療院所"
                                  :menu-props="{ bottom: true, offsetY: true }"
                                  :rules="[rules.required]"
                                  outlined
                                  dense
                                  class="search-filter"
                                  append-icon="mdi-chevron-down"
                                  return-object
                                  @change="setMedicalInfo($event)">
                        </v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <div><span class="regist-title">機構代碼：{{regist_institution_code}}</span> </div>
                        <div style="margin-bottom: 15px;"><span class="regist-title">機構所在行政區：{{regist_institution_name}}</span></div>
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
                                <v-text-field v-model="model.regist_station_date"
                                              append-icon="mdi-calendar"
                                              :rules="[rules.required]"
                                              readonly
                                              v-bind="attrs"
                                              placeholder="請選擇日期"
                                              v-on="on"
                                              outlined
                                              dense></v-text-field>
                            </template>
                            <v-date-picker v-model="model.regist_station_date"
                                           @change="dateClicked"
                                           :day-format="dayFormat"
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
                                       @click="$refs.menu.save(model.regist_station_date)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <div>  <span class="regist-title">設站時段設定</span><span class="red--text">*</span></div>
                        <com-timepicker v-model="regist_station_start_time"></com-timepicker>
                        <com-timepicker v-model="regist_station_end_time"></com-timepicker>
                    </v-col>
                </v-row>
                <!--<v-row>
                    <v-col cols="3">
                        <v-menu v-model="start"
                                ref="tmenu"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto">
                            <template v-slot:activator="{ on, attrs }">

                                <v-text-field v-model="model.regist_station_start_time"
                                              append-icon="mdi-clock-outline"
                                              :rules="[rules.required]"
                                              readonly
                                              v-bind="attrs"
                                              placeholder="請選擇起始時間"
                                              v-on="on"
                                              outlined
                                              dense></v-text-field>
                            </template>
     
                        </v-menu>
                    </v-col>
                    <v-col cols="1"><span style="display:flex;justify-content:center;color:#626781">-</span></v-col>
                    <v-col cols="3">
                        <v-menu v-model="end"
                                ref="tmenu2"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="model.regist_station_end_time"
                                              append-icon="mdi-clock-outline"
                                              readonly
                                              v-bind="attrs"
                                              placeholder="請選擇結束時間"
                                              v-on="on"
                                              outlined
                                              dense></v-text-field>
                            </template>
                            <v-time-picker v-model="model.regist_station_end_time"
                                           :min="model.regist_station_start_time"
                                           v-if="end"
                                           ampm-in-title
                                           @click:minute="$refs.tmenu2.save()"
                                           scrollable>
                                <v-spacer></v-spacer>
                            </v-time-picker>
                        </v-menu>
                    </v-col>

                </v-row>-->

                <v-row>
                    <v-col cols="6">
                        <div> <span class="regist-title">事先報名開始時間</span><span class="red--text">*</span></div>
                        <v-menu ref="apply"
                                v-model="apply"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="model.regist_apply_start_date"
                                              placeholder="請輸入事先報名開始時間"
                                              append-icon="mdi-calendar"
                                              :rules="[rules.required]"
                                              readonly
                                              v-bind="attrs"
                                              v-on="on"
                                              outlined
                                              dense></v-text-field>
                            </template>
                            <v-date-picker v-model="model.regist_apply_start_date"
                                           no-title
                                           @change="dateClicked"
                                           :day-format="dayFormat"
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
                                       @click="$refs.apply.save(model.regist_apply_start_date)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                        <div><span class="regist-title">事先報名結束時間</span><span class="red--text">*</span></div>
                        <v-menu ref="apply2"
                                v-model="apply2"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="model.regist_apply_end_date"
                                              placeholder="請輸入事先報名截止時間"
                                              append-icon="mdi-calendar"
                                              :rules="[rules.required]"
                                              readonly
                                              v-bind="attrs"
                                              v-on="on"
                                              outlined
                                              dense></v-text-field>
                            </template>
                            <v-date-picker v-model="model.regist_apply_end_date"
                                           no-title
                                           @change="dateClicked"
                                           :day-format="dayFormat"
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
                                       @click="$refs.apply2.save(model.regist_apply_end_date)">
                                    OK
                                </v-btn>


                            </v-date-picker>
                        </v-menu>
                        <!--<div style="margin-bottom:15px;"><span class="regist-title">報名者接種資格複檢時間：{{model.regist_review_date}}</span> </div>-->

                    </v-col>

                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="6">
            
                        <div style="margin-top:15px;"><span class="regist-title">報名名額上限設定</span></div>
                        <v-text-field v-model="model.regist_quota"
                                      placeholder="請輸入報名名額上限設定(預設無限制)"
                                      required
                                      type="number"
                                      outlined
                                      dense>
                        </v-text-field>
                    </v-col>

                </v-row>
                <v-row>
                    <v-col cols="6">
                        <div style="margin-top:15px;"><span class="regist-title">報名者最低年齡限制</span></div>
                        <v-text-field v-model="model.regist_age_limit"
                                      placeholder="請輸入年齡下限(預設無限制)"
                                      required
                                      type="number"
                                      outlined
                                      dense>
                        </v-text-field>
                    </v-col>

                </v-row>
                <!--<v-row>
                    <v-col cols="6">
                        <div style="margin-top:15px;"><span class="regist-title">備註</span></div>
                        <v-text-field v-model="model.remarks"
                                      placeholder=""
                                      required
                                      outlined
                                      dense>
                        </v-text-field>
                    </v-col>

                </v-row>-->
                <v-divider></v-divider>
            </v-form>
            <!--<v-divider></v-divider>-->
        </template>

        <template v-slot:action>
            <v-spacer></v-spacer>
            <v-btn @click="cancel" outlined :ripple="false"><span style="color:#626781;">取消</span></v-btn>
            <v-btn color="primary" @click="save" :ripple="false"><span>{{saveBtnName}}</span></v-btn>

        </template>
    </com-dialog>

</template>
<style scoped>
    .timepicker-container {
        margin-bottom:14px!important;
    }
    .regist-editor-title {
        font-size: 20px !important;
    }
    .timepicker-container + .timepicker-container {
        padding-left: 16px !important;
    }
    .zone-selector {
        width: 200px !important;
        max-width: 250px !important;
    }
    .zone-selector + .zone-selector {
        padding-left: 16px!important;
    }
    .v-btn--outlined {
        border: thin solid rgba(98,103, 129,0.2) !important;
    }

    .regist-title {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
    }


    .edit-form {
        /*height: 650px;
        overflow: scroll;
        overflow-x: hidden;*/
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
            border-radius: 20px;
            background: rgba(0,0,0,0.1);
        }
</style>
<style>
    .v-date-picker-table .v-btn--rounded:hover {
        background-color: #d4ffd6 !important
    }
    .timepicker {
        z-index:999;
    }
    .timepicker-wrap .time {
        width: 100px !important;
        height: 40px !important;
        border-radius: 5px !important;
        border-color: #9E9E9E !important;
    }
    .timepicker-wrap {
        color: #9E9E9E !important;
    }
    .timepicker-wrap .timepicker-icon {
        width: 1.5em !important;
        height: 1.5em !important;
    }


</style>




<script>

    import comDialog from 'components/dialog'
    import comTimepicker from 'components/vue-timepicker/timepicker'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        data: () => ({
            mode: '',
            brands: [],
            vaccines: [],
            districts: [],
            villages: [],
            institutions: [],
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            apply: false,
            apply2: false,
            start: false,
            end: false,
            modal: false,
            menu2: false,
            default: {},
            valid: true,
            model: {},
            selectVaccine: '',
            selectDistrict: '',
            selectVillage: '',
            selectInstitution: '',
            selectBrand: '',
            regist_institution_code: "",
            regist_institution_name: "",
            rules: {
                required: v => !!v || '必填',
            },
            regist_station_start_time:"00:00",
            regist_station_end_time: "23:59",
        }),
        watch: {
            //'getInstitutions': function () {
            //    this.regist_institution_code = "";
            //    this.regist_institution_name = "";
            //},
        },
        computed: {
            ...mapGetters('registration', ['getVaccines', 'getDistricts', 'getBrands', 'getVillages', 'getInstitutions', 'getRegistrationHeaders', 'getShowBrand']),
            defaultItem: function () {
                return this.default;
            }
        },
        props: ['width', 'title', 'action', 'saveBtnName'],

        created: function () {
        },
        mounted: function () {
            //console.log(this.$refs.form);
        },

        methods: {
            ...mapActions('registration', ['loadVaccines', 'loadDists', 'loadVillages', 'loadBrands', 'loadMedicals', 'loadMedicalsByVillage']),
            dayFormat: function (day) {
                return this.$moment(day).format("DD");
            },
            open: function (model) {
                this.mode = 'edit';

                this.loadVaccines({ id: model.regist_type });
                this.loadVillages({ id: model.regist_district });

                this.$set(this, "regist_institution_code", model.regist_institution_code);
                this.$set(this, "regist_institution_name", model.regist_district_name + "/" + model.regist_village_name);

                this.$set(this, "regist_station_start_time", model.regist_station_start_time);
                this.$set(this, "regist_station_end_time", model.regist_station_end_time);

                this.model = Object.assign(this.defaultItem, model);
                this.model.regist_type = { id: model.regist_type };
                this.$refs.dialogPanel.open();
            },

            create: function (model) {
                this.mode = 'new';
                this.model = Object.assign(this.defaultItem, model);
                this.$refs.dialogPanel.open();
            },
            reset: function () {
                for (var nn in this.model) {
                    if (nn == "regist_quota") {
                        this.model[nn] = 500;
                    } else if (nn == "regist_age_limit") {
                        this.model[nn] = 0;
                    } else {
                        this.model[nn] = "";
                    }
                }
                this.$refs.form.resetValidation();
                this.regist_institution_code = '';
                this.regist_institution_name = '';
            },

            save: function () {
                if (this.$refs.form.validate()) {
                    this.model.regist_station_start_time = this.regist_station_start_time;
                    this.model.regist_station_end_time = this.regist_station_end_time;
                    this.action({ mode: this.mode, action: 'save', model: this.model });
                    //console.log(this.model);
                    //this.$refs.dialogPanel.close();
                }

            },
            show: function () {
                //this.$refs.dialogPanel.open();
            },
            close: function () {
                this.$refs.dialogPanel.close();
            },
            cancel: function () {
                this.$refs.dialogPanel.close();
            },
            closeDialog: function () {
                //this.$refs.dialogPanel.open();
            },
            setMedicalInfo: function (event) {

                this.$store.state.registration.institutions.forEach((d) => {
                    if (d.id === event.id) {

                        this.regist_institution_code = d.id;
                        this.regist_institution_name = d.from;
                    }
                });
            },
            dateClicked(val) {
                var allDates = document.querySelectorAll(".v-date-picker-table .v-btn .v-btn__content");
                allDates.forEach((x) => {
                    if (parseInt(val.split('-')[2]) == x.innerHTML.replace("日", "")) {
                        x.parentNode.style = "background-color: #d4ffd6 !important";
                    } else {
                        x.parentNode.style = '';
                    }
                });

            }
    

        },
        components: {
            comDialog, comTimepicker
        }
    }
</script>