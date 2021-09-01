<template>
    <app-layout class="registration-list">
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:content-title>
            報名表管理

        </template>
        <template v-slot:app-content>
            <com-loading ref-key="type1"></com-loading>
            <div id="app">
                <v-card>
                    <com-table ref="table" ref-key="table" :headers="getHeaders" :items="items" :itemKey="itemKey" :total-count="totalCount"
                               :items-per-page="itemsPerPage" :total-visible="totalVisible" :show-select="showSelect"
                               :change-page="changePage" :row-click="handleRowClick" style="margin-left: 15px;padding-top: 15px;margin-right: 30px;">

                        <template v-slot:item.regist_quota="{item}">
                            <!--<div><span :class="item.cntQuota >= item.totalQuota ? 'color-red' : ''">{{item.cntQuota}}</span>/<span style="color:#626781">{{item.totalQuota}}</span></div>-->
                            <div><span :class="item.regist_unpassed >= item.regist_quota ? 'color-red' : ''">{{item.regist_unpassed}}</span>/<span style="color:#626781">{{item.regist_quota}}</span></div>
                        </template>
                        <template v-slot:search-bar>
                            <div style="display:flex;justify-content:flex-start;margin-left:10px;margin-top:10px;">
                                <v-row>
                                    <v-col class="d-flex justify-content-end" cols="11">
                                        <v-select v-model="selectVaccine"
                                                  :items="getVaccines"
                                                  item-text="name"
                                                  item-value="id"
                                                  placeholder="所有疫苗類型"
                                                  :menu-props="{ bottom: true, offsetY: true }"
                                                  outlined
                                                  dense
                                                  style="margin-right: 10px; width: 230px;"
                                                  class="search-filter"
                                                  return-object>
                                        </v-select>
                                        <v-select v-model="selectDistrict"
                                                  :items="getDistricts"
                                                  item-text="name"
                                                  item-value="id"
                                                  placeholder="全部行政區"
                                                  :menu-props="{ bottom: true, offsetY: true }"
                                                  outlined
                                                  dense
                                                  clearable
                                                  style="margin-right: 10px; width: 210px;"
                                                  class="search-filter"
                                                  return-object
                                                  @change="loadVillages">
                                        </v-select>
                                        <v-select v-model="selectVillage"
                                                  :items="getVillages"
                                                  item-text="name"
                                                  item-value="id"
                                                  placeholder="全部村里"
                                                  :menu-props="{ bottom: true, offsetY: true }"
                                                  outlined
                                                  dense
                                                  clearable
                                                  style="margin-right: 10px; width: 210px;"
                                                  class="search-filter"
                                                  return-object>
                                        </v-select>
                                        <v-select v-model="selectInstitution"
                                                  :items="getDisMedicals"
                                                  item-text="uName"
                                                  item-value="id"
                                                  placeholder="全部醫療院所"
                                                  :menu-props="{ bottom: true, offsetY: true }"
                                                  outlined
                                                  dense
                                                  clearable
                                                  style="margin-right: 10px; width: 240px;"
                                                  class="search-filter"
                                                  return-object>
                                        </v-select>

                                        <v-text-field v-model="keyWord" placeholder="標題關鍵字" outlined dense clearable autocomplete="off"></v-text-field>

                                        <v-btn icon color="#626781" style="top:3px;" :ripple="false" class="content-search-button"
                                               @click="getRegistForm(1)">
                                            <v-icon>fas fa-search</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </div>


                        </template>

                        <template v-slot:toolbar-action={selectAll,selectedItems}>
                            <v-btn color="#F0524B" :disabled="selectedItems.length<=0 " @click="deleteSelected(selectedItems)" :ripple="false">
                                <span :style="selectedItems.length<=0 ? 'color:#62678166' : 'color:white'">刪除選取項目 ({{selectedItems.length}})</span>
                            </v-btn>
                            <v-spacer></v-spacer>

                            <v-menu bottom right offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-btn v-on="on" color="#626781" @click.stop="" :ripple="false">
                                        <img src="/addregist.svg">
                                        <span class="add-btn-text">新增報名表</span>
                                    </v-btn>

                                </template>
                                <v-list>
                                    <v-list-item @click.stop="">
                                        <v-list-item-action-text>
                                            <span class="action-option-text">選擇新增方式 :</span>
                                        </v-list-item-action-text>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                    <v-list-item @click.stop="manualInput" class="menu-list-item">
                                        <v-list-item-action-text>
                                            <v-btn icon dense :ripple="false">
                                                <img src="/pen.svg">
                                            </v-btn> <span class="modify-btn-text">手動輸入</span>
                                        </v-list-item-action-text>
                                    </v-list-item>
                                    <v-list-item @click.stop="fileImport">
                                        <v-list-item-action-text>
                                            <v-btn icon dense :ripple="false">
                                                <img src="/file.svg">
                                            </v-btn><span class="modify-btn-text">檔案匯入</span>
                                        </v-list-item-action-text>
                                    </v-list-item>


                                </v-list>
                            </v-menu>



                            <com-dialog ref="fileViewer" ref-key="two" key="file-upload-dialog" width="40%">
                                <template v-slot:toolbar>
                                    建立報名表-檔案匯入
                                    <v-spacer></v-spacer>
                                    <v-btn icon @click.stop="cancelFile" :ripple="false">
                                        <v-icon color="white">fas fa-times</v-icon>
                                    </v-btn>
                                </template>
                                <template v-slot:content>
                                    <div>
                                        <div class="file-text">
                                            請下載EXCEL範本並輸入『建立報名表單』所需完整的資料後上傳。
                                        </div>

                                        <div class="file-text-warn">
                                            請注意，資料不完整或檔案格式錯誤都將導致無法成功上傳。
                                        </div>

                                        <div class="file-btn-container">
                                            <v-btn color="secondary" @click="onUploadClick">
                                                <img src="/upload.svg">
                                                <span class="file-btn-text">上傳報名表檔案</span>
                                            </v-btn>
                                            <input ref="excelUploader"
                                                   type="file"
                                                   style="display:none"
                                                   accept=".xlsx,xls"
                                                   @change="onFileChanged">
                                            <v-spacer></v-spacer>

                                            <v-btn color="secondary">
                                                <v-img src="/download.svg"></v-img>
                                                <span><a href="ActivityExample.xlsx" class="file-btn-text">下載報名表格式範本</a></span>
                                            </v-btn>
                                        </div>

                                        <v-divider></v-divider>
                                    </div>
                                </template>
                                <template v-slot:action>
                                    <v-spacer></v-spacer>
                                    <v-btn outlined :ripple="false" @click="cancelFile"><span style="color:#626781;">取消</span></v-btn>
                                    <v-btn @click="saveFile" color="primary" :ripple="false">確定送出</v-btn>
                                </template>
                            </com-dialog>


                            <!--新增-->
                            <editor ref="registNewEditor" ref-key="two" width="40%" :title="title" :saveBtnName="saveBtnName" :action="formAction"></editor>
                            <com-dialog ref="registViewer" ref-key="two" width="40%" key="regist-new-editor">
                                <template v-slot:toolbar>
                                    {{viewerTitle}}
                                    <v-spacer></v-spacer>
                                    <v-btn icon @click.stop="colse" :ripple="false">
                                        <v-icon color="white">fas fa-times</v-icon>
                                    </v-btn>
                                </template>
                                <template v-slot:content>
                                    <div class="prevDesc">
                                        點選「確定」後本報名表將立即生效，請再次確認內容無誤。
                                    </div>
                                    <div class="divider"><v-divider></v-divider></div>
                                    <div class="prevContent" v-if="result.model !=null">
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">接種類型</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_type_name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line v-if="typeof result.model.regist_brand_name !== 'undefined' && result.model.regist_brand_name !== ''">
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">疫苗廠牌</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_brand_name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">場次標題</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_title}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">設站行政區</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_district_name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">設站村里</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_village_name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">設站地點</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_place}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">醫療院所</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_institution_name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">機構代碼</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_institution_code}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">機構所在行政區</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_instution_district_name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>

                                        <div class="divider"><v-divider></v-divider></div>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">設站時間</div></v-list-item-title>
                                                <v-list-item-subtitle>
                                                    {{result.model.regist_station_date}} ,
                                                    {{result.model.regist_station_start_time}}-{{result.model.regist_station_end_time}}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">事先開放報名開始時間</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_apply_start_date}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">事先開放報名結束時間</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_apply_end_date}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <!--<v-list-item two-line>
                                                <v-list-item-content>
                                                    <v-list-item-title>接種資格複審時間</v-list-item-title>
                                                    <v-list-item-subtitle>{{result.model.regist_review_date}}</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>-->
                                        <div class="divider"><v-divider></v-divider></div>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">報名名額上限</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_quota}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">報名者最低年齡限制</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_age_limit}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <!--<v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>備註</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.remarks}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>-->

                                        <div class="divider"><v-divider></v-divider></div>
                                    </div>

                                </template>
                                <template v-slot:action>

                                    <v-spacer></v-spacer>
                                    <v-btn outlined :ripple="false" @click="backToEdit"><span style="color:#626781;">修改</span></v-btn>
                                    <v-btn @click="saveRegist" color="primary" :ripple="false">確定</v-btn>
                                </template>
                            </com-dialog>


                            <!--編輯-->
                            <editor ref="registEdit" ref-key="two" width="40%" :title="title" :saveBtnName="saveBtnName" :action="editFormAction"></editor>
                            <com-dialog ref="registEditViewer" ref-key="two" width="40%" key="regist-new-viewer">
                                <template v-slot:toolbar>
                                    {{viewerTitle}}
                                    <v-spacer></v-spacer>
                                    <v-btn icon @click.stop="editClose" :ripple="false">
                                        <v-icon color="white">fas fa-times</v-icon>
                                    </v-btn>
                                </template>
                                <template v-slot:content>
                                    <div class="prevDesc">
                                        點選「確定」後本報名表將立即生效，請再次確認內容無誤。
                                    </div>
                                    <div class="divider"><v-divider></v-divider></div>
                                    <div class="prevContent" v-if="result.model !=null">
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">接種類型</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_type_name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line v-if="typeof result.model.regist_brand_name !== 'undefined' && result.model.regist_brand_name !== ''">
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">疫苗廠牌</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_brand_name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">場次標題</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_title}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">設站行政區</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_district_name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">設站村里</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_village_name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">設站地點</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_place}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">醫療院所</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_institution_name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">機構代碼</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_institution_code}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">機構所在行政區</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_instution_district_name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>

                                        <div class="divider"><v-divider></v-divider></div>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">設站時間</div></v-list-item-title>
                                                <v-list-item-subtitle>
                                                    {{result.model.regist_station_date}} ,
                                                    {{result.model.regist_station_start_time}}-{{result.model.regist_station_end_time}}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">事先開放報名時間</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_apply_start_date}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">事先開放報名結束時間</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_apply_end_date}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <!--<v-list-item two-line>
                                                <v-list-item-content>
                                                    <v-list-item-title>接種資格複審時間</v-list-item-title>
                                                    <v-list-item-subtitle>{{result.model.regist_review_date}}</v-list-item-subtitle>

                                                </v-list-item-content><div class="showname">
                                            </v-list-item>-->

                                        <div class="divider"><v-divider></v-divider></div>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">報名名額上限</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_quota}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title><div class="showname">報名者最低年齡限制</div></v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_age_limit}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <!--<v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>備註</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.remarks}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>-->

                                        <div class="divider"><v-divider></v-divider></div>
                                    </div>
                                </template>
                                <template v-slot:action>
                                    <v-spacer></v-spacer>
                                    <v-btn outlined :ripple="false" @click="backToEdit2"><span style="color:#626781;">修改</span></v-btn>
                                    <v-btn @click="editSaveRegist" color="primary" :ripple="false">確定</v-btn>
                                </template>
                            </com-dialog>


                            <com-confirm ref="registAlert" ref-key="confirm" :right-click="alertRightClick" key="regist-alert-confirm">
                                <template v-slot:confirm-image>
                                    <v-img v-bind:src="alertImgSrc"></v-img>
                                </template>
                                <template v-slot:confirm-title>
                                    {{alertTitle}}

                                </template>
                                <template v-slot:confirm-text>
                                    {{alertText}}
                                </template>

                                <template v-slot:confirm-right-btn-text>
                                    確認
                                </template>
                            </com-confirm>


                            <com-confirm ref="removeAlert" ref-key="confirm" :right-click="removeRightClick" :left-click="removeLeftClick" key="remove-alert-confirm">
                                <template v-slot:confirm-image>
                                    <v-img src="/alert_remove.svg"></v-img>
                                </template>

                                <template v-slot:confirm-text>
                                    <span> 確定刪除選取 <span style="color:#F0524B"> {{compSelectedItems.length}}</span>  個報名表單？</span>
                                </template>
                                <template v-slot:confirm-left-btn-text>
                                    取消
                                </template>
                                <template v-slot:confirm-right-btn-text>
                                    確認
                                </template>


                            </com-confirm>


                            <com-confirm ref="successUploadAlert" ref-key="confirm" :right-click="successUploadRightClick" key="success-update-confirm">
                                <template v-slot:confirm-image>
                                    <v-img src="/alert_success.svg"></v-img>
                                </template>
                                <template v-slot:confirm-title>
                                    <span style="color:#736DB9">{{alertTitle}}</span>

                                </template>
                                <template v-slot:confirm-text>
                                    <span style="color:#626781">{{alertText}}</span>
                                </template>

                                <template v-slot:confirm-right-btn-text>
                                    確認
                                </template>
                            </com-confirm>
                            <com-confirm ref="warringAlert" ref-key="warringAlert" :right-click="closeRightClick" key="warring-alert-confirm">
                                <template v-slot:confirm-image>
                                    <v-img src="/alert_warning.svg"></v-img>
                                </template>
                                <template v-slot:confirm-title>
                                    <span style="color:#736DB9">{{alertTitle}}</span>

                                </template>
                                <template v-slot:confirm-text>
                                    <span style="color:#626781">{{alertText}}</span>
                                </template>

                                <template v-slot:confirm-right-btn-text>
                                    確認
                                </template>
                            </com-confirm>

                        </template>

                        <template v-slot:item.regist_station_date="{item}">
                            {{item.regist_station_date}} {{item.regist_station_start_time}} - {{item.regist_station_end_time}}
                        </template>

                        <template v-slot:item.regist_apply_start_date="{item}">
                            {{item.regist_apply_start_date}} - {{item.regist_apply_end_date}}
                        </template>

                        <template v-slot:item.modify="{item}">
                            <v-menu bottom right offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-btn dark icon v-on="on" @click.stop="" :ripple="false">
                                        <v-icon color='#858585'>mdi-dots-horizontal</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item @click.stop="detailItem(item)" class="modify-list-item">
                                        <v-list-item-action-text>
                                            <v-btn icon dense>
                                                <img src="/view.svg">
                                            </v-btn>
                                            <span class="modify-btn-text">查看</span>
                                        </v-list-item-action-text>
                                    </v-list-item>
                                    <v-list-item @click.stop="editItem(item)" class="modify-list-item">
                                        <v-list-item-action-text>
                                            <v-btn icon dense>
                                                <img src="/pen.svg">

                                            </v-btn>
                                            <span class="modify-btn-text">編輯</span>
                                        </v-list-item-action-text>
                                    </v-list-item>
                                    <v-list-item @click.stop="removeItem(item)" class="modify-list-item">
                                        <v-list-item-action-text>
                                            <v-btn icon dense>
                                                <img src="/trash.svg">
                                            </v-btn>
                                            <span class="modify-btn-text">刪除</span>
                                        </v-list-item-action-text>
                                    </v-list-item>
                                    <v-list-item @click.stop="dowloadAgreeItem(item)">
                                        <v-list-item-action-text>
                                            <v-btn icon dense>
                                                <img src="/download2.svg">
                                            </v-btn>
                                            <span class="modify-btn-text">下載完整接種同意書</span>
                                        </v-list-item-action-text>
                                    </v-list-item>
                                    <v-list-item @click.stop="dowloadRegistItem(item)" class="modify-list-item">
                                        <v-list-item-action-text>
                                            <v-btn icon dense>
                                                <img src="/download2.svg">
                                            </v-btn>
                                            <span class="modify-btn-text">下載報名清冊</span>
                                        </v-list-item-action-text>
                                    </v-list-item>
                                    <v-list-item @click.stop="dowloadList(item)" class="modify-list-item">
                                        <v-list-item-action-text>
                                            <v-btn icon dense>
                                                <img src="/download2.svg">

                                            </v-btn>
                                            <span class="modify-btn-text">下載施打清冊</span>
                                        </v-list-item-action-text>
                                    </v-list-item>
                                </v-list>
                            </v-menu>

                        </template>
                    </com-table>
                    <!--共用 alert -->
                    <com-confirm ref="alert" ref-key="alert" :right-click="alertClick" key="alert-message-confirm">
                        <template v-slot:confirm-image>
                            <v-img src="/alert_warning.svg"></v-img>
                        </template>
                        <template v-slot:confirm-text>
                            {{alertMessage}}
                        </template>
                        <template v-slot:confirm-right-btn-text>
                            返回
                        </template>
                    </com-confirm>
                    <!---->
                    <com-dialog ref="dialogDetail" ref-key="dialogDetail" width="100%" key="regist-list-dialog">
                        <template v-slot:toolbar>
                            場次內容
                            <v-spacer></v-spacer>
                            <v-btn icon @click.stop="closeDetail" :ripple="false">
                                <v-icon color="white">fas fa-times</v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:content>
                            <div class="detail-title">{{detailTitle}}<span :class="detailCntQuota < detailTotalQuota ? 'hidden' : ''">名額已滿</span></div>
                            <div class="detail-sub-title">{{detailDistrict}}－{{detailVillage}}｜{{detailType}}</div>
                            <div class="detail-title-desc">
                                <div>設站時間：{{detailStationTime}}</div>
                                <div>報名開放時間：{{detailRegistrationTime}}</div>
                                <div>承辦醫院：{{detailInstitution}}（{{detailInstutionDistrict}}）</div>
                                <div>報名名額：<span :class="detailCntQuota >= detailTotalQuota ? 'color-red' : ''">{{detailCntQuota}}</span>/<span style="color:#626781">{{detailTotalQuota}}</span></div>
                                <div>年齡限制：{{detailAgeLimit}}歲以上</div>
                            </div>
                            <hr />
                            <!---->
                            <com-table ref-key="detailTable" :headers="getRegistrationHeaders" :items="detailItems" :total-count="detailTotalCount"
                                       :items-per-page="detailItemsPerPage" :total-visible="detailTotalVisible" :show-select="false"
                                       :change-page="detailChangePage" disabled-prop="disabled"
                                       style="margin-left: 15px;padding-top: 15px;margin-right: 15px;">

                                <template v-slot:search-bar>
                                    <div style="display:flex;justify-content:flex-start;margin-left:10px;margin-top:10px;">
                                        <div class="detail-search-block">
                                            <v-text-field v-model="detailKeyWord" placeholder="請輸入報名者姓名或身分證" outlined dense clearable class="detail-search-input"></v-text-field>
                                            <v-btn icon color="#626781" style="top:3px;" :ripple="false"
                                                   @click="getDetailForm(1)">
                                                <v-icon>fas fa-search</v-icon>
                                            </v-btn>
                                        </div>
                                        <div class="detail-action">
                                            <div class="detail-rebound-info">
                                                <div>複檢時間：{{detailCheckTime}}</div>
                                                <div>複檢合格人數：{{detailCheckPassCnt == '0' ? '-' : detailCheckPassCnt}}</div>
                                            </div>
                                            <div class="detail-action-btn">
                                                <!--v-on="on"-->
                                                <v-btn @click.stop="againCheck" :ripple="false" :class="detailAbnormalCnt > 0 ? 'btn-warning' : ''" :disabled="detailAbnormalCnt == 0">
                                                    <span :style="detailAbnormalCnt > 0 ? 'color:white' : ''">再次執行複檢（{{detailAbnormalCnt}}）</span>
                                                </v-btn>
                                                <v-btn color="#736DB9" @click.stop="downloadCompleteFile" :ripple="false" :disabled="lessCheckTime">
                                                    <v-img src="/admin/download_icon.svg" width="24px" height="24px">
                                                    </v-img>
                                                    <span style="color:white">下載完整接種同意書</span>
                                                </v-btn>
                                                <v-btn color="#736DB9" @click.stop="downloadSignUpFile" :ripple="false" :disabled="lessCheckTime">
                                                    <v-img src="/admin/download_icon.svg" width="24px" height="24px">
                                                    </v-img>
                                                    <span style="color:white">下載報名清冊</span>
                                                </v-btn>
                                                <v-btn color="#736DB9" @click.stop="downloadVaccinationFile" :ripple="false" :disabled="lessCheckTime">
                                                    <v-img src="/admin/download_icon.svg" width="24px" height="24px">
                                                    </v-img>
                                                    <span style="color:white">下載接種清冊</span>
                                                </v-btn>
                                            </div>
                                        </div>
                                    </div>
                                </template>

                                <template v-slot:toolbar-action>
                                    <v-spacer></v-spacer>
                                    <div>*以上檔案可於複檢後下載</div>
                                </template>

                                <template v-slot:item.result="{item}">
                                    <div :class="item.result === '系統異常' ? 'detail-result-abnormal' : ''">{{item.result == '' ? '-' : item.result}}</div>
                                </template>

                                <template v-slot:item.modify="{item}">
                                    <template>
                                        <v-btn color="#736DB9" @click.stop="downloadAgreeFile(item)" :ripple="false" :disabled="item.disabled || lessCheckTime" :class="item.status == -2 ? 'hidden' : ''">
                                            <v-img src="/admin/download_icon.svg" width="24px" height="24px">
                                            </v-img>
                                            <span style="color:white">下載同意書</span>
                                        </v-btn>
                                        <v-btn color="#736DB9" @click.stop="artificialAction(item)" :ripple="false" :disabled="item.disabled || lessCheckTime" :class="item.status != -2 ? 'hidden' : ''" class="btn-warning">
                                            <span style="color:white">人工複檢</span>
                                        </v-btn>
                                    </template>
                                </template>

                            </com-table>
                        </template>
                    </com-dialog>

                    <com-dialog ref="dialogDoubleCheck" ref-key="dialogDoubleCheck" width="368" key="regist-recheck-dialog">
                        <template v-slot:toolbar>
                            人工複檢作業
                            <v-spacer></v-spacer>
                            <v-btn icon @click.stop="cancelDoubleCheck" :ripple="false">
                                <v-icon color="white">fas fa-times</v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:content>
                            <v-form lazy-validation ref="doubleCheckForm">
                                <div class="double-check">
                                    <div class="subtitle">人工複檢結果合格者，可下載個人接種同意書</div>
                                    <hr>
                                    <v-row>
                                        <v-col cols="12">
                                            <label>姓名</label>
                                            <div>{{artificialName}}</div>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <label>生日</label>
                                            <div>{{artificialBirthday}}</div>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <label>身分證</label>
                                            <div>{{artificialIdentity}}</div>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select v-model="artificialResult"
                                                      :rules="[rules.required]"
                                                      :items="artificialOptions"
                                                      item-text="state"
                                                      item-value="state"
                                                      placeholder="請選擇人工複檢結果"
                                                      :menu-props="{ bottom: true, offsetY: true }"
                                                      outlined
                                                      dense
                                                      return-object>
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                </div>
                                <hr>
                            </v-form>
                        </template>
                        <template v-slot:action>
                            <v-spacer></v-spacer>
                            <v-btn @click="cancelDoubleCheck" outlined :ripple="false"><span style="color:#626781;">取消</span></v-btn>
                            <v-btn color="primary" @click="confirmDoubleCheck" :ripple="false"><span>確定</span></v-btn>
                        </template>
                    </com-dialog>
                </v-card>
            </div>
        </template>
    </app-layout>
