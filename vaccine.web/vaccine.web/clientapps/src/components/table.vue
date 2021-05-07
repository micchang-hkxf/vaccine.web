<template>
    <div>
        <v-card>
            <slot name="search-bar"></slot>
        </v-card>

        <v-data-table :headers="computedHeaders"
                      :items="items"
                      :page.sync="page"
                      :items-per-page="itemsPerPage"
                      class="elevation-1"
                      hide-default-footer>

            <template v-for="(header,index) in computedHeaders" v-slot:[header.templateName]="{item}">

                <span :key="index" v-if="$slots[header.templateName]==null"> {{item[header.value]}}</span>

                <slot :name="header.templateName" v-if="$slots[header.templateName]!=null" :item="item"></slot>
            </template>
            <template v-slot:item.checked="{ item }">
                <v-checkbox v-model="item.checked" :ripple="false"></v-checkbox>
            </template>
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
        props: ['refKey', 'headers', 'items', 'totalCount', 'itemsPerPage', 'totalVisible'],
        data: () => ({
            page:1,
            isShow: false,
            selected: false, 
            singleSelect: true,
           
        }),
        watch: {
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