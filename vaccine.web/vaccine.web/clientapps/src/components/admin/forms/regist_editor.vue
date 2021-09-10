<template>
    <com-dialog ref="dialogPanel" ref-key="dialogPanel" :width="width">
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
                                  :readonly="overStatus==1"
                                  item-value="id"
                                  placeholder="請選擇接種類型"
                                  :menu-props="{ bottom: true, offsetY: true }"
                                  :rules="[rules.required]"
                                  outlined
                                  dense
                                  attach
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
                                  :readonly="overStatus==1"
                                  item-value="id"
                                  placeholder="請選擇疫苗廠牌"
                                  :menu-props="{ bottom: true, offsetY: true }"
                                  :rules="[rules.required]"
                                  outlined
                                  attach
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
                                      :readonly="overStatus==1"
                                      :disabled="overStatus==1"
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
                                      :items="zones"
                                      item-text="name"
                                      :readonly="overStatus==1"
                                      :disabled="overStatus==1"
                                      item-value="id"
                                      placeholder="請選擇行政區"
                                      :menu-props="{ bottom: true, offsetY: true }"
                                      :rules="[rules.required]"
                                      outlined
                                      attach
                                      dense
                                      class="search-filter zone-selector"
                                      append-icon="mdi-chevron-down"
                                      return-object
                                      @change="loadVillages">
                            </v-select>
                            <v-select v-model="model.regist_village"
                                      :items="getVillages"
                                      item-text="name"
                                      :readonly="overStatus==1"
                                      item-value="id"
                                      placeholder="請選擇村里"
                                      :menu-props="{ bottom: true, offsetY: true }"
                                      :rules="[rules.required]"
                                      outlined
                                      attach
                                      dense
                                      class="search-filter zone-selector"
                                      append-icon="mdi-chevron-down"
                                      return-object>
                            </v-select>
                        </div>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <div><span class="regist-title">設站地點</span><span class="red--text">*</span></div>
                        <v-text-field v-model="model.regist_place"
                                      :readonly="overStatus==1"
                                      :disabled="overStatus==1"
                                      placeholder="請輸入設站地點"
                                      :rules="[rules.required]"
                                      required
                                      outlined
                                      dense>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <div> <span class="regist-title">醫療院所</span><span class="red--text">*</span></div>
                        <v-select v-model="model.regist_institution"
                                  :items="getDisMedicals"
                                  item-text="uName"
                                  item-value="id"
                                  placeholder="請選擇醫療院所"
                                  :readonly="overStatus==1"
                                  :menu-props="{ bottom: true, offsetY: true }"
                                  :rules="[rules.required]"
                                  outlined
                                  attach
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
                    <v-col cols="5">
                        <div style="margin-top:15px;"> <span class="regist-title">設站日期</span><span class="red--text">*</span></div>
                        <v-menu ref="menu"
                                v-model="menu"
                                :readonly="overStatus==1"
                                :disabled="overStatus==1"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="stationDate"
                                              :rules="[rules.required]"
                                             
                                              v-bind="attrs"
                                              placeholder="請選擇日期"
                                              v-on="on"
                                              :readonly="overStatus==1"
                                              :disabled="overStatus==1"
                                              outlined
                                              dense>
                                    <template v-slot:append>
                                        <v-img src="/images/date_picker_icon.svg" v-bind="attrs" v-on="on" style="cursor:pointer;"></v-img>
                                    </template>
                                </v-text-field>
                            </template>
                            <v-date-picker v-model="stationDate"
                                           @change="dateClicked"
                                           :day-format="dayFormat"
                                           :readonly="overStatus==1"
                                           no-title
                                           scrollable>
                                <template v-slot:append>
                                    <v-img src="/images/date_picker_icon.svg"></v-img>
                                </template>
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
                                       :readonly="overStatus==1"
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
                        <com-timepicker :readonly="overStatus==1" :disabled="overStatus==1" v-model="regist_station_start_time"></com-timepicker>
                        <com-timepicker :readonly="overStatus==1" :disabled="overStatus==1" v-model="regist_station_end_time"></com-timepicker>
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
                    <v-col cols="7">
                        <div> <span class="regist-title">事先報名開始時間</span><span class="red--text">*</span></div>
                        <v-menu ref="apply"
                                v-model="apply"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                :readonly="overStatus==1"
                                :disabled="overStatus==1"
                                offset-y
                                min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="model.regist_apply_start_date"
                                              placeholder="請輸入事先報名開始時間"
                                              :rules="[rules.required]"
                                              :readonly="overStatus==1" 
                                              :disabled="overStatus==1"
                                              v-bind="attrs"
                                              v-on="on"
                                              outlined
                                              dense>
                                    <template v-slot:append>
                                        <v-img src="/images/date_picker_icon.svg" v-bind="attrs" v-on="on" style="cursor:pointer;"></v-img>
                                    </template>
                                </v-text-field>
                            </template>
                            <v-date-picker v-model="model.regist_apply_start_date"
                                           no-title
                                           @change="dateClicked2"
                                           :readonly="overStatus==1"
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
                                       :readonly="overStatus==1"
                                       @click="$refs.apply.save(model.regist_apply_start_date)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <div class="regist-end-date">事先報名結束時間：{{registEndDate}}</div>
                        <div class="re-check-date">報名者接種資格複檢時間：{{reCheckDate}}</div>
                        <!--<div><span class="regist-title">事先報名結束時間</span><span class="red--text">*</span></div>
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
                                              :rules="[rules.required]"
                                              readonly
                                              v-bind="attrs"
                                              v-on="on"
                                              outlined
                                              dense>
                                    <template v-slot:append>
                                        <v-img src="/images/date_picker_icon.svg"></v-img>
                                    </template>
                                </v-text-field>
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
                        </v-menu>-->
                        <!--<div style="margin-bottom:15px;"><span class="regist-title">報名者接種資格複檢時間：{{model.regist_review_date}}</span> </div>-->

                    </v-col>

                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="5">

                        <div style="margin-top:15px;"><span class="regist-title">報名名額上限設定</span></div>
                        <v-text-field v-model="model.regist_quota"
                                      placeholder="請輸入報名名額上限設定(預設無限制)"
                                      required
                                      :min="registerCountNow"
                                      type="number"
                                      :rules="[rules.quotaRule(model.regist_qualified)]"
                                      outlined
                                      dense>
                        </v-text-field>
                        <div class="regist-cnt">目前報名人數:{{registerCountNow}}</div>
                    </v-col>

                </v-row>
                <v-row>
                    <v-col cols="5">
                        <div style="margin-top:15px;"><span class="regist-title">報名者最低年齡限制</span></div>
                        <v-text-field v-model="model.regist_age_limit"
                                      placeholder="請輸入年齡下限(預設無限制)"
                                      required
                                      :readonly="overStatus==1"
                                      :disabled="overStatus==1"
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
            </v-form>
            <!--<v-divider></v-divider>-->
        </template>

        <template v-slot:action>
            <div style="width:100%;">
                <v-divider></v-divider>
                <div class="d-flex" style="margin-top:16px;">
                    <v-spacer></v-spacer>
                    <v-btn @click="cancel" outlined :ripple="false" style="margin-right:16px;"><span style="color:#626781;">取消</span></v-btn>
                    <v-btn color="primary" @click="save" :ripple="false"><span>{{saveBtnName}}</span></v-btn>
                </div>
            </div>

        </template>
    </com-dialog>

