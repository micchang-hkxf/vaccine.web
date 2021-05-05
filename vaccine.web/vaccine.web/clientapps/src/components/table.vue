<template>
    <div>
        <v-data-table :headers="computedHeaders"
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
                          :total-visible="totalVisible"></v-pagination>

        </div>
    </div>
</template>


<style>
</style>


<script>
    export default {
        props: ['refKey', 'headers', 'items', 'totalCount', 'itemsPerPage','totalVisible','page'],
        data: () => ({
            isShow: false,
            
            select:[],

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
            }
        },
        components: {

        }
    }


</script>