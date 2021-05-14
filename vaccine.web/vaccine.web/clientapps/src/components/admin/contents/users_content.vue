<template>
    <app-layout class="users-list">
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:content-title>
            人員管理
        </template>
        <template v-slot:app-content>
            <div id="app" class="table-list">
                <com-table ref-key="table" :headers="headers" :items="items" :total-count="totalCount" disabled-prop="disabled"
                           :items-per-page="itemsPerPage" :total-visible="totalVisible" :show-select="showSelect">
                    <template v-slot:item.quota>
                        <div>45/<span style="color:dimgrey">60</span></div>
                    </template>
                    <template v-slot:search-bar>
                        <v-row>
                            <v-col class="d-flex" cols="12" md="6" lg="6" sm="6" xs="6">
                                <v-select v-model="selectRole"
                                          :items="getRoleItems"
                                          item-text="state"
                                          item-value="id"
                                          label="全部角色"
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
                                          :menu-props="{ bottom: true, offsetY: true }"
                                          outlined
                                          clearable
                                          style="margin-right: 10px;min-width:150px"
                                          class="search-filter"
                                          return-object>
                                </v-select>
                                <v-text-field  class="w03" solo label='人員姓名/編號' v-model="selectUser"></v-text-field>

                                <v-btn icon color="#626781" style="top:10px" @click.stop="search()">
                                    <v-icon>fas fa-search</v-icon>
                                </v-btn>
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
                                <v-list-item @click.stop="importItem(item)">
                                    <v-list-item-action-text>
                                        <v-btn icon dense>
                                            <v-icon small>far fa-trash-alt</v-icon>
                                        </v-btn>檔案匯入
                                    </v-list-item-action-text>
                                </v-list-item>

                            </v-list>
                        </v-menu>
                    </template>

                    <template v-slot:item.modify="{item}">
                        <v-menu bottom right offset-y>
                            <template v-slot:activator="{ on }">
                                <v-btn dark icon v-on="on" @click.stop="">
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
                                        </v-btn>停用
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

            <com-dialog ref="dialogPanel" ref-key="userform" width="60%">
                <template v-slot:toolbar>
                    {{ formTitle }}
                </template>
                <template v-slot:content>
                    <v-form v-model="valid" ref="form">
                        <v-label><span class="star">姓名</span></v-label>
                        <v-text-field outlined class="w01" v-model="uName"></v-text-field>
                        <v-label><span class="star">帳號</span></v-label>
                        <v-text-field outlined class="w02" v-model="acc" v-bind:readonly="isReadOnly"></v-text-field>
                        <v-label><span class="star">email</span></v-label>
                        <v-text-field outlined class="w02" type='email' v-model="email" :rules="[rules.email.regex]"></v-text-field>
                        <v-label><span class="star">手機</span></v-label>
                        <v-text-field outlined class="w02" type="number" v-model="mbNo" :rules="[rules.mbNo.regex]"></v-text-field>
                        <v-label><span class="star">再次確認手機</span></v-label>
                        <v-text-field outlined class="w02" type="number" v-model="mbNo2" :rules="[rules.mbNo.regex]"></v-text-field>
                        <v-label><span class="star">服務單位</span></v-label>
                        <v-text-field outlined class="w02" v-model="unitName"></v-text-field>
                        <v-text-field type="hidden" v-model="editID"></v-text-field>
                    </v-form>
                </template>
                <template v-slot:action="{close}">
                    <v-btn @click="close">取消</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="saveform">儲存</v-btn>
                </template>
            </com-dialog>
            <com-confirm ref="alert" ref-key="alert" :right-click="alertClick">
                <template v-slot:confirm-image>
                    <v-img src="/alert_success.svg"></v-img>
                </template>
                <template v-slot:confirm-title>
                    {{ alertTitle }}
                </template>
                <template v-slot:confirm-text>
                    {{ alertMessage }}
                </template>
                <template v-slot:confirm-right-btn-text>
                    確認
                </template>
            </com-confirm>
            <com-confirm ref-key="confirm" :left-click="confirmLeftClick" :right-click="confirmRightClick">
                <template v-slot:confirm-image>
                    <v-img src="/alert_success.svg"></v-img>
                </template>
                <template v-slot:confirm-title>
                    {{ confirmTitle }}
                </template>
 
                <template v-slot:confirm-left-btn-text>
                    取消
                </template>
                <template v-slot:confirm-right-btn-text>
                    確認
                </template>


            </com-confirm>

        </template>


    </app-layout>
</template>


<style>
    .users-list .table-list {
        background: var(--w) 0% 0% no-repeat padding-box !important;
        background: #FFFFFF 0% 0% no-repeat padding-box !important;
        border: 1px solid #3642501A !important;
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
        width: 600px;
    }
    .users-list .w03 .v-input__control {
        min-width: 200px !important;
        min-height: 53px !important;
    }
   
   
    .users-list .v-list-item__title{
        color:black;
    }

</style>


