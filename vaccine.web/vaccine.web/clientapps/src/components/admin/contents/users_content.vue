<template>
    <app-layout class="users-list">
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:content-title>
            人員管理
        </template>
        <template v-slot:app-content>
            <com-loading ref-key="type1"></com-loading>
            <div id="app" class="table-list">
                <com-table ref="userTable" ref-key="table" :headers="headers" :items="items" :total-count="totalCount" disabled-prop="disabled"
                           :items-per-page="itemsPerPage" :total-visible="totalVisible" :show-select="showSelect"
                           :change-page="changePage" style="margin-left: 15px;padding-top: 15px;margin-right: 15px;">
                    <template v-slot:item.isEnable="items">
                        <div>{{   items.item.isEnable.toString()=='true' ? "啟用" : "停用" }}</div>
                    </template>
                    <template v-slot:item.area="items">
                        <span>{{  getZonesData(items.item) }}</span
                    </template>
                    <template v-slot:search-bar>
                        <v-row>
                            <v-col class="d-flex  justify-content-end" cols="12" md="6" lg="6" sm="6" xs="6">
                                <v-select v-model="selectRole"
                                          :items="getRoleItems"
                                          item-text="state"
                                          item-value="id"
                                          label="全部角色"
                                          dense
                                          :menu-props="{ bottom: true, offsetY: true }"
                                          outlined
                                          clearable
                                          style="margin-right: 10px;min-width:150px"
                                          return-object>
                                </v-select>

                                <v-select v-model="selectArea"
                                          :items="getAreaItems"
                                          item-text="state"
                                          item-value="id"
                                          label="有/無管轄區域"
                                          dense
                                          :menu-props="{ bottom: true, offsetY: true }"
                                          outlined
                                          clearable
                                          style="margin-right: 10px;min-width:150px"
                                          class="search-filter"
                                          return-object>
                                </v-select>
                                <v-select v-model="selectPermission"
                                          :items="permissionStatus"
                                          item-text="state"
                                          item-value="st"
                                          label="權限啟用/停用"
                                          dense
                                          :menu-props="{ bottom: true, offsetY: true }"
                                          outlined
                                          clearable
                                          style="margin-right: 10px;min-width:150px"
                                          class="search-filter"
                                          return-object>
                                </v-select>
                                <v-text-field class="w03"
                                              label='人員姓名/編號'
                                              dense
                                              v-model.trim="selectUser"
                                              outlined>
                                </v-text-field>

                                <v-btn color="#626781" icon style="padding-left:2px;top:3px" @click.stop="search(1)">
                                    <v-icon size="20">fas fa-search</v-icon>
                                </v-btn>
                                <v-file-input accept=".csv" style="display:none" ref="importfile">
                                </v-file-input>
                            </v-col>

                        </v-row>


                    </template>

                    <template v-slot:toolbar-action={}>
                        <!--<v-checkbox :ripple="false" hide-details @click="switchSelect"></v-checkbox>
                <v-btn color="#F0524B" :disabled="selectedItems.length<=0 " @click="deleteSelected(selected)">
                    <span style="color:white">刪除選取項目{{selectedItems.length}}</span>
                </v-btn>
                -->
                        <v-spacer></v-spacer>

                        <v-menu bottom right offset-y>
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" color="#626781" @click.stop="">
                                    <v-icon left color='white' size="15">fas fa-plus</v-icon>
                                    <span style="color:white">新增人員</span>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-action-text>
                                        選擇新增方式:
                                    </v-list-item-action-text>
                                </v-list-item>
                                <v-list-item @click.stop="newItem()">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>far fa-edit</v-icon>
                                        </v-btn>手動輸入
                                    </v-list-item-action-text>
                                </v-list-item>
                                <!--<v-list-item @click.stop="importItem(item)">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>far fa-trash-alt</v-icon>
                                        </v-btn>檔案匯入
                                    </v-list-item-action-text>
                                </v-list-item>-->

                            </v-list>
                        </v-menu>
                    </template>

                    <template v-slot:item.modify="{item}">

                        <v-menu bottom right offset-y>
                            <template v-slot:activator="{ on }">
                                <v-btn dark icon v-on="on" @click.stop="showOptMenu(item)">
                                    <v-icon color='#858585'>mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item @click.stop="editItem(item)">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>far fa-edit</v-icon>
                                        </v-btn>編輯
                                    </v-list-item-action-text>
                                </v-list-item>
                                <v-list-item @click.stop="stopItem(item)">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>far fa-eye-slash</v-icon>
                                        </v-btn>{{ changeStatus }}
                                    </v-list-item-action-text>
                                </v-list-item>
                                <v-list-item @click.stop="removeItemConfirm(item)">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>far fa-trash-alt</v-icon>
                                        </v-btn>刪除
                                    </v-list-item-action-text>
                                </v-list-item>

                            </v-list>
                        </v-menu>

                    </template>
                </com-table>
            </div>

            <com-dialog ref="dialogPanel" ref-key="userform" width="40%">
                <template v-slot:toolbar>
                    {{ formTitle }}
                </template>
                <template v-slot:content>
                    <v-form v-model="valid" ref="form">
                        <v-label><span class="star">姓名</span></v-label>
                        <v-text-field dense outlined placeholder="請輸入姓名" v-model.trim="uName" :rules="[v => !!v || '必填']"></v-text-field>
                        <v-label><span class="star">帳號</span></v-label>
                        <v-text-field dense outlined class="w02" placeholder="請輸入帳號" v-model="acc" v-bind:readonly="isReadOnly" :rules="[v => !!v || '必填']"></v-text-field>
                        <!--<v-label><span class="star">email</span></v-label>
                <v-text-field outlined class="w02" type='email' v-model="email" :rules="[rules.email.regex]"></v-text-field>-->
                        <v-label><span class="star">手機</span></v-label>
                        <v-text-field dense outlined class="w02" placeholder="請輸入手機號碼" type="number" v-model="mbNo" :rules="[rules.mbNo.regex]"></v-text-field>
                        <v-label><span class="star">再次確認手機</span></v-label>
                        <v-text-field dense outlined class="w02" placeholder="再次輸入手機號碼" type="number" v-model="mbNo2" :rules="[rules.mbNo.regex]"></v-text-field>
                        <v-label><span class="star">服務單位</span></v-label>
                        <v-text-field dense outlined class="w01" placeholder="請輸入單位名稱" v-model="unitName" :rules="[v => !!v || '必填']"></v-text-field>
                        <hr noshade size="1">
                        <div style="height:20px"></div>
                        <v-label><span class="star">角色設定</span></v-label>
                        <v-select v-model="setRole"
                                  :items="getRoleItems"
                                  item-text="state"
                                  item-value="id"
                                  dense
                                  :menu-props="{ bottom: true, offsetY: true }"
                                  outlined
                                  clearable
                                  required
                                  :rules="rules.select"
                                  style="margin-right: 10px;min-width:150px"
                                  class="search-filter w01"
                                  return-object>
                        </v-select>
                        <v-label><span class="star">管理區域</span></v-label>
                        <v-select v-model="setArea"
                                  :items="getAllAreaItems"
                                  item-text="state"
                                  item-value="id"
                                  dense
                                  :menu-props="{ bottom: true, offsetY: true }"
                                  outlined
                                  clearable
                                  required
                                  :rules="rules.select2"
                                  style="margin-right: 10px;min-width:150px"
                                  class="search-filter w01"
                                  return-object>
                        </v-select>
                        <v-checkbox v-model="setEnable" label="啟用"></v-checkbox>
                        <v-text-field type="hidden" v-model="editID"></v-text-field>
                    </v-form>
                </template>
                <template v-slot:action="{close}">
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-btn @click="close" outlined>取消</v-btn>
                    <v-btn @click="createConfirm" color="primary" style="margin-left:20px">儲存</v-btn>
                </template>
            </com-dialog>
            <com-confirm ref="alert" ref-key="alert" :right-click="alertClick" :right-color="alertrightcolor" right-outlined="">
                <template v-slot:confirm-image>
                    <v-img v-bind:src="alertImgSrc"></v-img>
                </template>
                <template v-slot:confirm-title>
                    <span class="alertTitle">{{ alertTitle }}</span>
                </template>
                <template v-slot:confirm-text>
                    {{ alertMessage }}
                </template>
                <template v-slot:confirm-right-btn-text>
                    確認
                </template>
            </com-confirm>
            <com-confirm ref="error" ref-key="error" :right-click="alertClick" right-color="#626781" right-outlined="">
                <template v-slot:confirm-image>
                    <v-img v-bind:src="errorImgSrc"></v-img>
                </template>
                <template v-slot:confirm-title>
                    <span class="alertTitle">{{ errorTitle }}</span>
                </template>
                <template v-slot:confirm-text>
                    {{ errorMessage }}
                </template>
                <template v-slot:confirm-right-btn-text>
                    確認
                </template>
            </com-confirm>
            <com-confirm ref="duplicatAlert" ref-key="duplicatAlert" :right-click="backClick" rightColor="#626781">
                <template v-slot:confirm-image>
                    <v-img v-bind:src="alertImgSrc"></v-img>
                </template>
                <template v-slot:confirm-text>
                    此帳號已註冊，
                    請重新輸入
                </template>
                <template v-slot:confirm-right-btn-text>
                    返回
                </template>
            </com-confirm>
            <com-confirm ref-key="confirmAction" :left-click="confirmLeftClick" :right-click="confirmRightClick" rightColor="#F0524B" leftColor="#626781">
                <template v-slot:confirm-image>
                    <v-img v-bind:src="confirmImgSrc"></v-img>
                </template>
                <template v-slot:confirm-title>
                    {{ confirmTitle }}
                </template>
                <template v-slot:confirm-text>
                    {{ confirmMessage }}
                </template>
                <template outlined v-slot:confirm-left-btn-text>
                    <font color="#ffffff">取消</font>
                </template>
                <template v-slot:confirm-right-btn-text>
                    確認
                </template>
            </com-confirm>

            <com-dialog ref="formSaveConfirmPanel" ref-key="formSaveConfirm" width="40%">
                <template v-slot:toolbar>
                    {{ fromSaveConfirmTitle }}
                </template>
                <template v-slot:content>
                    {{  fromSaveConfirmMessage }}
                    <br>
                    <br>
                    <hr noshade size="1">

                    <div class="showname">姓名</div>
                    {{ uName }}
                    <div class="showname">帳號</div>
                    {{ acc }}
                    <div class="showname">手機</div>
                    {{ mbNo }}

                    <div class="showname">服務單位</div>
                    {{ unitName }}
                    <br>
                    <br>
                    <hr noshade size="1">

                    <div class="showname">角色設定</div>
                    {{ setRoleState }}
                    <div class="showname">管理區域 </div>
                    {{ setAreaState }}
                    <div class="showname">啟用狀態 </div>
                    {{ setEnableState }}
                    <br>
                    <br>
                    <hr noshade size="1">
                    <br>
                </template>
                <template v-slot:action="{close}">
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-btn @click="close" outlined>修改</v-btn>
                    <v-btn @click="saveform" color="primary" style="margin-left:20px">確定</v-btn>
                </template>
            </com-dialog>
        </template>
        

    </app-layout>
