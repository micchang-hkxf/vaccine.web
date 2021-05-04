<template>
    
    <v-data-table :headers="computedHeaders"
                  :items="items"
                  class="elevation-1">

        <template v-for="(header,index) in computedHeaders" v-slot:[header.templateName]="{item}">

            <!--<span :key="index" v-if="$slots[header.templateName]==null">
        {{item[header.value]}}
    </span>-->
            <slot :name="header.templateName"  :item="item" :index="index"></slot>
            <!--<slot :name="header.templateName" v-if="$slots[header.templateName]!=null" :item="item" :index="index"></slot>-->
        </template>
        <!--<template v-slot:item.modify="{ item }">
            <v-menu bottom right offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn dark icon v-on="on" @click.stop="" :disabled="isLoading">
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
        <template v-slot:item.no="{ item }">
            <v-chip color="pink" dark>
                {{ item.no }}
            </v-chip>
        </template>-->
    </v-data-table>

</template>


<style>
</style>


<script>
    export default {
        props: ['refKey','headers','items'],
        data: () => ({
            isShow: false,
        }),
        computed: {
            computedHeaders: function () {
                return this.headers.map((x) => {
                    return {
                        ...x,
                        templateName: 'column.'+x.value
                    }
                   
                })
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