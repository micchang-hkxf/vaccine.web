<template>
    <app-layout>
        <template v-slot:navigation>
            <app-menu></app-menu>
        </template>
        <template v-slot:content-title>
            報名者序號查詢
        </template>
        <template v-slot:app-content>
            <v-card>
                <com-table ref-key="table" :headers="headers" :items="items" :total-count="totalCount"
                           :items-per-page="itemsPerPage" :total-visible="totalVisible" :show-select="showSelect"
                           :change-page="changePage"
                           style="margin-left: 15px;padding-top: 15px;margin-right: 15px;">
                    <template v-slot:search-bar>
                        <div style="display:flex;justify-content:flex-start;margin-left:10px;margin-top:10px;">
                            <v-row>
                                <v-col cols="4">
                                    <v-text-field v-model="keyWord" placeholder="身分證後四碼" outlined dense clearable></v-text-field>
                                </v-col>
                                <v-btn icon color="#626781" style="top:5px;" :ripple="false"
                                       @click="getRegistData(1)">
                                    <v-icon>fas fa-search</v-icon>
                                </v-btn>
                            </v-row>
                        </div>


                    </template>

                </com-table>
            </v-card>
        </template>
    </app-layout>
</template>

<style>
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
</style>




<script>
    import appMenu from 'components/admin/menu';
    import appLayout from 'components/admin/app_layout';
    import comTable from 'components/table'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        // router,
        data: () => ({
            totalCount: 0,
            itemsPerPage: 5,
            totalVisible: 4,
            showSelect: false,           
            keyWord: '',
            items: [],
            headers: [
                { text: '報名時間', value: 'date', align: 'start', sortable: true, flex: 6 },
                { text: '姓名', value: 'name', sortable: false, flex: 6 },
                { text: '身分證', value: 'identity', sortable: false, flex: 6 },
                { text: '接種活動', value: 'vaccination', sortable: false, flex: 6 },
                { text: '報名方式', value: 'way', sortable: false, flex: 6 },
                { text: '複審結果', value: 'result', sortable: false, flex: 6 },
                { text: '序號', value: 'number', sortable: false, flex: 6 },
            ],
        }),
        computed: {
            ...mapGetters('registered', [ 'getVaccines', 'getDistricts', 'getVillages', 'getInstitutions']),
        },
        props: {

        },
        watch: {
            keyWord: function (val) {
                if (!val)
                    this.getRegistData(1);
            }
        },
        created: function () {
            var page = 1;
            this.getRegistData(page);
        },
        methods: {
            ...mapActions('registered', ['loadRegistData']),
            getRegistData: function (page) {
                var params = {                   
                    keyWord: this.keyWord,
                    pageSize: this.itemsPerPage,
                    page: page,
                };
                this.loadRegistData(params).then((r) => {
                    this.totalCount = r.totalCount;
                    this.items.splice(0);                   
                    r.datas.forEach((x) => {
                        var str = x.identity.substr(1, 5);
                        var code = x.identity.replace(str, '●●●●●')
                        x.identity=code
                        this.items.push(x);
                    })
                }).catch((e) => {
                    console.log(e);

                });
            },
            changePage: function (pager) {
                console.log(pager);
                ///{ page: 2, pageSize: 20}
                this.getRegistData(pager.page);
            },
           
        },
        components: {
            appLayout, appMenu, comTable
        }
    };
</script>