</template>
<style scoped>

    .v-btn--contained {
        box-shadow: none !important;
    }

    .timepicker-container {
        margin-bottom: 14px !important;
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
        padding-left: 16px !important;
    }

    .v-btn--outlined {
        border: thin solid rgba(98,103, 129,0.2) !important;
    }

    .regist-title {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        white-space: nowrap;
    }

    .edit-form .v-menu__content {
        min-width:120px !important;
    }
    /*.edit-form {
        height: 650px;
        overflow: scroll;
        overflow-x: hidden;
        padding-left: 10px;
        padding-right: 15px;
    }*/
    /*-------滾動條整體樣式----*/
    .edit-form::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

        /*滾動條裡面小方塊樣式*/
    .edit-form::-webkit-scrollbar-thumb {
        border-radius: 100px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(98,103,129,0.2);
    }

        /*滾動條裡面軌道樣式*/
    .edit-form::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 20px;
        background: rgba(98,103,129,0.1);
    }
</style>
<style>
    .v-date-picker-table .v-btn--rounded:hover {
        background-color: #d4ffd6 !important
    }
    .edit-form .v-menu__content, .edit-form .v-input__control {
        min-width: 140px !important;
    }
    .edit-form .v-input__control {
        min-width: 150px !important;
    }
    .timepicker {
        z-index: 999;
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

    .inputDesc {
        color: #9E9E9E;
    }

    .dialogPanel .v-card__text {
        padding: 0 24px !important;
    }

    .dialogPanel .col {
        padding: 10px 12px 0 12px;
    }

    .dialogPanel .v-card__actions {
        padding: 24px 32px !important;
    }

    .dialogPanel .regist-end-date,
    .dialogPanel .re-check-date,
    .dialogPanel .regist-cnt {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
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
                checkRegistStart: v => new Date(v) >= new Date(this.model.regist_apply_start_date).setDate(-3) || '報名日期須早於設站日期前三天',
                quotaRule(minNum) {
  
                    return v => (v && v >= minNum && v > 0) || '報名名額上限設定必須大於0且大於等於' + minNum;
                }
            },
            regist_station_start_time: "00:00",
            regist_station_end_time: "23:59",
            beforeRuleDesc: "預設設站日期前3天結束報名",
            beforeRuleDesc2: "預設設站日期前2天",
            overStatus: 0,
            registerCountNow: 0,
            stationDate: '',
            reCheckDate: '',
            registEndDate: '',

        }),
        watch: {
            stationDate: function (val) {
                this.model.regist_station_date = val;
                if (!val) return;
   
                //new Date().setDate(new Date(val).getDate() - 2)
                //this.reCheckDate = this.$moment(new Date().setDate(new Date(val).getDate() - 2)).format('YYYY/MM/DD');
                //this.registEndDate = this.$moment(new Date().setDate(new Date(val).getDate() - 3)).format('YYYY/MM/DD,23:59');

                var d = new Date(val);
                d.setDate(d.getDate() - 4);//before 3 day

                var mm = d.getMonth() + 1;
                var dd = d.getDate();

                this.model.regist_apply_end_date = d.getFullYear() + '-' + ((mm > 9 ? '' : '0') + mm) + '-' + (dd > 9 ? '' : '0') + dd;
                d.setDate(d.getDate() + 2); //before 2 day
                this.reCheckDate = this.model.regist_apply_end_date + " 23:59"
                mm = d.getMonth() + 1;
                dd = d.getDate();
                this.registEndDate = d.getFullYear() + '-' + ((mm > 9 ? '' : '0') + mm) + '-' + (dd > 9 ? '' : '0') + dd;

            },
            //'getInstitutions': function () {
            //    this.regist_institution_code = "";
            //    this.regist_institution_name = "";
            //},
        },
        computed: {
            ...mapGetters('registration', ['getVaccines', 'getDistricts', 'getBrands', 'getVillages', 'getInstitutions', 'getRegistrationHeaders', 'getShowBrand', 'getDisMedicals']),
            ...mapGetters('user', ['getMedicals','getReGetInfo']),
            defaultItem: function () {
                return this.default;
            },
            zones: function () {
                var _zones = [];
                this.getReGetInfo.zones[0].data.filter(f => f.hasAuth == true).forEach(m => { _zones.push({ id: m.distId, name: m.distName }); })
                return _zones;
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

            open: function (model, overStatus) {
                this.overStatus = overStatus;
                this.mode = 'edit';
                console.log('open', model);
                this.registerCountNow = model.regist_qualified;
                this.loadVaccines({ id: model.regist_type });
                this.loadVillages({ id: model.regist_district });

                this.$set(this, "regist_institution_code", model.regist_institution_code);
                this.$set(this, "regist_institution_name", model.regist_district_name);
                
                this.$set(this, "stationDate", model.regist_station_date);
                this.$set(this, "regist_station_start_time", model.regist_station_start_time);
                this.$set(this, "regist_station_end_time", model.regist_station_end_time);

                this.model = Object.assign(this.defaultItem, model);
                this.model.regist_type = { id: model.regist_type };
                this.$refs.dialogPanel.open();
            },

            create: function (model) {
                this.mode = 'new';
                this.overStatus = 0;
                this.model = Object.assign(this.defaultItem, model);
                this.registerCountNow = 0;
                this.registEndDate = "";
                this.reCheckDate = "";
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
                this.stationDate = '';
                this.regist_station_start_time = '00:00';
                this.regist_station_end_time = '23:59';
                this.regist_institution_code = '';
                this.regist_institution_name = '';
                this.$refs.form.resetValidation();
                // scroll to top
                setTimeout(() => this.$refs.form.$el.scrollIntoView(), 0);
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
                this.$store.getters["user/getMedicals"].forEach((d) => {
                    if (d.id === event.id) {
                        this.regist_institution_code = d.id;
                        this.regist_institution_name = d.cityName + '/' + d.distName;
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
                var d = new Date(val);
                d.setDate(d.getDate() - 4);//before 3 day

                var mm = d.getMonth() + 1;
                var dd = d.getDate();

                this.model.regist_apply_end_date = d.getFullYear() + '-' + ((mm > 9 ? '' : '0') + mm) + '-' + (dd > 9 ? '' : '0') + dd;
                d.setDate(d.getDate() + 2); //before 2 day
                this.beforeRuleDesc = this.model.regist_apply_end_date + " 23:59"
                mm = d.getMonth() + 1;
                dd = d.getDate();
                this.beforeRuleDesc2 = d.getFullYear() + '-' + ((mm > 9 ? '' : '0') + mm) + '-' + (dd > 9 ? '' : '0') + dd;

          

            },
            dateClicked2(val) {
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