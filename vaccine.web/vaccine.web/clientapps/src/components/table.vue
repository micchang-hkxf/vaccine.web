<template>
    <v-data-table v-model="selected"
                  :headers="computedHeaders"
                  :items="items"
                  :item-key="itemKey"
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  :show-select="showSelect"
                  :selectable-key="(!!selectKey)?selectKey:'canSelect'"
                  :item-class="rowClass"
                  :single-select="singleSelect"
                  class="elevation-0"
                  :custom-sort="customSort"
                  hide-default-footer>

        <template v-for="(header,index) in computedHeaders" v-slot:[header.headerTemplateName]>
            <span class="table-header-contant" :key="`table-header-${index}`">

                <span :key="index" v-if="!header.hasHeaderTemplate"> {{header.text}}</span>

                <slot :name="header.headerTemplateName" v-if="header.hasHeaderTemplate" :header="header"></slot>
            </span>

        </template>


        <template v-for="(header,index) in computedHeaders" v-slot:[header.templateName]="{item}">

            <span :key="`table-content-${index}`" :class="`table-content-field ${header.templateName.replaceAll('item.','').replaceAll('_','-')}`">

                <span :key="index" v-if="!header.hasTemplate"> {{item[header.value]}}</span>

                <slot :name="header.templateName" v-if="header.hasTemplate" :item="item"></slot>
            </span>

        </template>
        <!--<template v-slot:item.checked="{ item }">
        <v-checkbox v-model="item.checked" :ripple="false"></v-checkbox>
    </template>-->
        <template v-slot:top>

            <template>
                <div class="search-bar">
                    <slot name="search-bar" v-if="hasSlot('search-bar')"></slot>
                </div>
            </template>

            <v-toolbar flat color="white" v-if="hasSlot('toolbar-action')">
                <slot name="toolbar-action" :selectedItems="selected" :selectAll="selectAll"
                      :deleteSelected="deleteSelected" :switchSelect="switchSelect" :selected="selected"></slot>
            </v-toolbar>


        </template>


        <template v-slot:footer>

            <div class="text-center pt-2">
                <v-pagination v-model="page"
                              :length="computedPageCount"
                              :total-visible="totalVisible"
                              color="white"></v-pagination>
            </div>

        </template>

    </v-data-table>

</template>
  
<style scoped>

    .row, .col {
    }
</style>
<style> 

    .table-header-contant {
        white-space: nowrap;
    }
    .v-data-table__wrapper, .table-header-contant {
        text-align: center;
        font: normal normal normal 16px/24px Noto Sans T Chinese;
        letter-spacing: 0px;
        color: #626781 !important;
        opacity: 1;
    }
    /*.v-data-table__wrapper td {
        max-width: 160px !important;
        overflow: hidden;
        text-overflow: ellipsis !important;
        white-space: pre !important;
    }*/
    .v-data-table__wrapper td before {
        content: '&nbsp;';
        visibility: hidden;
    }
    .v-pagination__navigation, .v-pagination__item {
        box-shadow: none !important;
        opacity: .4;
    }
    .theme--light.v-pagination .v-pagination__item--active {
        font-weight: bold;
        color: #626781 !important;
        opacity: 1;
    }
    .v-input--selection-controls__ripple {
        border-radius: 50%;
        cursor: pointer;
        height: 34px;
        position: absolute;
        transition: inherit;
        width: 34px;
        left: -12px;
        top: calc(50% - 24px);
        margin: 7px;
        display: none;
    }


    .fa-check-square:before, .fa-minus-square:before {
        color: #736DB9;
    }
    .v-data-table .v-data-table__wrapper table {
        border-bottom: 2px solid #E0E0E0 !important;
    }




    .v-data-table__wrapper {
        /*height: 650px;
        overflow: scroll;
        overflow-x: hidden;*/
        margin-left: 10px;
        margin-right: 10px;
    }

    .v-toolbar__content {
        padding: 4px 10px !important;
    }

    .v-data-table {
        margin-left: 15px;
        margin-right: 15px;
    }

    .v-data-table .search-bar {
        position: relative;
        top: 20px;
        padding: 0 12px 10px 3px;
    }

    /*-------滾動條整體樣式----*/
    .v-data-table__wrapper::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    /*滾動條裡面小方塊樣式*/
    .v-data-table__wrapper::-webkit-scrollbar-thumb {
        border-radius: 100px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(98,103,129,0.2);
    }

    /*滾動條裡面軌道樣式*/
    .v-data-table__wrapper::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 20px;
        background: rgba(98,103,129,0.1);
    }
</style>


<script>
    export default {
        props: ['refKey', 'headers', 'items', 'itemKey', 'totalCount', 'itemsPerPage', 'totalVisible', 'showSelect', 'disabledProp', 'changePage', 'rowClick','selectKey'],
        data: () => ({
            page:1,
            isShow: false,
            selected:[],
            //selected: false, 
            singleSelect: false,
           
        }),
        watch: {
            page: function (value) {
                if (!this.changePage) return;
                this.changePage({
                    page: value,
                    pageSize: this.itemsPerPage
                });
            },
            selected: function (value) {
                if (value == true) this.selectAll();
                else {
                    this.cancelAll();
                }
            },
        },
        computed: {
            computedHeaders: function () {
                return this.headers.map((x) => {
                    return {
                        ...x,
                        templateName: 'item.' + x.value,
                        hasTemplate: this.$slots['item.' + x.value] != null || this.$scopedSlots['item.' + x.value] != null,

                        headerTemplateName: 'header.' + x.value,
                        hasHeaderTemplate: this.$slots['header.' + x.value] != null || this.$scopedSlots['header.' + x.value] != null
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
            customSort: function (items, index, isDesc) {
                this.$emit('sort', { items, index, isDesc }); 
                return items;
            },
            rowClass: function (item) {                    
                //var changeColor = this.itemClass(item);
                //console.log('changeColor', changeColor);
                //return { 'test': item.result == '已取消' == true };
              
                if (!this.disabledProp) return "";
                return item[this.disabledProp] ? "item-disabled" : "" ;
            },
            hasSlot: function (templateName) {
                return this.$slots[templateName] != null || this.$scopedSlots[templateName]!=null  ;
            },
            deleteSelected: function (item) {
                console.log('selected', item);
            },
            selectAll: function () {
                this.items.forEach((x) => x.checked = true);
            },
            cancelAll: function () {
                this.items.forEach((x) => x.checked = false);
            },
            clearAll: function () {
                this.selected =[];
            },
            switchSelect: function () {
                var comp = this;
                comp.selected =! comp.selected;
            },
            innerRowClick: function (a, item) {
                if (this.rowClick)
                this.rowClick(item);
               //console.log('a', a);
               // console.log('row', item);
            },
            gofrontPage: function (value) {
                this.page = value;
            }
        },
        components: {

        }
    }


</script>