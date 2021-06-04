<template>
    <app-layout>
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:content-title>
            報名表管理

        </template>
        <template v-slot:app-content>
            <div id="app">
                <v-card style="margin-left: 20px; margin-right: 20px; margin-top: 20px;">
                    <com-table ref-key="table" :headers="getHeaders" :items="items" :total-count="totalCount"
                               :items-per-page="itemsPerPage" :total-visible="totalVisible" :show-select="showSelect"
                               :change-page="changePage"  :row-click="handleRowClick"
                               style="margin-left: 15px;padding-top: 15px;margin-right: 15px;">

                        <template v-slot:item.regist_quota="{item}">
                            <!--<div><span :class="item.cntQuota >= item.totalQuota ? 'color-red' : ''">{{item.cntQuota}}</span>/<span style="color:#626781">{{item.totalQuota}}</span></div>-->
                            <div><span :class="item.regist_unpassed >= item.regist_quota ? 'color-red' : ''">{{item.regist_unpassed}}</span>/<span style="color:#626781">{{item.regist_quota}}</span></div>
                        </template>
                        <template v-slot:search-bar>
                            <div style="display:flex;justify-content:flex-start;margin-left:10px;margin-top:10px;">
                                <v-row>
                                    <v-col cols="2">
                                        <v-select v-model="selectVaccine"
                                                  :items="getVaccines"
                                                  item-text="name"
                                                  item-value="id"
                                                  placeholder="所有疫苗類型"
                                                  :menu-props="{ bottom: true, offsetY: true }"
                                                  outlined
                                                  dense
                                                  clearable
                                                  style="margin-right: 10px;"
                                                  class="search-filter"
                                                  return-object>
                                        </v-select>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-select v-model="selectDistrict"
                                                  :items="getDistricts"
                                                  item-text="name"
                                                  item-value="id"
                                                  placeholder="全部行政區"
                                                  :menu-props="{ bottom: true, offsetY: true }"
                                                  outlined
                                                  dense
                                                  clearable
                                                  style="margin-right: 10px;"
                                                  class="search-filter"
                                                  return-object>
                                        </v-select>
                                    </v-col>

                                    <v-col cols="2">
                                        <v-select v-model="selectVillage"
                                                  :items="getVillages"
                                                  item-text="name"
                                                  item-value="id"
                                                  placeholder="全部村里"
                                                  :menu-props="{ bottom: true, offsetY: true }"
                                                  outlined
                                                  dense
                                                  clearable
                                                  style="margin-right: 10px;"
                                                  class="search-filter"
                                                  return-object>
                                        </v-select>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-select v-model="selectInstitution"
                                                  :items="getInstitutions"
                                                  item-text="name"
                                                  item-value="id"
                                                  placeholder="全部醫療院所"
                                                  :menu-props="{ bottom: true, offsetY: true }"
                                                  outlined
                                                  dense
                                                  clearable
                                                  style="margin-right: 10px;"
                                                  class="search-filter"
                                                  return-object>
                                        </v-select>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-text-field v-model="keyWord" placeholder="標題關鍵字" outlined dense clearable></v-text-field>
                                    </v-col>
                                    <v-btn icon color="#626781" style="top:5px;" :ripple="false"
                                           @click="getRegistForm(1)">
                                        <v-icon>fas fa-search</v-icon>
                                    </v-btn>
                                </v-row>
                            </div>


                        </template>

                        <template v-slot:toolbar-action={selectAll,selectedItems}>
                            <v-btn color="#F0524B" :disabled="selectedItems.length<=0 " @click="deleteSelected(selectedItems)" :ripple="false">
                                <span style="color:white">刪除選取項目 ({{selectedItems.length}})</span>
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



                            <com-dialog ref="fileViewer" ref-key="two" width="25%">
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
                                            <v-btn color="secondary">
                                                <img src="/upload.svg">

                                                <span class="file-btn-text">上傳報名表檔案</span>
                                            </v-btn>

                                            <v-spacer></v-spacer>

                                            <v-btn color="secondary">
                                                <v-img src="/download.svg"></v-img>
                                                <span>下載報名表格式範本</span>
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
                            <editor ref="registNewEditor" ref-key="two" width="60%" :title="title" :action="formAction"></editor>
                            <com-dialog ref="registViewer" ref-key="two" width="60%">
                                <template v-slot:toolbar>
                                    {{viewerTitle}}
                                    <v-spacer></v-spacer>
                                    <v-btn icon @click.stop="colse" :ripple="false">
                                        <v-icon color="white">fas fa-times</v-icon>
                                    </v-btn>
                                </template>
                                <template v-slot:content>
                                    點選「確定」後本報名表將立即生效，請再次確認內容無誤。
                                    <v-divider></v-divider>
                                    <div v-if="result.model !=null">
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>接種類型</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_type.name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>新冠肺炎疫苗廠牌</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_brand.name}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>場次標題</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_title}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>設站行政區</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_district.name}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item two-line>
                                            <v-list-item-content>

                                                <v-list-item-title>設站村里</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_village.name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>設站地點</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_place}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>醫療院所</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_institution.name}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>機構代碼</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_institution_code}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>機構所在行政區</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_institution_district}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-divider></v-divider>
                                        <v-list-item two-line>
                                            <v-list-item-content>

                                                <v-list-item-title>
                                                    設站時間

                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    {{result.model.regist_station_date}} ,
                                                    {{result.model.regist_station_start_time}}-{{result.model.regist_station_end_time}}

                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>事先開放報名時間</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_apply_start_date}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>接種資格複審時間</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_review_date}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-divider></v-divider>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>報名名額上限</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_quota}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-divider></v-divider>
                                    </div>

                                </template>
                                <template v-slot:action>

                                    <v-spacer></v-spacer>
                                    <v-btn outlined :ripple="false" @click="backToEdit"><span style="color:#626781;">修改</span></v-btn>
                                    <v-btn @click="saveRegist" color="primary" :ripple="false">確定</v-btn>
                                </template>
                            </com-dialog>


                            <!--編輯-->
                            <editor ref="registEdit" ref-key="two" width="60%" :title="title" :action="editFormAction"></editor>
                            <com-dialog ref="registEditViewer" ref-key="two" width="60%">
                                <template v-slot:toolbar>
                                    {{viewerTitle}}
                                    <v-spacer></v-spacer>
                                    <v-btn icon @click.stop="editClose" :ripple="false">
                                        <v-icon color="white">fas fa-times</v-icon>
                                    </v-btn>
                                </template>
                                <template v-slot:content>
                                    點選「確定」後本報名表將立即生效，請再次確認內容無誤。
                                    <v-divider></v-divider>
                                    <div v-if="result.model !=null">
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>接種類型</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_type_name}}5</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>新冠肺炎疫苗廠牌</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_brand_name}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>場次標題</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_title}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>設站行政區</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_district_name}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item two-line>
                                            <v-list-item-content>

                                                <v-list-item-title>設站村里</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_village_name}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>設站地點</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_place}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>醫療院所</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_institution_name}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>機構代碼</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_institution_code}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>機構所在行政區</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_institution_district}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-divider></v-divider>
                                        <v-list-item two-line>
                                            <v-list-item-content>

                                                <v-list-item-title>
                                                    設站時間

                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    {{result.model.regist_station_date}} ,
                                                    {{result.model.regist_station_start_time}}-{{result.model.regist_station_end_time}}

                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>事先開放報名時間</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_apply_start_date}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>接種資格複審時間</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_review_date}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-divider></v-divider>

                                        <v-list-item two-line>
                                            <v-list-item-content>
                                                <v-list-item-title>報名名額上限</v-list-item-title>
                                                <v-list-item-subtitle>{{result.model.regist_quota}}</v-list-item-subtitle>

                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-divider></v-divider>
                                    </div>

                                </template>
                                <template v-slot:action>

                                    <v-spacer></v-spacer>
                                    <v-btn outlined :ripple="false" @click="backToEdit"><span style="color:#626781;">修改</span></v-btn>
                                    <v-btn @click="editSaveRegist" color="primary" :ripple="false">確定</v-btn>
                                </template>
                            </com-dialog>


                            <com-confirm ref="registAlert" ref-key="confirm" :right-click="alertRightClick">
                                <template v-slot:confirm-image>
                                    <v-img src="/alert_success.svg"></v-img>
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


                            <com-confirm ref="removeAlert" ref-key="confirm" :right-click="removeRightClick" :left-click="removeLeftClick">
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


                            <com-confirm ref="successUploadAlert" ref-key="confirm" :right-click="successUploadRightClick">
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


                        </template>

                        <template v-slot:item.modify="{item}">
                            <v-menu bottom right offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-btn dark icon v-on="on" @click.stop="" :ripple="false">
                                        <v-icon color='#858585'>mdi-dots-horizontal</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item @click.stop="viewitem(item)"  class="modify-list-item">
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
                                    <v-list-item @click.stop="detailItem(item)">
                                        <v-list-item-action-text>
                                            <v-btn icon dense>
                                                <v-icon small>far fa-edit</v-icon>
                                            </v-btn>場次內容
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
                    <com-confirm ref="alert" ref-key="alert" :right-click="alertClick">
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
                    <com-dialog ref="dialogDetail" ref-key="dialogDetail" width="100%">
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
                                <div>報名名額：<span :class="detailCntQuota >= detailTotalQuota ? 'color-red' : ''">{{detailCntQuota}}</span>/<span style="color:#626781">{{detailTotalQuota}}</span></div>
                                <div>承辦醫院：{{detailInstitution}}（{{detailInstutionDistrict}}）</div>
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
                                            <v-btn icon color="#626781" style="top:5px;" :ripple="false"
                                                   @click="getDetailForm(1)">
                                                <v-icon>fas fa-search</v-icon>
                                            </v-btn>
                                        </div>
                                        <div class="detail-action">
                                            <div class="detail-rebound-info">
                                                <div>複檢時間：{{detailCheckTime}}</div>
                                                <div>複檢通過人數：{{detailCheckPassCnt == '0' ? '-' : detailCheckPassCnt}}</div>
                                            </div>
                                            <div class="detail-action-btn">
                                                <!--v-on="on"-->
                                                <v-btn @click.stop="againCheck" :ripple="false" :class="detailAbnormalCnt > 0 ? 'btn-warning' : ''" :disabled="detailAbnormalCnt == 0">
                                                    <span :style="detailAbnormalCnt > 0 ? 'color:white' : ''">再次執行複檢（{{detailAbnormalCnt}}）</span>
                                                </v-btn>
                                                <v-btn  color="#736DB9" @click.stop="downloadCompleteFile" :ripple="false" :disabled="lessCheckTime">
                                                    <v-icon left color='white' size="15">
                                                        mdi-arrow-down
                                                    </v-icon>
                                                    <span style="color:white">下載完整接種同意書</span>
                                                </v-btn>
                                                <v-btn  color="#736DB9" @click.stop="downloadSignUpFile" :ripple="false" :disabled="lessCheckTime">
                                                    <v-icon left color='white' size="15">
                                                        mdi-arrow-down
                                                    </v-icon>
                                                    <span style="color:white">下載報名清冊</span>
                                                </v-btn>
                                                <v-btn  color="#736DB9" @click.stop="downloadVaccinationFile" :ripple="false" :disabled="lessCheckTime">
                                                    <v-icon left color='white' size="15">
                                                        mdi-arrow-down
                                                    </v-icon>
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
                                        <v-btn  color="#736DB9" @click.stop="downloadAgreeFile(item)" :ripple="false" :disabled="item.disabled || lessCheckTime" :class="item.result === '系統異常' ? 'hidden' : ''">
                                            <v-icon left color='white' size="15">
                                                mdi-arrow-down
                                            </v-icon>
                                            <span style="color:white">下載同意書</span>
                                        </v-btn>
                                        <v-btn  color="#736DB9" @click.stop="artificialAction(item)" :ripple="false" :disabled="item.disabled || lessCheckTime" :class="item.result !== '系統異常' ? 'hidden' : ''" class="btn-warning">
                                            <span style="color:white">人工複檢</span>
                                        </v-btn>
                                    </template>
                                </template>

                            </com-table>
                        </template>
                    </com-dialog>

                    <com-dialog ref="dialogDoubleCheck" ref-key="dialogDoubleCheck" width="368">
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