</template>

<style>
    span.table-content-field.regist-village-name {
        width: 200px !important;
        min-width: 200px !important;
    }

    .file-upload-dialog {
        min-width: 300px;
    }

    * {
        font-family: "微軟正黑體", "Roboto", sans-serif, "Arial", "Font Awesome 5 Free", "Material Design Icons", "Material Icons", "sans-serif";
        font-weight: 400;
        font-size: 14px;
    }

    .registration-list .v-list-item__title {
        color: #000000 !important;
    }

    .registration-list .app-content {
        background-color: #F2F3F7;
    }

    .registration-list .content-bar {
        font-size: 16px;
        /*margin-top: 80px;*/
        margin-left: 0px;
        padding: 0px !important;
    }

    .registration-list .v-toolbar, .v-card {
        border-radius: 0px !important;
        box-shadow: none !important;
    }

    .registration-list .v-application .elevation-1 {
        box-shadow: none !important;
    }

    .v-list-item__title {
        padding: 0px 0px !important;
    }

    registration-list .v-list-item__title {
        color: lightgray;
        font-size: 14px;
    }

    .registration-list .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        color: rgba(0, 0, 0, 0.6);
        background: rgba(98, 103, 129, 0.06);
    }

    .registration-list .file-text {
        color: #626781;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
    }

    .registration-list .file-text-warn {
        color: #F0524B;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
    }


    .registration-list .file-btn-container {
        display: inline-flex;
        justify-content: space-between;
        margin-top: 5px;
        margin-bottom: 10px;
        width: 100%;
    }

    .registration-list .file-btn-text {
        padding-left: 10px;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        color: #ffffff;
        text-decoration: none;
    }

    .registration-list .modify-btn-text {
        color: #626781;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
    }

    .registration-list .modify-list-item {
        min-height: 20px !important;
    }

    .registration-list .action-option-text {
        color: #626781;
    }

    .registration-list .detail-title {
        font: normal normal normal 24px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #736DB9;
        text-align: left;
        opacity: 1;
    }

    .registration-list .add-btn-text {
        color: white;
        padding-left: 5px;
    }

    .registration-list .detail-title span {
        font: normal normal normal 24px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #F0524B;
        margin: 0 10px;
    }

    .registration-list .detail-sub-title {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: left;
        opacity: 1;
        margin: 4px 0;
    }

    .registration-list .detail-title-desc {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: left;
        opacity: 1;
        margin: 23px 0 18px 0;
    }

    .registration-list .detail-rebound-info {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: right;
        opacity: 1;
        white-space: nowrap;
        margin: -5px 30px 0 30px;
        display: inline-block;
    }

    .registration-list .detail-search-input {
        width: 220px;
    }

    .registration-list .detail-action {
        display: inline-flex;
    }

        .registration-list .detail-action .v-btn {
            margin: 3px 5px;
        }

    .registration-list .detail-result-abnormal {
        /*font: normal normal normal 16px/24px Noto Sans T Chinese;*/
        letter-spacing: 0px;
        color: #F0524B;
        text-align: center;
        opacity: 1;
    }

    .registration-list .detail-search-block {
        white-space: nowrap;
        display: inline-flex;
    }

    .registration-list .item-disabled {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: center;
        opacity: 1;
    }

    .registration-list .hidden {
        display: none !important;
    }

    .registration-list .btn-warning {
        background: #FCBF5E 0% 0% no-repeat padding-box !important;
        border-radius: 4px;
        opacity: 1;
    }

    .registration-list .color-red {
        color: #F0524B;
    }

    .registration-list .double-check .subtitle {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: left;
        opacity: 1;
    }

    .registration-list .double-check label {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #62678166;
        text-align: left;
        opacity: 1;
    }

    .registration-list .double-check hr {
        margin: 24px 0;
    }

    .registration-list .double-check .row {
        margin-bottom: 16px !important;
    }

    .registration-list .v-btn--outlined {
        border: thin solid rgba(98,103, 129,0.2) !important;
    }

    .v-dialog .v-card__text.dialog-content {
        overflow-x: auto !important;
        overflow-y: auto !important;
    }

        /*-------滾動條整體樣式----*/
        .v-dialog .v-card__text.dialog-content::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        /*滾動條裡面小方塊樣式*/
        .v-dialog .v-card__text.dialog-content::-webkit-scrollbar-thumb {
            border-radius: 100px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: #736DB9;
        }

        /*滾動條裡面軌道樣式*/
        .v-dialog .v-card__text.dialog-content::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 20px;
            background: rgba(0,0,0,0.1);
        }

    thead tr th {
        border-top: 1px solid #D8D8DA !important;
    }

    .app-content > .v-main__wrap > .v-sheet > .v-toolbar__content > .v-toolbar__title {
        font: normal normal normal 20px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781 !important;
        opacity: 1;
    }

    .v-toolbar__content > .v-btn--disabled {
        border-radius: 4px !important;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        background-color: #6267811A !important;
    }

    .v-toolbar__content > .v-size--default > .v-btn__content {
        color: white !important;
    }

    .v-main {
        width: 100% !important;
    }

    .dialogDetail .dialog-content {
        padding: 10px 0 !important;
    }

        .dialogDetail .dialog-content > div {
            margin: 0 20px;
        }

        .dialogDetail .dialog-content > hr {
            margin-top: 10px;
            border: 0;
            height: 24px;
            background: #6267811A 0% 0% no-repeat padding-box;
            opacity: 1;
        }

    /* Extra small devices (portrait phones, less than 576px) */
    @media (max-width: 575.98px) {
        .v-data-table > div {
            display: grid !important;
        }

        .v-data-table > header > .v-toolbar__content .spacer {
            flex-grow: unset !important;
        }

        .detail-rebound-info {
            margin-left: 5px;
        }

        .detail-action {
            display: inline-block;
        }
    }

    .showname {
        color: #62678166 !important;
        font-size: 16px
    }
    /* Small devices (landscape phones, 576px and up) */
    @media (min-width: 576px) and (max-width: 767.98px) {
        .detail-action {
            display: inline-block;
        }
    }

    /** Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) and (max-width: 991.98px) {
    }

    /* Large devices (desktops, 992px and up) */
    @media (min-width: 992px) and (max-width: 1199.98px) {
    }

    /* Extra large devices (large desktops, 1200px and up) */
    @media (min-width: 1200px) {
    }

    .prevDesc {
        padding: 20px 0px 0px 17px !important;
    }

    .divider {
        padding: 20px 10px 10px 14px !important;
    }

    .prevContent .v-list-item__subtitle {
        font-size: 16px;
        color: #626781 !important;
    }

    .v-card__actions {
        padding: 0px 32px 20px 0px !important;
    }

    .fa-search:before {
        content: url('/admin/common_search-24px.svg') !important;
    }