</template>


<style>
    .users-list .table-list {
        background: var(--w) 0% 0% no-repeat padding-box !important;
        background: #FFFFFF 0% 0% no-repeat padding-box !important;
       
        opacity: 1 !important;
        margin: 24px !important;
    }
    .users-list .app-content {
        background: #F2F3F7 !important;
    }
    .users-list .w01 {
        width:300px;
    }
    .users-list .star:after {
        color: red;
        content: "*";
    }
    .users-list .w02 {
        /*width: 600px;*/
    }

    .users-list .w03 .v-input__control {
        min-width: 170px !important;
        min-height: 53px !important;
    }
    .users-list .v-list-item__title{
        color:black;
    }
    .users-list .d-flex {
        padding: 20px 00px 0px 0px !important;
    }
    .users-list .dialog-content {
        padding-bottom: 0px !important;
    }
    .users-list .v-text-field {
        padding-top: 0px !important;
        margin-top: 0px !important;
    }
    .users-list .showname {
        color: #62678166 !important;
        padding-top: 15px !important;
    }
    /*.users-list .v-btn:not(.v-btn--round).v-size--default {
        min-width: 200px !important;
    }
    .users-list .v-btn:not(.v-btn--round).v-size--large {
        min-width: 2000px !important;
    }*/
     .userlist .alertTitle{
        font-size:8px;

    }



