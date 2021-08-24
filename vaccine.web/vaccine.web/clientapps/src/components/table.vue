<template>
    <v-data-table v-model="selected"
                  :headers="computedHeaders"
                  :items="items"
                  :item-key="itemKey"
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  :single-select="singleSelect"
                  :show-select="showSelect"
                  :item-class="rowClass"
                  class="elevation-0"
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
                <slot name="search-bar" v-if="hasSlot('search-bar')"></slot>
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
    .row, .col {
        /*margin: 0px !important;
        padding: 0px !important;*/
        flex-wrap: nowrap !important;
    }

    .v-pagination__navigation, .v-pagination__item {
        box-shadow: none !important;
    }
    .theme--light.v-pagination .v-pagination__item--active {
        color: #626781 !important;
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




    .v-data-table__wrapper {
        /*height: 650px;
        overflow: scroll;
        overflow-x: hidden;*/
        padding-left: 10px;
        padding-right: 15px;
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
            background: #736DB9;
        }

    /*滾動條裡面軌道樣式*/
        .v-data-table__wrapper::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 20px;
            background: rgba(0,0,0,0.1);
        }
</style>


<script>
    export default {
        props: ['refKey', 'headers', 'items', 'itemKey', 'totalCount', 'itemsPerPage', 'totalVisible', 'showSelect', 'disabledProp', 'changePage', 'rowClick'],
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
            rowClass: function (item) {
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