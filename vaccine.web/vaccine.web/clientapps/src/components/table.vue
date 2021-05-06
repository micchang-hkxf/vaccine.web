<template>
    <div>
        <v-row>
            <v-col class="d-flex" cols="12" md="6" lg="6" sm="6" xs="6">
                <v-select v-model="selectStatus"
                          :items="options"
                          item-text="state"
                          item-value="state"
                          label="所有疫苗類型"
                          :menu-props="{ bottom: true, offsetY: true }"
                          outlined
                          clearable
                          style="margin-right: 10px;min-width:150px"
                          return-object>
                </v-select>

                <v-select v-model="selectStatus"
                          :items="options"
                          item-text="state"
                          item-value="state"
                          label="所有疫苗類型"
                          :menu-props="{ bottom: true, offsetY: true }"
                          outlined
                          clearable
                          style="margin-right: 10px;min-width:150px"
                          class="search-filter"
                          return-object>
                </v-select>
                <v-select v-model="selectStatus"
                          :items="options"
                          item-text="state"
                          item-value="state"
                          label="所有疫苗類型"
                          :menu-props="{ bottom: true, offsetY: true }"
                          outlined
                          clearable
                          style="margin-right: 10px;min-width:150px"
                          class="search-filter"
                          return-object>
                </v-select>
                <v-select v-model="selectStatus"
                          :items="options"
                          item-text="state"
                          item-value="state"
                          label="所有疫苗類型"
                          :menu-props="{ bottom: true, offsetY: true }"
                          outlined
                          clearable
                          style="margin-right: 10px;min-width:150px"
                          class="search-filter"
                          return-object>
                </v-select>
                <v-select v-model="selectStatus"
                          :items="options"
                          item-text="state"
                          item-value="state"
                          label="所有疫苗類型"
                          :menu-props="{ bottom: true, offsetY: true }"
                          outlined
                          clearable
                          style="margin-right: 10px;min-width:150px"
                          class="search-filter"
                          return-object>
                </v-select>     
               
                <v-btn icon color="#626781" style="top:10px">
                    <v-icon>fas fa-search</v-icon>
                </v-btn>
            </v-col>
          
        </v-row>

        <v-data-table 
                      :headers="computedHeaders"
                      :items="items"
                      :page.sync="page"
                      :items-per-page="itemsPerPage"    
                      class="elevation-1"
                      hide-default-footer
                      @page-count="computedPageCount = $event">

            <template v-for="(header,index) in computedHeaders" v-slot:[header.templateName]="{item}">

                <span :key="index" v-if="$slots[header.templateName]==null"> {{item[header.value]}}</span>

                <slot :name="header.templateName" v-if="$slots[header.templateName]!=null" :item="item"></slot>
            </template>
            <template v-slot:item.checked="{ item }">
                <v-checkbox v-model="item.checked" :ripple="false"></v-checkbox>
            </template>
            <template v-slot:top>
               
                <v-toolbar flat color="white">
                    <v-checkbox v-model="selected"  :ripple="false" hide-details></v-checkbox>
                    <v-btn color="#F0524B" :disabled="selected.length<=0" @click="deleteSelected(selected)">
                        <span style="color:white">刪除選取項目({{selected.length}})</span>
                        <span style="color:white">刪除選取項目{{selectedItems}}89{{selectedItems.length}}</span>
                    </v-btn>                                                             
                    <v-spacer></v-spacer>

                    <v-menu bottom right offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" color="#626781" @click.stop="">
                                <v-icon left color='white' size="15">fas fa-plus</v-icon>
                                <span style="color:white">新增報名表</span>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click.stop="editItem(item)">
                                <v-list-item-action-text>
                                    選擇新增方式:
                                </v-list-item-action-text>
                            </v-list-item>
                            <v-list-item @click.stop="editItem(item)">
                                <v-list-item-action-text>
                                    <v-btn icon dense>
                                        <v-icon small>far fa-edit</v-icon>
                                    </v-btn>手動輸入
                                </v-list-item-action-text>
                            </v-list-item>
                            <v-list-item @click.stop="editItem(item)">
                                <v-list-item-action-text>
                                    <v-btn icon dense>
                                        <v-icon small>far fa-trash-alt</v-icon>
                                    </v-btn>檔案匯入
                                </v-list-item-action-text>
                            </v-list-item>

                        </v-list>
                    </v-menu>




                </v-toolbar>


            </template>

            <template v-slot:item.modify="{ item }">
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
                        <v-list-item @click.stop="editItem(item)">
                            <v-list-item-action-text>
                                <v-btn icon dense>
                                    <v-icon small>far fa-trash-alt</v-icon>
                                </v-btn>刪除
                            </v-list-item-action-text>
                        </v-list-item>
                        <v-list-item @click.stop="editItem(item)">
                            <v-list-item-action-text>
                                <v-btn icon dense>
                                    <v-icon small>mdi-arrow-down</v-icon>
                                </v-btn>完整下載接種同意書
                            </v-list-item-action-text>
                        </v-list-item>
                        <v-list-item @click.stop="editItem(item)">
                            <v-list-item-action-text>
                                <v-btn icon dense>
                                    <v-icon small>mdi-arrow-down</v-icon>
                                </v-btn>下載報名清冊
                            </v-list-item-action-text>
                        </v-list-item>
                        <v-list-item @click.stop="editItem(item)">
                            <v-list-item-action-text>
                                <v-btn icon dense>
                                    <v-icon small>mdi-arrow-down</v-icon>
                                </v-btn>下載施打清冊
                            </v-list-item-action-text>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>


        </v-data-table>

        <div class="text-center pt-2">
            <v-pagination v-model="page"
                          :length="computedPageCount"
                          :total-visible="totalVisible"
                          color="white"></v-pagination>

        </div>
    </div>
</template>
  

<style>
    .row, .col {
        margin: 0px !important;
        padding: 0px !important;
        flex-wrap: nowrap !important;
    }

    .v-pagination__navigation, .v-pagination__item {
        box-shadow: none !important;
    }
    .theme--light.v-pagination .v-pagination__item--active {
        color: #626781 !important;
    }
   

</style>


<script>
    export default {
        props: ['refKey', 'headers', 'items', 'totalCount', 'itemsPerPage','totalVisible'],
        data: () => ({
            page:1,
            isShow: false,
            selected: [], 
            singleSelect: true,
            selectStatus: '',
            options: [
                { state: '進行中', id: 'geton' },
                { state: '即將開始(已預先開放)', id: 'abouttostart' },
                { state: '尚未開始', id: 'notyetstart' },
                { state: '已結束', id: 'history' },
            ],
        }),
        computed: {
            computedHeaders: function () {
                return this.headers.map((x) => {
                    return {
                        ...x,
                        templateName: 'item.'+x.value
                    }
                   
                })
            },
            computedPageCount: function () {              
                return Math.ceil(this.totalCount / this.itemsPerPage);
            },
            selectedItems: function () {
                return this.items.filter((x) => x.checked);
            }
        },
        created: function () {
            var comp = this;
            this.$bus.$on(`${comp.refKey}_show`, function (isShow) {
                comp.$set(comp, "isShow", isShow);
            });
            this.$bus.$on(`${comp.refKey}_switch`, function () {
                comp.$set(comp, "isShow", !comp.isShow);
            });
        },
        methods: {
            editItem: function () {
                alert('test');
            },
            deleteSelected: function (item) {
                console.log('selected', item);
            }
        },
        components: {

        }
    }


</script>