<style scoped>
    * {
        font-family: "微軟正黑體", "Roboto", sans-serif, "Arial", "Font Awesome 5 Free", "Material Design Icons", "Material Icons", "sans-serif";
        font-weight: 400;
        font-size: 14px;
    }

    .app-content {
        background-color: #F2F3F7;
    }

    .content-bar {
        font-size: 16px;
        /*margin-top: 80px;*/
        margin-left: 0px;
        padding: 0px !important;
    }

    .v-toolbar, .v-card {
        border-radius: 0px !important;
        box-shadow: none !important;
    }

    .v-application .elevation-1 {
        box-shadow: none !important;
    }


    .v-list-item__title {
        color: lightgray;
        font-size: 14px;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        color: rgba(0, 0, 0, 0.6);
        background: rgba(98, 103, 129, 0.06);
    }

    .file-text {
        color: #626781;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
    }

    .file-text-warn {
        color: #F0524B;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
    }


    .file-btn-container {
        display: flex;
        justify-content: space-around;
        margin-top: 5px;
        margin-bottom: 10px;
    }

    .file-btn-text {
        padding-left: 10px;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        color:#ffffff;
    }

    .modify-btn-text {
        color: #626781;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
    }

    .modify-list-item {
        min-height: 20px !important;
    }

    .action-option-text {
        color: #626781;
    }

    .detail-title {
        font: normal normal normal 24px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #736DB9;
        text-align: left;
        opacity: 1;
    }
    .add-btn-text {
        color: white;
        padding-left: 5px;
    }

    .detail-title span {
        font: normal normal normal 24px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #F0524B;
        margin: 0 10px;
    }

    .detail-sub-title {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: left;
        opacity: 1;
        margin: 4px 0;
    }

    .detail-title-desc {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: left;
        opacity: 1;
        margin: 23px 0 18px 0;
    }

    .detail-rebound-info {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: right;
        opacity: 1;
        white-space: nowrap;
        margin: -5px 30px 0 30px;
        display: inline-block;
    }

    .detail-search-input {
        width: 220px;
    }

    .detail-action {
        display: inline-flex;
    }

    .detail-action .v-btn {
        margin: 3px 5px;
    }

    .detail-result-abnormal {
        /*font: normal normal normal 16px/24px Noto Sans T Chinese;*/
        letter-spacing: 0px;
        color: #F0524B;
        text-align: center;
        opacity: 1;
    }

    .detail-search-block {
        white-space: nowrap;
        display: inline-flex;
    }

    .item-disabled {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #62678166;
        text-align: center;
        opacity: 1;
    }

    .hidden {
        display: none !important;
    }

    .btn-warning {
        background: #FCBF5E 0% 0% no-repeat padding-box !important;
        border-radius: 4px;
        opacity: 1;
    }

    .color-red {
        color: #F0524B;
    }

    .double-check .subtitle {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781;
        text-align: left;
        opacity: 1;
    }

    .double-check label {
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #62678166;
        text-align: left;
        opacity: 1;
    }

    .double-check hr {
        margin: 24px 0;
    }

    .double-check .row {
        margin-bottom: 16px !important;
    }

    .v-btn--outlined {
        border: thin solid rgba(98,103, 129,0.2) !important;
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
</style>

<script>
    import appMenu from 'components/admin/menu';
    import appLayout from 'components/admin/app_layout';
    import comTable from 'components/table'
    import editor from 'components/admin/forms/regist_editor'
    import comDialog from 'components/dialog'
    import comConfirm from 'components/confirm'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        // router,
        data: () => ({
            totalCount: 12,
            itemsPerPage: 2,
            totalVisible: 4,
            showSelect: true,
            selectVaccine: '',
            selectDistrict: '',
            selectVillage: '',
            selectInstitution: '',
            keyWord: '',
            items: [],  
            registId:[],
            title: '',
            //model: {
            //    regist_title: '',
            //    regist_type: '',
            //    regist_district: '',
            //    regist_village: '',
            //    regist_date: new Date().toISOString().substr(0, 10),
            //},
            result: {},
            viewerTitle:'',
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
            detailItems: [],
            detailTotalCount: 6,
            detailItemsPerPage: 2,
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
            artificialResult: '',
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
                regist_type: '',
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
                regist_review_date: '',///checkTime              
                regist_qualified: 423,
                regist_quota: 500,
                regist_unpassed: 45,
            },
        }),
        computed: {
            ...mapGetters('registration', [ 'getHeaders', 'getVaccines','getDistricts','getVillages','getInstitutions', 'getRegistrationHeaders']),
        },
        props: {

        },
        created: function () {
            var page = 1;
            this.getRegistForm(page);
        },
        methods: {
            ...mapActions('registration', [ 'loadRegistForm','loadDetailForm','getCompleteFile', 'getSignUpFile', 'getVaccinationFile', 'getAgreeFile','execCheck',
                'doubleCheck', 'registForm', 'updateRegist','removeRegist']),
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
                }).catch((e) => {
                    console.log(e);

                });
            },
            changePage: function (pager) {
                console.log(pager);
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
                this.viewerTitle = '確認新增報名資訊';
                this.$refs.registNewEditor.create(this.model);
                console.log('manualInput')
            },
            editItem: function (item) {
                Object.assign(this.model, item);
                
                this.title = '編輯報名表';
                this.viewerTitle = '編輯報名資訊確認';
                //this.$refs.registEditor.open(model);
                this.$refs.registEdit.open(item);
                console.log('edit', item);
            },
            fileImport: function () {
                this.$refs.fileViewer.open();
                console.log('fileImport')
            },
            formAction: function (result) {
                Object.assign(this.result, result);
                switch (result.action) {
                    case 'save':
                        this.$refs.registViewer.open();
                        console.log('save', result)
                        break;

                    case 'cancel':
                        console.log('cancel', result)
                        break;
                }
            },
            editFormAction: function (result) {
                Object.assign(this.result, result);
                switch (result.action) {
                    case 'save':
                        this.$refs.registEditViewer.open();
                        console.log('save', result)
                        break;

                    case 'cancel':
                        console.log('cancel', result)
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
                console.log('result', this.result)
                this.registForm(this.result);
                this.alertTitle = '110年五月份新冠疫苗施打預先報名';
                this.alertText = '成功建立報名表';
               
                
                this.$refs.registViewer.close();
                this.$refs.registAlert.open();
            },
            editSaveRegist: function () {
                console.log('updateresult', this.result)
                this.updateRegist(this.result)
                //this.registForm(this.result);
                this.alertTitle = '110年五月份新冠疫苗施打預先報名';
                this.alertText = '已成功變更報名表';
                this.$refs.registEditViewer.close();
                this.$refs.registAlert.open();
            },
            backToEdit: function () {
                this.$refs.registViewer.close();
                this.$refs.registEditor.show();
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
            viewItem: function (item) {
                console.log('view', item);
            },
            removeRightClick: function () {
                console.log('compSelectedItems', this.compSelectedItems);
                this.removeRegist(this.compSelectedItems);
                this.$bus.$emit(`confirm_show`, false);
            },
            removeItem: function (item) {
                this.compSelectedItems.splice(0);
                this.compSelectedItems.push(item);               
                this.$refs.removeAlert.open();          
                console.log('remove', item);
            },
            removeLeftClick: function () {
                this.$bus.$emit(`confirm_show`, false);
            },
            saveFile: function () {
                this.alertTitle = '上傳成功';
                this.alertText = '已成功建立報名表';
                this.$refs.fileViewer.close();
                this.$refs.successUploadAlert.open();
            },
            dowloadAgreeItem: function (item) {
                console.log('Agree', item);
            },
            dowloadRegistItem: function (item) {
                console.log('Regist', item);
            },
            dowloadList: function (item) {
                console.log('List', item);
            },
            handleRowClick: function (item) {
                console.log('item', item);
            },
            detailItem: function (item) {
                this.detailId = item.regist_id;//item.id;
                this.detailTitle = item.regist_title;//item.title;
                this.detailType = item.regist_type_name; //item.type;
                this.detailDistrict = item.regist_district_name; //item.district;
                this.detailVillage = item.regist_village_name; //item.village;
                this.detailInstitution = item.regist_institution_name;//item.institution;
                this.detailInstutionDistrict = item.regist_instution_district_name;   //item.instutionDistrict;
                this.detailStationTime = item.regist_station_date; //item.stationTime;
                this.detailRegistrationTime = item.regist_apply_start_date;   //item.registrationTime;
                this.detailCntQuota = item.regist_unpassed;   //item.cntQuota;
                this.detailTotalQuota = item.regist_quota;    //item.totalQuota;
                this.detailAbnormalCnt = item.regist_abnormalCnt;   //item.abnormalCnt;
                this.detailCheckTime = item.regist_review_date;   //item.checkTime;
                this.detailCheckPassCnt = item.regist_unpassed;//item.checkPassCnt;

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
                console.log(pager);
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
                    this.detailItems.splice(0);
                    r.datas.forEach((x) => {
                        var str = x.identity.substr(1, 5);
                        var code = x.identity.replace(str, '●●●●●');
                        x.identity = code;

                        if (['不合格', '已取消'].includes(x.result) || x.result.indexOf('不合格') !== -1) {
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
                comp.execCheck({ id: comp.detailId })
                    .then(function (result) {
                        switch (result.state) {
                            case 'not found':
                                comp.alertMessage = '不存在';
                                break;
                            default:
                                break;
                        }

                        if (comp.alertMessage !== '') {
                            comp.$bus.$emit('alert_show', true);
                            return;
                        }

                        comp.detailAbnormalCnt = result.cnt;
                    })
                    .catch(function () {
                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            downloadCompleteFile: function () {
                var comp = this;
                comp.alertMessage = '';
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

                        console.log(result);
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

                        console.log(result);
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

                        console.log(result);
                    })
                    .catch(function () {
                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            downloadAgreeFile: function (item) {
                var comp = this;
                comp.alertMessage = '';
                comp.getAgreeFile({ id: item.id })
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

                        console.log(result);
                    })
                    .catch(function () {
                        comp.alertMessage = '網站異常，請稍後再試';
                        comp.$bus.$emit('alert_show', true);
                    });
            },
            artificialAction: function (item) {
                this.artificialId = item.id;
                this.artificialName = item.name;
                this.artificialBirthday = item.birthday;
                this.artificialIdentity = item.identity;

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
                comp.doubleCheck({ id: comp.artificialId, result: comp.artificialResult })
                    .then(function (result) {
                        switch (result.state) {
                            case 'not found':
                                comp.alertMessage = '不存在';
                                break;
                            default:
                                break;
                        }

                        if (comp.alertMessage !== '') {
                            comp.$bus.$emit('alert_show', true);
                            return;
                        }

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

        },

        components: {
            appLayout, appMenu, comTable, editor, comDialog, comConfirm
        }
    };
</script>