</style>


<script>
    import appMenu from 'components/admin/menu'
    import appLayout from 'components/admin/app_layout'
    import comTable from 'components/table'
    import comDialog from 'components/dialog'
    import { mapGetters, mapActions } from 'vuex'
    import comConfirm from 'components/confirm'
    import comLoading from 'components/loading'


    export default {
        data: () => ({
            totalCount: 0,
            itemsPerPage: 5,
            totalVisible: 8,
            inpage:1,
            uName: null,
            acc: null,
            email: null,
            mbNo: null,
            mbNo2: null,
            unitName: null,
            showSelect: false,
            valid: true,
            alertMessage: "",
            alertTitle: "",
            errorMessage: "",
            errorTitle: "",
            confirmTitle: "刪除人員?",
            confirmMessage:"",
            editID: "",
            isReadOnly: false,
            delitem:null,
            formTitle: "新增人員",
            confirmImgSrc: "",
            alertImgSrc: "",
            errorImgSrc: "",
            successIcon: '/alert_success.svg', 
            warningIcon: '/alert_warning.svg',
            setRole: null,
            setArea: null,
            setEnable: null,
            setRoleState: "",
            setAreaState: "",
            setEnableState: "",
            itle: "",
            fromSaveConfirmMessage: "",
            fromSaveConfirmTitle: "",
            changeStatus: null,
            alertrightcolor:'#736DB9',
            headers: [
                //{ text: '', value: 'checked', align: 'start', sortable: false, flex: 3 },
                { text: '姓名', value: 'uName', align: 'start', sortable: true, flex: 6, width: '10%' },
                { text: '帳號', value: 'acc', sortable: false, flex: 6 },
                //{ text: 'email', value: 'email', sortable: false, flex: 6 },
                { text: '角色', value: 'userTypeDesc', sortable: false, flex: 6},
                { text: '管轄區域', value: 'area', sortable: false, flex: 6 },
                { text: '權限狀態', value: 'isEnable', sortable: false, flex: 6},
                { text: '密碼更改時間', value: 'pdExpTime', sortable: false, flex: 6 },
                { text: '最後存取時間', value: 'lastAccessTime', sortable: false, flex: 6 },
                //{ text: '手機', value: 'mbNo', sortable: false, flex: 6 },
                //{ text: '服務單位', value: 'unitName', sortable: false, flex: 6 },
                { text: '', value: 'modify', sortable: false, width: '3%' },
            ],
            items: [],
            selectRole: null,
            selectArea: null,
            selectPermission: null,
            selectUser: "",
            createConfirmMessage:"",
            permissionStatus: [
                { state: '啟用', st: 'true' },
                { state: '停用', st: 'false' },
              
            ],
            rules: {
                email: {
                    required: v => !!v || '欄位必填.',
                    regex: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail 格式錯誤'
                },
                mbNo: {
                    required: v => !!v || '欄位必填.',
                    regex: v => /^09\d{8}$/.test(v) || '輸入十位半形數字'
                },
                select: [(v) => !!v || "請選擇角色"],
                select2: [(v) => !!v || "請選擇區域"],
            }
        }),
        computed: {
            ...mapGetters('users', ['getTableItems', 'getAreaItems', 'getAllAreaItems', 'getRoleItems', 'getRoleListById', 'getAreaListById']),
        },
        props: {

        },
        mounted(){
            this.search(1);
        },
        created() {
            this.getAreaList();
        },
        methods: {
            ...mapActions('users', ['searchUser', 'changeUser', 'removeUser', 'getAreaList']),

            editItem(item) {
                this.formTitle = "修改人員資料";
                this.$bus.$emit('userform_show', true);
                this.$set(this, "uName", item.uName);
                this.$set(this, "acc", item.acc);
                this.$set(this, "mbNo", item.mbNo);
                this.$set(this, "mbNo2", item.mbNo);
                this.$set(this, "email", item.email);
                this.$set(this, "unitName", item.unitName);
                this.$set(this, "isReadOnly", true);
               
                var r = this.$store.getters["users/getRoleListById"](item.userType).state;
                //var a = this.$store.getters["users/getAreaListById"](item.zones[0].cityId).state
                this.$set(this, "setRole", { id: item.userType ,state:r});
                this.$set(this, "setArea", { id: item.zones[0].data[0].distId, state: item.zones[0].data[0].distName });
                this.$set(this, "setEnable", item.isEnable.toString() == 'true');
        
               // this.setRole = { id: item.userType  };
               // this.setArea = { id: item.zones[0] };//multiple todo
             
       
                this.fromSaveConfirmTitle = "確認人員更新資訊";
                this.fromSaveConfirmMessage = " 請確認內容無誤後點選「確定」完成更新";
            },
            stopItem(item) {
                var comp = this;
                item.editMode = true;
             
                item.isEnable = (item.isEnable.toString() == 'true') ? 'false' : 'true';
                item.zones = ["200", (item.zones[0].data[0]) ? item.zones[0].data[0].distId:""];//todo
                comp.alertImgSrc = comp.warningIcon;
                comp.changeUser(item).then(function (result) {
                  
                    if (result) {
                      
                        comp.alertImgSrc = comp.successIcon;
                        comp.$bus.$emit('alert_show', true);
                        comp.alertTitle = comp.changeStatus+'成功';
                        comp.search(comp.inpage);
                    } else {
                     
                        comp.alertTitle = comp.changeStatus+'失敗';
                        this.alertImgSrc = this.alertIcon;
                        comp.$bus.$emit('alert_show', true);

                    }
   
                }).catch(function () {
                    comp.errorImgSrc = comp.alertIcon;
                    comp.errorMessage = '處理錯誤，請重新嘗試';
                    comp.$bus.$emit('error_show', true);
                });
            },
            removeItemConfirm(item) {
                this.delitem = item;
                this.confirmImgSrc = this.warningIcon;
                this.confirmMessage = item.uName;
                this.$bus.$emit(`confirmAction_show`, true);
            },
            removeItem(item) {
                var comp = this;
                comp.alertImgSrc = comp.warningIcon;
                comp.removeUser(item.acc).then(function (result) {
                    if (result) {
                        //console.log('刪除成功');
                        //comp.alertMessage = '刪除成功';
                        comp.alertTitle = '刪除成功';
                        comp.alertImgSrc = comp.successIcon;
                        comp.search(1);
                    } else {
                        //console.log('刪除失敗');
                        comp.alertTitle = '刪除失敗';
                        //comp.alertMessage = '刪除失敗，請稍後再試';
                    }
                    comp.$bus.$emit('alert_show', true);
                }).catch(function () {

                    comp.errorMessage = '處理錯誤，請重新嘗試';
                    comp.errorImgSrc = comp.warningIcon;
                    comp.$bus.$emit('error_show', true);
                });
            },
            search(page) {
                var filter = {
                    page: page,
                    rows: this.itemsPerPage,
                };
                
                if (this.selectRole) {
                    filter.userType = this.selectRole.id;
                }
                if (this.selectArea) {
                    //filter.zones = this.selectArea.id;
                    filter.zones = this.selectArea.state;
                }
                if (this.selectPermission) {
                    filter.isEnable = this.selectPermission.st;
                }
                if (this.selectUser) {
                    filter.uName = this.selectUser;
                }
                var comp = this;
                comp.$bus.$emit('type1_show4', "資料處理中...");
                comp.searchUser(filter).then(function (result) {
                    var finddata = true;
                    switch (result.state) {
                        case 'not_found':
                            comp.alertTitle = '查無資料';
                            finddata = false;
                            break;
                        default:
                            break;
                    }
                    comp.$bus.$emit('type1_hide4');
                    comp.totalCount = result.totalCount;
                    comp.items = [];
                  
                    result.datas.forEach(f => comp.items.push(f))
                    comp.$refs.userTable.gofrontPage(page);
                    if (!finddata ) {
                        comp.$bus.$emit('alert_show', true);
                        return;
                    }
                   
    
                }).catch(function () {
                    comp.errorTitle = '處理錯誤，請重新嘗試';
                    comp.errorImgSrc = comp.warningIcon;
                    comp.$bus.$emit('error_show', true);
                })
            },
            newItem() {

                this.$set(this, "uName", '');
                this.$set(this, "acc", '');
                this.$set(this, "mbNo", '');
                this.$set(this, "mbNo2", '');
                this.$set(this, "email", '');
                this.$set(this, "unitName", '');
      

                this.$bus.$emit('userform_show', true);
                this.$set(this, "isReadOnly", false);
                this.fromSaveConfirmTitle = "確認人員新增資訊";
                this.fromSaveConfirmMessage = " 請確認內容無誤後點選「確定」完成新增";
                //this.setRole = { id: 2 ,state:"轄區管理員"};
                //this.setArea = { id: 1, state: "松山區" };
                this.$set(this, "setRole", { id: 1, state: "轄區管理員" });
                this.$set(this, "setArea", { id: "2001", state: "松山區" });
                

            },
            importItem() {
                this.$refs.importfile.$refs.input.click();
            },
            close() {
            },
            backClick() {
                this.$bus.$emit('duplicatAlert_show', false);
                this.$bus.$emit('formSaveConfirm_show', false);
            },
            createConfirm() {

                if (this.$refs.form.validate()) {
                    //this.$set(this, "alertTitle", '儲存成功');
                    console.log("儲存成功");
                    //this.$refs.dialogPanel.close();
                } else if (this.mbNo != this.mbNo2) {
                    this.$bus.$emit("alert_show", true);
                    this.alertImgSrc = this.warningIcon;
                    this.$set(this, "alertTitle", '兩次輸入號碼不一致');
                    //this.$set(this, "alertMessage", '兩次輸入號碼不一致');
                    return;
                } else {
                    //this.$bus.$emit("alert_show", true);
                    //this.$set(this, "alertTitle", '儲存失敗');
    
                    return;
                }

                this.confirmImgSrc = this.warningIcon;
   
                this.$bus.$emit('formSaveConfirm_show', true);
                this.setRoleState = this.setRole.state;
                this.setAreaState = this.setArea.state;
                this.setEnableState = this.setEnable.toString()=="true" ? "啟用" : "停用";
            },
            saveform() {
   
                var comp = this;
                var setData = {
                    acc: this.acc,
                    uName: this.uName,
                    email: this.email,
                    mbNo: this.mbNo,
                    unitName: this.unitName,
                    userType: this.setRole.id,
                    userTypeDesc: this.setRole.state,
                    //zones: [this.setArea], //multi todo
                    //zones: [this.setArea.id], 
                    lastAccessTime: "2021-05-20 08:26:43",
                    pdExpTime: "2021-05-20 08:26:43",
                    zones: ["200", this.setArea.id.toString()],

                    isEnable: this.setEnable.toString(),
                    stopit: false,
                    editMode: this.isReadOnly,
                };
        
                var msg = (this.isReadOnly) ? "更新" : "建立";
                comp.alertImgSrc = comp.warningIcon;
  
                comp.$bus.$emit('type1_show4', "資料處理中...");
                var roleDesc = comp.setRole.state;
                if (this.setRole.id > 0) {
                    roleDesc += "-" + comp.setArea.state;
                }
                var saveMsg = comp.uName + "\n" + comp.acc + "\n" + roleDesc+"\n";
                comp.changeUser(setData).then(function (result) {

                    if (result.datas.status == "201") {
                        comp.$bus.$emit('duplicatAlert_show', true);
                    } else { 
                        comp.$set(comp, "alertTitle", saveMsg + '人員' + msg + '成功');
                        comp.alertImgSrc = comp.successIcon;
                        comp.$bus.$emit('userform_show', false);
                        comp.$bus.$emit('formSaveConfirm_show', false);
                        comp.$bus.$emit('alert_show', true);
                        comp.search(1);
                    }

                    comp.$bus.$emit('type1_hide4');
                   
                }).catch(function (r) {
                    console.log(r.datas.response.status);
                    comp.$bus.$emit('type1_hide4');
                    comp.errorImgSrc = comp.warningIcon;
                    comp.$set(comp, "errorTitle", '處理錯誤，請重新嘗試');
                    comp.$bus.$emit('error_show', true);
                });

            },
            alertClick () {
                this.$bus.$emit(`alert_show`, false);
            },
            confirmRightClick: function () {
                this.$bus.$emit(`confirmAction_show` ,false);
                this.removeItem(this.delitem);
            },
            confirmLeftClick: function () {
                this.$bus.$emit(`confirmAction_show`, false);
            },
            clear() {
                this.$refs.form.reset()
            },
            showOptMenu(item) {
                this.$set(this, "changeStatus", (item.isEnable.toString()=='true') ? "停用" : "啟用");

            },
            getZonesData(item) {
                //暫時只有北市
                var z = [];
                item.zones[0].data.forEach(f => z.push(f.distName))
                return z.join(",");
            },
            changePage: function (pager) {
                console.log(pager);
                this.inpage = pager.page;
                this.search(pager.page);
            },
          
        },
        components: {
            appLayout, appMenu, comTable, comDialog, comConfirm, comLoading
        }
    }

</script>