</style>

<script>
    import appMenu from 'components/admin/menu';
    import appLayout from 'components/admin/app_layout';
    import comTable from 'components/table'
    import editor from 'components/admin/forms/regist_editor'
    import comDialog from 'components/dialog'
    import comConfirm from 'components/confirm'
    import comLoading from 'components/loading'
    import { mapActions, mapGetters } from 'vuex'
    import XLSX from 'xlsx'
    export default {
        // router,
        data: () => ({
            totalCount: 0,
            itemsPerPage: 5,
            totalVisible: 4,
            showSelect: true,
            selectVaccine: '',
            selectDistrict: '',
            selectVillage: '',
            selectInstitution: '',
            keyWord: '',
            itemKey: 'regist_id',
            items: [],
            registId: [],
            title: '',
            saveBtnName: '',
            //model: {
            //    regist_title: '',
            //    regist_type: '',
            //    regist_district: '',
            //    regist_village: '',
            //    regist_date: new Date().toISOString().substr(0, 10),
            //},
            result: {},
            viewerTitle: '',
            alertTitle: '',
            alertText: '',
            compSelectedItems: [],
            detailId: '',
            detailTitle: '',
            detailDistrict: '',
            detailVillage: '',
            detailType: '',
            detailInstitution: '',
            detailInstutionDistrict: '',
            detailStationTime: '',
            detailRegistrationTime: '',
            detailCntQuota: '',
            detailTotalQuota: '',
            detailAgeLimit: '',
            detailItems: [],
            detailTotalCount: 0,
            detailItemsPerPage: 5,
            detailTotalVisible: 4,
            detailKeyWord: '',
            detailAbnormalCnt: 0,
            detailCheckTime: 0,
            detailCheckPassCnt: 0,
            alertMessage: '',
            lessCheckTime: false,
            artificialId: '',
            artificialName: '',
            artificialBirthday: '',
            artificialIdentity: '',
            applyNo: 0,
            activityId: '',
            alertImgSrc: "",
            successIcon: '/alert_success.svg',
            warningIcon: '/alert_warning.svg',
            alertIcon: '/alert_warning.svg',
            artificialResult: '',
            isReChecked: false,
            regist_beforeDay: 3,//報名截止時間要於施打時間早3天以上
            downloadErrorMessage: '複檢結果至少要有一筆成功才能下載',
            artificialOptions: [
                { state: '複檢合格', id: 'pass' },
                { state: '複檢不合格', id: 'nopass' },
            ],
            rules: {
                required: v => !!v || '必填'
            },
            model: {
                regist_id: '0',
                regist_create_date: new Date().toISOString().substr(0, 10).replace(/-/g, '/'),///'2021/04/01',
                regist_title: '',
                regist_type: 0,
                regist_type_name: '',
                regist_brand: '',
                regist_brand_name: '',
                regist_district: '',
                regist_district_name: '',
                regist_village: '',
                regist_village_name: '',
                regist_place: '',
                regist_institution: '',
                regist_institution_name: '',
                regist_instution_district: '',
                regist_instution_district_name: '',
                regist_station_date: '',
                regist_station_start_time: '',
                regist_station_end_time: '',
                regist_apply_start_date: '',
                regist_apply_end_date: '',
                regist_review_date: '',///checkTime
                regist_qualified: 423,
                regist_quota: 500,
                regist_unpassed: 45,
                regist_age_limit: 0,
                uploadFile: null,
                finalData: []
            },
        }),
        computed: {
            ...mapGetters('registration', ['getHeaders', 'getVaccines', 'getDistricts', 'getVillages', 'getInstitutions', 'getRegistrationHeaders', 'getDisMedicals']),
        },
        props: {

        },
        created: function () {
            this.loadVaccines();
            this.loadDists();
            this.loadMedicals();
            this.getRegistForm(1);
        },
        methods: {
            ...mapActions('registration', ['loadVaccines', 'loadDists', 'loadVillages', 'loadMedicals', 'loadMedicalsByVillage',
                'loadRegistForm', 'loadDetailForm', 'getCompleteFile', 'getSignUpFile', 'getVaccinationFile', 'getAgreeFile', 'execCheck', 'reExecCheck',
                'doubleCheck', 'registForm', 'updateRegist', 'removeRegist', 'importRegistForm']),
            getRegistForm: function (page) {
                var params = {
                    vaccine: this.selectVaccine,
                    district: this.selectDistrict,
                    village: this.selectVillage,
                    institution: this.selectInstitution,
                    keyWord: this.keyWord,
                    pageSize: this.itemsPerPage,
                    page: page,
                };

                this.loadRegistForm(params).then((r) => {
                    this.totalCount = r.totalCount;
                    this.items.splice(0);
                    r.datas.forEach((x) => this.items.push(x));
                    this.$refs.table.gofrontPage(page);
                }).catch((e) => {
                    console.log(e);

                });

            },
            changePage: function (pager) {
                console.log('c', pager);
                ///{ page: 2, pageSize: 20}
                this.getRegistForm(pager.page);
            },
            deleteSelected: function (items) {

                this.compSelectedItems.splice(0);
                items.forEach((x) => this.compSelectedItems.push(x));
                this.$forceUpdate();
                this.$refs.removeAlert.open();
                console.log('delete', items)

            },
            manualInput: function () {
                this.title = '建立報名表';
                this.saveBtnName = "建立報名表";
                this.viewerTitle = '確認新增報名資訊';
                this.$refs.registNewEditor.create(this.model);
                this.$refs.registNewEditor.reset();
                //console.log('manualInput')
            },
            editItem: function (item) {
                //regist_type=0會有問題,無法設定v-select值??? vue bug??

                var today = new Date();
                var overStatus = 0;
                if (item.regist_unpassed > 0 || today > new Date(item.regist_apply_start_date)) {
                    //this.alertTitle = '拒絕修改';
                    //this.alertText = '已經開始報名，無法再修改資料';
                    //this.alertImgSrc = this.alertIcon;
                    //this.$refs.warringAlert.open();
                    //return false;
                    overStatus = 1;

                }
                console.log("edit", item);
                //Object.assign(this.model, item);
                this.saveBtnName = "儲存";
                this.title = '編輯報名表';
                this.viewerTitle = '編輯報名資訊確認';
                this.$refs.registEdit.open(item, overStatus);
                //console.log('edit', item);

                //this.loadMedicalsByVillage({ "name": item.regist_village_name });
                this.loadVillages({ id: item.regist_district, name: item.regist_district_name });
                var vaccines = this.$store.getters['user/getVaccines'];
                var requireSubitem = false;
                vaccines.forEach((data) => {
                    if (data.groupId == item.regist_type) {
                        requireSubitem = true;
                        return;
                    }
                });
                this.loadVaccines({ id: item.regist_type, requireSubitem: requireSubitem });

            },
            fileImport: function () {
                this.$refs.fileViewer.open();
                //console.log('fileImport')
            },
            formAction: function (result) {
                var errMsg = ""
                if (Date.parse(result.model.regist_station_date + ' ' + result.model.regist_station_start_time) >=
                    Date.parse(result.model.regist_station_date + ' ' + result.model.regist_station_end_time)) {
                    errMsg = "(開始施打時間)必須早於(結束施打時間)";
                }

                if (Date.parse(result.model.regist_apply_start_date) > Date.parse(result.model.regist_apply_end_date)) {
                    errMsg = "(事先開放報名開始時間)必須早於(事先開放報名結束時間)";
                }

                if (Date.parse(result.model.regist_station_date + ' ' + result.model.regist_station_start_time) <
                    Date.parse(result.model.regist_apply_end_date) + this.regist_beforeDay * 60 * 60 * 24 * 1000) {
                    errMsg = "(開放報名結束時間)必須早於(開始施打時間)至少" + this.regist_beforeDay + "天";
                }

                if (errMsg != "") {
                    this.alertTitle = '設定錯誤';
                    this.alertText = errMsg;
                    this.$refs.fileViewer.close();
                    this.$refs.warringAlert.open();
                } else {
                    //mappping

                    result.model.regist_type_name = result.model.regist_type.name;
                    result.model.regist_brand_name = result.model.regist_brand.name;
                    result.model.regist_village_name = result.model.regist_village.name;
                    result.model.regist_institution_name = result.model.regist_institution.uName;
                    result.model.regist_institution_code = result.model.regist_institution.id;
                    result.model.regist_instution_district_name = result.model.regist_district.name;
                    result.model.regist_district_name = result.model.regist_district.name;

                    Object.assign(this.result, result);


                    switch (result.action) {
                        case 'save':
                            this.$refs.registViewer.open();

                            //console.log('save2', result)
                            break;

                        case 'cancel':
                            //console.log('cancel', result)
                            break;
                    }
                }
            },
            editFormAction: function (result) {

                console.log('edit_preview', result);

                Object.assign(this.result, result);
                switch (result.action) {
                    case 'save':

                        if (result.model.regist_brand.id) {
                            result.model.regist_type_name = result.model.regist_brand.id;
                        }
                        if (result.model.regist_brand.name) {
                            result.model.regist_brand_name = result.model.regist_brand.name;
                        }
                        if (result.model.regist_type.requireSubitem === false) {
                            result.model.regist_brand_name = "";
                        }
                        result.model.regist_village_name = result.model.regist_village.name;
                        result.model.regist_institution_name = result.model.regist_institution.uName;
                        result.model.regist_institution_code = result.model.regist_institution.id;
                        result.model.regist_district_name = result.model.regist_district.name;

                        this.$refs.registEditViewer.open();
                        //console.log('save1', result)
                        break;

                    case 'cancel':
                        //console.log('cancel', result)
                        break;
                }
            },
            colse: function () {
                this.$refs.registViewer.close();
            },
            editClose: function () {
                this.$refs.registEditViewer.close();
            },
            saveRegist: function () {
                //console.log('result', this.result)

                this.$refs.registViewer.close();
                this.$refs.registNewEditor.close();
                this.$bus.$emit('type1_show4', "資料處理中...");
                var comp = this;
                this.registForm(comp.result).then(function (ret) {
                    console.log(ret.datas);
                    comp.$bus.$emit('type1_hide4');
                    comp.alertTitle = comp.result.model.regist_title;
                    comp.alertText = '成功建立報名表';
                    comp.alertImgSrc = comp.successIcon;
                    comp.$refs.registAlert.open();
                    comp.getRegistForm(1);
                }).catch(function (r) {
                    console.log(r.datas);
                    comp.alertTitle = '連線異常';
                    comp.alertText = '請稍後再試!';
                    comp.alertImgSrc = comp.alertIcon;
                    comp.$refs.warringAlert.open();
                    comp.$bus.$emit('type1_hide4');
                });
            },
            editSaveRegist: function () {
                //console.log('updateresult', this.result)
                var comp = this;
                this.updateRegist(comp.result).then(function (ret) {
                    comp.$bus.$emit('type1_hide4');
                    comp.alertTitle = comp.result.model.regist_title;

                    if (ret.datas == 200) {
                        comp.alertText = '已成功變更報名表';
                        comp.alertImgSrc = comp.successIcon;
                    } else {
                        comp.alertText = '變更報名表失敗';
                        comp.alertImgSrc = comp.alertIcon;
                    }
                    comp.$refs.registEditViewer.close();
                    comp.$refs.registEdit.close();
                    comp.$refs.registAlert.open();
                    comp.getRegistForm(1);
                }).catch(function (r) {
                    console.log(r.datas);
                    comp.alertTitle = '連線異常';
                    comp.alertText = '請稍後再試!';
                    comp.alertImgSrc = this.alertIcon;
                    comp.$refs.warringAlert.open();
                    comp.$bus.$emit('type1_hide4');
                });
            },
            backToEdit: function () {
                this.$refs.registViewer.close();
                this.$refs.registNewEditor.show();
            },
            backToEdit2: function () {
                this.$refs.registEditViewer.close();
                this.$refs.registEdit.show();
            },
            alertRightClick: function () {
                this.$bus.$emit(`confirm_show`, false);
            },
            cancelFile: function () {
                this.$refs.fileViewer.close();
            },
            successUploadRightClick: function () {
                this.$refs.successUploadAlert.close();
            },
            closeRightClick: function () {
                this.$refs.warringAlert.close();
            },
            removeRightClick: function () {

                //console.log('compSelectedItems', this.compSelectedItems);
                this.$bus.$emit(`confirm_show`, false);
                var comp = this;
                comp.alertImgSrc = comp.warningIcon;
                comp.removeRegist(comp.compSelectedItems).then(function (result) {
                    comp.alertText = '';
                    if (result) {
                        comp.alertTitle = '刪除成功';
                        comp.alertImgSrc = comp.successIcon;
                        comp.getRegistForm(1);
                        comp.$refs.table.clearAll();

                    } else {
                        this.alertImgSrc = comp.alertIcon;
                        comp.alertTitle = '刪除失敗';
                    }
                    comp.$refs.registAlert.open();
                }).catch(function (e) {
                    //console.log('errcode', e.datas.response.status);
                    if (e.datas.response.status == 405) {
                        comp.alertTitle = '無法刪除';
                        comp.alertText = '無法刪除已有人報名的活動';
                    } else {
                        comp.alertTitle = '刪除失敗';
                        comp.alertText = '處理錯誤，請重新嘗試';
                    }

                    comp.errorImgSrc = comp.warningIcon;
                    comp.$refs.registAlert.open();
                });
            },
            removeItem: function (item) {
                this.compSelectedItems.splice(0);
                this.compSelectedItems.push(item);
                this.$refs.removeAlert.open();
                //console.log('remove', item);
            },
            removeLeftClick: function () {
                this.$bus.$emit(`confirm_show`, false);
            },
            dowloadAgreeItem: function (item) {
                //console.log('Agree', item);
                if (item.regist_isrechecked) {
                    this.detailId = item.regist_id;
                    this.downloadCompleteFile();
                } else {
                    this.alertTitle = this.downloadErrorMessage;
                    this.alertText = '';
                    this.alertImgSrc = this.warningIcon;
                    this.$refs.registAlert.open();
                }

            },
            dowloadRegistItem: function (item) {
                //console.log('Regist', item);
                this.detailId = item.regist_id;
                this.downloadSignUpFile();
            },
            dowloadList: function (item) {
                //console.log('List', item);
                this.detailId = item.regist_id;
                this.downloadVaccinationFile();
            },
            handleRowClick: function (item) {
                console.log('item', item);
            },
            detailItem: function (item) {
                this.isReChecked = item.regist_isrechecked //是否複檢成功
                this.detailId = item.regist_id;//item.id;
                this.detailTitle = item.regist_title;//item.title;
                this.detailType = item.regist_type_name; //item.type;
                this.detailDistrict = item.regist_district_name; //item.district;
                this.detailVillage = item.regist_village_name; //item.village;
                this.detailInstitution = item.regist_institution_name;//item.institution;
                this.detailInstutionDistrict = item.regist_instution_district_name;   //item.instutionDistrict;
                this.detailStationTime = item.regist_station_date + ' ' + item.regist_station_start_time + ' - ' + item.regist_station_end_time; //item.stationTime;
                this.detailRegistrationTime = item.regist_apply_start_date + ' - ' + item.regist_apply_end_date;   //item.registrationTime;
                this.detailCntQuota = item.regist_unpassed;   //item.cntQuota;
                this.detailTotalQuota = item.regist_quota;    //item.totalQuota;
                this.detailAgeLimit = item.regist_age_limit;
                this.detailAbnormalCnt = item.regist_abnormalCnt;   //item.abnormalCnt;
                this.detailCheckTime = item.regist_review_date;   //item.checkTime;
                this.detailCheckPassCnt = item.regist_qualified; //item.checkPassCnt;

                var today = new Date().toISOString().substr(0, 10).replace(/-/g, '');
                //var checkTime = item.checkTime.substr(0, 10).replace(/\//g, '');
                var checkTime = item.regist_review_date.substr(0, 10).replace(/\//g, '');
                this.lessCheckTime = (today <= checkTime);

                this.$bus.$emit('dialogDetail_show', true);

                this.getDetailForm(1);
            },
            closeDetail: function () {
                this.$refs.dialogDetail.close();
            },
            detailChangePage: function (pager) {
                //console.log(pager);
                this.getDetailForm(pager.page);
            },
            getDetailForm: function (page) {
                var params = {
                    id: this.detailId,
                    keyWord: this.detailKeyWord,
                    pageSize: this.detailItemsPerPage,
                    page: page,
                };
                this.loadDetailForm(params).then((r) => {
                    this.detailTotalCount = r.totalCount;
                    this.activityId = r.activityId;

                    this.detailItems.splice(0);
                    r.datas.forEach((x) => {
                        var str = x.identity.substr(1, 5);
                        var code = x.identity.replace(str, '●●●●●');
                        x.identity = code;

                        //if (['不合格', '已取消'].includes(x.result) || x.result.indexOf('不合格') !== -1) {
                        //    x['disabled'] = true;
                        //}
                        if (x.status != 1 && x.status != -2 && x.status != 3) {
                            x['disabled'] = true;
                        }

                        this.detailItems.push(x)
                    });
                }).catch((e) => {
                    console.log(e);
                });
            },
            againCheck: function () {
                var comp = this;
                comp.alertMessage = '';
                comp.$bus.$emit('type1_show4', "資料處理中...");
                comp.execCheck({ id: comp.detailId })
                    .then(function (result) {

                        if (result.datas != "" && result.cnt >= 0) {
                            //取得排程id後, 再call 複檢Api
                            comp.reExecCheck({ id: result.datas })
                                .then(function (ret) {
                                    //console.log(ret);
                                    if (ret.datas.memo == "執行成功") {//執行中 ,執行成功 ,執行異常
                                        comp.alertImgSrc = comp.successIcon;
                                        comp.alertTitle = "執行成功";
                                    } else if (ret.datas.memo == "執行中") {
                                        comp.alertImgSrc = comp.warningIcon;
                                        comp.alertTitle = "執行中，請稍後再試";
                                    } else {
                                        comp.alertImgSrc = comp.warningIcon;
                                        comp.alertTitle = ret.datas.memo;
                                    }
                                    comp.$refs.registAlert.open();
                                    comp.detailAbnormalCnt = ret.cnt;
                                    return;
                                })
                                .catch(function () {
                                    comp.alertMessage = '網站異常，請稍後再試';
                                });
                        } else {
                            comp.alertMessage = '複檢錯誤';
                        }

                        if (comp.alertMessage !== '') {
                            comp.$bus.$emit('alert_show', true);
                            return;
                        }

                        comp.$bus.$emit('type1_hide4');
                    })
                    .catch(function () {
                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            downloadCompleteFile: function () {
                var comp = this;
                comp.alertMessage = '';
                if (!comp.isReChecked) {
                    comp.alertTitle = comp.downloadErrorMessage;
                    comp.alertText = '';
                    comp.alertImgSrc = comp.warningIcon;

                    comp.$refs.registAlert.open();
                    return false;
                }

                comp.getCompleteFile({ id: comp.detailId })
                    .then(function (result) {
                        switch (result.state) {
                            case 'not found':
                                comp.alertMessage = '檔案不存在';
                                break;
                            default:
                                break;
                        }

                        if (comp.alertMessage !== '') {
                            comp.$bus.$emit('alert_show', true);
                            return;
                        }

                        //console.log(result);
                    })
                    .catch(function () {
                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            downloadSignUpFile: function () {
                var comp = this;
                comp.alertMessage = '';
                comp.getSignUpFile({ id: comp.detailId })
                    .then(function (result) {
                        switch (result.state) {
                            case 'not found':
                                comp.alertMessage = '檔案不存在';
                                break;
                            default:
                                break;
                        }

                        if (comp.alertMessage !== '') {
                            comp.$bus.$emit('alert_show', true);
                            return;
                        }

                        //console.log(result);
                    })
                    .catch(function () {
                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            downloadVaccinationFile: function () {
                var comp = this;
                comp.alertMessage = '';
                comp.getVaccinationFile({ id: comp.detailId })
                    .then(function (result) {
                        switch (result.state) {
                            case 'not found':
                                comp.alertMessage = '檔案不存在';
                                break;
                            default:
                                break;
                        }

                        if (comp.alertMessage !== '') {
                            comp.$bus.$emit('alert_show', true);
                            return;
                        }

                        //console.log(result);
                    })
                    .catch(function () {
                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            downloadAgreeFile: function (item) {

                var comp = this;
                comp.alertMessage = '';
                comp.getAgreeFile({ id: item.id, name: item.name, activityId: this.activityId })
                    .then(function (result) {
                        switch (result.state) {
                            case 'not found':
                                comp.alertMessage = '檔案不存在';
                                break;
                            default:
                                break;
                        }

                        if (comp.alertMessage !== '') {
                            comp.$bus.$emit('alert_show', true);
                            return;
                        }

                        //console.log(result);
                    })
                    .catch(function () {
                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            artificialAction: function (item) {

                this.artificialId = item.id;
                this.artificialName = item.name;
                this.artificialBirthday = item.birthday.replace(/\//g, '-') + 'T00:00:00';
                this.artificialIdentity = item.identity;
                this.applyNo = item.id;
                this.$bus.$emit('dialogDoubleCheck_show', true);

                this.$refs.doubleCheckForm.reset();
            },
            alertClick: function () {
                this.$bus.$emit('alert_show', false);
            },
            confirmDoubleCheck: function () {
                var comp = this;
                var isvaild = comp.$refs.doubleCheckForm.validate();
                if (!isvaild) return;

                comp.alertMessage = '';
                comp.doubleCheck({ activityId: comp.activityId, applyNo: comp.applyNo, bd: comp.artificialBirthday, result: comp.artificialResult })
                    .then(function (result) {
                        console.log(result);
                        comp.alertTitle = '人工複檢完成';
                        comp.alertText = '';
                        comp.alertImgSrc = comp.successIcon;
                        comp.$refs.registAlert.open();
                        comp.$refs.fileViewer.close();

                        comp.$bus.$emit('dialogDoubleCheck_show', false);
                    })
                    .catch(function () {
                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            cancelDoubleCheck: function () {
                this.$bus.$emit('dialogDoubleCheck_show', false);
            },
            onUploadClick() {
                this.$refs.excelUploader.click();
            },
            saveFile() {

                //console.log(this.finalData);
                if (this.finalData.length > 0) {

                    var comp = this;
                    comp.importRegistForm(comp.finalData).then(function (ret) {
                        console.log(ret.datas);
                        comp.$bus.$emit('type1_hide4');
                        comp.alertTitle = '檔案匯入成功';
                        comp.alertText = '成功匯入報名表';
                        comp.alertImgSrc = comp.successIcon;
                        comp.$refs.fileViewer.close();
                        comp.$refs.successUploadAlert.open();
                        comp.getRegistForm(1);
                    }).catch(function (r) {
                        console.log(r.datas);
                        comp.alertTitle = '連線異常';
                        comp.alertText = '請稍後再試!';
                        comp.alertImgSrc = comp.alertIcon;
                        comp.$refs.warringAlert.open();
                        comp.$bus.$emit('type1_hide4');
                    });
                }
            },
            onFileChanged(event) {

                this.uploadFile = event.target.files ? event.target.files[0] : null;

                if (this.uploadFile) {
                    const reader = new FileReader();
                    //var ss = this.$store;
                    var comp = this;
                    this.$bus.$emit('type1_show4', "資料處理中...");
                    reader.onload = (e) => {
                        /* Parse data */
                        const bstr = e.target.result;
                        const wb = XLSX.read(bstr, { type: 'binary' });
                        /* Get first worksheet */
                        const wsname = wb.SheetNames[0];
                        const ws = wb.Sheets[wsname];
                        /* Convert array of arrays */
                        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                        //console.log(data);
                        //var getKeyByValue=fuction(object, value) {
                        //    return Object.keys(object).find(key => object[key] === value);
                        //}
                        var i, j;
                        var fv = function (nameKey, myArray, name) {
                            for (i = 0; i < myArray.length; i++) {
                                if (myArray[i][name] === nameKey) {
                                    return myArray[i];
                                }
                            }
                        };

                        var v = comp.$store.getters['user/getVaccines'],
                            z = comp.$store.getters['user/getZones'][0].data,
                            m = comp.$store.getters['user/getMedicals'];

                        var vv, vvv, k = 0;
                        var zz, zzz, mm, villageName;
                        comp.finalData = [];
                        for (j = 4; j < data.length; j++) {

                            if (!data[j][0]) {
                                //console.log("line " + (j + 1) + "is null");
                                continue;
                            }
                            vv = fv(data[j][0], v, 'groupName');
                            comp.finalData[k] = data[j];

                            //疫苗種類
                            if (vv) {
                                vvv = fv(data[j][1], vv['vaccines'], 'itemName');
                                //console.log(vv['groupName'] + "@" + vvv['itemName'] + "@" + vvv['itemId']);
                                comp.finalData[k][0] = vv['groupId'];
                                if (vvv) {
                                    comp.finalData[k][1] = vvv['itemId'];
                                } else {
                                    console.log('疫苗種類', "error line:" + (j + 1));
                                }
                            } else {
                                console.log('疫苗類型', "error line:" + (j + 1));
                            }

                            //行政區域
                            zz = fv(data[j][3], z, 'distName');

                            if (zz) {
                                comp.finalData[k][3] = zz['distId'];
                                zzz = fv(data[j][4].trim(), zz['data'], 'villageName');

                                villageName = data[j][4].trim();
                                if (zzz) {
                                    comp.finalData[k][4] = zzz['villageId'];
                                } else {
                                    console.log('村里', "error line:" + (j + 1));
                                }
                            } else {
                                console.log('行政區域', "error line:" + (j + 1));
                            }
                            //醫療院所

                            mm = fv(villageName, m, 'villageName');

                            if (mm && mm['uName'] == data[j][6].trim()) {
                                comp.finalData[k][6] = mm['id'];
                            } else {
                                console.log('醫療院所', "error line:" + (j + 1));
                            }

                            k++;
                        }
                        //console.log(finalData);
                        comp.$bus.$emit('type1_hide4');
                    }

                    reader.readAsBinaryString(this.uploadFile);

                }
            }
        },

        components: {
            appLayout, appMenu, comTable, editor, comDialog, comConfirm, comLoading
        }
    };
</script>


