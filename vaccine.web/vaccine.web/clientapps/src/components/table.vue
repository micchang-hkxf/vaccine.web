<template>
    <div>
        <template>
            <slot name="search-bar"></slot>
        </template>

        <v-data-table v-model="selected"
                      :headers="computedHeaders"
                      :items="items"
                      item-key="date"
                      :page.sync="page"
                      :items-per-page="itemsPerPage"
                      :single-select="singleSelect"
                      :show-select="showSelect"
                      :item-class="rowClass"
                      class="elevation-1"
                      hide-default-footer>


            <template v-for="(header,index) in computedHeaders" v-slot:[header.headerTemplateName]>

                <span :key="index" v-if="!header.hasHeaderTemplate"> {{header.text}}</span>

                <slot :name="header.headerTemplateName" v-if="header.hasHeaderTemplate" :header="header"></slot>

            </template>


            <template v-for="(header,index) in computedHeaders" v-slot:[header.templateName]="{item}">

                <span :key="index" v-if="!header.hasTemplate"> {{item[header.value]}}</span>

                <slot :name="header.templateName" v-if="header.hasTemplate" :item="item"></slot>

            </template>
            <!--<template v-slot:item.checked="{ item }">
        <v-checkbox v-model="item.checked" :ripple="false"></v-checkbox>
    </template>-->
            <template v-slot:top>

                <v-toolbar flat color="white">
                    <slot name="toolbar-action" :selectedItems="selectedItems" :selectAll="selectAll"
                          :deleteSelected="deleteSelected" :switchSelect="switchSelect" :selected="selected"></slot>
                </v-toolbar>


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

</style>


<script>
    export default {
        props: ['refKey', 'headers', 'items', 'totalCount', 'itemsPerPage', 'totalVisible','showSelect','disabledProp','changePage'],
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
            }
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
                return this.$slots[templateName] != null;
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
            switchSelect: function () {
                var comp = this;
                comp.selected =! comp.selected;
            }
        },
        components: {

        }
    }


</script>