<script>
    import appMenu from 'components/admin/menu'
    import appLayout from 'components/admin/app_layout'
    import comTable from 'components/table'
    import comDialog from 'components/dialog'
    import { mapGetters, mapActions } from 'vuex'
    import comConfirm from 'components/confirm'
    //import usersStore  from 'stores/admin/usersStore'

    export default {
        data: () => ({
            totalCount: 12,
            itemsPerPage: 30,
            totalVisible: 4,
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
            confirmTitle: "您確定要刪除嗎?",
            editID: "",
            isReadOnly: false,
            delitem:null,
            formTitle:"新增人員",
            headers: [
                //{ text: '', value: 'checked', align: 'start', sortable: false, flex: 3 },
                { text: '姓名', value: 'uName', align: 'start', sortable: true, flex: 6 },
                { text: '帳號', value: 'acc', sortable: false, flex: 6 },
                { text: 'email', value: 'email', sortable: false, flex: 6 },
                { text: '手機', value: 'mbNo', sortable: false, flex: 6 },
                { text: '服務單位', value: 'unitName', sortable: false, flex: 6 },
                { text: '', value: 'modify', sortable: false },
            ],
            items: [],
            selectRole: null,
            selectArea: null,
            selectPermission: null,
            selectUser: null,
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
                    regex: v => /^09\d{8}$/.test(v) || '手機號碼格式錯誤'
                }
            }
        }),
        computed: {
            ...mapGetters('users', ['getTableItems', 'getAreaItems', 'getRoleItems']),     
        },
        props: {

        },
        created: function () {
        },
        methods: {
            ...mapActions('users', ['searchUser', 'changeUser', 'removeUser']),

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
                
            },
            stopItem(item) {
                var comp = this;
                item.editMode = true;
                item.isEnable = 'false';
            
                comp.changeUser(item).then(function (result) {
                    if (result) {
                       
                        comp.$bus.$emit('alert_show', true);
                        comp.alertTitle = '停止成功';
                        comp.search();
                    } else {
                        console.log('停止失敗');
                        comp.alertTitle = '停止失敗';
                        comp.$bus.$emit('alert_show', true);
                    }

                }).catch(function () {
                    comp.alertMessage = '網站異常，請稍後再試';
                    comp.$bus.$emit('alert_show', true);
                });
            },
            removeItemConfirm(item) {
                this.delitem = item;
                this.$bus.$emit(`confirm_show`, true);
            },
            removeItem(item) {
                var comp = this;
                comp.removeUser(item.acc).then(function (result) {
                    if (result) {
                        console.log('刪除成功');
                        comp.alertMessage = '刪除成功';
                        comp.alertTitle = '刪除成功';
                        comp.search();
                    } else {
                        console.log('刪除失敗');
                        comp.alertTitle = '刪除失敗';
                        comp.alertMessage = '刪除失敗，請稍後再試';
                    }
                    comp.$bus.$emit('alert_show', true);
                }).catch(function () {
                    comp.alertMessage = '網站異常，請稍後再試';
                    comp.$bus.$emit('alert_show', true);
                });
            },
            search() {
                var filter = {};
                if (this.selectRole ) {
                    filter.userType = this.selectRole.id;
                }
                if (this.selectArea ) {
                    filter.zones = this.selectArea.id;
                }
                if (this.selectPermission) {
                    filter.isEnable = this.selectPermission.st;
                }
                if (this.selectUser) {
                    filter.uName = this.selectUser.id;
                }
                var comp = this;
                comp.alertMessage = '';
                comp.searchUser(filter).then(function (result) {
                    switch (result.state) {
                        case 'not_found':
                            comp.alertMessage = '查無資料';
                            break;
                        default:
                            break;
                    }
                    comp.totalCount = result.totalCount;
                    comp.items = [];
                    result.datas.forEach(f => comp.items.push(f))
                    if (comp.alertMessage !== '') {
                        comp.$bus.$emit('alert_show', true);
                        return;
                    }
                }).catch(function () {
                    comp.alertMessage = '網站異常，請稍後再試';
                    comp.$bus.$emit('alert_show', true);
                })
            },
            newItem () {
                this.$bus.$emit('userform_show', true);
                this.$set(this, "isReadOnly", false);
            },
            importItem () {
                alert('import');
            },
            close () {
            },
            saveform() {
                
                if (this.$refs.form.validate()) {
                    this.$set(this, "alertTitle", '儲存成功');
                    this.$refs.dialogPanel.close();
                } else if (this.mbNo != this.mbNo2) {
                    this.$bus.$emit("alert", true);
                    this.$set(this, "alertTitle", '儲存失敗');
                    this.$set(this, "alertMessage", '手機輸入不一致');
                } else {
                    this.$set(this, "alertTitle", '儲存失敗');
                    this.$set(this, "alertMessage", 'xxxxxxxxxxxx');
                }
                var comp = this;
                var setData = {
                    acc: this.acc,
                    uName: this.uName,
                    email: this.email,
                    mbNo: this.mbNo,
                    unitName: this.unitName,
                    userType: 2,//todo
                    zones: ['2', '3'], //todo
                    isEnable: 'true',//todo
                    stopit: false,
                    eidtMode: this.isReadOnly,
                };
                var msg = (this.isReadOnly) ? "更新" : "新增";

                comp.changeUser(setData).then(function (result) {
                    if (result) {
                        console.log('成功');
                        comp.alertMessage = msg + '成功';
                        comp.$set(comp, "alertTitle", msg + '成功');
                        comp.$bus.$emit('userform_show', false);
                        comp.search();
                    } else {
                        console.log('失敗');
                        comp.$set(comp, "alertTitle", msg+'失敗');
                        comp.alertMessage = msg+'失敗，請稍後再試';
                    }
                    comp.$bus.$emit('alert_show', true);
                }).catch(function () {
                    comp.$set(comp, "alertTitle", '操作失敗');
                    comp.alertMessage = '網站異常，請稍後再試';
                    comp.$bus.$emit('alert_show', true);
                });

            },
            alertClick () {
                this.$bus.$emit(`alert_show`, false);
            },
            confirmRightClick: function () {
                this.$bus.$emit(`confirm_show`, false);
                this.removeItem(this.delitem);
            },
            confirmLeftClick: function () {
                this.$bus.$emit(`confirm_show`, false);
            },
            clear() {
                this.$refs.form.reset()
            },
          
        },
        components: {
            appLayout, appMenu, comTable, comDialog, comConfirm
        }
    }

</script>